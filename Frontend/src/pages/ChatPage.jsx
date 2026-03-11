import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import { LogOut, MessageSquare } from "lucide-react";

function ChatPage() {
    const { authUser, logout } = useAuthStore();
    const { selectedUser } = useChatStore();

    const avatarUrl = authUser?.profilePic ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.fullName || "U")}&background=4f46e5&color=fff&bold=true`;

    return (
        <div className="app-bg h-screen flex flex-col relative overflow-hidden">
            {/* Vivid background orbs */}
            <div className="fixed top-0 left-0 w-[700px] h-[700px] bg-violet-700 opacity-30 blur-[120px] pointer-events-none rounded-full -translate-x-1/3 -translate-y-1/3" />
            <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-cyan-400 opacity-20 blur-[110px] pointer-events-none rounded-full translate-x-1/3 translate-y-1/3" />
            <div className="fixed top-1/2 left-1/2 w-[400px] h-[400px] bg-indigo-600 opacity-10 blur-[100px] pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2" />

            {/* Top Navbar */}
            <header className="h-14 shrink-0 glass-bright border-b border-white/5 flex items-center px-4 gap-3 z-20 relative">
                {/* subtle top glow line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
                        <MessageSquare className="w-4 h-4 text-violet-400" />
                    </div>
                    <span className="text-slate-100 font-bold text-lg tracking-tight bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">Chatifyy</span>
                </div>

                <div className="ml-auto flex items-center gap-3">
                    <img
                        src={avatarUrl}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-violet-500/40"
                    />
                    <span className="text-sm text-slate-300 hidden sm:block">{authUser?.fullName}</span>
                    <button
                        onClick={logout}
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 glass hover:border-red-500/30 px-3 py-1.5 rounded-lg transition-all duration-200 hover:text-red-400"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span className="hidden sm:block">Logout</span>
                    </button>
                </div>
            </header>

            {/* Main layout */}
            <div className="flex flex-1 min-h-0 relative z-10">
                <div className={`${selectedUser ? "hidden md:flex" : "flex"} flex-col`}>
                    <Sidebar />
                </div>
                {selectedUser ? <ChatContainer /> : <NoChatSelected />}
            </div>
        </div>
    );
}

export default ChatPage;