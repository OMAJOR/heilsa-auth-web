import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../lib/auth-context";
import { AuthExploration3 } from "./components/heilsa/auth/AuthExploration3";
import { ForgotPasswordScreen } from "./components/heilsa/auth/ForgotPasswordScreen";
import { ResetPasswordScreen } from "./components/heilsa/auth/ResetPasswordScreen";
import { VerifyEmailScreen } from "./components/heilsa/auth/VerifyEmailScreen";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicOnlyRoute } from "./components/PublicOnlyRoute";
import { Dashboard } from "./pages/Dashboard";
import { Chat } from "./pages/Chat";

const basename = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route
            path="/signin"
            element={
              <PublicOnlyRoute>
                <AuthExploration3 />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicOnlyRoute>
                <ForgotPasswordScreen />
              </PublicOnlyRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />
          <Route path="/verify-email" element={<VerifyEmailScreen />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
