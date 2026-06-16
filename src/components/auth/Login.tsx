import { useState } from 'react';
import TextField from '../ui/TextField'; 
import Button from '../ui/Button';

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="flex-1 bg-(--primary-light-brown) flex flex-col items-center justify-center min-h-screen">
      <div className="w-[480px] p-8 z-20">
        <h2 className="typo-h1 text-(--gray-900) mb-8 flex items-center justify-center ">
          로그인
        </h2>

      {/* 로그인 폼 (나중에 onSubmit으로 Firebase 연동) */}
     <form className="w-full flex flex-col gap-5 items-center" onSubmit={(e) => e.preventDefault()}>

        {/* 1. 아이디 (이메일) 입력 */}
       <TextField
          label="아이디"
          value={email}
          onChange={setEmail}
          placeholder="이메일 주소 입력"
          leftIcon={
            <svg className="w-5 h-5 text-(--gray-400)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />

        {/* 2. 비밀번호 입력 */}
        <TextField
          label="비밀번호"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={setPassword}
          placeholder="영문, 숫자 포함 8자 이상의 비밀번호"
          leftIcon={
            <svg className="w-5 h-5 text-(--gray-400)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          }
          rightIcon={
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="text-(--gray-400) hover:text-(--gray-600) transition-colors flex items-center"
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
          }
        />

        {/* 3. 로그인 버튼 */}
        <Button 
          type="submit" 
          size="L" 
          variant="black" 
          className="!w-[400px] !mx-auto mt-4"
        >
          로그인
        </Button>

      </form>
    </div>
    </main>
  );
}