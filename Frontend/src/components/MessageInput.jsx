import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

function MessageInput() {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            toast.error("Image must be smaller than 10MB");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setImageBase64(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageBase64(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imageBase64) return;
        await sendMessage({ text: text.trim(), image: imageBase64 });
        setText("");
        removeImage();
    };

    return (
        <div className="p-2 sm:p-3 border-t border-white/5 glass shrink-0 relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
            {/* Image preview */}
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2 animate-fade-slide-up">
                    <div className="relative inline-block group">
                        <img
                            src={imagePreview}
                            alt="preview"
                            className="h-20 w-20 object-cover rounded-xl border border-slate-700 shadow-lg"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-slate-700 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors duration-200 shadow"
                        >
                            <X className="w-3 h-3 text-slate-300" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="shrink-0 p-2.5 text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                >
                    <Image className="w-5 h-5" />
                </button>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 min-w-0 bg-white/5 border border-white/8 text-slate-100 placeholder-slate-500 rounded-xl px-3 sm:px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 hover:border-white/15 transition-all duration-200"
                />
                <button
                    type="submit"
                    disabled={!text.trim() && !imageBase64}
                    className="shrink-0 p-2.5 bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg shadow-violet-900/30"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}

export default MessageInput;
