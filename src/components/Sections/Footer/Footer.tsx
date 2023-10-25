'use client';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { FooterRecord } from 'lib/graphql';
import { useSectionInView } from 'lib/hooks';
import React from 'react';
import { StructuredText } from 'react-datocms';

export default function Footer({
  location,
  navigationId,
  address,
  openingHours,
  info,
  contact,
}: FooterRecord) {
  const { ref } = useSectionInView({
    navigationId: navigationId as string,
  });

  const navigationIdNoSpace = navigationId?.replace(/\s/g, '');

  const center = {
    lat: location?.latitude,
    lng: location?.longitude,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div ref={ref} id={navigationIdNoSpace!} className='pt-10 text-gray-300'>
      <div className='flex flex-col pb-4 md:items-center xl:pb-8'>
        <div className='container mx-auto md:px-10'>
          <div className='mx-auto xl:w-3/4'>
            <div className='prose mx-auto flex flex-col justify-center p-4 prose-p:text-gray-300 prose-a:text-gray-300 prose-strong:text-skin-accent md:pb-8'>
              <StructuredText data={openingHours as any} />
            </div>
            <div className='prose mx-auto flex flex-col justify-center p-4 prose-p:text-gray-300 prose-a:text-gray-300 prose-strong:text-skin-accent md:pb-8'>
              <StructuredText data={info as any} />
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 grid-rows-3'>
        <div className='container col-start-1 col-end-2 row-start-1 row-end-4 mx-auto px-4 md:px-10 xl:px-0'>
          <div className='mx-auto xl:w-3/4'>
            <div className='h-60 md:mx-4 md:h-80 xl:h-96'>
              <GoogleMap
                center={center}
                zoom={17}
                mapContainerStyle={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '0.375rem',
                }}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
              >
                <Marker position={center} />
              </GoogleMap>
            </div>
          </div>
        </div>
        <div className='col-start-1 col-end-2 row-start-3 row-end-4 bg-skin-secondary'></div>
      </div>
      <div className='bg-skin-secondary py-4 md:flex md:py-8 lg:py-16 xl:pb-16'>
        <div className='container mx-auto px-4 md:px-10 xl:px-0'>
          <div className='mx-auto xl:w-3/4'>
            <div className='flex flex-col justify-center md:mx-4 md:flex-row'>
              <div className='prose flex flex-col justify-center py-4 pb-8 prose-p:text-gray-300 prose-a:text-gray-300 prose-strong:text-skin-accent md:w-1/2'>
                <StructuredText data={contact as any} />
              </div>
              <div className='prose flex flex-col justify-center py-4 pb-8 prose-p:text-gray-300 prose-a:text-gray-300 prose-strong:text-skin-accent md:w-1/2'>
                <StructuredText data={address as any} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex h-12 items-center justify-center bg-skin-accent text-xs text-white md:text-base'>
        &copy; {new Date().getFullYear()} The Motley Monkey. All rights
        reserved.
      </div>
    </div>
  );
}
