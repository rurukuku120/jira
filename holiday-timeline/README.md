# 커스텀 타임라인 (Jira Forge 앱)

Jira Cloud 프로젝트에 **자체 타임라인 페이지**를 추가하고, **한국 공휴일**을
타임라인 위에 **빨간색 컬럼**으로 표시하는 Forge 앱입니다.
저장된 필터/JQL로 표시할 이슈를 고르고, 공휴일은 공공데이터포털 API에서 자동으로 가져옵니다.

> ⚠️ 중요: Jira의 **기본(네이티브) 타임라인 뷰**는 Forge 확장 지점이 없어 셀 색상을 직접 바꿀 수 없습니다.
> 이 앱은 그 대안으로 `jira:projectPage`에 별도 타임라인 페이지를 그려, 이슈 일정 + 공휴일 빨간 표시를 한 화면에 보여줍니다.

## 동작 방식

```
[프론트(Custom UI)]  view.getContext()로 프로젝트 키 확인, 필터/JQL 선택
        │  invoke('getIssues')              invoke('getHolidays')
        ▼                                          ▼
[백엔드 resolver]   Jira REST(JQL)로 이슈 조회     공공데이터포털 특일정보 API 조회
        │                                          │
        ▼                                          ▼
   { 이슈 + 시작/마감일 }              { 'YYYY-MM-DD': '공휴일명' } (+ 수동 추가 휴일 병합)
        └───────────────► Gantt 렌더, 공휴일/주말 컬럼 빨강·회색 음영 ◄──┘
```

- **공휴일 소스**: 공공데이터포털 **특일 정보**(한국천문연구원) `getRestDeInfo`. 서비스키 필요(아래 설정).
- 주말(토·일)은 회색, 공휴일은 빨간 배경 + 좌측 빨간 라인 + 헤더 빨간 글씨로 강조됩니다.
- 이슈는 `duedate`가 설정된 것만 표시. 시작일은 **자동 감지된 시작일 필드** 또는 생성일을 사용합니다.

### 공휴일 API 키 설정 (필수)
1. https://www.data.go.kr 에서 "특일 정보" (한국천문연구원) 활용신청 → 서비스키 발급
2. **디코딩(Decoding) 키**를 Forge 환경변수로 등록:
   ```bash
   forge variables set --encrypt HOLIDAY_API_KEY <디코딩된_서비스키>
   ```
   (코드에서 `URLSearchParams`로 자동 인코딩하므로 디코딩 키를 넣습니다.)
3. 키가 없으면 공휴일은 비고, 주말 + 수동 추가 휴일만 표시됩니다.

### 이슈 필터 (저장된 필터 + JQL)
- 툴바 **드롭다운**: 사용자가 접근 가능한 저장된 필터(`/rest/api/3/filter/search`) 중 선택 → 해당 필터 JQL로 조회.
- 툴바 **JQL 입력칸**: JQL을 직접 입력하고 Enter → 그 조건으로 조회 (보드/스프린트 조건 등 자유롭게).
- 어떤 경우든 `AND duedate IS NOT EMPTY`가 자동 결합됩니다. 둘 다 비우면 프로젝트 전체.

### 시작일 필드 자동 감지
백엔드 resolver가 `/rest/api/3/field`로 필드 메타를 읽어, 이름이 `Start date / 시작일 / Target start / Planned start` 등에 해당하고
날짜형(`schema.type = date`)인 필드를 자동으로 찾아 시작일로 사용합니다. 못 찾으면 생성일로 폴백하며, 툴바에 감지 결과를 표시합니다.

### 공휴일 수동 추가
툴바의 **휴일 관리** 버튼으로 패널을 열어 날짜 + 휴일명을 추가/삭제할 수 있습니다.
수동 휴일은 **Forge Storage**(`storage:app`)에 저장되어 영구 유지되며, 공공데이터 공휴일과 병합되어 동일하게 빨간색으로 표시됩니다.

## 파일 구조

```
holiday-timeline/
├─ manifest.yml              # 모듈/권한/egress 정의
├─ package.json              # 백엔드 의존성
├─ src/index.js              # resolver: getHolidays, getIssues, listFilters, 수동휴일 CRUD
└─ static/timeline/
   ├─ package.json           # 프론트 빌드(esbuild)
   ├─ copy-assets.mjs        # html/css/icon → dist 복사
   └─ src/
      ├─ index.html
      ├─ app.js              # 타임라인 렌더링 (빌드 엔트리)
      ├─ styles.css          # 공휴일 빨간색 등 스타일
      └─ icon.svg
```

## 배포 방법

```bash
npm install -g @forge/cli   # 최초 1회
forge login

cd holiday-timeline
forge register              # app id가 manifest.yml에 기록됨
forge variables set --encrypt HOLIDAY_API_KEY <디코딩된_서비스키>

npm run install:all
npm run build:ui            # static/timeline/dist 생성

forge deploy
forge install               # Jira Cloud 사이트 선택
```

설치 후 프로젝트 좌측 메뉴에 **커스텀 타임라인** 페이지가 생깁니다.

## 페이지(앱) 제거 방법

- **앱 전체 제거**: `forge uninstall` → 사이트 선택. 좌측 "커스텀 타임라인" 메뉴가 사라집니다.
- **메뉴만 빼고 앱은 유지**: `manifest.yml`에서 `jira:projectPage` 모듈 블록을 삭제 후 `forge deploy`.
- 특정 프로젝트에서만 숨기려면 `jira:projectPage`에 `displayConditions`(프로젝트 속성 기반)를 추가해 조건부 표시.

## 커스터마이징 포인트

| 목적 | 위치 |
|------|------|
| 공휴일 배경색 변경 | `static/timeline/src/styles.css` 의 `--holiday`, `--holiday-line` |
| 하루 컬럼 너비 | `styles.css` `--col-w` + `app.js` 의 `COL_W` (값 일치 필요) |
| 시작일 필드 직접 지정 | `getIssues` 호출에 `startFieldId: 'customfield_xxxxx'` |
| 기본 조회 조건 | `src/index.js` 의 `getIssues` resolver (duedate 결합 로직) |
| 공휴일 외 대체 소스 | `src/index.js` 의 `HOLIDAY_API_BASE` / `fetchMonthHolidays` |

## 참고 / 제약

- 회사 네트워크 정책상 `apis.data.go.kr` egress가 차단되면 공휴일이 비고, 주말 + 수동 추가 휴일만 표시됩니다.
- 특일정보 API는 연·월 단위 조회라 표시 범위가 N년이면 N×12회 호출(Promise.all 병렬). 범위가 매우 넓으면 호출량 주의.
- 이슈는 최대 100건(`maxResults`)까지 조회. 더 필요하면 페이지네이션 추가.
