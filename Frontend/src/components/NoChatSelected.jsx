import { MessageSquareDashed } from "lucide-react";

function NoChatSelected() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(109,40,217,0.06),transparent)] pointer-events-none" />
            <div className="relative mb-6 animate-fade-slide-up">
                <div className="w-24 h-24 bg-violet-600/10 rounded-3xl flex items-center justify-center border border-violet-500/20 animate-float">
                    <MessageSquareDashed className="w-12 h-12 text-violet-400/40" />
                </div>
                <div className="absolute -inset-4 bg-violet-600/5 rounded-full blur-xl pointer-events-none" />
            </div>
            <h2 className="text-xl font-semibold text-slate-300 mb-2 animate-fade-slide-up delay-1">No conversation open</h2>
            <p className="text-slate-500 text-sm max-w-xs animate-fade-slide-up delay-2">
                Select a contact from the sidebar to start chatting
            </p>
        </div>
    );
}

export default NoChatSelected;
