import { Monument } from '@/app/assets/font';
import { cn } from '@/lib/utils';

export function TypographyLarge({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className={cn(
        '-space-y-3 text-2xl font-semibold uppercase sm:text-3xl md:text-4xl',
        Monument.className
      )}>
      {children}
    </h2>
  );
}
