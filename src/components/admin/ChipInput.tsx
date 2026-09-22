'use client';

import { X } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';
import { fieldClass } from '@/components/admin/field-styles';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ChipInputProps = {
  id: string;
  label: string;
  hint?: string;
  placeholder?: string;
  values: string[];
  onChange: (values: string[]) => void;
};

export default function ChipInput({
  id,
  label,
  hint,
  placeholder = 'Type and press Enter',
  values,
  onChange,
}: ChipInputProps) {
  const [draft, setDraft] = useState('');

  function add(raw: string) {
    const value = raw.trim();
    if (!value) return;
    if (values.some((item) => item.toLowerCase() === value.toLowerCase())) {
      setDraft('');
      return;
    }
    onChange([...values, value]);
    setDraft('');
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      add(draft);
    }
    if (event.key === 'Backspace' && !draft && values.length) {
      onChange(values.slice(0, -1));
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {hint ? (
        <p className="text-xs leading-5 text-muted-foreground">{hint}</p>
      ) : null}
      <div className="rounded-md border border-accent/15 bg-background px-2.5 py-2">
        <div className="flex flex-wrap gap-1.5">
          {values.map((value) => (
            <span
              key={value}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent"
            >
              {value}
              <button
                type="button"
                aria-label={`Remove ${value}`}
                className="rounded-full p-0.5 hover:bg-accent/15"
                onClick={() => onChange(values.filter((item) => item !== value))}
              >
                <X size={12} aria-hidden />
              </button>
            </span>
          ))}
          <Input
            id={id}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={onKeyDown}
            onBlur={() => add(draft)}
            placeholder={values.length ? '' : placeholder}
            className={`${fieldClass} h-8 min-w-40 flex-1 border-0 bg-transparent px-1.5 focus-visible:ring-0`}
          />
        </div>
      </div>
    </div>
  );
}
