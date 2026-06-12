import React, { useState } from 'react';

interface SignUpProps {
  onComplete: () => void;
}

export default function SignUp({ onComplete }: SignUpProps) {
  // 비밀번호와 비밀번호 확인 입력칸의 눈알(보임/숨김) 상태를 각각 관리합니다.
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <main className="flex-1 bg-(--primary-light-brown) flex flex-col items-center justify-center min-h-screen">
      <div className="w-[480px] p-8 z-20">
        
        {/* 타이틀 */}
        <h2 className="typo-h1 text-(--gray-900) mb-8 flex items-center justify-center">
          회원가입
        </h2>

        {/* 회원가입 폼 */}
        <form className="w-full flex flex-col gap-5" onSubmit={(e) => {e.preventDefault(); 
          onComplete();}}>
          
          {/* 아이디 (이메일) 입력 */}
          <div className="flex flex-col w-full">
            <label className="typo-label text-(--gray-900) mb-2 ml-1">
              아이디
            </label>
            <div className="relative flex items-center">
              {/* 왼쪽 편지봉투 아이콘 */}
              <svg className="absolute left-4 w-5 h-5 text-(--gray-400)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input 
                type="email" 
                placeholder="이메일 주소 입력" 
                className="w-full pl-11 pr-4 py-3.5 bg-(--gray-0) border border-(--gray-200) rounded-xl typo-body2 outline-none focus:border-(--gray-500) transition-colors"
              />
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div className="flex flex-col w-full">
            <label className="typo-label text-(--gray-900) mb-2 ml-1">
              비밀번호
            </label>
            <div className="relative flex items-center">
              {/* 왼쪽 열쇠 아이콘 */}
              <svg className="absolute left-4 w-5 h-5 text-(--gray-400)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="영문, 숫자 포함 8자 이상의 비밀번호" 
                className="w-full pl-11 pr-12 py-3.5 bg-(--gray-0) border border-(--gray-200) rounded-xl typo-body2 outline-none focus:border-(--gray-500) transition-colors"
              />
              {/* 오른쪽 눈알(비밀번호 숨김/표시) 버튼 */}
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-(--gray-400) hover:text-(--gray-600) transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* 비밀번호 확인 입력 */}
          <div className="flex flex-col w-full">
            <label className="typo-label text-(--gray-900) mb-2 ml-1">
              비밀번호 확인
            </label>
            <div className="relative flex items-center">
              {/* 왼쪽 열쇠 아이콘 */}
              <svg className="absolute left-4 w-5 h-5 text-(--gray-400)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <input 
                type={showPasswordConfirm ? "text" : "password"} 
                placeholder="영문, 숫자 포함 8자 이상의 비밀번호" 
                className="w-full pl-11 pr-12 py-3.5 bg-(--gray-0) border border-(--gray-200) rounded-xl typo-body2 outline-none focus:border-(--gray-500) transition-colors"
              />
              {/* 오른쪽 눈알(비밀번호 숨김/표시) 버튼 */}
              <button 
                type="button" 
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute right-4 text-(--gray-400) hover:text-(--gray-600) transition-colors"
              >
                {showPasswordConfirm ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* 완료 버튼 */}
          <button 
            type="submit"
            className="w-full mt-4 bg-(--gray-900) text-white typo-button py-5 rounded-2xl transition-all hover:bg-(--gray-800) active:scale-95"
          >
            완료
          </button>

        </form>
      </div>
    </main>
  );
}