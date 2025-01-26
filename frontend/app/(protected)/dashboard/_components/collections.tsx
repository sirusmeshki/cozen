import { FC } from 'react';
import Image from 'next/image';

import { Monument } from '@/app/assets/font';
import { cn } from '@/lib/utils';

import { UserCollection, collections } from '../../definitions';

const Collection: FC<UserCollection> = ({
  name,
  collection_number,
  image_path,
  user_number,
  max_number,
}) => {
  return (
    <>
      <div className="relative flex h-28 w-full justify-between overflow-hidden rounded-[28px] border border-black">
        <div className="relative flex w-full justify-between bg-foreground/50">
          <div className="flex gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-br-[30px] border-b border-r border-black bg-background">
              #{collection_number}
            </div>
            <h3
              className={cn(
                Monument.className,
                'relative top-3 w-fit text-2xl uppercase leading-5 text-background'
              )}>
              {name}
            </h3>
          </div>
          <div className="flex h-11 w-20 min-w-11 items-center justify-center rounded-bl-[30px] border-b border-l border-black bg-background px-8">
            {user_number}/{max_number}
          </div>
        </div>
        <div className="absolute -z-10 h-full w-full">
          <Image
            src={image_path}
            className="aspect-video h-full w-full object-cover"
            width={1000}
            height={1000}
            alt="image"
          />
        </div>
      </div>
    </>
  );
};

const Collections = () => {
  return (
    <section className="flex w-full flex-col">
      {collections.map((collection) => (
        <Collection
          key={collection.collection_number}
          name={collection.name}
          collection_number={collection.collection_number}
          user_number={collection.user_number}
          max_number={collection.max_number}
          image_path={collection.image_path}
        />
      ))}
    </section>
  );
};

export default Collections;
