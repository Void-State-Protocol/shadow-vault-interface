type Props = { status: "ok" | "warn" | "error"; label: string };

const styles = {
  ok:    "border-[#00ff9d] text-[#00ff9d]",
  warn:  "border-[#ff6b35] text-[#ff6b35]",
  error: "border-red-500 text-red-500",
};

const dots = { ok: "●", warn: "◉", error: "✕" };

export default function StatusBadge({ status, label }: Props) {
  return (
    <span className={`inline-flex items-center gap-1.5 border rounded px-2 py-0.5 text-xs tracking-wider ${styles[status]}`}>
      <span className="text-[8px]">{dots[status]}</span>
      {label}
    </span>
  );
}
