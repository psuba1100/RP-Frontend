import { create } from "zustand";

export const useLockerStore = create((set, get) => ({
    items: [],
    changes: false,

    toggleChange: (change) => {
        set({ changes: change })
    },

    // FETCH AND NORMALIZE
    fetchItems: async (axiosPrivate, location, navigate) => {
        try {
            const response = await axiosPrivate.get("/u/locker");

            const { itemsInLocker, itemsOutsideLocker } = response.data;

            const merged = [
                ...itemsInLocker.map((item) => ({
                    item,
                    inLocker: true
                })),
                ...itemsOutsideLocker.map((item) => ({
                    item,
                    inLocker: false
                }))
            ];

            set({ items: merged });

        } catch (err) {
            console.error(err);
            const status = err?.response?.status;

            if (status === 401 || status === 403) {
                navigate("/login", { state: { from: location }, replace: true });
            }
        }
    },

    // TOGGLE IN/OUT OF LOCKER
    toggleItem: (itemName) =>
        set((state) => ({
            items: state.items.map((obj) =>
                obj.item === itemName
                    ? { ...obj, inLocker: !obj.inLocker }
                    : obj
            ),
            changes: true
        })),

    // ADD ITEM
    addItem: (itemName, inLocker, setErrMsg) => {
        const { items } = get();

        // check if item exists
        if (items.some((i) => i.item === itemName)) {
            setErrMsg("Item already exists.");
            return;
        }

        set((state) => ({
            items: [
                ...state.items,
                { item: itemName, inLocker }
            ],
            changes: true
        }));
    },

    // REMOVE ITEM
    removeItem: (itemName) => {
        set((state) => ({
            items: state.items.filter((i) => i.item !== itemName),
            changes: true
        }));
    },

    // CONVERT BACK TO API FORMAT
    exportToApiFormat: () => {
        const items = get().items;

        return {
            itemsInLocker: items.filter((i) => i.inLocker).map((i) => i.item),
            itemsOutsideLocker: items.filter((i) => !i.inLocker).map((i) => i.item)
        };
    }
}));