import UploadForm from "@/components/upload/upload-form";
import UploadResult from "@/components/upload/upload-result";
import { useUploadCertificate } from "@/hooks/useUploadCertificate";
import { useCertificateStore } from "@/store/certificateStore";
import { toast } from "sonner";

export default function UploadTab() {
  const { mutate, data, isPending } = useUploadCertificate();
  const { addUpload } = useCertificateStore();

  const handleSubmit = (name: string, base64: string) => {
    mutate(
      { name, content: base64 },
      {
        onSuccess: () => {
          toast.success("Upload successful");
          addUpload({
            name,
            cid: data.cid,
            timestamp: new Date().toISOString(),
          });
        },
        onError: () => toast.error("Upload failed"),
      }
    );
  };

  return (
    <div className="flex justify-center bg-muted/30 px-4 py-10 sm:py-12">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Upload Certificate
        </h1>
        <UploadForm onSubmit={handleSubmit} isPending={isPending} />
        {data?.cid && <UploadResult cid={data.cid} />}
      </div>
    </div>
  );
}
