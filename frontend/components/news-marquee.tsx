import Link from 'next/link';
import Marquee from 'react-fast-marquee';

const NewsMarquee = () => {
  return (
    <Link
      href={'https://instagram.com/cozenwear'}
      className="relative flex items-center justify-center overflow-x-hidden bg-primary py-3 text-xs text-primary-foreground">
      <Marquee autoFill pauseOnHover className="">
        <div className="px-4">
          INSTAGRAM * COZENWEAR * 15% OFF * CLICK TO FOLLOW
        </div>
      </Marquee>
    </Link>
  );
};

export default NewsMarquee;
