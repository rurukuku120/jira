import Resolver from '@forge/resolver';
import api, { route, fetch, storage } from '@forge/api';

const resolver = new Resolver();

const CUSTOM_HOLIDAY_KEY = 'custom-holidays'; // Storage 키 (전역 1개 객체)

// 시작일로 인식할 필드 이름 후보 (소문자 비교)
const START_FIELD_NAMES = [
  'start date', 'start', '시작일', '시작 날짜', 'target start', 'planned start',
];

/** 필드 메타에서 시작일 커스텀 필드 id 자동 탐색. 없으면 null. */
async function detectStartFieldId() {
  try {
    const res = await api.asUser().requestJira(route`/rest/api/3/field`, {
      headers: { Accept: 'application/json' },
    });
    const fields = await res.json();
    const byName = fields.filter((f) =>
      START_FIELD_NAMES.includes((f.name || '').trim().toLowerCase())
    );
    const dateOne =
      byName.find((f) => f.schema && (f.schema.type === 'date' || f.schema.type === 'datetime')) ||
      byName[0];
    return dateOne ? dateOne.id : null;
  } catch (e) {
    return null;
  }
}

// 한국 공휴일 — 키가 필요 없는 공개 API (Nager.Date)
// 연도별 조회: https://date.nager.at/api/v3/PublicHolidays/{year}/KR
const HOLIDAY_API = (year) => `https://date.nager.at/api/v3/PublicHolidays/${year}/KR`;

/** 특정 연도 공휴일 조회 → [{date:'YYYY-MM-DD', name}] */
async function fetchYearHolidays(year) {
  const res = await fetch(HOLIDAY_API(year));
  if (!res.ok) throw new Error(`공휴일 API ${res.status}`);
  const list = await res.json();
  if (!Array.isArray(list)) return [];
  return list.map((h) => ({ date: h.date, name: h.localName || h.name || '공휴일' }));
}

/** 한국 공휴일 조회 (fromYear~toYear). 수동 추가분과 병합. 키 불필요. */
resolver.define('getHolidays', async (req) => {
  const { fromYear, toYear } = req.payload || {};
  const custom = (await storage.get(CUSTOM_HOLIDAY_KEY)) || {};
  const official = {};
  let apiError = null;
  if (fromYear && toYear) {
    try {
      const years = [];
      for (let y = fromYear; y <= toYear; y++) years.push(y);
      const results = await Promise.all(years.map(fetchYearHolidays));
      for (const list of results) for (const h of list) official[h.date] = h.name;
    } catch (e) {
      apiError = String(e);
    }
  }
  const merged = { ...official, ...custom };
  return { holidays: merged, custom, error: apiError };
});

/** 수동 추가 공휴일 목록 조회 */
resolver.define('listCustomHolidays', async () => {
  const custom = (await storage.get(CUSTOM_HOLIDAY_KEY)) || {};
  return { custom };
});

/** 수동 공휴일 추가/수정. payload: { date:'YYYY-MM-DD', name } */
resolver.define('addCustomHoliday', async (req) => {
  const { date, name } = req.payload || {};
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) {
    return { error: '날짜 형식이 올바르지 않습니다 (YYYY-MM-DD).' };
  }
  const custom = (await storage.get(CUSTOM_HOLIDAY_KEY)) || {};
  custom[date] = (name && name.trim()) || '휴일';
  await storage.set(CUSTOM_HOLIDAY_KEY, custom);
  return { custom };
});

/** 수동 공휴일 삭제. payload: { date } */
resolver.define('removeCustomHoliday', async (req) => {
  const { date } = req.payload || {};
  const custom = (await storage.get(CUSTOM_HOLIDAY_KEY)) || {};
  delete custom[date];
  await storage.set(CUSTOM_HOLIDAY_KEY, custom);
  return { custom };
});

