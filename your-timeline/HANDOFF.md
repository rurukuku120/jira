# 당신의 타임라인 (your-timeline) — 작업 인수인계 (HANDOFF)

Jira 프로젝트 페이지에 붙는 커스텀 타임라인(간트 형태) Forge 앱. VSCode + Forge CLI로 이어서 작업하기 위한 요약.
(표시 이름: "당신의 타임라인", 앱/폴더 영문명: `your-timeline`)

## 개요

이슈를 JQL/필터로 조회해 기간 막대로 그린다. 주말·한국 공휴일 배경 강조, 오늘 표시선,
바 드래그로 날짜 편집까지 지원한다.

- 저장소: https://github.com/rurukuku120/Jira (앱 본체는 `your-timeline/` 하위)
- Forge `app.id`는 `manifest.yml`에 고정 → 어느 PC에서 deploy해도 같은 앱에 반영됨

## 디렉터리 구조

```
your-timeline/
├─ manifest.yml                  # 모듈·scope·egress 정의
├─ src/index.js                  # 백엔드 resolver
└─ static/timeline/
   ├─ src/app.js                 # 프론트 (순수 JS DOM, @forge/bridge)
   ├─ src/styles.css             # 스타일
   ├─ copy-assets.mjs            # 빌드 스크립트
   └─ dist/                      # build:ui 결과물 (git 포함)
```

## manifest.yml 핵심

- 모듈: `jira:projectPage` (resolver=resolver, resource=main, layout=native)
- scopes: `read:jira-work`, `write:jira-work`(드래그 편집), `read:jira-user`, `storage:app`
- egress 허용: `date.nager.at` (한국 공휴일 공개 API, 키 불필요)

## 백엔드 resolver (src/index.js)

| 함수 | 역할 |
|------|------|
| `getIssues` | JQL에 `AND duedate IS NOT EMPTY` 붙여 조회. 시작일 필드 자동탐색(`detectStartFieldId`, 없으면 `created` 사용). 부모(epic)·담당자(`assigneeId`/`assigneeName`) 정보 포함 |
| `getHolidays` / `listCustomHolidays` / `addCustomHoliday` / `removeCustomHoliday` | Nager.Date 공휴일 + storage 수동 공휴일 병합/관리 |
| `listFilters` | 사용자 저장 필터 목록 |
| `saveFilter` | 현재 JQL을 `POST /rest/api/3/filter`로 저장 필터 생성. `global=true`면 전역(모든 사용자) 공유 |
| `updateIssueDates` | `PUT /rest/api/3/issue/{key}`로 `duedate` + 시작일 필드 수정 (시작일 필드 없으면 마감일만) |
| `getTitle` / `setTitle` | 페이지 제목 저장/조회 |

## 프론트 (static/timeline/src/app.js)

- 줌: 주 / 개월 / 분기
- 보기 모드: tree(계층) / epic(에픽별) / flat(평면)
- 오늘 표시선: 녹색 `#36b37e` (공휴일 빨강과 구분)
- JQL 입력란: `textarea`, 내용 길이에 맞춰 너비(240~720px)·높이 자동 조절. Enter 실행 / Shift+Enter 줄바꿈
- 담당자 필터: JQL 옆 Jira식 검색+다중선택 피커(`renderAssigneePicker`). 프로젝트 배정가능 사용자(`listAssignees`) 목록 + '할당되지 않음', '적용' 시 서버 재조회(`assignees`/`includeUnassigned` → `assignee IN (...)`). 새 조회 시 초기화
- 필터 저장: 툴바 '필터 저장' 버튼 → 토글 패널(`renderSaveFilterPanel`). 이름+전역 공유 체크 → `saveFilter` 호출, 목록에 추가 후 그 필터로 전환
- 바 드래그: 왼끝=시작일, 오른끝=마감일, 본체=이동 → `attachDrag` / `commitDates`로 Jira 반영

## 배포

```powershell
cd your-timeline
npm run build:ui          # app.js/styles.css → dist 빌드
forge deploy
forge install --upgrade   # 권한 변경 승인 (write:jira-work 추가됨, 최초 1회)
```

다른 PC에서 처음 받을 때:

```powershell
git clone https://github.com/rurukuku120/Jira.git
cd Jira/your-timeline
npm install
cd static/timeline ; npm install ; cd ../..
forge login               # 기존과 동일한 Atlassian 계정
```

## 주의 / 대기 사항

- `write:jira-work` scope가 추가됨 → 첫 배포 후 반드시 `forge install --upgrade`로 권한 재승인.
  안 하면 바 드래그 시 403 권한 오류.
- 시작일 편집은 프로젝트에 시작일 커스텀 필드(Start date 등)가 있을 때만 반영됨. 없으면 마감일만.
- 바 드래그 → Jira 반영 기능은 코드 작성 완료 상태이며, 실배포 검증은 아직. deploy 후 동작 확인 필요.

## 최근 변경 이력

- 표시 이름 "커스텀 타임라인" → "당신의 타임라인", 앱/폴더 영문명 `holiday-timeline` → `your-timeline`으로 변경
- 담당자 필터를 Jira식 검색+다중선택 피커로 개선(`renderAssigneePicker`, `listAssignees`). 서버 측 `assignee IN (...)` 조회
- 담당자 필터 드롭다운 추가(JQL 옆, 클라이언트 측 필터) + `getIssues`에 `assignee` 필드 포함
- 현재 JQL을 Jira 저장 필터로 만드는 기능 추가(`saveFilter` resolver, 전역 공유 옵션). 필터 생성은 기존 `write:jira-work` scope로 시도 — 403 시 `write:filter:jira` 추가 검토
- 오늘 표시선 색 빨강 → 녹색(`#36b37e`), 범례에 "오늘" 항목 추가
- 공휴일/주말 컬럼 왼쪽 굵은 선(box-shadow) 제거, 배경색만 유지
- JQL 입력란을 자동 크기 조절 textarea로 교체
- 바 양끝/본체 드래그로 기간 편집 → 이슈 날짜 반영 (`updateIssueDates` resolver, `write:jira-work`)
