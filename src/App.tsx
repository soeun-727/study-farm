import { Routes, Route } from 'react-router-dom';

// Pages 임포트
import HomePage from './pages/HomePage';
import MyCalendarPage from './pages/MyCalendarPage';
import MyStudyFarmPage from './pages/MyStudyFarmPage';
import RankPage from './pages/RankPage';
import RankingDetailPage from './pages/RankingDetailPage';

// Auth 관련 페이지 임포트 
import AuthPage from './pages/AuthPage';
import UserInfoPage from './pages/UserInfoPage';

export default function App() {
  return (
   
        <Routes>
          {/* 인증 및 초기 진입 경로 지정 전*/}
            <Route path="/" element={<AuthPage />} />
            <Route path="/userinfo" element={<UserInfoPage />} /> 

            {/* 홈 (타이머 등 메인) */}
            <Route path="/home" element={<HomePage />} />

            {/* 마이 홈 */}
            <Route path="/mystudyfarm" element={<MyStudyFarmPage />} />
            
            {/* 스터디 캘린더 */}
            <Route path="/calendar" element={<MyCalendarPage />} />
            
            {/* 랭킹 */}
            <Route path="/rank">
              <Route index element={<RankPage />} />
              <Route path="detail/:id" element={<RankingDetailPage />} />
            </Route>
       
        </Routes>
  
  );
}