import { CopyButton } from "@/components/ui/copy-button";

type Props = {
  file: string;
};

export default function VerifiedResult({ file }: Props) {
  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-400 rounded shadow-sm text-sm animate-in fade-in zoom-in-75 duration-300">
      ✅ Certificate Verified:
      <div className="mt-1 font-mono text-xs break-words">
        <code>{file}</code>
      </div>
      <CopyButton value={file} />
      <a
        href={`https://ipfs.io/ipfs/${file}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-blue-600 underline text-xs inline-block"
      >
        View on IPFS
      </a>
    </div>
  );
}
