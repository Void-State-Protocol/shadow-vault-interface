"use client";
import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";

export default function ShadowPortal() {
  const [claimKey, setClaimKey] = useState("");
  const [phase, setPhase] = useState<"idle" | "proving" | "done">("idle");
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((l) => [...l, `> ${msg}`]);

  const handleProve = () => {
    if (!claimKey.trim()) return;
    setPhase("proving");
    addLog("Generating ZK-SNARK proof locally via snarkjs...");
    // Simulate async proof generation
    setTimeout(() => {
      addLog("✓ Proof generated — witness computed");
      addLog("Submitting proof to shadow-core-contract...");
      setTimeout(() => {
        addLog("✓ Contract verified proof — shards released");
        addLog("Reconstructing data from shards (Shamir's)...");
        addLog("✓ Data reconstructed — decryption complete");
        setPhase("done");
      }, 1200);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#00ff9d] tracking-wider">SHADOW PORTAL</h1>
        <p className="text-xs text-[#4a4a6a] mt-1">Anonymous beneficiary claiming — ZK-SNARK verified</p>
      </div>

      <div className="border border-[#1e1e2e] rounded bg-[#0f0f1a] p-6 space-y-5">
        <div className="space-y-1">
          <label className="text-xs text-[#4a4a6a] tracking-widest">CLAIM KEY / VAULT ID</label>
          <input
            type="text"
            value={claimKey}
            onChange={(e) => setClaimKey(e.target.value)}
            placeholder="vault-..."
            className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded px-3 py-2 text-sm text-[#e0e0ff] placeholder-[#4a4a6a] focus:border-[#00ff9d] outline-none"
          />
        </div>

        <div className="text-xs text-[#4a4a6a] border border-[#1e1e2e] rounded p-3 space-y-1">
          <p className="text-[#e0e0ff]">How this works:</p>
          <p>1. A ZK proof is generated locally — your identity is never revealed</p>
          <p>2. The contract verifies the proof and releases encrypted shards</p>
          <p>3. Shards are combined with your local fragment to reconstruct the data</p>
        </div>

        {phase === "done" && <StatusBadge status="ok" label="Vault claimed — data reconstructed locally" />}

        <button
          onClick={handleProve}
          disabled={!claimKey.trim() || phase !== "idle"}
          className="px-4 py-2 text-xs border border-[#00ff9d] text-[#00ff9d] rounded hover:bg-[#00ff9d] hover:text-[#0a0a0f] transition-colors disabled:opacity-30 disabled:cursor-not-allowed tracking-widest"
        >
          {phase === "proving" ? "GENERATING PROOF..." : phase === "done" ? "✓ CLAIMED" : "GENERATE ZK PROOF & CLAIM →"}
        </button>
      </div>

      {log.length > 0 && (
        <div className="border border-[#1e1e2e] rounded bg-[#0a0a0f] p-4 space-y-1">
          <p className="text-xs text-[#4a4a6a] mb-2 tracking-widest">PROOF LOG</p>
          {log.map((l, i) => (
            <p key={i} className="text-xs text-[#00ff9d] font-mono">{l}</p>
          ))}
        </div>
      )}
    </div>
  );
}
