import Link from "next/link";
import { notFound } from "next/navigation";
import { getSalonById, USER_LOCATION } from "@/lib/salons";
import { priceRangeLabel } from "@/lib/pricing";
import { haversineMeters, formatDistance } from "@/lib/distance";
import SalonCover from "@/components/SalonCover";

export default async function SalonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const salon = await getSalonById(id);
  if (!salon) notFound();

  const distanceLabel = formatDistance(haversineMeters(USER_LOCATION, salon));

  return (
    <div className="app-shell">
      <div className="page-scroll">
        <div className="detail-hero">
          <Link href="/" className="backbtn floating">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2B2024" strokeWidth="2.4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <SalonCover pattern={salon.pattern} colors={salon.colors} />
        </div>

        <div className="detail-panel">
          <div className="detail-title">{salon.name}</div>
          <div className="detail-meta">
            <span>
              <span className="star">★</span> {salon.rating.toFixed(1)} ({salon.reviews})
            </span>
            <span className="dotsep" />
            <span>{distanceLabel}</span>
            <span className="dotsep" />
            <span>{priceRangeLabel(salon)}</span>
          </div>
          <div className="about-text">
            {salon.about} {salon.address}
          </div>

          <div style={{ marginTop: 20 }}>
            <div className="section-title" style={{ marginBottom: 4 }}>
              Hizmetler
            </div>
            <div>
              {salon.services.map((sv) => (
                <div className="service-item" key={sv.id}>
                  <div>
                    <div className="service-name">{sv.name}</div>
                    <div className="service-sub">{sv.duration}</div>
                  </div>
                  <div className="service-price">₺{sv.price}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: 14 }} />
        </div>
      </div>

      <div className="cta-bar">
        <Link href={`/salon/${salon.id}/book`} className="btn-primary" style={{ display: "block", textAlign: "center" }}>
          Randevu Al
        </Link>
      </div>
    </div>
  );
}
