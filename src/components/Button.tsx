import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const variants = {
  primary:
    'border-transparent bg-accent text-surface shadow-[0_1px_2px_rgb(31_41_35_/_0.12)] hover:bg-[#3a5043] hover:shadow-[0_4px_12px_rgb(31_41_35_/_0.14)] active:translate-y-px',
  secondary:
    'border-accent/20 bg-surface/80 text-foreground shadow-[0_1px_2px_rgb(31_41_35_/_0.04)] hover:border-accent/40 hover:bg-surface hover:text-accent',
  ghost:
    'border-transparent bg-transparent text-foreground/75 hover:bg-accent/8 hover:text-foreground',
  soft: 'border-transparent bg-accent/10 text-accent hover:bg-accent/16',
  highlight:
    'border-transparent bg-highlight text-foreground shadow-[0_1px_2px_rgb(31_41_35_/_0.1)] hover:bg-[#d4e0bc] active:translate-y-px',
  outline:
    'border-white/45 bg-transparent text-white hover:border-white hover:bg-white/10',
} as const;

const sizes = {
  sm: 'h-9 gap-1.5 px-3.5 text-[13px]',
  md: 'h-10 gap-2 px-4 text-sm',
  lg: 'h-12 gap-2 px-6 text-sm',
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps & {
  href: string;
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function buttonClasses(variant: Variant, size: Size, className?: string) {
  return [
    'inline-flex items-center justify-center rounded-lg border font-medium tracking-[-0.01em]',
    'transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-45',
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const classes = buttonClasses(variant, size, className);

  if ('href' in props && props.href) {
    const { href, onClick } = props;
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = 'button', ...buttonProps } = props as ButtonAsButton;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
