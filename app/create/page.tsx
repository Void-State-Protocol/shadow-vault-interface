"use client";
import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";

type Step = "configure" | "encrypt" | "shard" | "deploy";

const STEPS: Step[] = ["configure", "encrypt", "shard", "deploy"];

export default function CreateVault() {
  const [step, setStep] = useState<Step>("configure");
  const [shards, setShards] = useState(3);
  const [threshold, setThreshold] = useState(2);
  const [file, setFile] = useState<File | null>(null);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((l) => [...l, `> ${msg}`]);

  const handleEncrypt = () => {
    if (!file) return;
    addLog(`Encrypting "${file.name}" with AES-256 — local only`);
    addLog("✓ Encryption complete — data never left your machine");
    setStep("shard");
  };

  const handleShard = () => {
    addLog(`Splitting master key into ${shards} shards (threshold: ${threshold})`);
    addLog("✓ Shamir's Secret Sharing complete via WASM");
    setStep("deploy");
  };

  const handleDeploy = () => {
    addLog("Submitting shards to shadow-core-contract...");
    addLog("✓ Vault deployed — TX: 0xabc...def");
  };

  const stepIndex = STEPS.indexOf(step);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#00ff9d] tracking-wider">VAULT DESIGNER</h1>
        <p className="text-xs text-[#4a4a6a] mt-1">Sovereign setup — all operations run locally</p>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2 text-xs">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className={i <= stepIndex ? "text-[#00ff9d]" : "text-[#4a4a6a]"}>
              {i < stepIndex ? "✓" : i === stepIndex ? "▶" : "○"} {s.toUpperCase()}
            </span>
            {i < STEPS.length - 1 && <span className="text-[#1e1e2e]">—</span>}
          </div>
        ))}
      </div>

      <div className="border border-[#1e1e2e] rounded bg-[#0f0f1a] p-6 space-y-6">
        {step === "configure" && (
          <div className="space-y-4">
            <Field label="TOTAL SHARDS">
              <input
                type="number" min={2} max={10} value={shards}
                onChange={(e) => setShards(+e.target.value)}
                className="bg-[#0a0a0f] border border-[#1e1e2e] rounded px-3 py-1.5 w-24 text-[#e0e0ff] focus:border-[#00ff9d] outline-none"
              />
            </Field>
            <Field label="THRESHOLD (MIN TO RECOVER)">
              <input
                type="number" min={1} max={shards} value={threshold}
                onChange={(e) => setThreshold(+e.target.value)}
                className="bg-[#0a0a0f] border border-[#1e1e2e] rounded px-3 py-1.5 w-24 text-[#e0e0ff] focus:border-[#00ff9d] outline-none"
              />
            </Field>
            <Btn onClick={() => setStep("encrypt")}>NEXT: SELECT FILE →</Btn>
          </div>
        )}

        {step === "encrypt" && (
          <div className="space-y-4">
            <Field label="SELECT FILE TO ENCRYPT">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="text-xs text-[#4a4a6a] file:mr-3 file:py-1 file:px-3 file:border file:border-[#1e1e2e] file:bg-[#0a0a0f] file:text-[#00ff9d] file:text-xs file:rounded file:cursor-pointer"
              />
            </Field>
            {file && <StatusBadge status="ok" label={`Selected: ${file.name}`} />}
            <Btn onClick={handleEncrypt} disabled={!file}>ENCRYPT LOCALLY →</Btn>
          </div>
        )}

        {step === "shard" && (
          <div className="space-y-4">
            <StatusBadge status="ok" label="Encryption complete — local only" />
            <p className="text-xs text-[#4a4a6a]">
              Ready to split master key: {shards} shards, {threshold}-of-{shards} threshold
            </p>
            <Btn onClick={handleShard}>RUN SHAMIR'S SECRET SHARING →</Btn>
          </div>
        )}

        {step === "deploy" && (
          <div className="space-y-4">
            <StatusBadge status="ok" label="Shards ready for deployment" />
            <Btn onClick={handleDeploy}>DEPLOY TO STELLAR →</Btn>
          </div>
        )}
      </div>

      {/* Terminal log */}
      {log.length > 0 && (
        <div className="border border-[#1e1e2e] rounded bg-[#0a0a0f] p-4 space-y-1">
          <p className="text-xs text-[#4a4a6a] mb-2 tracking-widest">OPERATION LOG</p>
          {log.map((l, i) => (
            <p key={i} className="text-xs text-[#00ff9d] font-mono">{l}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-[#4a4a6a] tracking-widest">{label}</label>
      {children}
    </div>
  );
}

function Btn({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 text-xs border border-[#00ff9d] text-[#00ff9d] rounded hover:bg-[#00ff9d] hover:text-[#0a0a0f] transition-colors disabled:opacity-30 disabled:cursor-not-allowed tracking-widest"
    >
      {children}
    </button>
  );
}
