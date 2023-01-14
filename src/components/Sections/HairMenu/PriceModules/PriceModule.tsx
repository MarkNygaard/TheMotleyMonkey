import React from 'react';
import Prices from '../Prices/Prices';
import classNames from 'clsx';

export default function PriceModule({ content }: any) {
  return (
    <div className='text-lg font-bold text-[#c09a5d] lg:pb-4'>
      <div className='flex justify-center py-12 text-4xl font-bold text-[#c09a5d]'>
        {content.heading}
      </div>
      <div
        className={classNames('grid font-normal text-white', {
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4':
            content.prices.length > 1,
        })}
      >
        {content.prices.map((priceContent) => {
          return (
            <Prices
              key={priceContent.id}
              content={priceContent}
              arrayLength={content.prices.length}
            />
          );
        })}
      </div>
    </div>
  );
}