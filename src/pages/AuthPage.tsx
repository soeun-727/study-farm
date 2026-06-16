import React, { useState } from 'react';

import Welcom from '../components/auth/Welcom';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';
import SignUpEnd from '../components/auth/SignUpEnd';

export default function AuthPage() {
  const [currentView, setCurrentView] = useState<'welcome' | 'login' | 'signup' | 'signupEnd'>('welcome');
  

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <Login />; 
      case 'signup':
        // 회원가입 완료 시 SignUpEnd로 이동
        return <SignUp onComplete={() => setCurrentView('signupEnd')} />;
      case 'signupEnd':
        // 가입 완료 후 '시작하기' 누르면 다시 로그인 창으로 보내기
        return <SignUpEnd onStart={() => setCurrentView('login')} />;
      case 'welcome':
      default:
        return (
          <Welcom 
            onGoToLogin={() => setCurrentView('login')} 
            onGoToSignUp={() => setCurrentView('signup')} 
          />
        );
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <div className="w-60 shrink-0 transition-colors duration-300 z-10 bg-(--primary-light-brown)" />
      <main className="flex-1 bg-(--primary-light-brown)">
        {renderView()}
      </main>
      <div className="w-60 shrink-0 transition-colors z-10 bg-(--primary-light-brown)" />
    </div>
  );
}