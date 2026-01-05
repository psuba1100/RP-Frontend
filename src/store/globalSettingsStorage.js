import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGlobalSettingsStore = create(
    persist(
        (set) => ({
            trustThisDevice: false,

            setTrustThisDevice: (value) => 
                set({trustThisDevice: value})
        }),
        {
            name: 'global-settings',
        }
    )
)