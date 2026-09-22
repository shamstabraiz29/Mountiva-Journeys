import type { ReactNode } from 'react';
import Button from '@/components/Button';

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: { href: string; label: string; icon?: ReactNode };
  children?: ReactNode;
};

export default function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
  children,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {children}
        {action ? (
          <Button href={action.href} variant="primary">
            {action.icon}
            {action.label}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