/** 프로젝트에 배정 가능한 사용자 목록 (accountId, displayName) */
resolver.define('listAssignees', async (req) => {
  const { projectKey } = req.payload || {};
  if (!projectKey) return { assignees: [] };
  try {
    const res = await api.asUser().requestJira(
      route`/rest/api/3/user/assignable/search?project=${projectKey}&maxResults=200`,
      { headers: { Accept: 'application/json' } }
    );
    const data = await res.json();
    const assignees = (Array.isArray(data) ? data : [])
      .filter((u) => u.accountType !== 'app' && u.accountId)
      .map((u) => ({ id: u.accountId, name: u.displayName || u.accountId }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return { assignees };
  } catch (e) {
    return { assignees: [], error: String(e) };
  }
});

/** 사용자가 접근 가능한 저장된 필터 목록 (id, name, jql) */
resolver.define('listFilters', async () => {
  try {
    const res = await api.asUser().requestJira(
      route`/rest/api/3/filter/search?expand=jql&maxResults=50&orderBy=name`,
      { headers: { Accept: 'application/json' } }
    );
    const data = await res.json();
    const filters = (data.values || []).map((f) => ({
      id: f.id, name: f.name, jql: f.jql || '',
    }));
    return { filters };
  } catch (e) {
    return { filters: [], error: String(e) };
  }
});

/**
 * 현재 JQL을 Jira 저장 필터로 생성.
 * payload: { name, jql, global?:boolean }
 * global=true면 전역(모든 사용자) 공유 — '필터 공유' 권한이 있어야 성공.
 */
resolver.define('saveFilter', async (req) => {
  const { name, jql, global } = req.payload || {};
  const fname = (name || '').trim();
  const fjql = (jql || '').trim();
  if (!fname) return { error: '필터 이름을 입력하세요.' };
  if (!fjql) return { error: '저장할 JQL이 없습니다.' };

  const body = { name: fname, jql: fjql };
  if (global) body.sharePermissions = [{ type: 'global' }];

  try {
    const res = await api.asUser().requestJira(route`/rest/api/3/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const t = await res.text();
      return { error: `필터 저장 실패 (${res.status}): ${t}` };
    }
    const data = await res.json();
    return { filter: { id: data.id, name: data.name, jql: data.jql || fjql } };
  } catch (e) {
    return { error: String(e) };
  }
});

/**
 * 이슈(시작일/마감일 보유) 조회.
 * payload: { projectKey, startFieldId?, jql? }
 */
resolver.define('getIssues', async (req) => {
  const { projectKey } = req.payload || {};
  const customJql = (req.payload && req.payload.jql || '').trim();
  if (!projectKey && !customJql) return { issues: [], error: 'projectKey 또는 jql이 필요합니다.' };

  const startFieldId = (req.payload && req.payload.startFieldId) || (await detectStartFieldId());

  const base = customJql || `project = "${projectKey}"`;
  const orderIdx = base.toUpperCase().lastIndexOf(' ORDER BY ');
  const where = orderIdx >= 0 ? base.slice(0, orderIdx) : base;
  const order = orderIdx >= 0 ? base.slice(orderIdx) : ' ORDER BY duedate ASC';

  // 담당자 필터 (다중 선택 + 할당되지 않음, 서버 측 조회 조건으로 결합)
  const assignees = ((req.payload && req.payload.assignees) || []).filter(Boolean);
  const includeUnassigned = !!(req.payload && req.payload.includeUnassigned);
  const inList = assignees.map((a) => `"${a}"`).join(', ');
  let assigneeClause = '';
  if (inList && includeUnassigned) assigneeClause = ` AND (assignee IN (${inList}) OR assignee IS EMPTY)`;
  else if (inList) assigneeClause = ` AND assignee IN (${inList})`;
  else if (includeUnassigned) assigneeClause = ' AND assignee IS EMPTY';

  const jql = `(${where}) AND duedate IS NOT EMPTY${assigneeClause}${order}`;

  const fields = ['summary', 'duedate', 'status', 'issuetype', 'parent', 'assignee'];
  if (startFieldId) fields.push(startFieldId);

  const MAX_ISSUES = 1000; // 페이지네이션 상한(이 이상은 truncated 처리)
  try {
    const raw = [];
    let nextPageToken;
    let truncated = false;
    do {
      const body = { jql, fields, maxResults: 100 };
      if (nextPageToken) body.nextPageToken = nextPageToken;
      const res = await api.asUser().requestJira(route`/rest/api/3/search/jql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const t = await res.text();
        return { issues: [], error: `이슈 조회 실패 (${res.status}): ${t}` };
      }
      const data = await res.json();
      for (const it of (data.issues || [])) raw.push(it);
      nextPageToken = data.isLast ? undefined : data.nextPageToken;
      if (raw.length >= MAX_ISSUES) { truncated = !!nextPageToken; break; }
    } while (nextPageToken);

    const issues = raw.slice(0, MAX_ISSUES).map((it) => {
      const f = it.fields || {};
      // 시작일 필드가 있을 때만 시작일 사용(없으면 마감일 기준 단일 막대 → 생성일로 왜곡 방지)
      const startVal = startFieldId ? f[startFieldId] : null;
      const parent = f.parent;
      const a = f.assignee;
      return {
        key: it.key,
        summary: f.summary,
        start: startVal ? String(startVal).slice(0, 10) : null,
        due: f.duedate ? String(f.duedate).slice(0, 10) : null,
        status: f.status?.name || '',
        statusCategory: f.status?.statusCategory?.key || 'new', // new | indeterminate | done
        type: f.issuetype?.name || '',
        epicKey: parent?.key || null,
        epicName: parent?.fields?.summary || null,
        assigneeId: a?.accountId || null,
        assigneeName: a?.displayName || null,
      };
    });
    return { issues, startFieldId, jql, truncated };
  } catch (e) {
    return { issues: [], error: String(e) };
  }
});

/**
 * 바 드래그로 변경된 시작일/마감일을 이슈에 반영.
 * payload: { key, start?:'YYYY-MM-DD', due?:'YYYY-MM-DD', startFieldId? }
 * start는 startFieldId가 있을 때만 반영(없으면 created 기반이라 쓰기 불가).
 */
resolver.define('updateIssueDates', async (req) => {
  const { key, start, due } = req.payload || {};
  if (!key) return { error: 'key가 필요합니다.' };
  const startFieldId = (req.payload && req.payload.startFieldId) || (await detectStartFieldId());

  const fields = {};
  if (due) fields.duedate = due;
  if (start && startFieldId) fields[startFieldId] = start;
  if (Object.keys(fields).length === 0) {
    return { error: '수정할 필드가 없습니다.', startFieldId };
  }

  try {
    const res = await api.asUser().requestJira(route`/rest/api/3/issue/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ fields }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { error: `이슈 수정 실패 (${res.status}): ${body}`, startFieldId };
    }
    return { ok: true, key, start: start || null, due: due || null, startFieldId };
  } catch (e) {
    return { error: String(e), startFieldId };
  }
});

const ISSUE_COLOR_KEY = 'issue-colors'; // { issueKey: '#hex' }

/** 이슈별 사용자 지정 색상 맵 조회 */
resolver.define('getIssueColors', async () => {
  const colors = (await storage.get(ISSUE_COLOR_KEY)) || {};
  return { colors };
});

/** 이슈 색상 지정/해제. payload: { key, color } (color 비우면 해제) */
resolver.define('setIssueColor', async (req) => {
  const { key, color } = req.payload || {};
  if (!key) return { error: 'key가 필요합니다.' };
  const colors = (await storage.get(ISSUE_COLOR_KEY)) || {};
  if (color && /^#[0-9a-fA-F]{6}$/.test(color)) colors[key] = color;
  else delete colors[key];
  await storage.set(ISSUE_COLOR_KEY, colors);
  return { colors };
});

const PAGE_TITLE_KEY = 'page-title';

/** 페이지 제목 조회 */
resolver.define('getTitle', async () => {
  const title = (await storage.get(PAGE_TITLE_KEY)) || '당신의 타임라인';
  return { title };
});

/** 페이지 제목 저장 */
resolver.define('setTitle', async (req) => {
  const t = (req.payload && req.payload.title || '').trim();
  await storage.set(PAGE_TITLE_KEY, t || '당신의 타임라인');
  return { title: t || '당신의 타임라인' };
});

export const handler = resolver.getDefinitions();