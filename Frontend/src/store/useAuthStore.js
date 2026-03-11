import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { initSocket, closeSocket } from "../lib/socket";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            initSocket(res.data._id); // init socket BEFORE setting authUser
            set({ authUser: res.data });
        } catch {
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            initSocket(res.data._id);
            set({ authUser: res.data });
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed!");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            initSocket(res.data._id);
            set({ authUser: res.data });
            toast.success("Logged in successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed!");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            closeSocket();
            set({ authUser: null, onlineUsers: [] });
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed!");
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed!");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    setOnlineUsers: (users) => set({ onlineUsers: users }),
}));