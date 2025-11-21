import { create } from 'zustand'

export const useFlashcardStore = create((set) => ({
    metadata: {},
    questions: [],
    fetchFlashcard: async (axiosPrivate, location, flashcardId) => {
        try {
            const response = await axiosPrivate.get(`r/flashcard/${flashcardId}`,)
            set({
                metadata: response.data.metadata,
                questions: response.data.questions
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