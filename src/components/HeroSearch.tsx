'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { CalendarDays, MapPin, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const destinations = [
  'Hunza Valley',
  'Skardu',
  'Fairy Meadows',
  'Naltar Valley',
  'Deosai Plains',
  'Khaplu',
  'Passu',
  'Astore',
] as const;

const months = [
  { value: 'any', label: 'Any month' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
] as const;

const travelerOptions = [
  { value: '1', label: '1 traveller' },
  { value: '2', label: '2 travellers' },
  { value: '3', label: '3 travellers' },
  { value: '4', label: '4 travellers' },
  { value: '5', label: '5 travellers' },
  { value: '6+', label: '6+ travellers' },
] as const;

const fieldInputClass =
  'h-auto rounded-none border-0 bg-transparent p-0 text-sm font-medium text-white shadow-none placeholder:font-normal placeholder:text-white/40 focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent';

const selectTriggerClass =
  'h-auto w-full border-0 bg-transparent p-0 text-sm font-medium text-white shadow-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent [&_svg]:text-white/45';

const selectContentClass =
  'w-(--radix-select-trigger-width) min-w-(--radix-select-trigger-width) px-2';

function DestinationSearch({
  value,
  onChange,
  open,
  onOpenChange,
}: {
  value: string;
  onChange: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    const node = anchorRef.current;
    if (!node) return;

    const update = () => setWidth(node.offsetWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const filtered = useMemo(() => {
    const query = value.trim().toLowerCase();
    if (!query) return destinations;
    return destinations.filter((place) => place.toLowerCase().includes(query));
  }, [value]);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverAnchor asChild>
        <div ref={anchorRef} className="w-full">
          <Input
            id="hero-destination"
            name="destination"
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              onOpenChange(true);
            }}
            onFocus={() => onOpenChange(true)}
            onClick={() => onOpenChange(true)}
            placeholder="Search Hunza, Skardu, Deosai"
            autoComplete="off"
            className={fieldInputClass}
          />
        </div>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
        sideOffset={12}
        style={width ? { width } : undefined}
        className="w-auto max-w-none gap-0 p-0 px-2"
      >
        <Command shouldFilter={false} className="rounded-lg bg-transparent p-0">
          <CommandList className="max-h-56 px-1 py-2">
            <CommandEmpty className="px-3 py-4 text-muted-foreground">
              No destination found.
            </CommandEmpty>
            <CommandGroup heading="Gilgit-Baltistan" className="px-1">
              {filtered.map((place) => (
                <CommandItem
                  key={place}
                  value={place}
                  data-checked={value === place}
                  onSelect={() => {
                    onChange(place);
                    onOpenChange(false);
                  }}
                  className="cursor-pointer px-3 py-2"
                >
                  <MapPin className="size-4 text-muted-foreground" />
                  {place}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function HeroSearch() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [month, setMonth] = useState('any');
  const [destinationOpen, setDestinationOpen] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.set('q', destination.trim());
    if (month && month !== 'any') params.set('month', month);
    if (travelers) params.set('travelers', travelers);
    router.push(`/tour?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        'hero-fade-up-delay-2 w-full max-w-4xl rounded-md border p-2 backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-300',
        destinationOpen
          ? 'border-highlight/35 bg-foreground/45 shadow-[0_12px_40px_rgb(0_0_0_/_0.28)]'
          : 'border-white/18 bg-foreground/35 shadow-[0_8px_28px_rgb(0_0_0_/_0.2)]',
      )}
    >
      <div className="grid gap-1 lg:grid-cols-[1.4fr_1fr_1.05fr_auto] lg:items-stretch">
        <div
          className={cn(
            'flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors',
            destinationOpen ? 'bg-white/10' : 'hover:bg-white/8',
          )}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-highlight/15 text-highlight">
            <MapPin size={16} aria-hidden />
          </span>
          <div className="min-w-0 flex-1 space-y-1">
            <Label
              htmlFor="hero-destination"
              className="text-[11px] font-medium tracking-[0.14em] text-highlight/90 uppercase"
            >
              Destination
            </Label>
            <DestinationSearch
              value={destination}
              onChange={setDestination}
              open={destinationOpen}
              onOpenChange={setDestinationOpen}
            />
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/8 lg:border-l lg:border-white/12">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-highlight/15 text-highlight">
            <CalendarDays size={16} aria-hidden />
          </span>
          <div className="min-w-0 flex-1 space-y-1">
            <Label className="text-[11px] font-medium tracking-[0.14em] text-highlight/90 uppercase">
              Travel month
            </Label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger size="sm" className={selectTriggerClass}>
                <SelectValue placeholder="Any month" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                align="start"
                className={selectContentClass}
              >
                {months.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="px-3"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/8 lg:border-l lg:border-white/12">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-highlight/15 text-highlight">
            <Users size={16} aria-hidden />
          </span>
          <div className="min-w-0 flex-1 space-y-1">
            <Label className="text-[11px] font-medium tracking-[0.14em] text-highlight/90 uppercase">
              Travellers
            </Label>
            <Select value={travelers} onValueChange={setTravelers}>
              <SelectTrigger size="sm" className={selectTriggerClass}>
                <SelectValue placeholder="Travellers" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                align="start"
                className={selectContentClass}
              >
                {travelerOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="px-3"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-1 lg:self-center">
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full rounded-xl bg-highlight px-6 text-sm font-medium text-foreground hover:bg-[#d4e0bc] lg:min-w-[9.5rem]"
          >
            <Search size={16} aria-hidden />
            Search trips
          </Button>
        </div>
      </div>
    </form>
  );
}
