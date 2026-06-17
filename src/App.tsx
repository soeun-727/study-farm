import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./api/AuthContext";

import HomePage from "./pages/HomePage";
import MyCalendarPage from "./pages/MyCalendarPage";
import MyStudyFarmPage from "./pages/MyStudyFarmPage";
import RankPage from "./pages/RankPage";
import RankingDetailPage from "./pages/RankingDetailPage";
import AuthPage from "./pages/AuthPage";
import UserInfoPage from "./pages/UserInfoPage";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/" replace />;
}

export default function App() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-(--primary-light-brown) text-xl font-bold">
        잠시만 기다려주세요...👨‍🌾
      </div>
    );
  }

  return (
    <Routes>
      {/* 비로그인 진입로 */}
      <Route
        path="/"
        element={user ? <Navigate to="/home" replace /> : <AuthPage />}
      />

      {/* 로그인 필수 보호 경로들 */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <UserInfoPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/mystudyfarm"
        element={
          <PrivateRoute>
            <MyStudyFarmPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <PrivateRoute>
            <MyCalendarPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/ranking"
        element={
          <PrivateRoute>
            <RankPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ranking/:id"
        element={
          <PrivateRoute>
            <RankingDetailPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
