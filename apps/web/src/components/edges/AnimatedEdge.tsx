import React from 'react';
import { BaseEdge, EdgeProps, getBezierPath } from '@xyflow/react';

export function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  animated,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      {/* Base subtle edge */}
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{ ...style, stroke: '#888888', strokeWidth: 2 }} 
      />
      
      {/* Animated packet overlay */}
      {animated && (
        <BaseEdge 
          path={edgePath} 
          markerEnd={markerEnd} 
          className="react-flow__edge-path"
          style={{ 
            ...style, 
            stroke: 'var(--color-brand-500)', 
            strokeWidth: 3,
            strokeDasharray: '5 20',
            animation: 'flow-animation 1s linear infinite'
          }} 
        />
      )}

      {/* Define the keyframes in a style tag just for this component to ensure it runs */}
      <style>
        {`
          @keyframes flow-animation {
            from {
              stroke-dashoffset: 25;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </>
  );
}
