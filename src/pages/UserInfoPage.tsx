import React, { useState } from 'react';

//확인을 위한 더미 데이터
export default function UserInfoPage() {
  const [editMode, setEditMode] = useState<'none' | 'nickname' | 'password'>('none');
  const [nickname, setNickname] = useState('공부하는농부');
  const [password, setPassword] = useState('****************');

  const handleSave = () => {
    // 저장 로직
    setEditMode('none'); 
  };

  return (
    <div className="flex w-full min-h-screen">
      
      {/* 왼쪽 영역 */}
      <div className="w-60 shrink-0 transition-colors duration-300 z-10 bg-(--primary-light-brown)" />

      {/* 중앙 메인 영역 */}
      <main className="flex-1 bg-(--primary-light-brown) flex flex-col items-center justify-center min-h-screen">
        <div className="w-[480px] p-8 z-20 flex flex-col">
          
          <h2 className="typo-h1 text-center text-(--gray-900) mb-12">
            회원 정보
          </h2>

          <div className="flex flex-col gap-6">
            {/* 닉네임 필드 */}
            <div className="flex flex-col w-full">
              <label className="typo-label text-(--gray-900) mb-2 ml-1">
                닉네임
              </label>
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  readOnly={editMode !== 'nickname'}
                  className={`
                    w-full pl-4 pr-28 py-3.5 rounded-xl typo-body2 outline-none transition-colors border
                    ${editMode === 'nickname' 
                      ? 'bg-(--gray-0) border-(--gray-500) text-(--gray-900)' 
                      : editMode !== 'none' 
                        ? 'bg-(--gray-200) border-transparent text-(--gray-500)' 
                        : 'bg-(--gray-0) border-(--gray-200) text-(--gray-900)'
                    }
                  `}
                />
                {editMode !== 'password' && (
                  <button 
                    onClick={() => editMode === 'nickname' ? handleSave() : setEditMode('nickname')}
                    className="absolute right-2 bg-(--gray-900) text-(--gray-0) px-4 py-2 rounded-full typo-body transition-all hover:bg-(--gray-800) active:scale-95"
                  >
                    {editMode === 'nickname' ? '저장' : '닉네임 변경'}
                  </button>
                )}
              </div>
            </div>

            {/* 이메일 필드 */}
            <div className="flex flex-col w-full">
              <label className="typo-label text-(--gray-900) mb-2 ml-1">
                이메일
              </label>
              <input 
                type="email" 
                value="example@email.com" 
                readOnly
                className={`
                  w-full px-4 py-3.5 rounded-xl typo-body2 outline-none border transition-colors
                  ${editMode !== 'none' 
                    ? 'bg-(--gray-200) border-transparent text-(--gray-500)' 
                    : 'bg-(--gray-0) border-(--gray-200) text-(--gray-600)'
                  }
                `}
              />
            </div>

            {/* 비밀번호 필드 */}
            <div className="flex flex-col w-full">
              <label className="typo-label text-(--gray-900) mb-2 ml-1">
                비밀번호
              </label>
              <div className="relative flex items-center">
                <input 
                  type={editMode === 'password' ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  readOnly={editMode !== 'password'}
                  className={`
                    w-full pl-4 pr-32 py-3.5 rounded-xl typo-body2 outline-none transition-colors border
                    ${editMode === 'password' 
                      ? 'bg-(--gray-0) border-(--gray-500) text-(--gray-900)' 
                      : editMode !== 'none' 
                        ? 'bg-(--gray-200) border-transparent text-(--gray-500)' 
                        : 'bg-(--gray-0) border-(--gray-200) text-(--gray-900)'
                    }
                  `}
                />
                {editMode !== 'nickname' && (
                  <button 
                    onClick={() => editMode === 'password' ? handleSave() : setEditMode('password')}
                    className="absolute right-2 bg-(--gray-900) text-(--gray-0) px-4 py-2 rounded-full typo-body transition-all hover:bg-(--gray-800) active:scale-95"
                  >
                    {editMode === 'password' ? '저장' : '비밀번호 변경'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="flex items-center justify-center gap-6 mt-16 text-(--gray-700)">
            <button className="flex items-center gap-2 typo-button hover:text-(--gray-900) transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              로그아웃
            </button>
            <div className="w-[1px] h-4 bg-(--gray-400)"></div>
            <button className="typo-label underline hover:text-(--gray-900) transition-colors">
              탈퇴하기
            </button>
          </div>

        </div>
      </main>

      {/* 오른쪽 영역 */}
      <div className="w-60 shrink-0 transition-colors z-10 bg-(--primary-light-brown)" />
    </div>
  );
}