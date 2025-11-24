import { create } from "zustand";
const TASKS_URL = '/u/todo'

export const useTasksStore = create((set) => ({
    tasks: [],
    count: 0,
    fetchTasks: async (axiosPrivate, location, navigate, p, s) => {
        try {
            const response = await axiosPrivate.get(TASKS_URL,
                {
                    params: {
                        ...(s && { s }),
                        ...(p && { p }),
                    }
                }
            )
            set({
                tasks: response.data.tasks,
                count: response.data.count
            })
        } catch (err) {
            console.error(err)
            const status = err?.response?.status;

            if (status === 401 || status === 403) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
    }
}))