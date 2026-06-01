import StudyRecordModal from "./components/Modal/StudyRecordModal";

export default function App() {
  return (
    <>
      <StudyRecordModal
        month={5}
        day={15}
        time="10:00"
        studyTime="2시간"
        studyContent="React 컴포넌트 설계"
        memo={["importante note"]}
      />
    </>
  );
}
