import Link from 'next/link';

import { Monument } from '@/app/assets/font';

import { Button } from '@/components/ui/button';
import CountDown from '@/components/countdown';
import { cn } from '@/lib/utils';

const HomePage = () => {
  return (
    <>
      <h1
        className={cn(
          'relative flex w-full flex-col text-[16.5vw] uppercase leading-[13vw] xs:text-[15.5vw] sm:text-[15vw]',
          Monument.className
        )}>
        <span>trust</span>
        <span>the</span>
        <span>number</span>
      </h1>
      <CountDown />
      {/* Design Cover */}
      <div className="mb-9 aspect-[21/9] h-full w-full rounded-md bg-foreground" />

      {/* Login Button */}
      <div className="sticky bottom-9">
        <Button asChild size="xl">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </>
  );
};

export default HomePage;
