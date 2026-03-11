import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, MessageSquare, User, Mail, Lock } from "lucide-react";

function SignUpPage() {
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const { signup, isSigningUp } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    };

    return (
        <div className="app-bg min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Vivid background orbs */}
            <div className="absolute top-10 -left-20 w-96 h-96 bg-violet-600 opacity-40 blur-[100px] pointer-events-none rounded-full animate-float" />
            <div className="absolute bottom-10 -right-20 w-80 h-80 bg-cyan-500 opacity-30 blur-[100px] pointer-events-none rounded-full animate-float-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600 opacity-20 blur-[90px] pointer-events-none rounded-full animate-float" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8 animate-fade-slide-up">
                    <div className="w-16 h-16 bg-violet-600/20 rounded-2xl flex items-center justify-center mb-3 border border-violet-500/30 shadow-lg shadow-violet-900/30 hover:scale-105 transition-transform duration-300">
                        <MessageSquare className="w-8 h-8 text-violet-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Chatifyy</h1>
                    <p className="text-slate-400 mt-1 text-sm">Create your account</p>
                </div>

                {/* Card */}
                <div className="glass-bright rounded-2xl p-8 shadow-2xl shadow-black/50 animate-fade-slide-up delay-1">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div className="space-y-1.5 animate-fade-slide-up delay-1">
                            <label className="text-sm font-medium text-slate-300">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-violet-400 transition-colors duration-200" />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-white/5 border border-white/8 text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 hover:border-white/15 transition-all duration-200"
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5 animate-fade-slide-up delay-2">
                            <label className="text-sm font-medium text-slate-300">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-violet-400 transition-colors duration-200" />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full bg-white/5 border border-white/8 text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 hover:border-white/15 transition-all duration-200"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5 animate-fade-slide-up delay-3">
                            <label className="text-sm font-medium text-slate-300">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-violet-400 transition-colors duration-200" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Min. 6 characters"
                                    className="w-full bg-white/5 border border-white/8 text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 hover:border-white/15 transition-all duration-200"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSigningUp}
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-violet-900/30 hover:shadow-violet-800/50 hover:-translate-y-0.5 active:translate-y-0 animate-glow-pulse"
                        >
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-400 mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-200 underline-offset-2 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;