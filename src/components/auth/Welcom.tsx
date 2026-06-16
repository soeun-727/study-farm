import React from 'react';
import Button from '../ui/Button';

interface WelcomProps {
  onGoToLogin: () => void;
  onGoToSignUp: () => void;
}

export default function Welcom({onGoToLogin, onGoToSignUp }: WelcomProps) {
  return (
    <div className="flex w-full min-h-screen">
        
      {/* 1초 뒤 농부 주변으로 과일 360도 회전하는 애니메이션 정의 */}
      <style>{`
        @keyframes revolveGroup {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fade1 { /* 수박 (가장 먼저 뒤로 감) */
          0%, 15% { opacity: 0; } 15%, 50% { opacity: 0; } 60%, 100% { opacity: 1; }
        }
        @keyframes fade2 { /* 블루베리 */
          0%, 25% { opacity: 0; } 30%, 55% { opacity: 0; } 65%, 100% { opacity: 1; }
        }
        @keyframes fade3 { /* 스타후르츠 */
          0%, 30% { opacity: 0; } 35%, 60% { opacity: 0; } 70%, 100% { opacity: 1; }
        }
        @keyframes fade4 { /* 망고 */
          0%, 35% { opacity: 0; } 40%, 65% { opacity: 0; } 75%, 100% { opacity: 1; }
        }
        @keyframes fade5 { /* 사과 (가장 마지막에 뒤로 감) */
          0%, 40% { opacity: 0; } 44%, 70% { opacity: 0; } 80%, 100% { opacity: 1; }
        }
          
        .animate-revolve-group {
          animation: revolveGroup 3s ease-in-out 0s forwards;
        }

        .fruit-fade-1 { animation: fade1 2s ease-in-out 1s both; }
        .fruit-fade-2 { animation: fade2 2s ease-in-out 1s both; }
        .fruit-fade-3 { animation: fade3 2s ease-in-out 1s both; }
        .fruit-fade-4 { animation: fade4 2s ease-in-out 1s both; }
        .fruit-fade-5 { animation: fade5 2s ease-in-out 1s both; }

      `}</style>


     

      {/* 중앙 */}
      <main className="flex-1 bg-(--primary-light-brown)">
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
          
          {/* 온보딩 이미지 구현 */}
          <div className="farm-scene-container relative w-[480px] h-[400px]">
            
            {/* 농부 */}
            <img 
              src="./src/assets/characters/lv1farmer_ver4_top.svg" 
              alt="손 흔드는 농부"
              className="absolute w-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            />

            {/* 과일들 배치 */}
            <div className="absolute inset-0 z-10 animate-revolve-group">
            {/* 좌측 끝: 사과 */}
            <div className="absolute top-[45%] left-[10%] -translate-y-1/2 -rotate-30 ">
              <img 
                src="./src/assets/crops/apple.svg" 
                alt="사과"
                className="w-[60px] fruit-fade-5"
              />
            </div>

            {/* 좌측 상단: 망고 */}
            <div className="absolute top-[23%] left-[24%] z-10 -rotate-12">
              <img 
                src="./src/assets/crops/mango.svg" 
                alt="망고"
                className="w-[70px] fruit-fade-4"
              />
            </div>

             {/* 중앙: 스타후르츠 */}
            <div className="absolute top-[15%] left-[45%] z-10">
              <img 
                src="./src/assets/crops/starFruit.svg" 
                alt="스타후르츠"
                className="w-[90px]  fruit-fade-3"
              />
            </div>

            {/* 우측 상단: 블루베리 */}
            <div className="absolute top-[20%] right-[20%] z-10 rotate-12">
              <img 
                src="./src/assets/crops/blueberry.svg" 
                alt="블루베리"
                className="w-[70px]  fruit-fade-2"
              />
            </div>

            {/* 우측 끝: 수박 */}
            <div className="absolute top-[45%] right-[5%] -translate-y-1/2 z-10 rotate-30">
              <img 
                src="./src/assets/crops/watermelon.svg" 
                alt="수박"
                className="w-[70px] fruit-fade-1"
              />
            </div>
            </div>
          </div>
        

        {/*버튼 & 하단 텍스트 */}
        <div className="w-[480px] flex flex-col items-center mt-6 z-20">
          {/* 시작하기 버튼 */}
        <Button 
            onClick={onGoToLogin}
            size="L"
            variant="black"
            className="w-full"
          >
              시작하기
          </Button>

        {/* 하단 회원가입 안내 텍스트 */}
        <div className="flex items-center gap-3 mt-4 typo-label">
            <span className="text-(--gray-600)">
            아직 계정이 없나요?
            </span>
            {/* 회원가입 버튼: 마우스 올리면 밑줄 생기게 처리 */}
            <button 
            onClick={onGoToSignUp}
            className="text-(--gray-800) typo-button hover:text-(--gray-900) hover:underline transition-colors">
            회원가입
            </button>
        </div>
        </div>
        
        </div>


      </main>

      
    </div>
  );
}