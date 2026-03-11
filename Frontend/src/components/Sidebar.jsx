import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users, Search } from "lucide-react";

function Sidebar() {
    const { contacts, getContacts, isLoadingContacts, selectedUser, setSelectedUser, unreadCounts } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [search, setSearch] = useState("");

    useEffect(() => {
        getContacts();
    }, [getContacts]);

    const filtered = contacts.filter((c) =>
        c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <aside className="w-72 flex flex-col border-r border-white/5 glass h-full">
            {/* Header */}
            <div className="p-4 border-b border-white/5">
                <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-violet-400" />
                    <span className="font-semibold text-slate-200 text-sm">Contacts</span>
                    {onlineUsers.length > 1 && (
                        <span className="ml-auto text-xs text-emerald-400 font-medium bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                            {onlineUsers.length - 1} online
                        </span>
                    )}
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/8 text-slate-300 placeholder-slate-500 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200"
                    />
                </div>
            </div>

            {/* Contact list */}
            <div className="flex-1 overflow-y-auto py-2">
                {isLoadingContacts ? (
                    <div className="flex items-center justify-center h-32 text-slate-500 text-sm">
                        Loading...
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 gap-1">
                        <Users className="w-8 h-8 text-slate-700" />
                        <p className="text-slate-500 text-sm">No contacts found</p>
                    </div>
                ) : (
                    filtered.map((contact, i) => {
                        const isOnline = onlineUsers.includes(contact._id);
                        const isSelected = selectedUser?._id === contact._id;
                        const unread = unreadCounts[contact._id] || 0;
                        const avatar =
                            contact.profilePic ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.fullName)}&background=4f46e5&color=fff&bold=true`;

                        return (
                            <button
                                key={contact._id}
                                onClick={() => setSelectedUser(contact)}
                                style={{ animationDelay: `${i * 50}ms` }}
                                className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 border-r-2 animate-slide-in-left ${
                                    isSelected
                                        ? "bg-violet-500/10 border-violet-500 backdrop-blur"
                                        : "border-transparent hover:bg-white/5 hover:border-slate-600"
                                }`}
                            >
                                <div className="relative shrink-0">
                                    <img
                                        src={avatar}
                                        alt={contact.fullName}
                                        className={`w-10 h-10 rounded-full object-cover ring-2 transition-all duration-200 ${
                                            isSelected ? "ring-violet-500" : "ring-slate-700"
                                        }`}
                                    />
                                    {isOnline && (
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <p
                                        className={`text-sm font-medium truncate transition-colors duration-200 ${
                                            isSelected ? "text-violet-300" : "text-slate-200"
                                        }`}
                                    >
                                        {contact.fullName}
                                    </p>
                                    <p className="text-xs truncate">
                                        <span
                                            className={
                                                isOnline ? "text-emerald-400" : "text-slate-500"
                                            }
                                        >
                                            {isOnline ? "● Online" : "○ Offline"}
                                        </span>
                                    </p>
                                </div>
                                {unread > 0 && !isSelected && (
                                    <span className="shrink-0 min-w-[20px] h-5 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-badge-in shadow-lg shadow-violet-900/50">
                                        {unread > 99 ? "99+" : unread}
                                    </span>
                                )}
                            </button>
                        );
                    })
                )}
            </div>
        </aside>
    );
}

export default Sidebar;
