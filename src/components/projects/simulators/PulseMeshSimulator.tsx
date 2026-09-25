import React, { useState, useEffect } from 'react';
import { RotateCcw, ShieldAlert, Cpu } from 'lucide-react';

interface SimulatedJob {
  id: string;
  workerId: string | null;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'FAILED';
  leaseTtl: number;
  fencingToken: number;
  payload: string;
}

export const PulseMeshSimulator: React.FC = () => {
  const [jobs, setJobs] = useState<SimulatedJob[]>([
    { id: 'job_8941', workerId: 'worker_node_1', status: 'ACTIVE', leaseTtl: 14, fencingToken: 104, payload: 'compute_aggregate_batch' },
    { id: 'job_8942', workerId: 'worker_node_2', status: 'ACTIVE', leaseTtl: 21, fencingToken: 105, payload: 'sync_user_ledger' },
    { id: 'job_8943', workerId: null, status: 'PENDING', leaseTtl: 0, fencingToken: 106, payload: 'generate_invoice_pdf' },
  ]);
  const [tokenCounter, setTokenCounter] = useState(107);
  const [logs, setLogs] = useState<string[]>([
    'System initialized. Redis ZSET lease manager active.',
    'Worker 1 acquired lease on job_8941 (Fencing Token: 104)',
    'Worker 2 acquired lease on job_8942 (Fencing Token: 105)'
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setJobs((prev) =>
        prev.map((job) => {
          if (job.status === 'ACTIVE') {
            if (job.leaseTtl <= 1) {
              return { ...job, status: 'COMPLETED', leaseTtl: 0, workerId: null };
            }
            return { ...job, leaseTtl: job.leaseTtl - 1 };
          }
          return job;
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dispatchNewJob = () => {
    const newId = `job_${Math.floor(1000 + Math.random() * 9000)}`;
    const nextToken = tokenCounter;
    setTokenCounter((c) => c + 1);

    const newJob: SimulatedJob = {
      id: newId,
      workerId: Math.random() > 0.4 ? (Math.random() > 0.5 ? 'worker_node_1' : 'worker_node_2') : null,
      status: 'ACTIVE',
      leaseTtl: 25,
      fencingToken: nextToken,
      payload: 'dispatch_event_stream'
    };

    setJobs((prev) => [newJob, ...prev.slice(0, 4)]);
    setLogs((prev) => [
      `New job dispatched: ${newId} (Lease: 25s, Token: ${nextToken})`,
      ...prev.slice(0, 4)
    ]);
  };

  const simulateWorkerCrash = () => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.workerId === 'worker_node_1') {
          return { ...job, status: 'FAILED', workerId: null, leaseTtl: 0 };
        }
        return job;
      })
    );
    setLogs((prev) => [
      'CRITICAL: worker_node_1 crashed. Reaper re-queuing orphaned jobs with monotonic fencing validation.',
      ...prev.slice(0, 4)
    ]);
  };

  const resetSimulation = () => {
    setJobs([
      { id: 'job_8941', workerId: 'worker_node_1', status: 'ACTIVE', leaseTtl: 18, fencingToken: 104, payload: 'compute_aggregate_batch' },
      { id: 'job_8942', workerId: 'worker_node_2', status: 'ACTIVE', leaseTtl: 24, fencingToken: 105, payload: 'sync_user_ledger' },
      { id: 'job_8943', workerId: null, status: 'PENDING', leaseTtl: 0, fencingToken: 106, payload: 'generate_invoice_pdf' },
    ]);
    setLogs(['Simulation reset to initial state.']);
  };

  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-white/10 backdrop-blur-xl bg-zinc-950/80 text-zinc-100 p-4 sm:p-5 font-mono text-xs space-y-4 shadow-xl">
      {/* Title & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-zinc-400" />
          <span className="font-bold text-zinc-100 tracking-wide">PulseMesh Live Orchestration Simulator</span>
          <span className="px-1.5 py-0.5 bg-zinc-800 text-zinc-300 text-[10px] rounded border border-zinc-700">ATOMIC LEASES</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={dispatchNewJob}
            className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-100 text-zinc-900 rounded-lg font-semibold hover:opacity-90 transition-opacity text-[11px]"
          >
            + Dispatch Job
          </button>
          <button
            onClick={simulateWorkerCrash}
            className="flex items-center gap-1 px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors text-[11px] border border-zinc-700"
          >
            <ShieldAlert className="w-3 h-3 text-zinc-400" />
            <span>Kill Worker 1</span>
          </button>
          <button
            onClick={resetSimulation}
            className="p-1 text-zinc-400 hover:text-zinc-200 rounded"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Active Jobs Grid */}
      <div className="space-y-2">
        <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
          Active Job Queue (Redis Key-Space)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-3 rounded-xl backdrop-blur-sm bg-zinc-900/60 border border-zinc-800/80 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-200">{job.id}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {job.status}
                </span>
              </div>
              <div className="text-[11px] text-zinc-400">
                Worker: <span className="text-zinc-300">{job.workerId || 'none'}</span>
              </div>
              <div className="text-[11px] text-zinc-400">
                Fencing Token: <span className="text-zinc-200 font-semibold">#{job.fencingToken}</span>
              </div>
              <div className="text-[11px] text-zinc-400">
                Lease TTL: <span className="text-zinc-200 font-semibold">{job.leaseTtl}s</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Event Stream */}
      <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
        <div className="text-[11px] text-zinc-500 uppercase tracking-wider">
          Telemetry Event Log
        </div>
        <div className="p-3 rounded-xl bg-black/50 border border-zinc-800/60 space-y-1 text-[11px] text-zinc-400 max-h-24 overflow-y-auto">
          {logs.map((log, i) => (
            <div key={i} className="leading-tight font-mono">
              <span className="text-zinc-600 mr-2">&gt;</span>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
