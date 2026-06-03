import { invoke, view, router } from '@forge/bridge';

// 이슈 열기 (네이티브 사이드바 패널은 Forge가 호출 불가 → 이슈 화면을 새 탭으로 오픈)
function openIssue(key) {
  if (!key) return;
  router.open(`/browse/${key}`);
}

// 줌 레벨별 하루 컬럼 너비(px)
const ZOOM = {
  week: { w: 34, label: '주' },
  month: { w: 12, label: '개월' },
  quarter: { w: 5, label: '분기' },
};

const pad = (n) => String(n).padStart(2, '0');
const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (d, n) => {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
};
const dayDiff = (a, b) => Math.round((parse(b) - parse(a)) / 86400000);
const todayStr = () => fmt(new Date());

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

// 화면 전역 상태
const state = {
  projectKey: null,
  filters: [],
  assignees: [],          // 프로젝트 배정 가능 사용자 [{id, name}]
  selectedFilterId: '',
  customJql: '',
  zoom: 'week',
  zoomScale: 1,           // 확대/축소 배율 (+/- 버튼, 0.4~4)
  view: 'tree',           // 그룹화: flat | assignee | epic | tree | priority | type | label | duebucket
  sorts: [{ key: 'duedate', dir: 'asc' }], // 다단계 정렬(위에서부터 우선)
  sortOpen: false,        // 정렬 패널 열림
  assigneeIds: [],        // 선택된 담당자 accountId 배열
  includeUnassigned: false, // '할당되지 않음' 포함 여부
  statusCats: [],         // 상태 범주 필터 (빈 배열=전체). 'new'|'indeterminate'|'done'
  priorityFilter: [],     // 우선순위 이름 배열(빈=전체)
  typeFilter: [],         // 이슈유형 이름 배열(빈=전체)
  labelFilter: [],        // 라벨 배열(빈=전체)
  overdueOnly: false,     // 지연(마감 지남 & 미완료)만
  mineOnly: false,        // 내 이슈만
  myAccountId: null,      // 현재 사용자 accountId
  advOpen: false,         // 고급 필터 패널 열림 상태
  layout: 'gantt',        // gantt | table
  showVersions: true,     // 버전(마일스톤) 수직선 표시
  versions: [],           // 프로젝트 버전 [{name, releaseDate, released}]
  presets: {},            // 보기 프리셋 { name: config }
  tableColW: {},          // 표 뷰 컬럼 너비 오버라이드 { colKey: px }
  title: '당신의 타임라인',
  collapsed: {},      // { epicKey: true } 접힘 상태
  data: null,         // 마지막 로드 결과 { issues, startFieldId, rangeStart, totalDays }
  holidays: {},
  custom: {},
  colors: {},         // { issueKey: '#hex' } 사용자 지정 이슈 색상
};

const root = () => document.getElementById('root');
const colW = () => Math.max(2, Math.round(ZOOM[state.zoom].w * state.zoomScale));
const ZOOM_MIN = 0.4, ZOOM_MAX = 4;

async function main() {
  try {
    const context = await view.getContext();
    state.projectKey =
      context?.extension?.project?.key || context?.extension?.project?.id;
    state.myAccountId = context?.accountId || null;

    const [{ filters }, { title }, asg, col, ver, pre] = await Promise.all([
      invoke('listFilters'),
      invoke('getTitle'),
      invoke('listAssignees', { projectKey: state.projectKey }),
      invoke('getIssueColors'),
      invoke('listVersions', { projectKey: state.projectKey }),
      invoke('getPresets'),
    ]);
    state.filters = filters || [];
    state.title = title || '당신의 타임라인';
    state.assignees = (asg && asg.assignees) || [];
    state.colors = (col && col.colors) || {};
    state.versions = (ver && ver.versions) || [];
    state.presets = (pre && pre.presets) || {};

    await loadAll();
  } catch (e) {
    root().innerHTML = `<div class="error">오류: ${e.message || e}</div>`;
  }
}

// 로딩 오버레이
let loadingEl = null;
function showLoading() {
  if (loadingEl) return;
  loadingEl = el('div', 'load-overlay');
  loadingEl.appendChild(el('div', 'load-spinner'));
  document.body.appendChild(loadingEl);
}
function hideLoading() { if (loadingEl) { loadingEl.remove(); loadingEl = null; } }

// 필터/JQL로 이슈 조회 → 범위 계산 → 공휴일 조회 → 렌더
async function loadAll() {
  showLoading();
  try {
    await loadAllInner();
  } finally {
    hideLoading();
  }
}

async function loadAllInner() {
  let jql = state.customJql.trim();
  if (!jql && state.selectedFilterId) {
    // 저장된 필터는 JQL 텍스트 대신 'filter = ID'로 직접 조회(의미 100% 보존)
    jql = `filter = ${state.selectedFilterId}`;
  }

  const { issues, startFieldId, truncated, error: issueErr } = await invoke('getIssues', {
    projectKey: state.projectKey,
    jql: jql || undefined,
    assignees: state.assigneeIds,
    includeUnassigned: state.includeUnassigned,
  });
  if (issueErr) throw new Error(issueErr);

  if (!issues || issues.length === 0) {
    state.data = { issues: [], startFieldId, truncated: false };
    render();
    return;
  }

  let min = null, max = null;
  for (const it of issues) {
    const s = it.start || it.due;
    const e = it.due || it.start;
    if (!s || !e) continue;
    if (!min || s < min) min = s;
    if (!max || e > max) max = e;
  }
  // 오늘도 범위에 포함시켜 '오늘선'이 항상 보이게
  const today = todayStr();
  if (today < min) min = today;
  if (today > max) max = today;

  const rangeStart = fmt(addDays(parse(min), -7));
  const rangeEnd = fmt(addDays(parse(max), 7));
  const totalDays = dayDiff(rangeStart, rangeEnd) + 1;
  const fromYear = Number(rangeStart.slice(0, 4));
  const toYear = Number(rangeEnd.slice(0, 4));

  state.data = { issues, startFieldId, rangeStart, totalDays, truncated: !!truncated };

  const { holidays, custom, error: holErr } = await invoke('getHolidays', { fromYear, toYear });
  if (holErr) console.warn('휴일 조회 경고:', holErr);
  state.holidays = holidays || {};
  state.custom = custom || {};

  render(true);
}

// 로드된 이슈에서 담당자 목록(이름순) 수집. 미지정 존재 시 __unassigned__ 포함.
function collectAssignees() {
  const issues = (state.data && state.data.issues) || [];
  const map = new Map();
  let unassigned = false;
  for (const it of issues) {
    if (it.assigneeId) map.set(it.assigneeId, it.assigneeName || it.assigneeId);
    else unassigned = true;
  }
  const list = [...map.entries()]
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
  if (unassigned) list.push({ id: '__unassigned__', name: '미지정' });
  return list;
}

// 담당자 선택 요약 라벨
function assigneeLabel() {
  const n = state.assigneeIds.length + (state.includeUnassigned ? 1 : 0);
  if (n === 0) return '담당자: 전체';
  if (state.assigneeIds.length === 1 && !state.includeUnassigned) {
    const a = state.assignees.find((x) => x.id === state.assigneeIds[0]);
    return `담당자: ${a ? a.name : '1명'}`;
  }
  if (state.assigneeIds.length === 0 && state.includeUnassigned) return '담당자: 할당되지 않음';
  return `담당자: ${n}명`;
}

