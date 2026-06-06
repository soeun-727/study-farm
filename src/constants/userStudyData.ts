import type { WeeklyRecords } from "../components/myStudyFarm/myWeeklyStudies";

export const mockWeeklyRecords: WeeklyRecords = {
  월: [
    {
      startTime: "09:00",
      content: "알고리즘 문제 풀이",
      studyTime: "2시간 30분",
      memo: [
        "백준 실버 레벨 3문제 성공",
        "프로그래머스 고득점 키트 - 해시 파트 완료",
        "틀린 문제는 내일 다시 풀기",
      ],
    },
    {
      startTime: "14:00",
      content: "토익 LC 기출",
      studyTime: "1시간 20분",
      memo: [
        "Part 3, 4 실전 모의고사 1회 풀이",
        "영국식 발음 연음 파트 섀도잉 연습",
        "오답 단어장 정리 필수",
      ],
    },
    {
      startTime: "19:30",
      content: "스프링 부트 입문",
      studyTime: "3시간 0분",
      memo: [
        "섹션 3. 의존성 주입(DI) 개념 강의 수강",
        "인텔리제이 실습 환경 세팅 완료 및 테스트 코드 구동",
      ],
    },
  ],
  화: [
    {
      startTime: "10:30",
      content: "",
      studyTime: "1시간 0분",
      memo: ["오전 집중 자습 시간", "따로 정해둔 과목 없이 밀린 복습 진행"],
    },
    {
      startTime: "15:00",
      content: "데이터베이스 설계",
      studyTime: "2시간 10분",
      memo: [
        "1차, 2차, 3차 정규화(Normalization) 이론 학습",
        "ERD 클라우드 툴로 가상 쇼핑몰 테이블 구조 설계 실습",
      ],
    },
  ],
  수: [
    {
      // 수요일 기록
      startTime: "13:00",
      content: "리액트 컴포넌트 리팩토링",
      studyTime: "4시간 15분",
      memo: [
        "중복 코드가 많던 Profile 영역 구조 분해 할당으로 가독성 개선",
        "TypeScript strict 모드 기준 위반 선언부 전면 교체 완료",
        "모달 연동 및 Props 흐름 정비",
      ],
    },
  ],
  금: [
    {
      startTime: "19:00",
      content: "코딩테스트 스터디",
      studyTime: "2시간 0분",
      memo: [
        "디스코드 조별 스터디 참여",
        "이번 주 주제: DFS / BFS 실전 응용 문제 풀이 공유",
        "조원들 풀이 코드 리뷰 피드백 기록",
      ],
    },
    {
      startTime: "22:00",
      content: "오답 노트 정리",
      studyTime: "1시간 30분",
      memo: [
        "오늘 스터디에서 막혔던 그래프 탐색 예외 케이스 완벽 분석",
        "실수하기 쉬운 런타임 에러 방어 코드 정리",
      ],
    },
  ],
};
