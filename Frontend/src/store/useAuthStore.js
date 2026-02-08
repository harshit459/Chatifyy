import {create} from "zustand";

export const useAuthStore = create((set) => ({
    authUser : {name: "John Doe", _id: "1234", age: 25},
    isLoggedIn: false,
    login : () => {
        console.log("You just logged in !");
        set({isLoggedIn: true});
    },
}));