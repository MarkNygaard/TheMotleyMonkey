import Biography from '@Sections/Biography/Biography';
import Footer from '@Sections/Footer/Footer';
import Grid from '@Sections/Grid/Grid';
import HairMenu from '@Sections/HairMenu/HairMenu';
import Hero from '@Sections/Hero/Hero';
import ImageSection from '@Sections/Image/Image';
import Text from '@Sections/Text/Text';
import TextImage from '@Sections/TextImage/TextImage';
import YoutubeVideo from '@Sections/YoutubeVideo/YoutubeVideo';
import { PageModelContentField } from 'lib/graphql';
import React from 'react';

type Props = {
  sections: Array<PageModelContentField>;
  firstSection: string | null | undefined;
};

export default function Sections({ sections, firstSection }: Readonly<Props>) {
  return (
    <>
      {sections.map((section) => {
        switch (section.__typename) {
          case 'HeroRecord':
            return (
              <Hero key={section.id} {...section} firstSection={firstSection} />
            );
          case 'TextImageRecord':
            return <TextImage key={section.id} {...section} />;
          case 'ImageRecord':
            return <ImageSection key={section.id} {...section} />;
          case 'TextRecord':
            return <Text key={section.id} {...section} />;
          case 'YoutubeVideoRecord':
            return <YoutubeVideo key={section.id} {...section} />;
          case 'GridRecord':
            return <Grid key={section.id} {...section} />;
          case 'HairMenuRecord':
            return <HairMenu key={section.id} {...section} />;
          case 'BiographyRecord':
            return <Biography key={section.id} {...section} />;
          case 'FooterRecord':
            return <Footer key={section.id} {...section} />;
          default:
            return <></>;
        }
      })}
    </>
  );
}
