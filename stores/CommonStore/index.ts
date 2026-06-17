import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { IBaseCommon } from "./type";

export const useCommonStore = create<IBaseCommon>()(
  persist(
    immer((set) => ({
      docType: null,
      setDocType: (docType) =>
        set((state) => {
          state.docType = docType;
        }),
    })),
    {
      name: "Common-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        docType: state?.docType,
      }),
    },
  ),
);
