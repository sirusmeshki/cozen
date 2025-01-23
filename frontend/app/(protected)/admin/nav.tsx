'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const Nav = () => {
  const pages = ['users', 'orders', 'collections'];
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
            <Link href={page}>{page}</Link>
          </Button>
        );
      })}
    </nav>
  );
};

export default Nav;
