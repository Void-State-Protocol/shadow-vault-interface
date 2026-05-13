export default function HeartbeatMeter() {
  const bars = [8, 5, 9, 4, 7, 6, 10, 3, 8, 7, 9, 5];

  return (
    <div className="flex items-end gap-1 h-10">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-3 rounded-sm bg-[#00ff9d] opacity-70"
          style={{ height: `${h * 10}%` }}
        />
      ))}
      <span className="ml-3 text-xs text-[#4a4a6a] self-center">STELLAR TESTNET — LIVE</span>
    </div>
  );
}
