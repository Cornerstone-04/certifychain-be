import { useVerifyCertificate } from "@/hooks/useVerifyCertificate";
import VerifyForm from "@/components/verify/verify-form";
import VerifiedResult from "@/components/verify/verified-result";
import { toast } from "sonner";
import { useCertificateStore } from "@/store/certificateStore";

export default function VerifyTab() {
  const { mutate, data, isPending } = useVerifyCertificate();
  const { addVerification } = useCertificateStore();

  const handleSubmit = (cid: string) => {
    mutate(cid, {
      onSuccess: () => {
        toast.success("Upload successful");
        addVerification({
          name: "Verified Certificate",
          cid: cid,
          timestamp: new Date().toISOString(),
        });
      },
      onError: () => toast.error("Verification failed"),
    });
  };

  return (
    <div className="flex justify-center bg-muted/30 px-4 py-10 sm:py-12">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Verify Certificate
        </h1>
        <VerifyForm onSubmit={handleSubmit} isPending={isPending} />
        {data?.file && <VerifiedResult file={data.file} />}
      </div>
    </div>
  );
}
