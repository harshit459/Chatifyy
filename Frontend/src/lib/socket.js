import { io } from "socket.io-client";
import { useChatStore } from "../store/useChatStore";

const SOCKET_URL =
    import.meta.env.MODE === "development" ? "http://localhost:3000" : window.location.origin;

let socket = null;

export const initSocket = (userId) => {
    if (socket?.connected) return;
    socket = io(SOCKET_URL, { query: { userId } });

    socket.on("connect", () => {
        // Re-attach newMessage listener on every (re)connect
        socket.off("newMessage");
        socket.on("newMessage", (message) => {
            const { selectedUser, messages, unreadCounts } = useChatStore.getState();
            if (selectedUser && message.senderId === selectedUser._id) {
                useChatStore.setState({ messages: [...messages, message] });
            } else {
                useChatStore.setState({
                    unreadCounts: {
                        ...unreadCounts,
                        [message.senderId]: (unreadCounts[message.senderId] || 0) + 1,
                    },
                });
            }
        });
    });
};

export const getSocket = () => socket;

export const closeSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
