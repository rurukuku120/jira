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
  view: 'tree',           // tree | epic | flat
  assigneeIds: [],        // 선택된 담당자 accountId 배열
  includeUnassigned: false, // '할당되지 않음' 포함 여부
  statusCats: [],         // 상태 범주 필터 (빈 배열=전체). 'new'|'indeterminate'|'done'
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

    const [{ filters }, { title }, asg, col] = await Promise.all([
      invoke('listFilters'),
      invoke('getTitle'),
      invoke('listAssignees', { projectKey: state.projectKey }),
      invoke('getIssueColors'),
    ]);
    state.filters = filters || [];
    state.title = title || '당신의 타임라인';
    state.assignees = (asg && asg.assignees) || [];
    state.colors = (col && col.colors) || {};

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

// 상태 범주 필터 적용
function statusFiltered(issues) {
  if (!state.statusCats.length) return issues;
  return issues.filter((it) => state.statusCats.includes(it.statusCategory));
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

  // 이슈 건수 + 한도 경고 (상태 범주 뒤)
  const d = state.data;
  if (d && d.issues) {
    const total = d.issues.length;
    const shown = statusFiltered(d.issues).length;
    const cnt = el('div', 'tb-count', shown === total ? `${total}건` : `${shown}/${total}건`);
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
  // 보기 방식 (계층/에픽별/평면)
  const viewSel = el('select');
  viewSel.title = '보기 방식';
  for (const [val, label] of [['tree', '계층 보기'], ['epic', '에픽별 그룹'], ['flat', '평면 보기']]) {
    const opt = new Option(label, val);
    if (state.view === val) opt.selected = true;
    viewSel.appendChild(opt);
  }
  viewSel.onchange = () => { state.view = viewSel.value; render(); };
  right.appendChild(viewSel);

  // 줌 버튼 (주/개월/분기)
  const zoomBox = el('div', 'zoom');
  for (const k of ['week', 'month', 'quarter']) {
    const b = el('button', 'zoom-btn' + (state.zoom === k ? ' active' : ''), ZOOM[k].label);
    b.onclick = () => { state.zoom = k; state.zoomScale = 1; render(true); };
    zoomBox.appendChild(b);
  }
  right.appendChild(zoomBox);

  // 오늘로 이동
  const todayBtn = el('button', null, '오늘');
  todayBtn.onclick = () => scrollToToday();
  right.appendChild(todayBtn);

  // 휴일 관리
  const manageBtn = el('button', null, '휴일 관리');
  manageBtn.id = 'manage-btn';
  right.appendChild(manageBtn);

  // 범례
  const legend = el('div', 'legend');
  legend.innerHTML =
    '<span><span class="swatch" style="background:var(--holiday)"></span>공휴일/휴일</span>' +
    '<span><span class="swatch" style="background:var(--weekend)"></span>주말</span>' +
    '<span><span class="swatch" style="background:var(--bar-new)"></span>할 일</span>' +
    '<span><span class="swatch" style="background:var(--bar)"></span>진행 중</span>' +
    '<span><span class="swatch" style="background:var(--bar-done)"></span>완료</span>' +
    '<span><span class="swatch" style="background:#36b37e;width:3px"></span>오늘</span>';
  right.appendChild(legend);

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

  const d = state.data;
  if (!d || !d.issues || d.issues.length === 0) {
    const meta = d && d.startFieldId ? `시작일 필드: ${d.startFieldId}` : '';
    const who = (state.assigneeIds.length || state.includeUnassigned) ? '선택한 담당자의 ' : '';
    root().appendChild(el('div', 'empty', `${who}조건에 맞고 마감일(duedate)이 설정된 이슈가 없습니다. ${meta}`));
    return;
  }

  const shown = statusFiltered(d.issues);
  if (shown.length === 0) {
    root().appendChild(el('div', 'empty', '선택한 상태 범주에 해당하는 이슈가 없습니다.'));
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
function groupByEpic(issues) {
  const map = new Map();
  for (const it of issues) {
    const k = it.epicKey || '__none__';
    if (!map.has(k)) {
      map.set(k, {
        epicKey: it.epicKey,
        epicName: it.epicName || (it.epicKey ? it.epicKey : '에픽 없음'),
        issues: [],
      });
    }
    map.get(k).issues.push(it);
  }
  return [...map.values()];
}

function barClass(it) {
  if (it.statusCategory === 'done') return 'bar done';
  if (it.statusCategory === 'new') return 'bar new';
  return 'bar'; // indeterminate = 진행
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
    label.appendChild(el('span', 'key', it.key));
    label.appendChild(el('span', 'sum link', it.summary || ''));
    label.title = `${it.key} 열기`;
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
      // 바 라벨: 주=요약, 개월=key, 분기=없음(너무 좁음). overflow는 CSS로 클립.
      const barText = state.zoom === 'week' ? (it.summary || it.key) : state.zoom === 'month' ? it.key : '';
      const bar = el('div', barClass(it) + ' clickable', barText);
      bar.style.left = `${offset * W + 1}px`;
      bar.style.width = `${span * W - 2}px`;
      if (state.colors[it.key]) bar.style.background = state.colors[it.key]; // 사용자 지정 색
      bar.title = `${it.key} · ${s} ~ ${e} · ${it.status} (클릭하여 열기 · 양끝/가운데 드래그로 기간 변경)`;
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
    // 에픽별 그룹 (기본 그룹 헤더 + 소속 이슈)
    const groups = groupByEpic(issues);
    for (const g of groups) {
      const isCollapsed = !!state.collapsed[g.epicKey || '__none__'];
      const grow = el('div', 'row group-row');
      const glabel = el('div', 'row-label group-label');
      glabel.appendChild(el('span', 'caret', isCollapsed ? '▶' : '▼'));
      glabel.appendChild(el('span', 'epic-name', g.epicName));
      glabel.appendChild(el('span', 'epic-count', `(${g.issues.length})`));
      glabel.onclick = () => {
        const key = g.epicKey || '__none__';
        state.collapsed[key] = !state.collapsed[key];
        render();
      };
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
