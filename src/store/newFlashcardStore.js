import { create } from "zustand";

export const useNewFlashcardStore = create((set) => ({
    cards: {},

    createCard: (id) =>
        set((state) => ({
            cards: {
                ...state.cards,
                [id]: {
                    front: { text: "", image: "" },
                    back: { text: "", image: "" }
                }
            }
        })),

    removeCard: (id) =>
        set((state) => {
            const { [id]: removed, ...rest } = state.cards;
            return { cards: rest };
        }),

    clearCards: () => set({ cards: {} }),

    updateCard: (id, section, field, value) =>
        set((state) => ({
            cards: {
                ...state.cards,
                [id]: {
                    ...state.cards[id],
                    [section]: {
                        ...state.cards[id][section],
                        [field]: value
                    }
                }
            }
        })),
}));
