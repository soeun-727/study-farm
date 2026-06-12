import React, { useState } from 'react';

interface SignUpEndProps {
  onStart: () => void;
}

export default function SignUpEnd({ onStart }: SignUpEndProps) {
return (
    <div className="flex w-full min-h-screen">
        <main className="flex-1  flex flex-col  items-center justify-center bg-(--primary-light-brown)">
         <div className="p-8">

            <div className='flex flex-col items-center justify-center'>
            <h2 className="typo-h1 py-6"> 
                회원가입 완료!
            </h2>
            <div className="typo-body pb-6">
                열공농장에 오신 것을 환영해요
            </div>
          

         {/* 농부 */}
         <img 
            src="./src/assets/characters/lv1farmer_ver3_top.svg" 
            alt="만세하는 농부"
            className="w-[200px] z-20 mb-0" 
          />
           
     
        <button 
        onClick={onStart}
        className="w-[416px] bg-(--gray-900) text-(--gray-0) typo-button py-5 rounded-2xl transition-all hover:bg-(--gray-800) active:scale-95">
            시작하기
        </button>
        </div>
        </div>
    


        </main>
    </div>

)
}