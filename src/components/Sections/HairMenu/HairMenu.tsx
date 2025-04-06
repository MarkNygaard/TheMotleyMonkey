'use client';

import { HairMenuRecord } from 'lib/graphql';
import { useSectionInView } from 'lib/hooks';
import { cn } from 'lib/utils';
import React from 'react';

import PriceModule from './PriceModules/PriceModule';

export default function HairMenu({
  navigationId,
  fadeIn,
  priceModules,
}: HairMenuRecord) {
  const { ref } = useSectionInView({ navigationId: navigationId as string });
  const navigationIdNoSpace = navigationId?.replace(/\s/g, '');

  return (
    <div
      ref={ref}
      id={navigationIdNoSpace!}
      className={cn(
        'align-center flex flex-col items-center justify-center overflow-hidden px-2 py-10 text-gray-200 md:px-10',
      )}
    >
      <div className='container space-y-2 xl:space-y-4'>
        {priceModules.map((priceModule) => {
          return (
            <PriceModule
              key={`priceModule-${priceModule.id}`}
              {...priceModule}
              fadeIn={fadeIn}
            />
          );
        })}
      </div>
    </div>
  );
}
