import { create } from "zustand";
import { persist } from "zustand/middleware";

type CertificateRecord = {
  name: string;
  cid: string;
  timestamp: string;
};

type HistoryStore = {
  uploads: CertificateRecord[];
  verifications: CertificateRecord[];
  addUpload: (item: CertificateRecord) => void;
  addVerification: (item: CertificateRecord) => void;
  clearHistory: () => void;
};

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      uploads: [],
      verifications: [],
      addUpload: (item) =>
        set((state) => ({ uploads: [item, ...state.uploads] })),
      addVerification: (item) =>
        set((state) => ({ verifications: [item, ...state.verifications] })),
      clearHistory: () => set({ uploads: [], verifications: [] }),
    }),
    {
      name: "history-storage", // localStorage key
    }
  )
);
