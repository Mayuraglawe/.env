import { Handle, Position } from '@xyflow/react';

export function LoadBalancerNode({ data }: { data: any }) {
  return (
    <div style={{ padding: '10px 20px', border: '1px solid #10b981', borderRadius: '4px', background: '#d1fae5', color: '#047857' }}>
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>LB</strong>: {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}