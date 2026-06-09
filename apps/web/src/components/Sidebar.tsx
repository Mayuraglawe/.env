import React from 'react';

const nodeTypes = [
  { type: 'webBrowser', label: 'Web Browser', category: 'Clients' },
  { type: 'mobileApp', label: 'Mobile App', category: 'Clients' },
  { type: 'loadBalancer', label: 'Load Balancer', category: 'Networking' },
  { type: 'apiGateway', label: 'API Gateway', category: 'Networking' },
  { type: 'cdn', label: 'CDN', category: 'Networking' },
  { type: 'apiServer', label: 'Service', category: 'Compute' },
  { type: 'worker', label: 'Worker', category: 'Compute' },
  { type: 'serverless', label: 'Serverless Function', category: 'Compute' },
  { type: 'sqlDatabase', label: 'SQL Database', category: 'Storage' },
  { type: 'nosqlDatabase', label: 'NoSQL Database', category: 'Storage' },
  { type: 'objectStorage', label: 'Object Storage', category: 'Storage' },
  { type: 'cache', label: 'Cache', category: 'Caching' },
  { type: 'messageQueue', label: 'Message Queue', category: 'Messaging' },
  { type: 'eventStream', label: 'Event Stream', category: 'Messaging' },
  { type: 'externalService', label: 'External API', category: 'External' },
];

export const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/reactflow-label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-72 bg-white dark:bg-[#1a1a1a] border-r border-black/10 dark:border-white/10 flex flex-col z-10 shrink-0 h-full pointer-events-auto transition-colors">
      {/* Top Tabs */}
      <div className="p-4 border-b border-black/5 dark:border-white/5">
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl transition-colors">
          <button className="flex-1 py-1.5 text-xs font-bold text-brand-500 bg-white dark:bg-zinc-700 rounded-lg shadow-sm transition-colors">
            Presets
          </button>
          <button className="flex-1 py-1.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
            Chaos
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-black/5 dark:border-white/5">
        <div className="relative">
          <svg className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input 
            type="text" 
            placeholder="Search components" 
            className="w-full bg-white dark:bg-[#222] border border-zinc-200 dark:border-zinc-700 rounded-lg py-2 pl-9 pr-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Recommended Container (Fake) */}
        <div>
          <h3 className="text-[11px] font-bold text-brand-500 uppercase tracking-widest mb-2 flex items-center gap-1">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>
            Recommended
          </h3>
          <p className="text-xs text-brand-500/70 mb-3 leading-tight">Drop a container and name it. The system handles the rest.</p>
          <div className="w-full h-20 border-2 border-dashed border-brand-300 dark:border-brand-500/50 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center cursor-not-allowed transition-colors">
            <span className="text-brand-500 text-sm font-bold">Smart Container</span>
          </div>
        </div>

        {['Clients', 'Networking', 'Compute', 'Storage', 'Caching', 'Messaging', 'External'].map((category) => {
          const categoryNodes = nodeTypes.filter((n) => n.category === category);
          if (categoryNodes.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
                {category}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {categoryNodes.map((node) => (
                  <div
                    key={node.type}
                    className="flex flex-col items-center p-3 rounded-xl bg-white dark:bg-[#222] border border-zinc-200 dark:border-zinc-700 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-md cursor-grab active:cursor-grabbing transition-all group"
                    onDragStart={(event) => onDragStart(event, node.type, node.label)}
                    draggable
                  >
                    <span className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-[#1a1a1a] flex items-center justify-center mb-2 border border-zinc-100 dark:border-zinc-800 group-hover:bg-brand-50 dark:group-hover:bg-brand-500/20 transition-colors">
                       <div className="w-4 h-4 rounded-full bg-zinc-300 dark:bg-zinc-600 group-hover:bg-brand-400 transition-colors" />
                    </span>
                    <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400 text-center leading-tight">
                      {node.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Button */}
      <div className="p-4 border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#1a1a1a] transition-colors">
        <button 
          className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-brand-500/20 transition-colors"
          onClick={() => {
            const toggleButton = document.querySelector('[title="Start Simulation"]') as HTMLButtonElement;
            if (toggleButton) toggleButton.click();
          }}
        >
          START SIMULATION
        </button>
      </div>
    </aside>
  );
};
