'use client';

import { Search } from 'lucide-react';
import { fieldClass } from '@/components/admin/field-styles';
import { Input } from '@/components/ui/input';

type AdminSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export default function AdminSearch({
  value,
  onChange,
  placeholder,
}: AdminSearchProps) {
  return (
    <div className="relative min-w-0 flex-1 sm:max-w-xs">
      <Search
        size={15}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`${fieldClass} pl-10`}
      />
    </div>
  );
}
