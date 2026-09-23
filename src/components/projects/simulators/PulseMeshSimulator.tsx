import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertOctagon, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

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
              // Auto-complete or lease expire
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
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#0F0F11] text-zinc-100 p-4 sm:p-5 font-mono text-xs space-y-4">
      {/* Title & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-zinc-100 tracking-wide">PulseMesh Live Orchestration Simulator</span>
          <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] rounded">ATOMIC LEASES</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={dispatchNewJob}
            className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded transition-colors text-[11px] font-semibold"
          >
            <Play className="w-3 h-3" />
            <span>Dispatch Job</span>
          </button>
          <button
            onClick={simulateWorkerCrash}
            className="flex items-center gap-1 px-2.5 py-1 bg-red-600/80 hover:bg-red-500 text-white rounded transition-colors text-[11px]"
          >
            <AlertOctagon className="w-3 h-3" />
            <span>Kill Worker 1</span>
          </button>
          <button
            onClick={resetSimulation}
            className="p-1 text-zinc-400 hover:text-zinc-200 rounded transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Live Jobs Table */}
      <div className="space-y-2">
        <div className="grid grid-cols-5 text-[10px] text-zinc-500 uppercase tracking-wider font-semibold border-b border-zinc-800/60 pb-1">
          <span>Job ID</span>
          <span>Claimed By</span>
          <span>Status</span>
          <span>Lease TTL</span>
          <span>Fencing Token</span>
        </div>

        <div className="space-y-1.5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="grid grid-cols-5 items-center p-2 rounded bg-[#16161A] border border-zinc-800/80 text-[11px]"
            >
              <span className="font-bold text-zinc-200">{job.id}</span>
              <span className="text-zinc-400">{job.workerId || 'None (Queue)'}</span>
              <div>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                    job.status === 'ACTIVE'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : job.status === 'COMPLETED'
                      ? 'bg-blue-500/20 text-blue-400'
                      : job.status === 'FAILED'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-zinc-700 text-zinc-300'
                  }`}
                >
                  {job.status}
                </span>
              </div>
              <span className="text-amber-400">{job.leaseTtl > 0 ? `${job.leaseTtl}s` : '--'}</span>
              <span className="text-zinc-400">#{job.fencingToken}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Output Log */}
      <div className="p-2.5 rounded bg-black/50 border border-zinc-800 space-y-1 text-[11px]">
        <div className="text-[10px] text-zinc-500 uppercase">Engine Event Log</div>
        {logs.map((log, idx) => (
          <div key={idx} className="text-zinc-400 flex items-start gap-1.5">
            <span className="text-emerald-500 font-bold">&gt;</span>
            <span className={log.includes('CRITICAL') ? 'text-red-400' : 'text-zinc-300'}>{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
