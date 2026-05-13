import StatusBadge from "./StatusBadge";

type Vault = {
  id: string;
  ttl: number; // hours remaining
  totalShards: number;
  status: "active" | "warning" | "expired";
};

export default function VaultCard({ vault }: { vault: Vault }) {
  const ttlColor = vault.ttl < 24 ? "text-[#ff6b35]" : "text-[#00ff9d]";

  return (
    <div className="border border-[#1e1e2e] rounded bg-[#0f0f1a] p-4 flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm font-bold tracking-wider">{vault.id}</p>
        <div className="flex gap-4 text-xs text-[#4a4a6a]">
          <span>SHARDS: {vault.totalShards}</span>
          <span className={ttlColor}>TTL: {vault.ttl}h</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <StatusBadge status={vault.status === "active" ? "ok" : vault.status === "warning" ? "warn" : "error"} label={vault.status.toUpperCase()} />
        <button className="px-3 py-1 text-xs border border-[#1e1e2e] text-[#4a4a6a] rounded hover:border-[#00ff9d] hover:text-[#00ff9d] transition-colors tracking-widest">
          FEED ♥
        </button>
      </div>
    </div>
  );
}
