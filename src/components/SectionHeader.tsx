import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: {
    href: string;
    label: string;
  };
  className?: string;
  children?: ReactNode;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div>
        {eyebrow ? (
          <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            'text-3xl font-medium tracking-[-0.03em] sm:text-4xl',
            eyebrow && 'mt-2'
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>
      {children}
      {!children && action ? (
        <Link
          href={action.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {action.label}
          <ArrowRight size={14} aria-hidden />
        </Link>
      ) : null}
    </div>
  );
}
