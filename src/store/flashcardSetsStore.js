import { create } from 'zustand'

export const useFlashcardSetsStore = create((set) => ({
    flashcardSets: [],
    count: 0,
    fetchFlashcardSets: async (axiosPrivate, location, p, s) => {
        try {
            const response = await axiosPrivate.get('u/flashcards',
                {
                    params: {
                        ...(s && { s }),
                        ...(p && { p }),
                    }
                }
            )
            set({
                flashcardSets: response.data.flashcards,
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