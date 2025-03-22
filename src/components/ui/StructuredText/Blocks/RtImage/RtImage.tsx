import { RtImageRecord } from 'lib/graphql';
import React from 'react';
import { Image } from 'react-datocms';

export default function RtImage({ image }: RtImageRecord) {
  return (
    <div className='flex justify-center'>
      {image?.responsiveImage && (
        <>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image data={image.responsiveImage} />
        </>
      )}
    </div>
  );
}
