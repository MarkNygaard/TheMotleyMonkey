import { CustomHeadingRecord } from 'lib/graphql';
import React from 'react';

export default function CustomHeading({
  title,
  subtitle,
}: CustomHeadingRecord) {
  return (
    <>
      <div className='m-0 text-2xl font-medium text-white'>{title}</div>
      <div className='mt-0 block text-xl font-medium text-skin-accent xl:mb-8'>
        {subtitle}
      </div>
    </>
  );
}
