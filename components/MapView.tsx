"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "next/link";

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

const userIcon = L.divIcon({
  className: "",
  html: '<div class="nm-user-marker"></div>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

const salonIcon = L.divIcon({
  className: "",
  html: '<div class="nm-salon-marker"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export default function MapView({ salons, userLocation }: Props) {
  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} />
      {salons.map((s) => (
        <Marker key={s.id} position={[s.lat, s.lng]} icon={salonIcon}>
          <Popup>
            <strong>{s.name}</strong>
            <br />
            {s.priceLabel}
            <br />
            <Link href={`/salon/${s.id}`}>Salonu görüntüle</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
