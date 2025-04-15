import { create } from "zustand";

type CertificateRecord = {
  name: string;
  cid: string;
  timestamp: string;
};

type CertificateStore = {
  uploads: CertificateRecord[];
  verifications: CertificateRecord[];
  addUpload: (item: CertificateRecord) => void;
  addVerification: (item: CertificateRecord) => void;
};

export const useCertificateStore = create<CertificateStore>((set) => ({
  uploads: [],
  verifications: [],
  addUpload: (item) =>
    set((state) => ({ uploads: [item, ...state.uploads.slice(0, 4)] })),
  addVerification: (item) =>
    set((state) => ({
      verifications: [item, ...state.verifications.slice(0, 4)],
    })),
}));
