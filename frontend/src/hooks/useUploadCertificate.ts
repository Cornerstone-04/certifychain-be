import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type UploadPayload = {
  name: string;
  content: string;
};

export const useUploadCertificate = () => {
  return useMutation({
    mutationFn: (data: UploadPayload) =>
      api.post("/upload", data).then((res) => res.data),
  });
};
