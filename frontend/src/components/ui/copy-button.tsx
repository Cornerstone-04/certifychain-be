import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type Props = {
  value: string;
};

export function CopyButton({ value }: Props) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={copy}
      className="mt-2 flex items-center gap-2"
    >
      <Copy size={14} />
      Copy CID
    </Button>
  );
}
