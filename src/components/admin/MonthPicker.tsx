'use client';

import { MONTHS } from '@/components/admin/field-styles';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type MonthPickerProps = {
  label?: string;
  values: string[];
  onChange: (values: string[]) => void;
};

export default function MonthPicker({
  label = 'Best months',
  values,
  onChange,
}: MonthPickerProps) {
  function toggle(month: string) {
    onChange(
      values.includes(month)
        ? values.filter((item) => item !== month)
        : [...values, month],
    );
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {MONTHS.map((month) => {
          const active = values.includes(month);
          return (
            <button
              key={month}
              type="button"
              onClick={() => toggle(month)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                active
                  ? 'border-accent bg-accent text-surface'
                  : 'border-accent/15 bg-background text-foreground/70 hover:border-accent/35 hover:text-foreground',
              )}
            >
              {month.slice(0, 3)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
