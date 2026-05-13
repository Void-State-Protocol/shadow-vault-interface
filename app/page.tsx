import VaultCard from "@/components/VaultCard";
import HeartbeatMeter from "@/components/HeartbeatMeter";

const MOCK_VAULTS = [
  { id: "vault-001", ttl: 72, totalShards: 3, status: "active" as const },
  { id: "vault-002", ttl: 12, totalShards: 5, status: "warning" as const },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#00ff9d] tracking-wider">HEARTBEAT MONITOR</h1>
        <p className="text-xs text-[#4a4a6a] mt-1">Active vaults on Stellar testnet</p>
      </div>

      <div className="grid gap-4">
        {MOCK_VAULTS.map((v) => (
          <VaultCard key={v.id} vault={v} />
        ))}
      </div>

      <div className="border border-[#1e1e2e] rounded p-4 bg-[#0f0f1a]">
        <p className="text-xs text-[#4a4a6a] mb-3 tracking-widest">NETWORK STATUS</p>
        <HeartbeatMeter />
      </div>
    </div>
  );
}
