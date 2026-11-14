import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

function ChatHeader() {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const isOnline = onlineUsers.includes(selectedUser._id);

    const avatar =
        selectedUser.profilePic ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.fullName)}&background=4f46e5&color=fff&bold=true`;

    return (
        <div className="px-3 sm:px-4 py-3 border-b border-white/5 flex items-center gap-3 glass shrink-0 animate-fade-slide-up relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
            <div className="relative">
                <img
                    src={avatar}
                    alt={selectedUser.fullName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-violet-500/30"
                />
                {isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
                )}
            </div>
            <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-100">{selectedUser.fullName}</h3>
                <p className={`text-xs flex items-center gap-1 ${
                    isOnline ? "text-emerald-400" : "text-slate-500"
                }`}>
                    {isOnline && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />}
                    {isOnline ? "Online" : "Offline"}
                </p>
            </div>
            <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-500 hover:text-slate-300 transition-all duration-200 p-1.5 rounded-lg hover:bg-white/5 hover:scale-110 active:scale-95"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

export default ChatHeader;
