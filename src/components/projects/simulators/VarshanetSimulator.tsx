import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Filter, RefreshCw } from 'lucide-react';

interface SensorReading {
  timestamp: string;
  station: string;
  tempC: number;
  humidity: number;
  isAnomaly: boolean;
}

export const VarshanetSimulator: React.FC = () => {
  const [filterAnomalies, setFilterAnomalies] = useState<boolean>(true);
  const [readings, setReadings] = useState<SensorReading[]>([
    { timestamp: '01:35:10', station: 'STATION_NE_04', tempC: 24.2, humidity: 68, isAnomaly: false },
    { timestamp: '01:35:12', station: 'STATION_SW_12', tempC: 25.1, humidity: 64, isAnomaly: false },
    { timestamp: '01:35:14', station: 'STATION_HUB_01', tempC: 89.4, humidity: 12, isAnomaly: true },
    { timestamp: '01:35:16', station: 'STATION_NE_05', tempC: 24.5, humidity: 67, isAnomaly: false },
    { timestamp: '01:35:18', station: 'STATION_EAST_09', tempC: 23.9, humidity: 70, isAnomaly: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const isGlitch = Math.random() < 0.25;

      const newReading: SensorReading = {
        timestamp: timeStr,
        station: `STATION_${['NE_04', 'SW_12', 'EAST_09', 'HUB_01', 'NORTH_02'][Math.floor(Math.random() * 5)]}`,
        tempC: isGlitch ? Number((75 + Math.random() * 20).toFixed(1)) : Number((23 + Math.random() * 4).toFixed(1)),
        humidity: isGlitch ? Math.floor(10 + Math.random() * 10) : Math.floor(62 + Math.random() * 12),
        isAnomaly: isGlitch
      };

      setReadings((prev) => [newReading, ...prev.slice(0, 5)]);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const displayedReadings = filterAnomalies
    ? readings.filter((r) => !r.isAnomaly)
    : readings;

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#0F0F11] text-zinc-100 p-4 sm:p-5 font-mono text-xs space-y-4">
      {/* Title & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-zinc-100 tracking-wide">VARSHANET Telemetry & Anomaly Stream</span>
          <span className="px-1.5 py-0.2 bg-cyan-500/20 text-cyan-400 text-[10px] rounded">3-SIGMA FILTER</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterAnomalies(!filterAnomalies)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              filterAnomalies
                ? 'bg-cyan-600 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            <Filter className="w-3 h-3" />
            <span>{filterAnomalies ? 'Outlier Filter: ACTIVE' : 'Outlier Filter: OFF (Show Raw)'}</span>
          </button>
        </div>
      </div>

      {/* Sensor Stream Table */}
      <div className="space-y-2">
        <div className="grid grid-cols-5 text-[10px] text-zinc-500 uppercase tracking-wider font-semibold border-b border-zinc-800/60 pb-1">
          <span>Timestamp</span>
          <span>Station ID</span>
          <span>Temperature</span>
          <span>Humidity</span>
          <span>Verification</span>
        </div>

        <div className="space-y-1.5">
          {displayedReadings.map((r, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-5 items-center p-2 rounded border text-[11px] transition-all ${
                r.isAnomaly
                  ? 'bg-red-950/30 border-red-800/60 text-red-300'
                  : 'bg-[#16161A] border-zinc-800/80 text-zinc-200'
              }`}
            >
              <span className="text-zinc-400">{r.timestamp}</span>
              <span className="font-semibold">{r.station}</span>
              <span className={r.isAnomaly ? 'font-bold text-red-400' : 'text-emerald-400'}>
                {r.tempC} °C
              </span>
              <span>{r.humidity}%</span>
              <div>
                {r.isAnomaly ? (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400">
                    ANOMALY (DROPPED)
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 flex items-center gap-1 w-fit">
                    <ShieldCheck className="w-3 h-3" /> VALID
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="p-2.5 rounded bg-black/50 border border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
        <span>PostgreSQL Hypertables batch insertion latency: <strong>4.2ms</strong></span>
        <span className="text-cyan-400">Continuous 1-hour rollup: ENABLED</span>
      </div>
    </div>
  );
};
