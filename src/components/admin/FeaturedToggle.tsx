'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type FeaturedToggleProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
};

export default function FeaturedToggle({
  checked,
  onChange,
  label = 'Featured',
}: FeaturedToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'inline-flex h-12 items-center gap-2 rounded-md border px-3.5 text-sm font-medium transition-colors',
        checked
          ? 'border-accent bg-accent/10 text-accent'
          : 'border-accent/15 bg-background text-foreground/70 hover:border-accent/35',
      )}
    >
      <Star
        size={15}
        aria-hidden
        className={checked ? 'fill-accent' : ''}
      />
      {label}
    </button>
  );
}