// Jira식 검색 + 다중 선택 담당자 피커
function renderAssigneePicker() {
  const wrap = el('div', 'asg-wrap');
  const btn = el('button', 'asg-btn');
  btn.appendChild(el('span', 'asg-btn-label', assigneeLabel()));
  btn.appendChild(el('span', 'asg-caret', '▾'));
  wrap.appendChild(btn);

  const pop = el('div', 'asg-pop');
  pop.style.display = 'none';
  wrap.appendChild(pop);

  // 검색창
  const search = el('input', 'asg-search');
  search.type = 'text';
  search.placeholder = '담당자 검색';
  pop.appendChild(search);

  const list = el('div', 'asg-list');
  pop.appendChild(list);

  // 작업용 선택 상태(닫힐 때 일괄 적용)
  const selIds = new Set(state.assigneeIds);
  let selUn = state.includeUnassigned;
  const users = state.assignees.length ? state.assignees : collectAssignees().filter((a) => a.id !== '__unassigned__');

  const checkRow = (checked, label, onToggle) => {
    const row = el('label', 'asg-row');
    const cb = el('input');
    cb.type = 'checkbox';
    cb.checked = checked;
    cb.onchange = () => onToggle(cb.checked);
    row.appendChild(cb);
    row.appendChild(el('span', 'asg-name', label));
    return row;
  };

  const buildList = () => {
    list.innerHTML = '';
    const q = search.value.trim().toLowerCase();
    if (!q || '할당되지 않음'.includes(q) || 'unassigned'.includes(q)) {
      list.appendChild(checkRow(selUn, '할당되지 않음', (v) => { selUn = v; }));
    }
    let shown = 0;
    for (const a of users) {
      if (q && !a.name.toLowerCase().includes(q)) continue;
      list.appendChild(checkRow(selIds.has(a.id), a.name, (v) => { v ? selIds.add(a.id) : selIds.delete(a.id); }));
      if (++shown >= 100) break;
    }
    if (shown === 0 && q) list.appendChild(el('div', 'asg-empty', '검색 결과 없음'));
  };
  search.oninput = buildList;
  buildList();

  // 하단 액션: 지우기 / 적용
  const foot = el('div', 'asg-foot');
  const clearBtn = el('button', 'asg-clear', '선택 지우기');
  clearBtn.onclick = () => { selIds.clear(); selUn = false; buildList(); };
  const applyBtn = el('button', 'asg-apply primary', '적용');
  foot.append(clearBtn, applyBtn);
  pop.appendChild(foot);

  const apply = async () => {
    const newIds = [...selIds];
    const changed =
      selUn !== state.includeUnassigned ||
      newIds.length !== state.assigneeIds.length ||
      newIds.some((id) => !state.assigneeIds.includes(id));
    closePop();
    if (!changed) return;
    state.assigneeIds = newIds;
    state.includeUnassigned = selUn;
    try { await loadAll(); } catch (e) { showError(e); }
  };
  applyBtn.onclick = apply;

  // 외부 클릭 시 닫기(적용 없이) — 변경은 '적용' 버튼으로만
  const onDocDown = (ev) => { if (!wrap.contains(ev.target)) closePop(); };
  function openPop() {
    pop.style.display = 'block';
    document.addEventListener('mousedown', onDocDown);
    setTimeout(() => search.focus(), 0);
  }
  function closePop() {
    pop.style.display = 'none';
    document.removeEventListener('mousedown', onDocDown);
  }
  btn.onclick = () => { pop.style.display === 'none' ? openPop() : closePop(); };

  return wrap;
}

// 상태 범주 정의 (Jira statusCategory key 기준)
const STATUS_CATS = [
  { key: 'new', label: '해야 할 일' },
  { key: 'indeterminate', label: '진행 중' },
  { key: 'done', label: '완료' },
];

// 클라이언트 측 전체 필터(상태/우선순위/유형/라벨/지연/내 이슈) 적용
function statusFiltered(issues) {
  const today = todayStr();
  return issues.filter((it) => {
    if (state.statusCats.length && !state.statusCats.includes(it.statusCategory)) return false;
    if (state.priorityFilter.length && !state.priorityFilter.includes(it.priority)) return false;
    if (state.typeFilter.length && !state.typeFilter.includes(it.type)) return false;
    if (state.labelFilter.length && !(it.labels || []).some((l) => state.labelFilter.includes(l))) return false;
    if (state.overdueOnly && !(it.due && it.due < today && it.statusCategory !== 'done')) return false;
    if (state.mineOnly && it.assigneeId !== state.myAccountId) return false;
    return true;
  });
}

// 정렬: 다단계(state.sorts, 위에서부터 우선)
const PRIORITY_RANK = { Highest: 5, High: 4, Medium: 3, Low: 2, Lowest: 1 };
const SORT_FIELDS = [
  ['duedate', '마감일'], ['start', '시작일'], ['priority', '우선순위'], ['created', '생성일'], ['key', '키'],
];
function sortVal(it, key) {
  switch (key) {
    case 'start': return it.start || it.due || '';
    case 'created': return it.created || '';
    case 'key': return it.key;
    case 'priority': return PRIORITY_RANK[it.priority] || 0;
    case 'duedate':
    default: return it.due || it.start || '';
  }
}
function sortIssues(issues) {
  const sorts = state.sorts.length ? state.sorts : [{ key: 'duedate', dir: 'asc' }];
  return [...issues].sort((a, b) => {
    for (const s of sorts) {
      const dir = s.dir === 'desc' ? -1 : 1;
      const va = sortVal(a, s.key), vb = sortVal(b, s.key);
      if (va < vb) return -1 * dir;
      if (va > vb) return 1 * dir;
    }
    return 0;
  });
}

