'use client';

import { useEffect, useState } from 'react';

import Countdown from 'react-countdown';

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  const comps = [
    { name: 'days', type: days },
    { name: 'hours', type: hours },
    { name: 'minutes', type: minutes },
    { name: 'seconds', type: seconds },
  ];

  return (
    <>
      <section className="flex w-full gap-1">
        {comps.map((comp, index) => (
          <div
            className="flex w-full flex-col items-center justify-center gap-3 rounded-md border py-12"
            key={index}>
            <h3 className="text-4xl font-black sm:text-5xl lg:text-6xl">
              {comp.type}
            </h3>
            <h4 className="text-[10px] uppercase xs:text-xs">{comp.name}</h4>
          </div>
        ))}
      </section>
    </>
  );
};

const CountDown = () => {
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setTargetDate(new Date('2025-03-20T00:00:00'));
  }, []);

  if (!targetDate) return null;

  return (
    <div>
      <Countdown date={targetDate} renderer={renderer}></Countdown>
    </div>
  );
};

export default CountDown;
