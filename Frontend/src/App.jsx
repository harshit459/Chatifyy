import { Route, Routes, Navigate } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";
import { getSocket } from "./lib/socket";

function App() {
  const { checkAuth, authUser, isCheckingAuth, setOnlineUsers } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Attach online-users listener once authenticated
  useEffect(() => {
    if (!authUser) return;
    const socket = getSocket();
    if (!socket) return;
    socket.on("getOnlineUsers", setOnlineUsers);
    return () => socket.off("getOnlineUsers", setOnlineUsers);
  }, [authUser, setOnlineUsers]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-950">
      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#1e293b", color: "#f1f5f9", border: "1px solid #334155" },
        }}
      />
    </div>
  );
}

export default App;