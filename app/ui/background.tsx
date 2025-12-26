'use client';

import { cn } from '@/lib/utils';
import { GridPattern } from '@/components/ui/grid-pattern';

export default function Background() {
  return <GridPattern
  width={40}
  height={40}
  x={-1}
  y={-1}
  strokeDasharray={"4 2"}
  className={cn(
"[mask-image:radial-gradient(400px_circle_at_center,red,transparent)]",
"absolute inset-0 z-0"
  )}
  />
}
