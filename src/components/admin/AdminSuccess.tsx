import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Button from '@/components/Button';

type AdminSuccessProps = {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
  onReset: () => void;
};

export default function AdminSuccess({
  title,
  description,
  backHref,
  backLabel,
  onReset,
}: AdminSuccessProps) {
  return (
    <div className="rounded-md border border-accent/12 bg-surface px-6 py-10 sm:px-10 sm:py-12">
      <span className="flex size-12 items-center justify-center rounded-full bg-accent text-highlight">
        <CheckCircle2 size={22} strokeWidth={1.6} aria-hidden />
      </span>
      <h2 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{title}</h2>
      <p className="mt-3 max-w-lg text-[15px] leading-7 text-muted-foreground">
        {description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href={backHref} variant="primary">
          <ArrowLeft size={16} aria-hidden />
          {backLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={onReset}>
          Create another
        </Button>
      </div>
    </div>
  );
}
