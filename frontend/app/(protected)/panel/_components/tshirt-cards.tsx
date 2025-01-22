import { Monument } from '@/app/assets/font';
import { cn } from '@/lib/utils';
import { FC } from 'react';

type Tshirt = {
  title: string;
  thumbnail?: string;
  tshirtNumber: string;
  userTshirtNumber: string;
};

const tshirts: Tshirt[] = [
  {
    title: 'Flying Dreams',
    thumbnail: '',
    tshirtNumber: '1',
    userTshirtNumber: '04',
  },
];

const TshirtCard: FC<Tshirt> = ({
  title,
  thumbnail,
  tshirtNumber,
  userTshirtNumber,
}) => {
  return (
    <div className="relative flex h-28 w-full justify-between overflow-hidden rounded-[28px] border border-black">
      <div className="flex h-11 w-11 items-center justify-center rounded-br-[30px] border-b border-r border-black bg-background">
        #{tshirtNumber}
      </div>
      <h3
        className={cn(Monument.className, 'relative top-2 text-2xl uppercase')}>
        {title}
      </h3>
      <div className="flex h-11 w-20 items-center justify-center rounded-bl-[30px] border-b border-l border-black bg-background">
        {userTshirtNumber}/100
      </div>
      <div className="absolute top-0 h-full w-full">
        {/* Overlay */}
        <div className="h-full w-full backdrop-blur-lg backdrop-filter"></div>
        {/* Thumbnail */}
        <div className="z-10 h-full w-full bg-blue-500"></div>
      </div>
    </div>
  );
};
//opacity-0 backdrop-blur-lg backdrop-filter

const TshirtCards = () => {
  return (
    <section>
      {tshirts.map((tshirt, index) => (
        <TshirtCard
          key={index}
          title={tshirt.title}
          tshirtNumber={tshirt.tshirtNumber}
          userTshirtNumber={tshirt.userTshirtNumber}
        />
      ))}
    </section>
  );
};

export default TshirtCards;
