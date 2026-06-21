import React, { useRef } from 'react';
import useStore from '../store/useStore';
import { Play, Pause, RefreshCw, Zap, Download, Image as ImageIcon, Upload } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useReactFlow, getNodesBounds, getViewportForBounds } from '@xyflow/react';

export const Toolbar = () => {
  const { isRunning, toggleSimulation, setNodes, setEdges, nodes, edges } = useStore();
  const { getNodes } = useReactFlow();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadImage = () => {
    // Select the React Flow container
    const flowElement = document.querySelector('.react-flow') as HTMLElement;
    if (!flowElement) return;

    // Get bounds to fit view before exporting
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      flowElement.offsetWidth,
      flowElement.offsetHeight,
      0.5,
      2,
      0
    );

    // Save current transform to restore later
    const viewportEl = flowElement.querySelector('.react-flow__viewport') as HTMLElement;
    const oldTransform = viewportEl?.style.transform;

    if (viewportEl) {
      viewportEl.style.transform = `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`;
    }

    toPng(flowElement, {
      backgroundColor: '#09090b',
      width: flowElement.offsetWidth,
      height: flowElement.offsetHeight,
      style: {
        width: '100%',
        height: '100%',
      },
    }).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'paperdraw-architecture.png';
      link.href = dataUrl;
      link.click();
      
      // Restore transform
      if (viewportEl) {
        viewportEl.style.transform = oldTransform;
      }
    }).catch(err => {
      console.error('Error exporting image', err);
    });
  };

  const exportJson = () => {
    const data = { nodes, edges };
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'paperdraw-blueprint.json';
    link.click();
  };

  const importJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        if (data.nodes && data.edges) {
          setNodes(data.nodes);
          setEdges(data.edges);
        }
      } catch (err) {
        console.error('Failed to parse JSON', err);
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-[#f4f1ea] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 rounded-full px-6 py-3 flex items-center gap-6 pointer-events-auto shadow-xl shadow-black/5 dark:shadow-black/50 transition-colors">
      
      {/* Fake Sliders */}
      <div className="flex gap-4 border-r border-black/10 dark:border-white/10 pr-6 transition-colors">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 transition-colors">Speed: 1.0x</span>
          <div className="w-24 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full relative transition-colors">
            <div className="absolute left-1/2 -ml-1.5 -top-1 w-3 h-3 bg-zinc-400 dark:bg-zinc-300 rounded-full transition-colors"></div>
          </div>
          <div className="flex justify-between text-[8px] text-zinc-400 dark:text-zinc-500 transition-colors">
            <span>0x</span><span>1x</span><span>2.5x</span><span>5x</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 transition-colors">Traffic: 1.0x</span>
          <div className="w-24 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full relative transition-colors">
            <div className="absolute left-1/4 -ml-1.5 -top-1 w-3 h-3 bg-zinc-400 dark:bg-zinc-300 rounded-full transition-colors"></div>
          </div>
          <div className="flex justify-between text-[8px] text-zinc-400 dark:text-zinc-500 transition-colors">
            <span>0x</span><span>1x</span><span>2.5x</span><span>5x</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          className="w-8 h-8 rounded-lg bg-white dark:bg-[#222] border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#333] transition-colors shadow-sm"
          onClick={downloadImage}
          title="Export Image"
        >
          <ImageIcon size={14} />
        </button>
        <button
          className="w-8 h-8 rounded-lg bg-white dark:bg-[#222] border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#333] transition-colors shadow-sm"
          onClick={exportJson}
          title="Export JSON"
        >
          <Download size={14} />
        </button>
        <label 
          htmlFor="import-json-input"
          className="w-8 h-8 rounded-lg bg-white dark:bg-[#222] border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-[#333] transition-colors shadow-sm cursor-pointer" 
          title="Import JSON"
        >
          <Upload size={14} />
          <input 
            id="import-json-input"
            type="file" 
            accept=".json" 
            className="hidden" 
            onChange={importJson} 
            ref={fileInputRef} 
            aria-label="Import JSON"
            title="Import JSON"
          />
        </label>
      </div>

      <div className="flex items-center gap-3 border-l border-black/10 dark:border-white/10 pl-6 transition-colors">
        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 transition-colors">CHAOS:</span>
        <button className="w-8 h-8 rounded-lg bg-white dark:bg-[#222] border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-yellow-500 hover:bg-yellow-50 dark:hover:bg-[#333] transition-colors shadow-sm" onClick={() => {
            const nodes = useStore.getState().nodes;
            if (nodes.length === 0) return;
            const randomIdx = Math.floor(Math.random() * nodes.length);
            const newNodes = [...nodes];
            newNodes[randomIdx] = { ...newNodes[randomIdx], data: { ...newNodes[randomIdx].data, hasError: true } };
            setNodes(newNodes);
          }} title="Inject Chaos">
          <Zap size={14} className="fill-current" />
        </button>
      </div>

      {/* Actual control for Simulation */}
      <button
        title="Start Simulation"
        onClick={toggleSimulation}
        className="hidden" // Hidden button triggered by Sidebar
      />
    </div>
  );
};
