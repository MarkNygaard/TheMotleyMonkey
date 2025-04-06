'use client';

import { motion } from 'framer-motion';
import { GridModelSectionsField, GridRecord, TextRecord } from 'lib/graphql';
import { useAnimatedSectionInView } from 'lib/hooks';
import { cn } from 'lib/utils';
import React from 'react';

import { GridImage } from './GridImage';
import { GridText } from './GridText';

export default function Grid({
  navigationId,
  backgroundColor,
  fadeIn,
  mobileColumns,
  tabletColumns,
  desktopColumns,
  gap,
  fullWidth,
  sections,
  height,
}: GridRecord) {
  const { ref, fadeInAnimation } = useAnimatedSectionInView({
    navigationId: navigationId as string,
  });
  const navigationIdNoSpace = navigationId?.replace(/\s/g, '');

  return (
    <div
      ref={ref}
      id={navigationIdNoSpace!}
      className={cn('flex justify-center px-0 py-20 md:px-10', {
        'bg-skin-secondary': backgroundColor === true,
      })}
    >
      <motion.div
        initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={fadeIn ? fadeInAnimation : { opacity: 1 }}
        className={cn('grid', {
          [`grid-cols-${mobileColumns as string}`]: mobileColumns,
          [`md:grid-cols-${tabletColumns as string}`]: tabletColumns,
          [`xl:grid-cols-${desktopColumns as string}`]: desktopColumns,
          [`gap-${gap as string}`]: gap,
          'md:w-10/12': fullWidth === false,
        })}
      >
        {sections.map((section: GridModelSectionsField) => {
          return (
            <div
              key={`grid-${section.id}`}
              className={cn('relative', {
                [`order-${section.mobilePosition as string}`]:
                  section.mobilePosition,
                [`md:order-${section.tabletPosition as string}`]:
                  section.tabletPosition,
                [`xl:order-${section.desktopPosition as string}`]:
                  section.desktopPosition,
              })}
            >
              {section.__typename === 'GridImageRecord' && (
                <GridImage height={height as string} {...section} />
              )}
              {section.__typename === 'GridTextRecord' && (
                <GridText
                  height={height as string}
                  section={section as TextRecord}
                />
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
