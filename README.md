## 📌협업 규칙

1. 셀프 머지 금지 → 팀원 리뷰 후 머지
2. Git-Flow 전략 사용

   `git flow version`을 통해 Git-flow 자동화 도구 설치되었는지 확인(미설치 시 설치 진행)

   ```bash
   //사용 예시:
   git flow init -d //git flow 사용하도록 초기화(최초 1회 필수)
   git switch develop //develop을 base로 브랜치가 생성되도록
   git flow feature start onboarding //feature/onboarding이 생성됨
   ```

3. PR 템플릿, 이슈 템플릿, 커밋 컨벤션 지키기

   ```bash
   # 커밋 컨벤션
   feat: 새 기능 추가
   fix: 버그 수정
   docs: 문서 수정
   style: 코드 스타일 변경(들여쓰기 등 포맷, 세미콜론 추가)
   refactor: 코드 리팩토링
   test: 테스트 관련 코드 추가 및 수정
   chore: 설정 변경
   ```
