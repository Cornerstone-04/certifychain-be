import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  onSubmit: (cid: string) => void;
  isPending: boolean;
};

export default function VerifyForm({ onSubmit, isPending }: Props) {
  const [hash, setHash] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hash.trim()) {
      toast("Enter a valid CID");
      return;
    }
    onSubmit(hash.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <Input
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        placeholder="Paste CID here"
        className="text-sm"
      />
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Verifying..." : "Verify Certificate"}
      </Button>
    </form>
  );
}
