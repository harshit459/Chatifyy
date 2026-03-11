import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { Loader2 } from "lucide-react";

function formatTime(dateStr) {
    return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function ChatContainer() {
    const {
        messages,
        getMessages,
        isLoadingMessages,
        selectedUser,
    } = useChatStore();
    const { authUser } = useAuthStore();
    const bottomRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id);
    }, [selectedUser._id, getMessages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 flex flex-col min-w-0 relative">
            {/* subtle radial glow behind messages */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(109,40,217,0.06),transparent)]" />
            <ChatHeader />

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {isLoadingMessages ? (
                    <div className="flex items-center justify-center h-full text-slate-500">
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-slate-500 text-sm">No messages yet. Say hi! 👋</p>
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isMine = msg.senderId === authUser._id;
                        const myAvatar =
                            authUser.profilePic ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.fullName)}&background=4f46e5&color=fff&bold=true`;
                        const theirAvatar =
                            selectedUser.profilePic ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.fullName)}&background=4f46e5&color=fff&bold=true`;

                        return (
                            <div
                                key={msg._id}
                                className={`flex items-end gap-2 animate-msg-in ${
                                    isMine ? "flex-row-reverse" : "flex-row"
                                }`}
                            >
                                <img
                                    src={isMine ? myAvatar : theirAvatar}
                                    alt="avatar"
                                    className="w-7 h-7 rounded-full object-cover shrink-0 mb-1 ring-2 ring-slate-800"
                                />
                                <div
                                    className={`max-w-[70%] flex flex-col gap-1 ${
                                        isMine ? "items-end" : "items-start"
                                    }`}
                                >
                                    {msg.image && (
                                        <img
                                            src={msg.image}
                                            alt="attachment"
                                            className="max-w-xs rounded-2xl border border-slate-700 object-cover hover:scale-[1.02] transition-transform duration-200 cursor-zoom-in shadow-lg"
                                        />
                                    )}
                                    {msg.text && (
                                        <div
                                            className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words shadow-md ${
                                                isMine
                                                    ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-br-sm shadow-violet-900/30"
                                                    : "bg-white/8 text-slate-200 rounded-bl-sm border border-white/8"
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                    )}
                                    <span className="text-[10px] text-slate-600 px-1">
                                        {formatTime(msg.createdAt)}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={bottomRef} />
            </div>

            <MessageInput />
        </div>
    );
}

export default ChatContainer;
