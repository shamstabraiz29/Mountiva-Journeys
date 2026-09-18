import Image from 'next/image';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import type { ReactNode } from 'react';

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  panelNote?: string;
};

export default function AuthShell({
  eyebrow,
  title,
  description,
  children,
  panelNote = 'Gilgit-Baltistan journeys — paced itineraries, local stays, and routes shaped around how you like to travel.',
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-secondary">
      <main className="px-5 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-md border border-accent/12 bg-surface lg:grid-cols-2">
          <aside className="relative hidden min-h-[28rem] flex-col justify-between overflow-hidden bg-accent px-8 py-10 text-surface lg:flex lg:min-h-[36rem] lg:px-10 lg:py-12">
            <Image
              className="object-cover opacity-40"
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80"
              alt=""
              fill
              priority
              sizes="50vw"
              aria-hidden
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(165deg,rgb(72_96_82/0.88)_0%,rgb(31_41_35/0.92)_100%)]"
            />

            <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-highlight text-foreground">
                  <Leaf size={16} aria-hidden />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="text-[15px] font-semibold tracking-[-0.03em]">
                    Mountiva
                  </span>
                  <span className="mt-0.5 text-[10px] font-medium tracking-[0.16em] text-highlight uppercase">
                    Journeys
                  </span>
                </span>
              </Link>

              <p className="mt-14 text-[11px] font-medium tracking-[0.18em] text-highlight uppercase">
                {eyebrow}
              </p>
              <h1 className="mt-3 max-w-sm text-4xl font-medium tracking-[-0.035em] text-white">
                {title}
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-6 text-surface/70">
                {description}
              </p>
            </div>

            <p className="relative z-10 mt-12 max-w-xs border-t border-surface/15 pt-6 text-sm leading-6 text-surface/65">
              {panelNote}
            </p>
          </aside>

          <div className="flex flex-col justify-center bg-surface px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="mb-8 lg:hidden">
              <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
                {eyebrow}
              </p>
              <h1 className="mt-2 text-3xl font-medium tracking-[-0.03em]">
                {title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="mx-auto w-full max-w-md">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
