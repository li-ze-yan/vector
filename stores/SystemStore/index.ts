import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { IBaseSystem, Theme } from "./type";

export const useSystemStore = create<IBaseSystem>()(
  persist(
    immer((set) => ({
      theme: "system",
      setTheme: (theme: Theme) =>
        set((state) => {
          state.theme = theme;
        }),
    })),
    {
      name: "system-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state?.theme,
      }),
    },
  ),
);
