import { useEffect, useCallback, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
import {
  ReactFlow,
  Controls,
  ReactFlowProvider,
  useReactFlow,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { getProblemById } from '../data/problems';
import { ProblemDescription } from '../components/workspace/ProblemDescription';

import { BaseNode } from '../components/nodes/BaseNode';
import { Sidebar } from '../components/Sidebar';
import { Toolbar } from '../components/Toolbar';
import { ConfigPanel } from '../components/ConfigPanel';
import { AnimatedEdge } from '../components/edges/AnimatedEdge';
import useStore from '../store/useStore';
import { engine } from '../engine/SimulationEngine';

const createNode = (category: string, icon: string) => (props: any) => (
  <BaseNode {...props} category={category} icon={icon} />
);

const nodeTypes = {
  webBrowser: createNode('Clients', '🌐'),
  mobileApp: createNode('Clients', '📱'),
  loadBalancer: createNode('Networking', '⚖️'),
  apiGateway: createNode('Networking', '🚪'),
  cdn: createNode('Networking', '🌍'),
  apiServer: createNode('Compute', '⚙️'),
  worker: createNode('Compute', '👷'),
  serverless: createNode('Compute', 'λ'),
  sqlDatabase: createNode('Storage', '🗄️'),
  nosqlDatabase: createNode('Storage', '📦'),
  objectStorage: createNode('Storage', '🪣'),
  cache: createNode('Caching', '⚡'),
  messageQueue: createNode('Messaging', '📨'),
  eventStream: createNode('Messaging', '🌊'),
  externalService: createNode('External', '🔌'),
};

const edgeTypes = {
  default: AnimatedEdge,
};

let id = 4;
const getId = () => `${id++}`;

const initialNodes: Node[] = [
  { id: '1', data: { label: 'Route 53 LB' }, position: { x: 300, y: 100 }, type: 'loadBalancer' },
  { id: '2', data: { label: 'Redis Session Cache' }, position: { x: 100, y: 300 }, type: 'cache' },
  { id: '3', data: { label: 'Users DB' }, position: { x: 500, y: 300 }, type: 'sqlDatabase' },
];

const CanvasArea = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setNodes, setEdges, isRunning } = useStore();
  const { screenToFlowPosition } = useReactFlow();

  // Initialize store with default nodes if empty
  useEffect(() => {
    if (nodes.length === 0) {
      setNodes(initialNodes);
      setEdges([
        { id: 'e1-2', source: '1', target: '2', type: 'default' },
        { id: 'e1-3', source: '1', target: '3', type: 'default' },
      ]);
    }
  }, []);

  // Manage simulation engine
  useEffect(() => {
    if (isRunning) {
      engine.start();
    } else {
      engine.stop();
    }
  }, [isRunning]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/reactflow-label');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: label, load: 0, hasError: false },
      };

      setNodes([...useStore.getState().nodes, newNode]);
    },
    [screenToFlowPosition, setNodes]
  );

  return (
    <div className="flex-1 h-full min-h-0 relative paper-grid" ref={reactFlowWrapper}>
      <Toolbar />
      <ConfigPanel />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        defaultEdgeOptions={{ 
          type: 'default',
          markerEnd: { type: 'arrowclosed', width: 20, height: 20, color: 'var(--color-node-border)' }
        }}
        fitView
      >
        <Controls className="bg-white border-black/10 fill-zinc-400" />
      </ReactFlow>
    </div>
  );
};

export default function Workspace() {
  const { id } = useParams();
  const problem = getProblemById(id);

  if (!problem) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-1 w-full h-full overflow-hidden bg-white dark:bg-[#121212]">
      {/* @ts-expect-error autoSaveId exists in runtime */}
      <PanelGroup autoSaveId="workspace-split-v2" direction="horizontal" className="w-full h-full flex">
        {/* Left Pane: Problem Description */}
        {/* @ts-expect-error order exists in runtime */}
        <Panel id="left-pane" order={1} defaultSize={35} minSize={20} maxSize={50}>
          <ProblemDescription problem={problem} />
        </Panel>

        <PanelResizeHandle id="resize-handle" className="w-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-brand-500/20 active:bg-brand-500/40 cursor-col-resize flex flex-col justify-center items-center transition-colors border-x border-black/5 dark:border-white/5">
          <div className="h-10 w-0.5 bg-zinc-300 dark:bg-zinc-600 rounded-full" />
        </PanelResizeHandle>

        {/* Right Pane: Canvas Editor */}
        {/* @ts-expect-error order exists in runtime */}
        <Panel id="right-pane" order={2} defaultSize={65} minSize={40}>
          <div className="flex flex-1 overflow-hidden relative w-full h-full flex-col bg-zinc-50 dark:bg-[#121212]">
            <div className="flex flex-1 overflow-hidden relative w-full h-full">
              <Sidebar />
              <ReactFlowProvider>
                <CanvasArea />
              </ReactFlowProvider>
            </div>
            
            {/* Bottom Action Bar */}
            <div className="h-14 bg-white dark:bg-[#1a1a1a] border-t border-black/10 dark:border-white/10 flex items-center justify-between px-6 shrink-0 transition-colors z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.02)] dark:shadow-[0_-4px_12px_rgba(0,0,0,0.2)]">
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Simulation Engine
              </div>
              <div className="flex items-center gap-3">
                <button className="px-5 py-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-sm">
                  Run Simulation
                </button>
                <button className="px-6 py-2 text-xs font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors shadow-sm flex items-center gap-2">
                  Submit <span className="text-[10px] font-mono opacity-75 hidden sm:inline-block border border-white/20 rounded px-1 ml-1">⌘ Enter</span>
                </button>
              </div>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
