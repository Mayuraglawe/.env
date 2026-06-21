import React from 'react';
import useStore from '../store/useStore';
import { X, Settings2 } from 'lucide-react';

export const ConfigPanel = () => {
  const { nodes, selectedNodeId, updateNodeData, setSelectedNodeId } = useStore();

  if (!selectedNodeId) return null;

  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  if (!selectedNode) return null;

  const data = selectedNode.data;
  const capacity = (data.capacity as number) || 1000;
  const latency = (data.latencyMs as number) || 50;

  return (
    <div className="absolute right-6 top-6 w-80 z-20 bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10 animate-in fade-in slide-in-from-right-4 transition-colors">
      <div className="p-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-zinc-50 dark:bg-zinc-800 transition-colors">
        <h3 className="font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2 transition-colors">
          <Settings2 size={16} className="text-brand-500" />
          Component Settings
        </h3>
        <button 
          onClick={() => setSelectedNodeId(null)}
          className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label="Close settings"
          title="Close settings"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-5 space-y-5">
        <div className="space-y-2">
          <label htmlFor="node-name-input" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider transition-colors">Node Name</label>
          <input 
            id="node-name-input"
            type="text" 
            value={data.label as string}
            onChange={(e) => updateNodeData(selectedNodeId, { label: e.target.value })}
            className="w-full bg-white dark:bg-[#222] border border-zinc-200 dark:border-zinc-700 rounded-lg p-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-shadow transition-colors"
            placeholder="Node Name"
            aria-label="Node Name"
            title="Node Name"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label htmlFor="capacity-input" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider transition-colors">Capacity (RPS)</label>
            <span className="text-xs font-mono text-brand-500 font-bold transition-colors">{capacity.toLocaleString()}</span>
          </div>
          <input 
            id="capacity-input"
            type="range" 
            min="10" 
            max="10000" 
            step="10"
            value={capacity}
            onChange={(e) => updateNodeData(selectedNodeId, { capacity: parseInt(e.target.value) })}
            className="w-full accent-brand-500"
            placeholder="Capacity (RPS)"
            aria-label="Capacity (RPS)"
            title="Capacity (RPS)"
          />
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 transition-colors">Maximum requests per second before bottlenecking.</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label htmlFor="latency-input" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider transition-colors">Latency (ms)</label>
            <span className="text-xs font-mono text-orange-500 font-bold transition-colors">{latency} ms</span>
          </div>
          <input 
            id="latency-input"
            type="range" 
            min="1" 
            max="2000" 
            step="1"
            value={latency}
            onChange={(e) => updateNodeData(selectedNodeId, { latencyMs: parseInt(e.target.value) })}
            className="w-full accent-orange-500"
            placeholder="Latency (ms)"
            aria-label="Latency (ms)"
            title="Latency (ms)"
          />
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 transition-colors">Simulated processing time per request.</p>
        </div>
      </div>
    </div>
  );
};
