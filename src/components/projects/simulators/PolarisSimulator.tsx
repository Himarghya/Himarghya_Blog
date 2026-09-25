import React, { useState } from 'react';
import { GitMerge, Layers } from 'lucide-react';

export const PolarisSimulator: React.FC = () => {
  const [, setIsOnline] = useState<boolean>(false);
  const [nodeAInventory, setNodeAInventory] = useState({ rations: 140, fuelLiters: 480 });
  const [nodeBInventory, setNodeBInventory] = useState({ rations: 140, fuelLiters: 480 });
  const [vectorClockA, setVectorClockA] = useState<number>(3);
  const [vectorClockB, setVectorClockB] = useState<number>(3);
  const [syncMessage, setSyncMessage] = useState<string>('Operating in offline mode. Mutations recorded to local IndexedDB.');

  const consumeRationsNodeA = () => {
    setNodeAInventory((prev) => ({ ...prev, rations: prev.rations - 5 }));
    setVectorClockA((c) => c + 1);
    setSyncMessage('Node A logged local consumption: -5 rations (Vector Clock A updated).');
  };

  const consumeFuelNodeB = () => {
    setNodeBInventory((prev) => ({ ...prev, fuelLiters: prev.fuelLiters - 20 }));
    setVectorClockB((c) => c + 1);
    setSyncMessage('Node B logged local fuel transfer: -20L (Vector Clock B updated).');
  };

  const syncCRDT = () => {
    setIsOnline(true);
    const merged = {
      rations: Math.min(nodeAInventory.rations, nodeBInventory.rations),
      fuelLiters: Math.min(nodeAInventory.fuelLiters, nodeBInventory.fuelLiters)
    };
    setNodeAInventory(merged);
    setNodeBInventory(merged);
    const maxClock = Math.max(vectorClockA, vectorClockB) + 1;
    setVectorClockA(maxClock);
    setVectorClockB(maxClock);
    setSyncMessage(`Satellite link established. CRDT state merged deterministically (Clock: ${maxClock}). 0 conflicts.`);
    setTimeout(() => setIsOnline(false), 3000);
  };

  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-white/10 backdrop-blur-xl bg-zinc-950/80 text-zinc-100 p-4 sm:p-5 font-mono text-xs space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-zinc-400" />
          <span className="font-bold text-zinc-100 tracking-wide">POLARIS Offline-First CRDT Synchronizer</span>
          <span className="px-1.5 py-0.5 bg-zinc-800 text-zinc-300 text-[10px] rounded border border-zinc-700">LWW-ELEMENT-SET</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={syncCRDT}
            className="flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-100 text-zinc-900 rounded-lg font-semibold hover:opacity-90 transition-opacity text-[11px]"
          >
            <GitMerge className="w-3.5 h-3.5" />
            <span>Trigger Satellite Sync</span>
          </button>
        </div>
      </div>

      {/* Nodes Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Node A */}
        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-zinc-200">Research Base Camp (Node A)</span>
            <span className="text-zinc-500">Vector Clock: #{vectorClockA}</span>
          </div>
          <div className="space-y-1 text-[11px] text-zinc-300">
            <div>Emergency Rations: <strong>{nodeAInventory.rations} packs</strong></div>
            <div>Diesel Reserves: <strong>{nodeAInventory.fuelLiters} Liters</strong></div>
          </div>
          <button
            onClick={consumeRationsNodeA}
            className="w-full py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-[11px] transition-colors border border-zinc-700"
          >
            Log Rations Consumption (-5)
          </button>
        </div>

        {/* Node B */}
        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-zinc-200">Glacier Field Unit (Node B)</span>
            <span className="text-zinc-500">Vector Clock: #{vectorClockB}</span>
          </div>
          <div className="space-y-1 text-[11px] text-zinc-300">
            <div>Emergency Rations: <strong>{nodeBInventory.rations} packs</strong></div>
            <div>Diesel Reserves: <strong>{nodeBInventory.fuelLiters} Liters</strong></div>
          </div>
          <button
            onClick={consumeFuelNodeB}
            className="w-full py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-[11px] transition-colors border border-zinc-700"
          >
            Log Fuel Transfer (-20L)
          </button>
        </div>
      </div>

      {/* Status Banner */}
      <div className="p-3 rounded-xl bg-black/50 border border-zinc-800/60 text-zinc-400 text-[11px] leading-relaxed">
        <span className="text-zinc-300 font-semibold mr-1">Log:</span>
        {syncMessage}
      </div>
    </div>
  );
};
