import { getSalons, USER_LOCATION } from "@/lib/salons";
import { priceRangeLabel } from "@/lib/pricing";
import { haversineMeters, formatDistance } from "@/lib/distance";
import MapSection from "@/components/MapSection";
import DiscoverList from "@/components/DiscoverList";
import BottomNav from "@/components/BottomNav";

export const dynamic = "force-dynamic";

export default async function DiscoverPage() {
  const salons = await getSalons();

  const items = salons
    .map((salon) => ({
      salon,
      distanceMeters: haversineMeters(USER_LOCATION, salon),
    }))
    .sort((a, b) => a.distanceMeters - b.distanceMeters)
    .map(({ salon, distanceMeters }) => ({
      salon,
      distanceLabel: formatDistance(distanceMeters),
    }));

  const mapSalons = items.map(({ salon }) => ({
    id: salon.id,
    name: salon.name,
    lat: salon.lat,
    lng: salon.lng,
    priceLabel: priceRangeLabel(salon),
  }));

  return (
    <div className="app-shell">
      <div className="page-scroll">
        <div className="app-header">
          <div>
            <div className="logo">
              NailMaps<span className="dot">.</span>
            </div>
            <div className="header-sub">
              {USER_LOCATION.label} yakınında {salons.length} salon
            </div>
          </div>
          <div className="bell">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2B2024" strokeWidth="2">
              <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </div>
        </div>

        <MapSection salons={mapSalons} userLocation={USER_LOCATION} />

        <DiscoverList items={items} />
      </div>

      <BottomNav />
    </div>
  );
}
