import Button from "../ui/Button";
import lv1farmerVer3Top from "../../assets/characters/lv1farmer_ver3_top.svg";

interface SignUpEndProps {
  onStart: () => void;
}

export default function SignUpEnd({ onStart }: SignUpEndProps) {
  return (
    <div className="flex w-full min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center bg-(--primary-light-brown)">
        <div className="p-8">
          <div className="flex flex-col items-center justify-center">
            <h2 className="typo-h1 py-6">회원가입 완료!</h2>
            <div className="typo-body pb-6">열공농장에 오신 것을 환영해요</div>

            <img
              src={lv1farmerVer3Top}
              alt="만세하는 농부"
              className="w-[200px] z-20 mb-0"
            />

            <Button
              onClick={onStart}
              size="L"
              variant="black"
              className="!w-[400px] mt-4"
            >
              시작하기
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
