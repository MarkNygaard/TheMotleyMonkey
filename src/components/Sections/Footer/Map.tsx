'use client';

import L from 'leaflet';
import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const icon = L.icon({
  iconUrl: '/leaflet/marker-icon.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  shadowUrl: '/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});

type MapProps = {
  center: [number, number];
};

export default function Map({ center }: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={17}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%', borderRadius: '0.375rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={center} icon={icon} />
    </MapContainer>
  );
}
