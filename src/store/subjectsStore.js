import { create } from 'zustand'

const SUBJECTS_URL = '/u/subject'

export const useSubjectStore = create((set) => ({
    subjects: [],

    // FETCH FROM API
    fetchSubjects: async (axiosPrivate, location, navigate) => {
        try {
            const response = await axiosPrivate.get(SUBJECTS_URL);
            set({ subjects: response.data });
        } catch (err) {
            console.error(err);
            const status = err?.response?.status;

            if (status === 401 || status === 403) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
    },

    // ADD SUBJECT
    addSubject: (subject) =>
        set((state) => ({
            subjects: [...state.subjects, subject]
        })),

    // REMOVE SUBJECT
    removeSubject: (subject) => set((state) => ({
        subjects: state.subjects.filter((s) => s !== subject)
    })),

    clearSubjectStore: () => set({
        subjects: []
    })
}));