import { create } from "zustand";
import axios from "../api/axios";

export const useAuthStore = create((set) => ({
    username: '',
    accessToken: '',
    setAuth: (data) => set({
        username: data.username,
        accessToken: data.accessToken
    }),
    refreshToken: async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        })

        const accessToken = response?.data?.accessToken
        const username = response?.data?.username

        set({
            accessToken,
            username
        })

        return accessToken
    },
    clearAuthStore: () => set({
        username: '',
        accessToken: ''
    })
}))

