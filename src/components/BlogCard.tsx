import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  formatBlogDate,
  type BlogPost,
} from '@/lib/blogs';
import { cn } from '@/lib/utils';

type BlogCardProps = {
  post: BlogPost;
  href?: string;
  priority?: boolean;
  className?: string;
  layout?: 'grid' | 'featured';
};

export default function BlogCard({
  post,
  href,
  priority,
  className,
  layout = 'grid',
}: BlogCardProps) {
  const isFeatured = layout === 'featured';
  const meta = [
    formatBlogDate(post.publishedAt),
    `${post.readMinutes} min read`,
  ].join(' · ');

  return (
    <Link
      href={href ?? `/blogs/${post.slug}`}
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-md bg-surface text-left',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isFeatured && 'lg:grid lg:grid-cols-2 lg:bg-transparent',
        className
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden bg-muted',
          isFeatured
            ? 'aspect-16/10 lg:aspect-auto lg:min-h-[22rem] lg:rounded-md'
            : 'aspect-16/10'
        )}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority={priority}
          sizes={
            isFeatured
              ? '(max-width:1024px) 100vw, 50vw'
              : '(max-width:768px) 100vw, 33vw'
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {isFeatured ? (
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_20_16/0.35)_0%,transparent_45%)] lg:bg-[linear-gradient(to_right,transparent_55%,rgb(232_237_231/0.15)_100%)]"
          />
        ) : null}
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col',
          isFeatured
            ? 'justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10'
            : 'border border-t-0 border-accent/10 px-5 py-5'
        )}
      >
        <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
          {post.category}
          {post.destination ? (
            <>
              <span className="text-accent/30"> · </span>
              {post.destination}
            </>
          ) : null}
        </p>

        <h3
          className={cn(
            'mt-3 font-medium tracking-[-0.03em] text-foreground transition-colors duration-300 group-hover:text-accent',
            isFeatured
              ? 'text-2xl sm:text-3xl md:text-4xl md:leading-[1.15]'
              : 'text-xl leading-snug'
          )}
        >
          {post.title}
        </h3>

        <p
          className={cn(
            'mt-3 text-sm leading-6 text-muted-foreground',
            isFeatured ? 'max-w-md line-clamp-3 sm:text-[15px]' : 'line-clamp-2'
          )}
        >
          {post.excerpt}
        </p>

        <div
          className={cn(
            'mt-auto flex items-center justify-between gap-4 pt-5',
            isFeatured && 'pt-8'
          )}
        >
          <p className="text-[13px] text-muted-foreground">{meta}</p>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 text-sm font-medium text-accent',
              isFeatured &&
                'rounded-full border border-accent/25 px-3.5 py-2 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-highlight'
            )}
          >
            Read
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
