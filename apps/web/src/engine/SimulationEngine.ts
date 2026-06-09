import useStore from '../store/useStore';

class SimulationEngine {
  private timer: number | null = null;
  
  start() {
    if (this.timer) return;
    this.timer = window.setInterval(() => this.tick(), 1000); // 1 tick per second
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  tick() {
    const state = useStore.getState();
    if (!state.isRunning) {
      this.stop();
      return;
    }

    const { nodes, edges, setNodes } = state;
    if (nodes.length === 0) return;

    // Very simple simulation tick:
    // Identify ingress nodes and apply some load.
    // Propagate load through edges.
    
    const newNodes = nodes.map(node => {
      // Default node capacity if undefined
      const capacity = (node.data?.capacity as number) || 1000;
      let currentLoad = (node.data?.load || 0) as number;
      
      if (node.type === 'loadBalancer' || node.type === 'apiGateway' || node.type === 'cdn' || node.type === 'webBrowser' || node.type === 'mobileApp') {
        // Base load for ingress/clients
        currentLoad = Math.floor(Math.random() * 1000) + 500;
      } else {
        // Find edges targeting this node
        const incomingEdges = edges.filter(e => e.target === node.id);
        if (incomingEdges.length > 0) {
          // inherit load from parents
          let totalIncomingLoad = 0;
          incomingEdges.forEach(edge => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            if (sourceNode && sourceNode.data?.load) {
              const sourceOutboundEdges = edges.filter(e => e.source === sourceNode.id).length;
              totalIncomingLoad += (sourceNode.data.load as number) / sourceOutboundEdges;
            }
          });
          currentLoad = Math.floor(totalIncomingLoad * (0.8 + Math.random() * 0.4)); // +/- 20% jitter
        } else {
          currentLoad = Math.floor(currentLoad * 0.5); // decay if no traffic
        }
      }

      // Chaos / Error state drops load
      let hasError = node.data?.hasError as boolean;
      if (hasError) {
        currentLoad = 0;
      }

      // Check bottleneck
      const isBottleneck = !hasError && currentLoad > capacity * 0.9;
      if (isBottleneck) {
        // Cap the load to capacity
        currentLoad = capacity;
      }

      return {
        ...node,
        data: {
          ...node.data,
          load: currentLoad,
          isBottleneck
        }
      };
    });

    setNodes(newNodes);
  }
}

export const engine = new SimulationEngine();
