import { CopyButton } from "@/components/ui/copy-button";

type Props = {
  cid: string;
};

export default function UploadResult({ cid }: Props) {
  return (
    <div className="mt-6 p-4 bg-blue-50 border border-blue-400 rounded shadow-sm text-sm animate-in fade-in zoom-in-75 duration-300">
      ✅ Certificate Uploaded. CID:
      <div className="mt-1 font-mono text-xs break-all">
        <code>{cid}</code>
      </div>
      <CopyButton value={cid} />
    </div>
  );
}
