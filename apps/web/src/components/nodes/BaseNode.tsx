import { Handle, Position, NodeProps } from '@xyflow/react';

type BaseNodeProps = NodeProps & {
  icon?: string;
  category: string;
};

export function BaseNode({ data, selected, icon, category }: BaseNodeProps) {
  const nodeIcon = (icon || data.icon || '📦') as string;
  const nodeCategory = (category || data.category || 'Component') as string;
  const label = data.label as string;
  const load = (data.load as number) || 0;
  const hasError = data.hasError as boolean;
  const isBottleneck = data.isBottleneck as boolean;

  return (
    <div className={`
      relative min-w-[200px] rounded-[24px] border-[2.5px] transition-all duration-200 bg-white dark:bg-[#222] p-5 pt-7
      ${selected ? 'border-brand-500 z-10' : 'border-[#333] dark:border-[#555]'}
      ${hasError ? '!border-red-500 bg-red-50 dark:bg-red-900/20' : isBottleneck ? '!border-orange-500 bg-orange-50 dark:bg-orange-900/20' : ''}
      shadow-sm
    `}>
      {/* Top Left Badge */}
      <div className={`absolute -top-2.5 left-4 px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 bg-white dark:bg-[#222] transition-colors
        ${hasError ? 'border-red-500 text-red-500' : isBottleneck ? 'border-orange-500 text-orange-500' : 'border-brand-500 text-brand-500'}
      `}>
        {nodeCategory} {hasError ? '!' : isBottleneck ? '⚠' : '✦'}
      </div>

      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white dark:bg-[#222] border-2 border-zinc-400 dark:border-zinc-500 rounded-full" />
      <Handle type="target" position={Position.Left} id="left" className="w-3 h-3 bg-white dark:bg-[#222] border-2 border-zinc-400 dark:border-zinc-500 rounded-full" />
      
      <div className="flex flex-col w-full h-full justify-center">
        <div className="handwriting text-2xl text-[#222] dark:text-[#eee] leading-tight transition-colors">
          {label}
        </div>
      </div>

      {/* Metrics Dashboard (only shown if load > 0) */}
      {(load > 0 || hasError) && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-[#222] border border-[#333] dark:border-[#555] rounded-md px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 shadow-sm flex items-center gap-2 whitespace-nowrap transition-colors">
          <span>RPS: <strong className={hasError ? 'text-red-500' : isBottleneck ? 'text-orange-500' : 'text-zinc-800 dark:text-zinc-200'}>{hasError ? '0' : load.toLocaleString()}</strong></span>
        </div>
      )}

      {/* Settings icon bottom right */}
      <div className="absolute bottom-3 right-3 text-zinc-400 dark:text-zinc-600 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-white dark:bg-[#222] border-2 border-zinc-400 dark:border-zinc-500 rounded-full" />
      <Handle type="source" position={Position.Right} id="right" className="w-3 h-3 bg-white dark:bg-[#222] border-2 border-zinc-400 dark:border-zinc-500 rounded-full" />
    </div>
  );
}
