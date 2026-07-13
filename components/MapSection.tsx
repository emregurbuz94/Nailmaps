"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => <div className="map-placeholder" />,
});

interface MapSalon {
  id: string;
  name: string;
  lat: number;
  lng: number;
  priceLabel: string;
}

interface Props {
  salons: MapSalon[];
  userLocation: { lat: number; lng: number };
}

export default function MapSection({ salons, userLocation }: Props) {
  return (
    <div className="map-wrap">
      <MapView salons={salons} userLocation={userLocation} />
      <div className="map-chip">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff">
          <circle cx="12" cy="12" r="10" />
        </svg>
        Haritada görüntüle
      </div>
    </div>
  );
}
