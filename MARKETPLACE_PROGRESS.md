# 마켓플레이스 출시 준비 — 진행 로그

> 이어서 작업하기 위한 기록. 마지막 업데이트: **2026-06-03**
> 작업 브랜치: **`feat/marketplace-release`** (main 아님 — 안정 버전은 main 유지)

## 목표

"당신의 타임라인(your-timeline)" Forge 앱을 **유료 앱으로 Atlassian Marketplace에 출시**.

## 전체 단계 & 상태

| # | 단계 | 상태 |
|---|------|------|
| 1 | 라이선스 검증 (manifest + 백엔드 + 프론트엔드) | ✅ **완료 (커밋됨)** |
| 2 | EULA — 약관 경로 결정 + 설정 문서 | ✅ **완료 (커밋됨)** |
| 3 | LISTING.md (리스팅 문구·가격·스크린샷 체크리스트) | ⏳ 예정 |
| 4 | 심사 제출 전 점검 체크리스트 | ⏳ 예정 |
| 5 | 빌드·배포·심사 제출 (포털에서 직접) | ⏳ 예정 |

---

## ✅ 1단계 완료 내용 — 라이선스 검증 (정책: 읽기 허용 / 쓰기 차단)

- **manifest.yml**: `app.licensing.enabled: true` 추가
- **백엔드 `src/index.js`**: `isUnlicensed(req)` 가드 추가 → 쓰기 리졸버 8개 차단
  (`addCustomHoliday`, `removeCustomHoliday`, `savePreset`, `deletePreset`,
  `saveFilter`, `updateIssueDates`, `setIssueColor`, `setTitle`)
- **프론트 `static/timeline/src/app.js`**: `state.licensed` 판정(`context.license.active`),
  읽기전용 상단 배너(`renderLicenseBanner`), 토스트(`toast`), 쓰기 진입점마다 `ensureLicensed()` 가드.
  드래그는 클릭(이슈 열기)은 유지하고 날짜 편집만 차단(막대 원위치 복원).
- **`static/timeline/src/styles.css`**: 배너·토스트 스타일 추가. `dist/` 재빌드 완료(esbuild).
- ⚠️ **license는 프로덕션+마켓플레이스 등록 앱에서만 존재**. 개발/터널/미등록 환경은 `undefined` →
  게이트 미적용(개발·테스트 영향 없음). `active === false`일 때만 쓰기 차단.
- 프론트 배너 CTA 링크 `LISTING_URL`은 현재 `https://marketplace.atlassian.com/` 플레이스홀더.
  **TODO: 실제 리스팅 URL 생성 후 교체** (`app.js` 상단 상수).

## ✅ 2단계 완료 내용 — EULA

- **결정: Atlassian 표준 EULA(Bonterms) 채택** (자체 EULA 직접 작성 대신).
  개인 개발자 법적 리스크 최소화 목적.
- `EULA.md`에 **표준 약관 채택 절차 + 〔붙여넣기용〕 Provider Specific Terms** 정리.
  자체 EULA 전문은 하단에 "참고용/대안"으로 보존.
- 마켓플레이스 설정: 앱 버전 → **Links 탭 → 표준 약관 "Yes" → Provider Specific Terms 붙여넣기**.
- 준거법: **대한민국**. 공급자: **개인 개발자(cukirang)**. (둘 다 사용자 확정)

---

## ⚠️ 미결정 / 블로커 (다음에 결정 필요)

1. **Gmail 주소 문제 (중요)** — Atlassian 공식 기준:
   > "Personal or generic domains (like Gmail or Yahoo) are not permitted for **paid-via-Atlassian** apps."
   - 현재 PRIVACY.md / EULA.md 연락처가 `cukirang@gmail.com` (이전엔 `cukirang@nexon.co.kr`).
   - **유료(Atlassian 결제 대행) 출시 시 비-Gmail 회사/커스텀 도메인 이메일 필요.**
   - 선택지: (a) 회사/커스텀 도메인으로 교체, (b) 우선 무료로 출시 후 도메인 준비되면 유료 전환.
   - → 사용자: **"아직 결정 못함"**. 결정 후 PRIVACY.md·EULA.md 연락처 일괄 교체.

2. **결제 모델** — Paid via Atlassian vs Paid via Partner. 1번과 직결.

3. **DPA(데이터 처리 계약)** — GDPR 데이터 처리자면 조건부 필수. 이 앱은 PII 미저장이라
   노출 낮음. EU 고객 대상 시 표준 약관에 DPA 링크 첨부 검토.

---

## ⏳ 다음 작업 (이어서 시작할 지점)

- **3단계: `LISTING.md` 작성** — 리스팅 제목·요약·상세 설명·하이라이트·카테고리·가격·스크린샷
  목록/캡션 체크리스트. (포털 입력은 사용자가 직접, 문구·체크리스트는 여기서 준비)
- **4단계: 심사 제출 전 점검 체크리스트** — 개인정보 처리방침 공개 URL, EULA 설정,
  보안 워크플로(security tab), 파트너 검증 티켓, 마케팅 자산(로고/배너/스크린샷),
  Marketplace Partner Agreement 동의 등.

## 참고 — 확정해야 할 TODO 모음

- [ ] 연락처 이메일 비-Gmail 도메인으로 교체 (결제 모델 결정 후) — PRIVACY.md, EULA.md
- [ ] `app.js`의 `LISTING_URL`을 실제 리스팅 URL로 교체
- [ ] 라이선스 게이트 실동작 검증 (dev 환경 `forge install --license active/inactive` 시뮬레이션 또는 프로덕션)
- [ ] README의 공휴일 API 설명이 옛 "공공데이터포털"로 남아 있음 → 실제 코드(Nager.Date)와 불일치, 정리 필요

## 공식 문서 레퍼런스

- 표준 맞춤형 EULA 채택: https://developer.atlassian.com/platform/marketplace/list-customizable-end-user-agreement/
- 표준 EULA 원문: https://www.atlassian.com/legal/end-user-agreement
- 앱 심사 가이드라인: https://developer.atlassian.com/platform/marketplace/app-approval-guidelines/
- Forge 라이선싱: Marketplace 리스팅 문서의 licensing 섹션 (`app.licensing.enabled`, `context.license.active`)

## 재개 방법

```bash
git checkout feat/marketplace-release
git log --oneline -5          # 진행 커밋 확인
# 프론트 빌드가 필요하면:
cd your-timeline/static/timeline && npm run build
```
