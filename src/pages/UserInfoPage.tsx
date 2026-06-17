import { useState, useEffect, useRef } from 'react';
import InputWithButton from '../components/ui/InputWithButton';

import { useNavigate } from 'react-router-dom';

import { auth, db } from '../api/firebase'; 
import { onAuthStateChanged, updatePassword, signOut, deleteUser } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';


export default function UserInfoPage() {
  const navigate = useNavigate();
 const [editMode, setEditMode] = useState<'none' | 'nickname' | 'password'>('none');
  const [nickname, setNickname] = useState(''); // 초기값 비워두기
  const [email, setEmail] = useState('');       // 이메일 상태 
  const [password, setPassword] = useState('*************'); // 비밀번호는 보안상 가짜 값 표시

  const isIntentionalLogout = useRef(false);

useEffect(() => {
    // 현재 로그인한 사용자 확인하기
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email || ''); // 이메일 세팅
        
        // Firestore에서 닉네임 가져오기
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setNickname(userDoc.data().nickname || '익명의 농부');
        }
      } else {
        if (!isIntentionalLogout.current) {
          alert('로그인이 필요한 페이지입니다.');
        }
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      if (editMode === 'nickname') {
        // DB에 닉네임 업데이트
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { nickname: nickname });
        alert('닉네임이 성공적으로 변경되었습니다!');

      } else if (editMode === 'password') {
        // 파이어베이스 Auth 비밀번호 업데이트
        if (password.length < 6) {
          alert('비밀번호는 6자리 이상이어야 합니다.');
          return;
        }
        await updatePassword(user, password);
        alert('비밀번호가 성공적으로 변경되었습니다!');
        setPassword('****************'); // 다시 가림처리
      }
      
      setEditMode('none'); 
    } catch (error: any) {
      console.error('변경 실패:', error);
      // 보안 상 로그인한지 오래되면 비밀번호 변경을 막음. 이때 띄우는 에러!
      if (error.code === 'auth/requires-recent-login') {
        alert('보안을 위해 로그아웃 후 다시 로그인한 뒤 시도해주세요.');
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  // 로그아웃 로직
  const handleLogout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      isIntentionalLogout.current = true;
      await signOut(auth);
      alert('로그아웃 되었습니다.');
      navigate('/'); // 로그인 화면으로 이동
    }
  };

  // 회원 탈퇴 로직
  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (window.confirm('정말로 탈퇴하시겠습니까? 모든 공부 기록과 텃밭이 영구 삭제됩니다.')) {
      try {
        isIntentionalLogout.current = true;
        // DB에서 내 데이터 삭제
        await deleteDoc(doc(db, 'users', user.uid));
        // Auth에서 계정 영구 삭제
        await deleteUser(user);
        
        alert('회원탈퇴가 완료되었습니다. 그동안 수고 많으셨습니다!');
        navigate('/');
      } catch (error: any) {
        console.error('탈퇴 실패:', error);
        if (error.code === 'auth/requires-recent-login') {
          alert('보안을 위해 로그아웃 후 다시 로그인한 뒤 탈퇴를 진행해주세요.');
        } else {
          alert('탈퇴 처리 중 오류가 발생했습니다.');
        }
      }
    }
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
              <InputWithButton 
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                readOnly={editMode !== 'nickname'}
                isDimmed={editMode !== 'none' && editMode !== 'nickname'}
                buttonText={editMode === 'nickname' ? '저장' : '닉네임 변경'}
                onButtonClick={() => editMode === 'nickname' ? handleSave() : setEditMode('nickname')}
                hideButton={editMode === 'password'}
              />
            </div>

            {/* 이메일 필드 */}
            <div className="flex flex-col w-full">
              <label className="typo-label text-(--gray-900) mb-2 ml-1">
                이메일
              </label>
              <input 
                type="email" 
                value={email} 
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
              <InputWithButton 
                type={editMode === 'password' ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                readOnly={editMode !== 'password'}
                isDimmed={editMode !== 'none' && editMode !== 'password'}
                buttonText={editMode === 'password' ? '저장' : '비밀번호 변경'}
                onButtonClick={() => {
                  if (editMode === 'password') {
                    handleSave();
                  } else {
                    setPassword(''); 
                    setEditMode('password');
                  }
                }}
                hideButton={editMode === 'nickname'}
              />
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="flex items-center justify-center gap-6 mt-16 text-(--gray-700)">
            <button 
            onClick={handleLogout}
            className="flex items-center gap-2 typo-button hover:text-(--gray-900) transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              로그아웃
            </button>
            <div className="w-[1px] h-4 bg-(--gray-400)"></div>
            <button 
            onClick={handleDeleteAccount}
            className="typo-label underline hover:text-(--gray-900) transition-colors">
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