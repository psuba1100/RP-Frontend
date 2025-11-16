import { create } from "zustand";

export const useAuthStore = create((set) => ({
    username: '',
    password: '',
    accessToken: '',
    setAuth: (data) => set({
        username: data.username,
        password: data.password,
        accessToken: data.accessToken
    }),
    clearAuth: () => set({
        username: '',
        password: '',
        accessToken: ''
    })
}))

