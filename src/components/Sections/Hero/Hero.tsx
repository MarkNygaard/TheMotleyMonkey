'use client';

import { Button } from '@ui/Button/Button';
import { ConditionalWrap } from '@ui/ConditionalWrap/ConditionalWrap';
import Magnetic from 'components/Magnetic';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { HeroRecord, ResponsiveImage } from 'lib/graphql';
import { useBreakpoint, useSectionInView } from 'lib/hooks';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-datocms';
import { SlArrowDown } from 'react-icons/sl';

export type HeroProps = HeroRecord & {
  firstSection: string | null | undefined;
};

export default function Hero({
  navigationId,
  image,
  backgroundImage,
  buttonLink,
  buttonText,
  magneticButton,
  firstSection,
}: HeroProps) {
  const { ref } = useSectionInView({ navigationId: navigationId as string });
  const [isVisible, setIsVisible] = useState(false);
  const navigationIdNoSpace = navigationId?.replace(/\s/g, '');
  const { isBelowXl } = useBreakpoint('xl');

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  });

  const listenToScroll = () => {
    let heightToShowFrom = 600;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToShowFrom) {
      setIsVisible(true);
    } else {
      isVisible && setIsVisible(false);
    }
  };

  let { scrollYProgress } = useScroll();
  let scrollSpeed = isBelowXl ? [0, 0.5] : [0, 1];
  let y = useTransform(scrollYProgress, scrollSpeed, ['0%', '100%']);

  return (
    <div ref={ref} id={navigationIdNoSpace!} className='relative flex flex-col'>
      {backgroundImage && (
        <motion.div
          style={{ y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='absolute inset-0 top-0 mx-auto'
        >
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            data={backgroundImage.responsiveImage as ResponsiveImage}
            layout='fill'
            objectFit='cover'
            objectPosition='50% 50%'
            priority
            className='opacity-30'
          />
        </motion.div>
      )}
      <div className='relative flex h-smallScreen flex-col items-center justify-center'>
        {image && (
          <motion.div className='relative mt-24 flex h-full w-7/12 flex-grow md:mt-44 md:w-4/12 lg:mt-28 xl:mt-32 xl:w-2/12'>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              data={image.responsiveImage as ResponsiveImage}
              layout='fill'
              objectFit='contain'
              objectPosition='50% 50%'
              priority
            />
          </motion.div>
        )}
        <div className='flex flex-col items-center justify-center space-y-20 pb-10 md:space-y-48 lg:space-y-14 xl:space-y-28 xl:pb-16'>
          <div className='relative mt-8 flex items-center justify-center'>
            <ConditionalWrap
              condition={magneticButton}
              wrap={(children) => <Magnetic>{children}</Magnetic>}
            >
              <Link href={buttonLink!} target='_blank' rel='noreferrer'>
                <Button glare label={buttonText as string} />
              </Link>
            </ConditionalWrap>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.4,
                delay: 0.5,
                type: 'spring',
              },
            }}
          >
            <Link
              href={'#' + firstSection}
              className='relative flex items-center justify-center text-4xl text-gray-300'
            >
              <button className='rounded-full p-2 transition-all duration-200 ease-in-out hover:-translate-y-1 active:bg-gray-300/20'>
                <SlArrowDown />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {isVisible && (
          <a href={buttonLink!} target='_blank' rel='noreferrer'>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='fixed bottom-14 right-20 z-50 hidden lg:flex'
            >
              <Button width='small' label={buttonText as string} />
            </motion.div>
          </a>
        )}
      </AnimatePresence>
    </div>
  );
}
