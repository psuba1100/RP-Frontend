import { create } from "zustand";
import axios from "../api/axios";

export const useAuthStore = create((set) => ({
    username: '',
    password: '',
    accessToken: '',
    setAuth: (data) => set({
        username: data.username,
        password: data.password,
        accessToken: data.accessToken
    }),
    refreshToken: async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        })

        const accessToken = response.data.accessToken
        set({
            accessToken
        })

        return accessToken
    },
    clearAuth: () => set({
        username: '',
        password: '',
        accessToken: ''
    })
}))

