'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function HideOnAuth({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/auth') || pathname.startsWith('/admin')) return null;
  return children;
}
