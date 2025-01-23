'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Nav = () => {
  const pages = ['collections', 'users', 'orders'];
  const currentPath = usePathname();

  return (
    <nav className="mb-8 flex gap-2">
      {pages.map((page, index) => {
        return (
          <Button
            className={cn(
              currentPath === `/admin/${page}`
                ? 'bg-foreground text-background'
                : '',
              'capitalize'
            )}
            variant="outline"
            key={index}
            asChild>
            <Link href={`/admin/${page}`}>{page}</Link>
          </Button>
        );
      })}
    </nav>
  );
};

export default Nav;
