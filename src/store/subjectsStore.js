import { create } from 'zustand'
import { useAuthStore } from './authStore'
import axios from '../api/axios'

const SUBJECTS_URL = '/u/subject'

export const useSubjectStore = create((set) => ({
    subjects: [],
    fetchSubjects: async () => {
        const { accessToken } = useAuthStore.getState()
        try {
            const response = await axios.get(SUBJECTS_URL,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true
                }
            )
            set({
                subjects: response.data
            })
        } catch (err) {
            console.error(err)
        }
    }
}))