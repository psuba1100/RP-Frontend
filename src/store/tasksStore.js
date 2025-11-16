import { create } from "zustand";
import axios from "../api/axios";
import { useAuthStore } from "./authStore";
const TASKS_URL = '/u/todo'

export const useTasksStore = create((set) => ({
    tasks: [],
    count: [],
    fetchTasks: async (p, s) => {
        const {accessToken} = useAuthStore.getState()
        try {
            const response = await axios.get(TASKS_URL,
                {
                    params: {
                        ...(s && { s }),
                        ...(p && { p }),
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true
                }
            )

            set({
                tasks: response.data.tasks,
                count: response.data.count
            })
        } catch (err) {
            console.error(err)
        }
    }
}))