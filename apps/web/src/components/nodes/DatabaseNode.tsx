import { Handle, Position } from '@xyflow/react';

export function DatabaseNode({ data }: { data: any }) {
  return (
    <div style={{ padding: '10px 20px', border: '1px solid #3b82f6', borderRadius: '4px', background: '#dbeafe', color: '#1d4ed8' }}>
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>DB (PostgreSQL)</strong>: {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}