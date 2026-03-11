import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    contacts: [],
    messages: [],
    selectedUser: null,
    isLoadingContacts: false,
    isLoadingMessages: false,
    unreadCounts: {}, // { [senderId]: count }

    getContacts: async () => {
        set({ isLoadingContacts: true });
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ contacts: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load contacts");
        } finally {
            set({ isLoadingContacts: false });
        }
    },

    getMessages: async (userId) => {
        set({ isLoadingMessages: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load messages");
        } finally {
            set({ isLoadingMessages: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },

    setSelectedUser: (user) => {
        const { unreadCounts } = get();
        if (user) {
            // Clear unread count for this user when opening the chat
            const updated = { ...unreadCounts };
            delete updated[user._id];
            set({ selectedUser: user, messages: [], unreadCounts: updated });
        } else {
            set({ selectedUser: null, messages: [] });
        }
    },
}));