// 그룹 함수들 (통일 형태 { id, name, issues })
function groupByField(issues, keyFn, nameFn, prefix, noneLabel) {
  const map = new Map();
  for (const it of issues) {
    const k = keyFn(it) || '__none__';
    if (!map.has(k)) map.set(k, { id: `${prefix}:${k}`, name: k === '__none__' ? noneLabel : nameFn(it), issues: [] });
    map.get(k).issues.push(it);
  }
  return [...map.values()];
}
function groupByPriority(issues) {
  const g = groupByField(issues, (it) => it.priority, (it) => it.priority, 'pri', '우선순위 없음');
  return g.sort((a, b) => (PRIORITY_RANK[b.name] || 0) - (PRIORITY_RANK[a.name] || 0));
}
function groupByType(issues) {
  return groupByField(issues, (it) => it.type, (it) => it.type, 'type', '유형 없음')
    .sort((a, b) => a.name.localeCompare(b.name));
}
function groupByLabel(issues) {
  // 라벨은 다중 → 이슈가 여러 그룹에 들어갈 수 있음
  const map = new Map();
  for (const it of issues) {
    const labels = (it.labels && it.labels.length) ? it.labels : ['__none__'];
    for (const l of labels) {
      if (!map.has(l)) map.set(l, { id: `lbl:${l}`, name: l === '__none__' ? '라벨 없음' : l, issues: [] });
      map.get(l).issues.push(it);
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}
function groupByDueBucket(issues) {
  const today = parse(todayStr());
  const endOfWeek = addDays(today, 7 - (today.getDay() || 7) + 1); // 이번 주 일요일 다음 월요일 직전 근사
  const buckets = [
    { id: 'due:overdue', name: '지연', issues: [], test: (it) => it.due && it.statusCategory !== 'done' && parse(it.due) < today },
    { id: 'due:today', name: '오늘', issues: [], test: (it) => it.due === todayStr() },
    { id: 'due:week', name: '이번 주', issues: [], test: (it) => it.due && parse(it.due) > today && parse(it.due) <= endOfWeek },
    { id: 'due:later', name: '이후', issues: [], test: (it) => it.due && parse(it.due) > endOfWeek },
    { id: 'due:none', name: '마감일 없음', issues: [], test: () => true },
  ];
  for (const it of issues) {
    const b = buckets.find((x) => x.test(it));
    (b || buckets[buckets.length - 1]).issues.push(it);
  }
  return buckets.filter((b) => b.issues.length).map(({ id, name, issues }) => ({ id, name, issues }));
}

// 상태 범주 피커 (체크박스 다중 선택, 클라이언트 측 필터)
function renderStatusPicker() {
  const wrap = el('div', 'asg-wrap');
  const btn = el('button', 'asg-btn');
  const n = state.statusCats.length;
  const label = n === 0 ? '상태 범주: 전체'
    : n === 1 ? `상태: ${(STATUS_CATS.find((c) => c.key === state.statusCats[0]) || {}).label}`
    : `상태: ${n}개`;
  btn.appendChild(el('span', 'asg-btn-label', label));
  btn.appendChild(el('span', 'asg-caret', '▾'));
  wrap.appendChild(btn);

  const pop = el('div', 'asg-pop');
  pop.style.display = 'none';
  wrap.appendChild(pop);

  const list = el('div', 'asg-list');
  const sel = new Set(state.statusCats);
  for (const c of STATUS_CATS) {
    const row = el('label', 'asg-row');
    const cb = el('input');
    cb.type = 'checkbox';
    cb.checked = sel.has(c.key);
    cb.onchange = () => { cb.checked ? sel.add(c.key) : sel.delete(c.key); };
    row.appendChild(cb);
    const badge = el('span', 'st-badge st-' + c.key, c.label);
    row.appendChild(badge);
    list.appendChild(row);
  }
  pop.appendChild(list);

  const foot = el('div', 'asg-foot');
  const clearBtn = el('button', 'asg-clear', '선택 지우기');
  clearBtn.onclick = () => { sel.clear(); for (const r of list.querySelectorAll('input')) r.checked = false; };
  const applyBtn = el('button', 'asg-apply primary', '적용');
  foot.append(clearBtn, applyBtn);
  pop.appendChild(foot);

  const onDocDown = (ev) => { if (!wrap.contains(ev.target)) closePop(); };
  function closePop() { pop.style.display = 'none'; document.removeEventListener('mousedown', onDocDown); }
  function openPop() { pop.style.display = 'block'; document.addEventListener('mousedown', onDocDown); }
  applyBtn.onclick = () => {
    const next = STATUS_CATS.map((c) => c.key).filter((k) => sel.has(k));
    closePop();
    const changed = next.length !== state.statusCats.length || next.some((k) => !state.statusCats.includes(k));
    if (!changed) return;
    state.statusCats = next;
    render();
  };
  btn.onclick = () => { pop.style.display === 'none' ? openPop() : closePop(); };

  return wrap;
}

function dayMeta(dateStr) {
  const dow = parse(dateStr).getDay();
  const isWeekend = dow === 0 || dow === 6;
  const holidayName = state.holidays[dateStr];
  return { isWeekend, holidayName, dow };
}

// ---------- 툴바 ----------
function renderToolbar() {
  const toolbar = el('div', 'toolbar');
  // 좌: 필터류 / 우: 보기 옵션·건수·범례
  const left = el('div', 'tb-group tb-left');
  const right = el('div', 'tb-group tb-right');
  toolbar.append(left, right);

  // 편집 가능한 제목
  const titleEl = el('strong', 'page-title', state.title);
  titleEl.title = '클릭하여 제목 편집';
  titleEl.onclick = () => startEditTitle(titleEl);
  left.appendChild(titleEl);

  // 필터 드롭다운
  const sel = el('select');
  sel.appendChild(new Option('프로젝트 전체', ''));
  for (const f of state.filters) {
    const opt = new Option(f.name, String(f.id));
    if (String(f.id) === String(state.selectedFilterId)) opt.selected = true;
    sel.appendChild(opt);
  }
  sel.onchange = async () => {
    state.selectedFilterId = sel.value;
    state.customJql = '';
    state.assigneeIds = [];
    state.includeUnassigned = false;
    state.statusCats = [];
    try { await loadAll(); } catch (e) { showError(e); }
  };
  left.appendChild(sel);

  // JQL 직접 입력 (여러 줄 자동 높이)
  const jqlInput = el('textarea');
  jqlInput.className = 'jql';
  jqlInput.rows = 1;
  jqlInput.placeholder = 'JQL 직접 입력 (Enter 실행, Shift+Enter 줄바꿈)';
  jqlInput.value = state.customJql;
  const autoGrow = () => {
    // 너비: 가장 긴 줄에 맞춰 조절 (min 240, max 720)
    const lines = jqlInput.value.split('\n');
    const longest = lines.reduce((a, b) => (b.length > a.length ? b : a), '');
    const ch = Math.max(longest.length, jqlInput.placeholder.length);
    const w = Math.min(720, Math.max(240, ch * 7.3 + 24));
    jqlInput.style.width = w + 'px';
    // 높이: 줄바꿈(wrap 포함)에 맞춰 조절
    jqlInput.style.height = 'auto';
    jqlInput.style.height = jqlInput.scrollHeight + 'px';
  };
  jqlInput.oninput = () => { state.customJql = jqlInput.value; autoGrow(); };
  jqlInput.onkeydown = async (ev) => {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      ev.preventDefault();
      state.customJql = jqlInput.value;
      state.selectedFilterId = '';
      state.assigneeIds = [];
      state.includeUnassigned = false;
      try { await loadAll(); } catch (e) { showError(e); }
    }
  };
  left.appendChild(jqlInput);
  setTimeout(autoGrow, 0);

  // 현재 JQL을 Jira 저장 필터로 만들기
  const saveFilterBtn = el('button', null, '필터 저장');
  saveFilterBtn.id = 'save-filter-btn';
  saveFilterBtn.title = '현재 JQL을 Jira 저장 필터로 만들기';
  left.appendChild(saveFilterBtn);

  // 담당자 필터 (Jira식 검색 + 다중 선택 피커)
  left.appendChild(renderAssigneePicker());

  // 상태 범주 필터 (해야 할 일 / 진행 중 / 완료)
  left.appendChild(renderStatusPicker());

  // 고급 필터 토글 (우선순위/유형/라벨/지연/내 이슈)
  const advN = state.priorityFilter.length + state.typeFilter.length + state.labelFilter.length
    + (state.overdueOnly ? 1 : 0) + (state.mineOnly ? 1 : 0);
  const advBtn = el('button', 'tb-adv' + (advN ? ' active' : ''), advN ? `고급 필터 (${advN})` : '고급 필터');
  advBtn.onclick = () => { state.advOpen = !state.advOpen; render(); };
  left.appendChild(advBtn);

  // 이슈 건수 + 완료율 + 지연 + 한도 경고 (상태 범주 뒤)
  const d = state.data;
  if (d && d.issues) {
    const total = d.issues.length;
    const sh = statusFiltered(d.issues);
    const doneN = sh.filter((i) => i.statusCategory === 'done').length;
    const donePct = sh.length ? Math.round((doneN / sh.length) * 100) : 0;
    const tdy = todayStr();
    const overdueN = sh.filter((i) => i.due && i.due < tdy && i.statusCategory !== 'done').length;
    const cntText = (sh.length === total ? `${total}건` : `${sh.length}/${total}건`)
      + ` · 완료 ${donePct}%` + (overdueN ? ` · 지연 ${overdueN}` : '');
    const cnt = el('div', 'tb-count', cntText);
    if (d.truncated) {
      const w = el('span', 'tb-warn', ' ⚠ 1000+');
      w.title = '이슈가 1000건을 초과해 일부만 표시됩니다. JQL/필터로 범위를 좁혀 주세요.';
      cnt.appendChild(w);
    }
    left.appendChild(cnt);
  }

  // 필터 초기화 (필터/담당자/상태가 걸려 있을 때만)
  if (state.customJql || state.selectedFilterId || state.assigneeIds.length || state.includeUnassigned || state.statusCats.length) {
    const resetBtn = el('button', 'tb-reset', '필터 초기화');
    resetBtn.onclick = async () => {
      state.customJql = ''; state.selectedFilterId = '';
      state.assigneeIds = []; state.includeUnassigned = false; state.statusCats = [];
      try { await loadAll(); } catch (e) { showError(e); }
    };
    left.appendChild(resetBtn);
  }

  // ----- 우측 그룹 -----
  const gantt = state.layout === 'gantt';

  // 레이아웃 토글 (간트 / 표)
  const layoutBtn = el('button', null, gantt ? '표 보기' : '간트 보기');
  layoutBtn.title = '간트 ↔ 표 전환';
  layoutBtn.onclick = () => { state.layout = gantt ? 'table' : 'gantt'; render(true); };
  right.appendChild(layoutBtn);

  // 그룹화 기준 (간트 전용)
  if (gantt) {
    const viewSel = el('select');
    viewSel.title = '그룹화 기준';
    for (const [val, label] of [
      ['flat', '그룹: 없음'], ['assignee', '그룹: 담당자'], ['epic', '그룹: 에픽'],
      ['tree', '그룹: 하위 작업'], ['priority', '그룹: 우선순위'], ['type', '그룹: 유형'],
      ['label', '그룹: 라벨'], ['duebucket', '그룹: 마감 시기'],
    ]) {
      const opt = new Option(label, val);
      if (state.view === val) opt.selected = true;
      viewSel.appendChild(opt);
    }
    viewSel.onchange = () => { state.view = viewSel.value; render(); };
    right.appendChild(viewSel);
  }

  // 정렬 (다단계) — 패널 토글
  const sortBtn = el('button', state.sortOpen ? 'active' : null,
    `정렬 (${state.sorts.length})`);
  sortBtn.title = '다단계 정렬 (위에서부터 우선 적용)';
  sortBtn.onclick = () => { state.sortOpen = !state.sortOpen; render(); };
  right.appendChild(sortBtn);

  // 줌 버튼 + 오늘 + 버전 토글 (간트 전용)
  if (gantt) {
    const zoomBox = el('div', 'zoom');
    for (const k of ['week', 'month', 'quarter']) {
      const b = el('button', 'zoom-btn' + (state.zoom === k ? ' active' : ''), ZOOM[k].label);
      b.onclick = () => { state.zoom = k; state.zoomScale = 1; render(true); };
      zoomBox.appendChild(b);
    }
    right.appendChild(zoomBox);

    const todayBtn = el('button', null, '오늘');
    todayBtn.onclick = () => scrollToToday();
    right.appendChild(todayBtn);

    if (state.versions.length) {
      const verBtn = el('button', state.showVersions ? 'active' : null, '🏁 버전');
      verBtn.title = '버전(릴리스) 수직선 표시/숨김';
      verBtn.onclick = () => { state.showVersions = !state.showVersions; render(true); };
      right.appendChild(verBtn);
    }
  }

  // 프리셋
  const presetBtn = el('button', null, '프리셋');
  presetBtn.id = 'preset-btn';
  right.appendChild(presetBtn);

  // 휴일 관리
  const manageBtn = el('button', null, '휴일 관리');
  manageBtn.id = 'manage-btn';
  right.appendChild(manageBtn);

  // 범례 (간트 전용)
  if (gantt) {
    const legend = el('div', 'legend');
    legend.innerHTML =
      '<span><span class="swatch" style="background:var(--holiday)"></span>공휴일/휴일</span>' +
      '<span><span class="swatch" style="background:var(--weekend)"></span>주말</span>' +
      '<span><span class="swatch" style="background:var(--bar-new)"></span>할 일</span>' +
      '<span><span class="swatch" style="background:var(--bar)"></span>진행 중</span>' +
      '<span><span class="swatch" style="background:var(--bar-done)"></span>완료</span>' +
      '<span><span class="swatch" style="background:#36b37e;width:3px"></span>오늘</span>';
    right.appendChild(legend);
  }

  return toolbar;
}

function startEditTitle(titleEl) {
  const input = el('input', 'title-edit');
  input.type = 'text';
  input.value = state.title;
  titleEl.replaceWith(input);
  input.focus();
  input.select();
  const commit = async () => {
    const v = input.value.trim() || '당신의 타임라인';
    const { title } = await invoke('setTitle', { title: v });
    state.title = title;
    render();
  };
  input.onkeydown = (ev) => {
    if (ev.key === 'Enter') commit();
    if (ev.key === 'Escape') render();
  };
  input.onblur = commit;
}

function showError(e) {
  root().appendChild(el('div', 'error', `오류: ${e.message || e}`));
}

// ---------- 휴일 관리 패널 ----------
function renderManagePanel() {
  const panel = el('div', 'manage');
  const form = el('div', 'manage-form');
  const dateInput = el('input');
  dateInput.type = 'date';
  const nameInput = el('input');
  nameInput.type = 'text';
  nameInput.placeholder = '휴일명 (예: 회사 창립일)';
  const addBtn = el('button', 'primary', '추가');
  const msg = el('span', 'manage-msg');

  addBtn.onclick = async () => {
    const date = dateInput.value;
    if (!date) { msg.textContent = '날짜를 선택하세요.'; return; }
    addBtn.disabled = true;
    const { error } = await invoke('addCustomHoliday', { date, name: nameInput.value });
    addBtn.disabled = false;
    if (error) { msg.textContent = error; return; }
    nameInput.value = '';
    await loadAll();
  };

  form.append(dateInput, nameInput, addBtn, msg);
  panel.appendChild(el('div', 'manage-title', '수동 추가 휴일'));
  panel.appendChild(form);

  const entries = Object.entries(state.custom).sort((a, b) => a[0].localeCompare(b[0]));
  if (entries.length === 0) {
    panel.appendChild(el('div', 'manage-empty', '추가된 휴일이 없습니다.'));
  } else {
    const list = el('div', 'manage-list');
    for (const [date, name] of entries) {
      const item = el('div', 'manage-item');
      item.appendChild(el('span', 'mi-date', date));
      item.appendChild(el('span', 'mi-name', name));
      const del = el('button', 'mi-del', '삭제');
      del.onclick = async () => { del.disabled = true; await invoke('removeCustomHoliday', { date }); await loadAll(); };
      item.appendChild(del);
      list.appendChild(item);
    }
    panel.appendChild(list);
  }
  return panel;
}

// ---------- 필터 저장 패널 ----------
// 현재 화면의 유효 JQL을 반환 (직접 입력 우선, 없으면 선택된 필터의 JQL)
function currentJql() {
  if (state.customJql.trim()) return state.customJql.trim();
  if (state.selectedFilterId) {
    const f = state.filters.find((x) => String(x.id) === String(state.selectedFilterId));
    return (f && f.jql) || `filter = ${state.selectedFilterId}`;
  }
  return '';
}

// 상태 범주 키 → JQL statusCategory ID (언어 무관)
const STATUS_CAT_ID = { new: 2, indeterminate: 4, done: 3 };

// 저장용 유효 JQL: 기본 JQL + 담당자 + 상태 범주 조건을 결합
function effectiveJqlForSave() {
  let jql = currentJql();
  if (!jql) return '';
  // 담당자
  const inList = state.assigneeIds.map((a) => `"${a}"`).join(', ');
  if (inList && state.includeUnassigned) jql += ` AND (assignee in (${inList}) OR assignee is EMPTY)`;
  else if (inList) jql += ` AND assignee in (${inList})`;
  else if (state.includeUnassigned) jql += ' AND assignee is EMPTY';
  // 상태 범주
  if (state.statusCats.length) {
    const ids = state.statusCats.map((k) => STATUS_CAT_ID[k]).filter(Boolean);
    if (ids.length) jql += ` AND statusCategory in (${ids.join(', ')})`;
  }
  return jql;
}

function renderSaveFilterPanel() {
  const panel = el('div', 'manage');
  panel.appendChild(el('div', 'manage-title', '현재 JQL을 필터로 저장'));

  const jql = effectiveJqlForSave();
  if (!jql) {
    panel.appendChild(el('div', 'manage-empty', '저장할 JQL이 없습니다. JQL을 직접 입력한 뒤 저장하세요.'));
    return panel;
  }

  // 담당자/상태 필터가 결합됐으면 안내
  if (state.assigneeIds.length || state.includeUnassigned || state.statusCats.length) {
    panel.appendChild(el('div', 'sf-note', '※ 현재 담당자·상태 범주 필터가 JQL에 포함되어 저장됩니다.'));
  }
  panel.appendChild(el('div', 'sf-jql', jql));

  const form = el('div', 'manage-form');
  const nameInput = el('input');
  nameInput.type = 'text';
  nameInput.placeholder = '필터 이름';

  const globalWrap = el('label', 'sf-global');
  const globalChk = el('input');
  globalChk.type = 'checkbox';
  globalWrap.appendChild(globalChk);
  globalWrap.appendChild(document.createTextNode(' 전역 공유(모든 사용자)'));

  const saveBtn = el('button', 'primary', '저장');
  const msg = el('span', 'manage-msg');

  saveBtn.onclick = async () => {
    const name = nameInput.value.trim();
    if (!name) { msg.textContent = '필터 이름을 입력하세요.'; return; }
    saveBtn.disabled = true;
    msg.textContent = '저장 중…';
    const { filter, error } = await invoke('saveFilter', {
      name, jql, global: globalChk.checked,
    });
    saveBtn.disabled = false;
    if (error) { msg.textContent = error; return; }
    // 필터 목록에 추가하고 그 필터로 선택 전환 (조건은 필터에 포함됐으므로 개별 필터 초기화)
    state.filters = [...state.filters, filter].sort((a, b) => a.name.localeCompare(b.name));
    state.selectedFilterId = String(filter.id);
    state.customJql = '';
    state.assigneeIds = [];
    state.includeUnassigned = false;
    state.statusCats = [];
    msg.textContent = '저장됨!';
    try { await loadAll(); } catch (e) { showError(e); }
  };

  form.append(nameInput, globalWrap, saveBtn, msg);
  panel.appendChild(form);
  return panel;
}

// ---------- 보기 프리셋 ----------
const PRESET_KEYS = [
  'view', 'sorts', 'zoom', 'zoomScale', 'layout', 'showVersions',
  'statusCats', 'priorityFilter', 'typeFilter', 'labelFilter', 'overdueOnly', 'mineOnly',
  'assigneeIds', 'includeUnassigned', 'selectedFilterId', 'customJql',
];
function captureConfig() {
  const c = {};
  for (const k of PRESET_KEYS) c[k] = JSON.parse(JSON.stringify(state[k]));
  return c;
}
async function applyConfig(cfg) {
  for (const k of PRESET_KEYS) if (k in cfg) state[k] = cfg[k];
  try { await loadAll(); } catch (e) { showError(e); } // 서버 조건(JQL/담당자)도 반영
}

function renderPresetPanel() {
  const panel = el('div', 'manage');
  panel.appendChild(el('div', 'manage-title', '보기 프리셋 (그룹·정렬·필터·줌 한 세트)'));
  const form = el('div', 'manage-form');
  const nameInput = el('input');
  nameInput.type = 'text';
  nameInput.placeholder = '프리셋 이름';
  const saveBtn = el('button', 'primary', '현재 보기 저장');
  const msg = el('span', 'manage-msg');
  saveBtn.onclick = async () => {
    const name = nameInput.value.trim();
    if (!name) { msg.textContent = '이름을 입력하세요.'; return; }
    saveBtn.disabled = true;
    const { presets, error } = await invoke('savePreset', { name, config: captureConfig() });
    saveBtn.disabled = false;
    if (error) { msg.textContent = error; return; }
    state.presets = presets || state.presets;
    nameInput.value = '';
    render();
  };
  form.append(nameInput, saveBtn, msg);
  panel.appendChild(form);

  const names = Object.keys(state.presets).sort((a, b) => a.localeCompare(b));
  if (!names.length) {
    panel.appendChild(el('div', 'manage-empty', '저장된 프리셋이 없습니다.'));
  } else {
    const list = el('div', 'manage-list');
    for (const n of names) {
      const item = el('div', 'manage-item');
      const nameEl = el('span', 'mi-name', n);
      nameEl.style.cursor = 'pointer';
      nameEl.onclick = () => applyConfig(state.presets[n]);
      item.appendChild(nameEl);
      const apply = el('button', 'mi-del', '적용');
      apply.onclick = () => applyConfig(state.presets[n]);
      const del = el('button', 'mi-del', '삭제');
      del.onclick = async () => {
        del.disabled = true;
        const { presets } = await invoke('deletePreset', { name: n });
        state.presets = presets || {};
        render();
      };
      item.append(apply, del);
      list.appendChild(item);
    }
    panel.appendChild(list);
  }
  return panel;
}

// ---------- 다단계 정렬 패널 ----------
function renderSortPanel() {
  const panel = el('div', 'manage');
  panel.appendChild(el('div', 'manage-title', '정렬 (위에서부터 우선 적용)'));

  state.sorts.forEach((s, idx) => {
    const row = el('div', 'sort-row');
    row.appendChild(el('span', 'sort-idx', `${idx + 1}.`));
    const sel = el('select');
    for (const [val, label] of SORT_FIELDS) {
      const opt = new Option(label, val);
      if (s.key === val) opt.selected = true;
      sel.appendChild(opt);
    }
    sel.onchange = () => { state.sorts[idx].key = sel.value; render(); };
    row.appendChild(sel);

    const dir = el('button', 'sort-dir', s.dir === 'asc' ? '↑ 오름' : '↓ 내림');
    dir.onclick = () => { state.sorts[idx].dir = s.dir === 'asc' ? 'desc' : 'asc'; render(); };
    row.appendChild(dir);

    // 순서 이동
    const up = el('button', 'mi-del', '▲');
    up.disabled = idx === 0;
    up.onclick = () => { const a = state.sorts; [a[idx - 1], a[idx]] = [a[idx], a[idx - 1]]; render(); };
    const down = el('button', 'mi-del', '▼');
    down.disabled = idx === state.sorts.length - 1;
    down.onclick = () => { const a = state.sorts; [a[idx + 1], a[idx]] = [a[idx], a[idx + 1]]; render(); };
    row.append(up, down);

    if (state.sorts.length > 1) {
      const rm = el('button', 'mi-del', '×');
      rm.onclick = () => { state.sorts.splice(idx, 1); render(); };
      row.appendChild(rm);
    }
    panel.appendChild(row);
  });

  const addBtn = el('button', 'primary', '+ 정렬 기준 추가');
  addBtn.onclick = () => {
    const used = new Set(state.sorts.map((s) => s.key));
    const next = (SORT_FIELDS.find(([v]) => !used.has(v)) || SORT_FIELDS[0])[0];
    state.sorts.push({ key: next, dir: 'asc' });
    render();
  };
  panel.appendChild(addBtn);
  return panel;
}

// ---------- 고급 필터 패널 ----------
function renderAdvancedFilterPanel() {
  const panel = el('div', 'manage');
  panel.appendChild(el('div', 'manage-title', '고급 필터'));
  const issues = (state.data && state.data.issues) || [];

  // 다중 체크박스 그룹 헬퍼
  const checkGroup = (title, values, selArr, onToggle) => {
    if (!values.length) return;
    const sec = el('div', 'adv-sec');
    sec.appendChild(el('div', 'adv-sec-title', title));
    const wrap = el('div', 'adv-chips');
    for (const v of values) {
      const lab = el('label', 'adv-chip' + (selArr.includes(v) ? ' on' : ''));
      const cb = el('input');
      cb.type = 'checkbox';
      cb.checked = selArr.includes(v);
      cb.onchange = () => onToggle(v, cb.checked);
      lab.append(cb, document.createTextNode(' ' + v));
      wrap.appendChild(lab);
    }
    sec.appendChild(wrap);
    panel.appendChild(sec);
  };

  const uniq = (arr) => [...new Set(arr)].sort((a, b) => String(a).localeCompare(String(b)));
  const priorities = uniq(issues.map((i) => i.priority).filter(Boolean));
  const types = uniq(issues.map((i) => i.type).filter(Boolean));
  // 라벨: 현재 로드된 이슈에 실제로 달린 라벨만 후보로
  const labels = uniq(issues.flatMap((i) => i.labels || []));

  const toggle = (arrName) => (v, on) => {
    const arr = state[arrName];
    state[arrName] = on ? [...arr, v] : arr.filter((x) => x !== v);
    render();
  };
  checkGroup('우선순위', priorities, state.priorityFilter, toggle('priorityFilter'));
  checkGroup('유형', types, state.typeFilter, toggle('typeFilter'));
  checkGroup('라벨', labels, state.labelFilter, toggle('labelFilter'));

  // 토글류
  const sec = el('div', 'adv-sec');
  const mk = (label, key) => {
    const lab = el('label', 'adv-chip' + (state[key] ? ' on' : ''));
    const cb = el('input');
    cb.type = 'checkbox';
    cb.checked = state[key];
    cb.onchange = () => { state[key] = cb.checked; render(); };
    lab.append(cb, document.createTextNode(' ' + label));
    return lab;
  };
  const wrap = el('div', 'adv-chips');
  wrap.append(mk('지연만 (마감 지남·미완료)', 'overdueOnly'), mk('내 이슈만', 'mineOnly'));
  sec.appendChild(wrap);
  panel.appendChild(sec);

  // 고급 필터 초기화
  const resetBtn = el('button', 'tb-reset', '고급 필터 초기화');
  resetBtn.onclick = () => {
    state.priorityFilter = []; state.typeFilter = []; state.labelFilter = [];
    state.overdueOnly = false; state.mineOnly = false; render();
  };
  panel.appendChild(resetBtn);
  return panel;
}

// ---------- 테이블(리스트) 뷰 ----------
const TABLE_COLS = [
  { key: 'color', label: '', w: 28, fixed: true, cell: (it) => { const d = el('span', 'tbl-dot'); d.style.background = state.colors[it.key] || statusColor(it); return d; } },
  { key: 'key', label: '키', w: 90, cell: (it) => { const e = el('span', 'link', it.key); e.style.cursor = 'pointer'; e.onclick = () => openIssue(it.key); return e; } },
  { key: 'summary', label: '요약', w: 300, text: (it) => it.summary || '' },
  { key: 'type', label: '유형', w: 90, text: (it) => it.type || '' },
  { key: 'status', label: '상태', w: 100, text: (it) => it.status || '' },
  { key: 'assignee', label: '담당자', w: 120, text: (it) => it.assigneeName || '미지정' },
  { key: 'priority', label: '우선순위', w: 90, text: (it) => it.priority || '' },
  { key: 'start', label: '시작', w: 110, text: (it) => it.start || '' },
  { key: 'due', label: '마감', w: 110, text: (it) => it.due || '', overdue: true },
  { key: 'progress', label: '진척도', w: 80, text: (it) => (it.progress != null ? `${it.progress}%` : '') },
];

function renderTable(issues) {
  const wrap = el('div', 'table-wrap');
  const tbl = el('table', 'issue-table');
  const colW = (c) => state.tableColW[c.key] || c.w;
  tbl.style.width = TABLE_COLS.reduce((s, c) => s + colW(c), 0) + 'px';

  // colgroup으로 너비 제어
  const cg = el('colgroup');
  const colEls = {};
  for (const c of TABLE_COLS) {
    const col = document.createElement('col');
    col.style.width = colW(c) + 'px';
    colEls[c.key] = col;
    cg.appendChild(col);
  }
  tbl.appendChild(cg);

  // 헤더 + 리사이즈 핸들
  const thead = el('thead');
  const htr = el('tr');
  for (const c of TABLE_COLS) {
    const th = el('th', null, c.label);
    if (!c.fixed) {
      const grip = el('span', 'col-resize');
      grip.onmousedown = (downEv) => {
        downEv.preventDefault();
        const startX = downEv.clientX;
        const startW = colW(c);
        const move = (ev) => {
          const nw = Math.max(40, startW + (ev.clientX - startX));
          state.tableColW[c.key] = nw;
          colEls[c.key].style.width = nw + 'px';
          tbl.style.width = TABLE_COLS.reduce((s, x) => s + colW(x), 0) + 'px';
        };
        const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
      };
      th.appendChild(grip);
    }
    htr.appendChild(th);
  }
  thead.appendChild(htr);
  tbl.appendChild(thead);

  const today = todayStr();
  const tbody = el('tbody');
  for (const it of issues) {
    const tr = el('tr');
    const overdue = it.due && it.due < today && it.statusCategory !== 'done';
    for (const c of TABLE_COLS) {
      const td = el('td', c.overdue && overdue ? 'tbl-overdue' : null);
      if (c.cell) td.appendChild(c.cell(it));
      else td.textContent = c.text(it);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  tbl.appendChild(tbody);
  wrap.appendChild(tbl);
  return wrap;
}

// 타임라인 우하단 떠있는 확대/축소 컨트롤
function renderZoomFloat() {
  const box = el('div', 'zoom-float');
  const setScale = (s) => { state.zoomScale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, s)); render(true); };
  const outBtn = el('button', 'zoom-btn', '−');
  outBtn.title = '축소';
  outBtn.onclick = () => setScale(state.zoomScale / 1.25);
  const inBtn = el('button', 'zoom-btn', '+');
  inBtn.title = '확대';
  inBtn.onclick = () => setScale(state.zoomScale * 1.25);
  box.append(outBtn, inBtn);
  return box;
}

// ---------- 메인 렌더 ----------
function render(restoreScroll) {
  const prevScroll = restoreScroll ? null : (document.querySelector('.timeline-wrap')?.scrollLeft);
  root().innerHTML = '';
  root().appendChild(renderToolbar());

  const panel = renderManagePanel();
  panel.style.display = 'none';
  document.getElementById('manage-btn').onclick = () => {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  };
  root().appendChild(panel);

  // 필터 저장 패널 (toolbar의 '필터 저장' 버튼으로 토글 — 열 때마다 최신 JQL로 다시 그림)
  let sfPanel = renderSaveFilterPanel();
  sfPanel.style.display = 'none';
  root().appendChild(sfPanel);
  document.getElementById('save-filter-btn').onclick = () => {
    if (sfPanel.style.display !== 'none') { sfPanel.style.display = 'none'; return; }
    const fresh = renderSaveFilterPanel();
    sfPanel.replaceWith(fresh);
    sfPanel = fresh;
    sfPanel.style.display = 'block';
  };

  // 프리셋 패널 (toolbar '프리셋' 버튼으로 토글)
  const prPanel = renderPresetPanel();
  prPanel.style.display = 'none';
  root().appendChild(prPanel);
  document.getElementById('preset-btn').onclick = () => {
    prPanel.style.display = prPanel.style.display === 'none' ? 'block' : 'none';
  };

  // 정렬 패널 (state.sortOpen 동안 열린 상태 유지)
  if (state.sortOpen) root().appendChild(renderSortPanel());

  // 고급 필터 패널 (state.advOpen에 따라 표시 — 필터 변경 후에도 열린 상태 유지)
  if (state.advOpen) root().appendChild(renderAdvancedFilterPanel());

  const d = state.data;
  if (!d || !d.issues || d.issues.length === 0) {
    const meta = d && d.startFieldId ? `시작일 필드: ${d.startFieldId}` : '';
    const who = (state.assigneeIds.length || state.includeUnassigned) ? '선택한 담당자의 ' : '';
    root().appendChild(el('div', 'empty', `${who}조건에 맞고 마감일(duedate)이 설정된 이슈가 없습니다. ${meta}`));
    return;
  }

  const shown = sortIssues(statusFiltered(d.issues));
  if (shown.length === 0) {
    root().appendChild(el('div', 'empty', '선택한 필터 조건에 해당하는 이슈가 없습니다.'));
    return;
  }

  if (state.layout === 'table') {
    root().appendChild(renderTable(shown));
    return;
  }

  // 타임라인 + 우하단 떠있는 확대/축소 컨트롤
  const area = el('div', 'timeline-area');
  area.appendChild(renderTimeline({ ...d, issues: shown }));
  area.appendChild(renderZoomFloat());
  root().appendChild(area);
  if (prevScroll != null) {
    const w = document.querySelector('.timeline-wrap');
    if (w) w.scrollLeft = prevScroll;
  } else {
    scrollToToday();
  }
}

// 이슈를 에픽별로 그룹핑 → [{epicKey, epicName, issues:[]}]
// 그룹 결과 통일 형태: { id(접힘키), name, issues }
function groupByEpic(issues) {
  const map = new Map();
  for (const it of issues) {
    const k = it.epicKey || '__none__';
    if (!map.has(k)) {
      map.set(k, { id: `epic:${k}`, name: it.epicName || (it.epicKey ? it.epicKey : '에픽 없음'), issues: [] });
    }
    map.get(k).issues.push(it);
  }
  return [...map.values()];
}

function groupByAssignee(issues) {
  const map = new Map();
  for (const it of issues) {
    const k = it.assigneeId || '__none__';
    if (!map.has(k)) {
      map.set(k, { id: `asg:${k}`, name: it.assigneeName || '미지정', issues: [] });
    }
    map.get(k).issues.push(it);
  }
  // 미지정은 맨 뒤로, 나머지는 이름순
  return [...map.values()].sort((a, b) =>
    a.name === '미지정' ? 1 : b.name === '미지정' ? -1 : a.name.localeCompare(b.name)
  );
}

function barClass(it) {
  if (it.statusCategory === 'done') return 'bar done';
  if (it.statusCategory === 'new') return 'bar new';
  return 'bar'; // indeterminate = 진행
}

// 이슈 툴팁 기본 항목(불릿) — 간략 일감 정보. 호출부에서 클릭/드래그 안내 추가
function issueTooltipBase(it) {
  const tip = [`${it.key}${it.summary ? ' · ' + it.summary : ''}`];
  if (it.type) tip.push(`• 유형: ${it.type}`);
  tip.push(`• 상태: ${it.status || '-'}`);
  tip.push(`• 담당자: ${it.assigneeName || '미지정'}`);
  if (it.start || it.due) tip.push(`• 기간: ${it.start || it.due} ~ ${it.due || it.start}`);
  if (it.blockedBy && it.blockedBy.length) tip.push(`• 🔗 차단 요소: ${it.blockedBy.join(', ')}`);
  return tip;
}

// 상태 범주 기본 색
function statusColor(it) {
  return it.statusCategory === 'done' ? '#36b37e'
    : it.statusCategory === 'new' ? '#8993a4' : '#4c9aff';
}

// 이슈 색상 저장/해제 후 재렌더
async function applyIssueColor(key, color) {
  try {
    const r = await invoke('setIssueColor', { key, color: color || '' });
    if (r && r.error) { showError(new Error(r.error)); return; }
    state.colors = (r && r.colors) || state.colors;
    render();
  } catch (e) { showError(e); }
}

// 이슈 색상 지정 컨트롤 (네이티브 컬러 입력 + 기본색 해제)
function makeColorControl(it) {
  const wrap = el('span', 'row-color');
  const cur = state.colors[it.key];
  const inp = el('input', 'color-input');
  inp.type = 'color';
  inp.value = cur || statusColor(it);
  inp.title = '이슈 색상 지정';
  inp.onclick = (ev) => ev.stopPropagation();
  inp.onchange = () => applyIssueColor(it.key, inp.value);
  wrap.appendChild(inp);
  if (cur) {
    const reset = el('button', 'color-reset', '×');
    reset.title = '기본색으로 되돌리기';
    reset.onclick = (ev) => { ev.stopPropagation(); applyIssueColor(it.key, null); };
    wrap.appendChild(reset);
  }
  return wrap;
}

function renderTimeline({ issues, rangeStart, totalDays }) {
  const W = colW();
  const wrap = el('div', 'timeline-wrap');
  const tl = el('div', 'timeline');
  tl.style.setProperty('--col-w', `${W}px`);

  const days = [];
  for (let i = 0; i < totalDays; i++) days.push(fmt(addDays(parse(rangeStart), i)));

  // ----- 헤더 -----
  const headRow = el('div', 'head-row');
  headRow.appendChild(el('div', 'head-label'));
  const headDays = el('div', 'head-days');
  let prevMonth = null;
  days.forEach((ds, i) => {
    const d = parse(ds);
    const { isWeekend, holidayName } = dayMeta(ds);
    const cell = el('div', 'day-head' + (holidayName ? ' holiday' : isWeekend ? ' weekend' : ''));
    if (holidayName) cell.title = holidayName;
    // 줌에 따라 일자 표시 밀도 조절
    if (state.zoom === 'week') {
      const dow = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
      cell.appendChild(el('div', 'dow', dow));
      cell.appendChild(el('div', 'dom', String(d.getDate())));
    } else if (state.zoom === 'month') {
      // 월요일에만 일자 표시
      if (d.getDay() === 1) cell.appendChild(el('div', 'dom', String(d.getDate())));
    }
    // quarter: 일자 미표시(월 라벨만)
    const mk = d.getMonth();
    if (mk !== prevMonth) {
      const mh = el('div', 'month-head', `${d.getFullYear()}.${pad(mk + 1)}`);
      mh.style.left = `${i * W}px`;
      headDays.appendChild(mh);
      prevMonth = mk;
    }
    headDays.appendChild(cell);
  });
  headRow.appendChild(headDays);
  tl.appendChild(headRow);

  // ----- 본문 -----
  const rows = el('div', 'rows');

  // 배경 컬럼(주말/공휴일)
  const bg = el('div', 'bg-cols');
  days.forEach((ds) => {
    const { isWeekend, holidayName } = dayMeta(ds);
    bg.appendChild(el('div', 'bg-col' + (holidayName ? ' holiday' : isWeekend ? ' weekend' : '')));
  });
  rows.appendChild(bg);

  // 오늘 세로선
  const today = todayStr();
  const tOff = dayDiff(rangeStart, today);
  if (tOff >= 0 && tOff < totalDays) {
    const line = el('div', 'today-line');
    line.style.left = `${tOff * W}px`;
    rows.appendChild(line);
  }

  // 버전(릴리스) 마일스톤 수직선
  if (state.showVersions) {
    for (const v of state.versions) {
      const off = dayDiff(rangeStart, v.releaseDate);
      if (off < 0 || off >= totalDays) continue;
      const vline = el('div', 'ver-line');
      vline.style.left = `${off * W}px`;
      vline.title = `🏁 ${v.name} (${v.releaseDate})`;
      vline.appendChild(el('div', 'ver-tag', `🏁 ${v.name}`));
      rows.appendChild(vline);
    }
  }

  const trackW = days.length * W;

  // 이슈 막대 행 생성 (depth = 들여쓰기 단계, opts.caret = 펼침/접힘 토글)
  function makeIssueRow(it, depth, opts) {
    opts = opts || {};
    const row = el('div', 'row');
    const label = el('div', 'row-label issue-label clickable');
    label.style.paddingLeft = `${8 + depth * 18}px`;
    if (opts.caret) {
      const c = el('span', 'caret', opts.collapsed ? '▶' : '▼');
      c.onclick = (ev) => { ev.stopPropagation(); opts.onToggle(); };
      label.appendChild(c);
    }
    label.appendChild(makeColorControl(it));
    if (it.assigneeAvatar) {
      const av = el('img', 'row-avatar');
      av.src = it.assigneeAvatar;
      av.alt = it.assigneeName || '';
      av.title = it.assigneeName || '';
      label.appendChild(av);
    }
    label.appendChild(el('span', 'key', it.key));
    label.appendChild(el('span', 'sum link', it.summary || ''));
    if (it.blockedBy && it.blockedBy.length) {
      const blk = el('span', 'row-blocked', '🔗');
      blk.title = `차단 요소: ${it.blockedBy.join(', ')}`;
      label.appendChild(blk);
    }
    label.title = issueTooltipBase(it).concat('• 클릭: 이슈 열기').join('\n');
    label.onclick = () => openIssue(it.key);

    // 이 이슈 날짜로 타임라인 스크롤 (이슈 열기와 구분 위해 stopPropagation)
    const goBtn = el('button', 'row-goto', '📅');
    goBtn.title = '이 이슈 날짜로 이동';
    goBtn.onclick = (ev) => { ev.stopPropagation(); scrollToDate(it.start || it.due); };
    label.appendChild(goBtn);
    row.appendChild(label);

    const track = el('div', 'row-track');
    track.style.width = `${trackW}px`;
    const s = it.start && it.start >= rangeStart ? it.start : it.due;
    const e = it.due || it.start;
    if (s && e) {
      const offset = Math.max(0, dayDiff(rangeStart, s));
      const span = Math.max(1, dayDiff(s, e) + 1);
      // 지연 여부(마감 지남 & 미완료)
      const overdue = it.due && it.due < todayStr() && it.statusCategory !== 'done';
      const bar = el('div', barClass(it) + (overdue ? ' overdue' : '') + ' clickable');
      bar.style.left = `${offset * W + 1}px`;
      bar.style.width = `${span * W - 2}px`;
      // 진척도 채우기(반투명 흰색 오버레이)
      if (typeof it.progress === 'number' && it.progress > 0) {
        const pf = el('div', 'bar-prog');
        pf.style.width = `${Math.min(100, it.progress)}%`;
        bar.appendChild(pf);
      }
      // 바 라벨: TASK 이름(요약) + 담당자. 좁으면 CSS로 클립.
      const lab = el('span', 'bar-label', it.summary || it.key);
      if (it.assigneeName) lab.appendChild(el('span', 'bar-asg', ' · ' + it.assigneeName));
      bar.appendChild(lab);
      if (state.colors[it.key]) {
        // 사용자 지정 색. 흰색/검정만 글자색 대응(흰 배경에 흰 글씨 방지)
        const c = state.colors[it.key];
        bar.style.background = c;
        const lc = c.toLowerCase();
        if (lc === '#ffffff' || lc === '#fff') bar.style.color = '#172b4d';
        else if (lc === '#000000' || lc === '#000') bar.style.color = '#fff';
      }
      const tip = issueTooltipBase(it);
      if (typeof it.progress === 'number') tip.push(`• 진척도: ${it.progress}%`);
      if (overdue) tip.push('• ⚠ 지연됨');
      tip.push('• 클릭: 이슈 열기 · 드래그: 양끝=기간, 가운데=이동');
      bar.title = tip.join('\n');
      // 양끝 + 본체 드래그 핸들 (기간 조절 / 이동)
      const hL = el('div', 'bar-handle left');
      const hR = el('div', 'bar-handle right');
      bar.appendChild(hL);
      bar.appendChild(hR);
      attachDrag(bar, hL, hR, it, W);
      track.appendChild(bar);
    }
    row.appendChild(track);
    rows.appendChild(row);
  }

  if (state.view === 'flat') {
    // 평면: 모든 이슈를 한 줄씩
    issues.forEach((it) => makeIssueRow(it, 0));
  } else if (state.view === 'tree') {
    // 계층: 부모(epicKey) 기준 트리. 부모가 결과셋에 있으면 그 아래로 들여쓰기.
    const byKey = new Map(issues.map((i) => [i.key, i]));
    const childMap = new Map();
    const roots = [];
    for (const it of issues) {
      const pk = it.epicKey;
      if (pk && byKey.has(pk)) {
        if (!childMap.has(pk)) childMap.set(pk, []);
        childMap.get(pk).push(it);
      } else {
        roots.push(it);
      }
    }
    const walk = (it, depth) => {
      const kids = childMap.get(it.key) || [];
      const collapsed = !!state.collapsed[it.key];
      makeIssueRow(it, depth, kids.length ? {
        caret: true, collapsed,
        onToggle: () => { state.collapsed[it.key] = !collapsed; render(); },
      } : {});
      if (!collapsed) for (const k of kids) walk(k, depth + 1);
    };
    roots.forEach((r) => walk(r, 0));
  } else {
    // 그룹 보기: 담당자/에픽/우선순위/유형/라벨/마감버킷
    const groups =
      state.view === 'assignee' ? groupByAssignee(issues) :
      state.view === 'priority' ? groupByPriority(issues) :
      state.view === 'type' ? groupByType(issues) :
      state.view === 'label' ? groupByLabel(issues) :
      state.view === 'duebucket' ? groupByDueBucket(issues) :
      groupByEpic(issues);
    for (const g of groups) {
      const isCollapsed = !!state.collapsed[g.id];
      const grow = el('div', 'row group-row');
      const glabel = el('div', 'row-label group-label');
      glabel.appendChild(el('span', 'caret', isCollapsed ? '▶' : '▼'));
      glabel.appendChild(el('span', 'epic-name', g.name));
      glabel.appendChild(el('span', 'epic-count', `(${g.issues.length})`));
      // 그룹 진행률 바 (완료 비율)
      const doneN = g.issues.filter((it) => it.statusCategory === 'done').length;
      const pct = Math.round((doneN / g.issues.length) * 100);
      const prog = el('span', 'grp-prog');
      prog.title = `완료 ${doneN}/${g.issues.length} (${pct}%)`;
      const fill = el('span', 'grp-prog-fill');
      fill.style.width = `${pct}%`;
      prog.appendChild(fill);
      glabel.appendChild(prog);
      glabel.onclick = () => { state.collapsed[g.id] = !state.collapsed[g.id]; render(); };
      grow.appendChild(glabel);
      const gtrack = el('div', 'row-track');
      gtrack.style.width = `${trackW}px`;
      grow.appendChild(gtrack);
      rows.appendChild(grow);
      if (isCollapsed) continue;
      g.issues.forEach((it) => makeIssueRow(it, 1));
    }
  }

  tl.appendChild(rows);
  wrap.appendChild(tl);
  return wrap;
}

// 바 드래그: 왼끝(시작일)·오른끝(마감일)·본체(이동)
function attachDrag(bar, hL, hR, it, W) {
  const s0 = it.start && it.start >= state.data.rangeStart ? it.start : it.due;
  const e0 = it.due || it.start;
  if (!s0 || !e0) return;

  const start = (mode) => (downEv) => {
    downEv.preventDefault();
    downEv.stopPropagation();
    const startX = downEv.clientX;
    const baseLeft = parseFloat(bar.style.left) || 0;
    const baseWidth = parseFloat(bar.style.width) || W;
    let moved = false;
    let dDays = 0;
    bar.classList.add('dragging');

    const move = (ev) => {
      const dx = ev.clientX - startX;
      dDays = Math.round(dx / W);
      if (Math.abs(dx) > 3) moved = true;
      if (mode === 'move') {
        bar.style.left = `${baseLeft + dDays * W}px`;
      } else if (mode === 'left') {
        const nl = baseLeft + dDays * W;
        const nw = baseWidth - dDays * W;
        if (nw >= W) { bar.style.left = `${nl}px`; bar.style.width = `${nw}px`; }
      } else { // right
        const nw = baseWidth + dDays * W;
        if (nw >= W) bar.style.width = `${nw}px`;
      }
    };

    const up = async () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      bar.classList.remove('dragging');

      if (!moved || dDays === 0) {
        // 단순 클릭 → 이슈 열기 / 드래그 없음 → 원위치 복원
        bar.style.left = `${baseLeft}px`;
        bar.style.width = `${baseWidth}px`;
        if (!moved) openIssue(it.key);
        return;
      }

      let nStart = s0, nDue = e0;
      if (mode === 'move') { nStart = fmt(addDays(parse(s0), dDays)); nDue = fmt(addDays(parse(e0), dDays)); }
      else if (mode === 'left') { nStart = fmt(addDays(parse(s0), dDays)); if (nStart > nDue) nStart = nDue; }
      else { nDue = fmt(addDays(parse(e0), dDays)); if (nDue < nStart) nDue = nStart; }

      await commitDates(it, nStart, nDue);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  hL.addEventListener('mousedown', start('left'));
  hR.addEventListener('mousedown', start('right'));
  bar.addEventListener('mousedown', start('move'));
}

async function commitDates(it, nStart, nDue) {
  const startFieldId = state.data && state.data.startFieldId;
  try {
    const r = await invoke('updateIssueDates', {
      key: it.key, start: nStart, due: nDue, startFieldId,
    });
    if (r && r.error) { showError(new Error(r.error)); return; }
    // 로컬 반영 후 재렌더
    it.start = nStart;
    it.due = nDue;
    render();
    if (nStart !== nDue && !startFieldId) {
      showError(new Error('시작일 필드가 없어 마감일만 반영됐습니다.'));
    }
  } catch (e) {
    showError(e);
  }
}

function scrollToToday() { scrollToDate(todayStr()); }

// 특정 날짜가 화면 중앙에 오도록 타임라인 가로 스크롤
function scrollToDate(dateStr) {
  const wrap = document.querySelector('.timeline-wrap');
  const d = state.data;
  if (!wrap || !d || !d.rangeStart || !dateStr) return;
  const off = dayDiff(d.rangeStart, dateStr);
  const x = off * colW() - wrap.clientWidth / 2;
  wrap.scrollLeft = Math.max(0, x);
}

main();
