import { create } from 'zustand'

export const useFlashcardStore = create((set) => ({
    metadata: { saved: false },
    questions: [{ front: { text: '', image: '' }, back: { text: '', image: '' } }],
    numberOfQuestions: 0,
    questionNumber: 1,
    shuffleVersion: 0,
    fetchFlashcard: async (axiosPrivate, location, navigate, flashcardId) => {
        try {
            const response = await axiosPrivate.get(`r/flashcard/${flashcardId}`,)
            set({
                metadata: response.data.metadata,
                questions: response.data.questions,
                numberOfQuestions: response.data.questions.length,
                questionNumber: 1
            })
        } catch (err) {
            console.error(err)
            const status = err?.response?.status;

            if (status === 401 || status === 403) {
                navigate('/login', { state: { from: location }, replace: true });
            }

            if (status == 404) {
                navigate('/404', { replace: true })
                return 
            }

            return ''
        }
    },
    setQuestionNumber: (number) => {
        set({
            questionNumber: number
        })
    },
    shuffle: () => {
        set((state) => {
            let array = [...state.questions];
            let current = array.length;

            while (current !== 0) {
                const randomIndex = Math.floor(Math.random() * current);
                current--;

                [array[current], array[randomIndex]] = [array[randomIndex], array[current]];
            }

            if (state.numberOfQuestions > 1) {
                return {
                    questions: array,
                    shuffleVersion: state.shuffleVersion + 1,
                    questionNumber: 1,
                };
            }
        })
    },
    setMetadataSave: (save) => {
        set((state) => ({
            metadata: {
                ...state.metadata,
                saved: save
            }
        }));
    }
}))