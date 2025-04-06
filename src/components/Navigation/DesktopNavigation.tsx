'use client';

import IconRenderer from 'components/IconRenderer';
import { useActiveSectionContext } from 'context/ActiveSectionContext';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion';
import { LinkRecord, PageModelContentField } from 'lib/graphql';
import { cn } from 'lib/utils';
import Link from 'next/link';
import { useEffect } from 'react';

let clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);

function useBoundedScroll(bounds: number) {
  let { scrollY } = useScroll();
  let scrollYBounded = useMotionValue(0);
  let scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, bounds],
    [0, 1],
  );

  useEffect(() => {
    return scrollY.onChange((current) => {
      let previous = scrollY.getPrevious() ?? 0;
      let diff = current - previous;
      let newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, bounds));
    });
  }, [bounds, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
}

type DesktopNavigationProps = {
  content: Array<PageModelContentField>;
  socialMediaLinks: Array<LinkRecord>;
};

export default function DesktopNavigation({
  content,
  socialMediaLinks,
}: Readonly<DesktopNavigationProps>) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  let { scrollYBoundedProgress } = useBoundedScroll(300);
  let scrollYBoundedProgressThrottled = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1],
  );

  return (
    <div className='relative hidden w-full md:sticky md:top-0 md:z-40 md:flex'>
      <motion.div
        style={{
          height: useTransform(
            scrollYBoundedProgressThrottled,
            [0, 1],
            [80, 60],
          ),
          backgroundColor: useMotionTemplate`rgb(0 0 0 / ${useTransform(
            scrollYBoundedProgressThrottled,
            [0, 1],
            [0.3, 0.2],
          )})`,
        }}
        className='absolute inset-x-4 z-20 mt-2 flex items-center justify-between rounded-lg px-4 shadow-sm backdrop-blur-sm lg:px-16 xl:px-28'
        id='nav'
      >
        <div className='flex items-center space-x-4 text-3xl'>
          {socialMediaLinks?.map((links: LinkRecord) => {
            if (!links.icon) return null;

            return (
              <Link
                key={`socialLink-${links.id}`}
                aria-label='social-link'
                target='_blank'
                rel='noopener norefferer noreferrer'
                href={links.url as string}
                className='text-gray-300 hover:text-white'
              >
                <IconRenderer iconData={links.icon} />
              </Link>
            );
          })}
        </div>
        <div key='desktop-nav' className='flex space-x-2'>
          {content?.map((section: PageModelContentField) => {
            const navigationIdNoSpace = section.navigationId?.replace(
              /\s/g,
              '',
            );

            return (
              section.navigationId && (
                <Link
                  key={`link-${section.id}`}
                  href={'#' + navigationIdNoSpace}
                  onClick={() => {
                    setActiveSection(section.navigationId as string);
                    setTimeOfLastClick(Date.now());
                  }}
                  className={cn(
                    'relative flex px-2 py-1 uppercase opacity-100 lg:px-3 lg:py-2 lg:text-lg xl:px-4 xl:text-xl',
                    {
                      'font-light text-gray-300 hover:text-white':
                        section.navigationId !== activeSection,
                    },
                    {
                      'font-base text-skin-accent':
                        section.navigationId === activeSection,
                    },
                  )}
                >
                  {section.navigationId}
                  {section.navigationId === activeSection && (
                    <motion.span
                      className='absolute inset-0 -z-10 rounded bg-gray-300/10'
                      layoutId='activeSection'
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    ></motion.span>
                  )}
                </Link>
              )
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
