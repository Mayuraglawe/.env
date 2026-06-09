import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';

interface SimulationState {
  isRunning: boolean;
  tickRate: number; // ms per tick
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  toggleSimulation: () => void;
  addNode: (node: Node) => void;
  setSelectedNodeId: (id: string | null) => void;
  updateNodeData: (id: string, data: any) => void;
}

const useStore = create<SimulationState>((set, get) => ({
  isRunning: false,
  tickRate: 1000,
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isDarkMode: false,
  toggleDarkMode: () => {
    set(state => {
      const newMode = !state.isDarkMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isDarkMode: newMode };
    });
  },
  onNodesChange: (changes: NodeChange[]) => {
    // If a node is removed and it was selected, clear selectedNodeId
    const removedNodes = changes.filter(c => c.type === 'remove').map(c => c.id);
    const state = get();
    let nextSelected = state.selectedNodeId;
    if (nextSelected && removedNodes.includes(nextSelected)) {
      nextSelected = null;
    }
    
    // Also track selection changes
    const selectionChange = changes.find(c => c.type === 'select');
    if (selectionChange && selectionChange.type === 'select') {
      if (selectionChange.selected) {
        nextSelected = selectionChange.id;
      } else if (state.selectedNodeId === selectionChange.id) {
        nextSelected = null;
      }
    }

    set({
      nodes: applyNodeChanges(changes, get().nodes),
      selectedNodeId: nextSelected
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge({ ...connection, animated: get().isRunning }, get().edges),
    });
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  toggleSimulation: () => {
    const isRunning = !get().isRunning;
    set({
      isRunning,
      edges: get().edges.map((e) => ({ ...e, animated: isRunning })),
    });
  },
  addNode: (node: Node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  setSelectedNodeId: (id: string | null) => {
    set({ selectedNodeId: id });
  },
  updateNodeData: (id: string, data: any) => {
    set({
      nodes: get().nodes.map(node => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      })
    });
  }
}));

export default useStore;
