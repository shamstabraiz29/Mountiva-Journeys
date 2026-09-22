import type { ReactNode } from 'react';

type FormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-md border border-accent/12 bg-surface p-5 sm:p-6">
      <div className="mb-5 border-b border-accent/10 pb-4">
        <h2 className="text-lg font-medium tracking-[-0.02em]">{title}</h2>
        {description ? (
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
