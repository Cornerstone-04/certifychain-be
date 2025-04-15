import { Button } from "@/components/ui/button";
import { useHistoryStore } from "@/store/historyStore";

export default function HistoryTab() {
  const { uploads, verifications, clearHistory } = useHistoryStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-lg mb-2">Recent Uploads</h2>
        {uploads.length === 0 && (
          <p className="text-sm text-muted-foreground">No uploads yet.</p>
        )}
        <ul className="space-y-2">
          {uploads.map((u, i) => (
            <li key={i} className="text-sm bg-gray-50 border p-3 rounded">
              <div className="font-medium">{u.name}</div>
              <div className="text-xs text-muted-foreground">{u.timestamp}</div>
              <a
                href={`https://ipfs.io/ipfs/${u.cid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-xs underline"
              >
                View CID
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-2">Recent Verifications</h2>
        {verifications.length === 0 && (
          <p className="text-sm text-muted-foreground">No verifications yet.</p>
        )}
        <ul className="space-y-2">
          {verifications.map((v, i) => (
            <li key={i} className="text-sm bg-green-50 border p-3 rounded">
              <div className="font-medium">{v.name}</div>
              <div className="text-xs text-muted-foreground">{v.timestamp}</div>
              <a
                href={`https://ipfs.io/ipfs/${v.cid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-xs underline"
              >
                View CID
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={clearHistory} variant="destructive">
        Clear All History
      </Button>
    </div>
  );
}
