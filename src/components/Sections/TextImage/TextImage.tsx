'use client';

import StructuredText from '@ui/StructuredText/StructuredText';
import { motion } from 'framer-motion';
import { TextImageRecord } from 'lib/graphql';
import { useAnimatedSectionInView } from 'lib/hooks';
import { cn } from 'lib/utils';
import React from 'react';
import { Image } from 'react-datocms';

export default function TextImage({
  navigationId,
  backgroundColor,
  fadeIn,
  content,
  imageLocation,
  imageStyle,
  image,
}: TextImageRecord) {
  const { ref, fadeInAnimation } = useAnimatedSectionInView({
    navigationId: navigationId as string,
  });
  const navigationIdNoSpace = navigationId?.replace(/\s/g, '');

  return (
    <div
      ref={ref}
      id={navigationIdNoSpace!}
      className={cn('px-2 py-20 md:px-10', {
        'bg-skin-secondary': backgroundColor === true,
      })}
    >
      <motion.div
        initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={fadeIn ? fadeInAnimation : { opacity: 1 }}
        className={cn('mx-auto flex max-w-6xl flex-col md:flex-row', {
          'flex-col-reverse md:flex-row-reverse': imageLocation === 'LEFT',
        })}
      >
        <article
          className={cn('prose max-w-none grow px-3 py-4 md:px-4', {
            'prose-invert text-gray-200': backgroundColor === true,
          })}
        >
          <StructuredText content={content} />
        </article>
        {image?.responsiveImage && (
          <div className='mx-auto md:mb-auto'>
            <div
              className={cn('relative aspect-square grow px-3 md:h-96 md:p-4', {
                'rounded-full': imageStyle === 'Round',
                'rounded-xl': imageStyle === 'Rounded Corners',
              })}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image data={image?.responsiveImage} />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
