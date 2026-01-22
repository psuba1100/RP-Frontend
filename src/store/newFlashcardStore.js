import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNewFlashcardStore = create(
    persist(
        (set) => ({
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

            addCard: (id, front, back) =>
                set((state) => ({
                    cards: {
                        ...state.cards,
                        [id]: {
                            front,
                            back
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
        }),
        {
            name: 'new-flashcard-set'
        }
    )
);
