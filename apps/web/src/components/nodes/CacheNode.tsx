import { Handle, Position } from '@xyflow/react';

export function CacheNode({ data }: { data: any }) {
  return (
    <div style={{ padding: '10px 20px', border: '1px solid #f59e0b', borderRadius: '4px', background: '#fef3c7', color: '#b45309' }}>
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>Cache (Redis)</strong>: {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}