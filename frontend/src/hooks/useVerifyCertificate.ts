import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const useVerifyCertificate = () =>
  useMutation({
    mutationFn: (hash: string) =>
      api.post("/verify/getFile", { hash }).then((res) => res.data),
  });
