import Link from "next/link";
import SalonCover from "./SalonCover";
import { Salon } from "@/lib/types";
import { priceRangeLabel } from "@/lib/salons";

interface Props {
  salon: Salon;
  distanceLabel: string;
}

export default function SalonCard({ salon, distanceLabel }: Props) {
  return (
    <Link href={`/salon/${salon.id}`} className="salon-card">
      <div className="salon-cover">
        <SalonCover pattern={salon.pattern} colors={salon.colors} />
      </div>
      <div className="salon-body">
        <div className="salon-top">
          <div className="salon-name">{salon.name}</div>
          <div className="salon-dist">{distanceLabel}</div>
        </div>
        <div className="salon-rating">
          <span className="star">★</span> {salon.rating.toFixed(1)}{" "}
          <span style={{ color: "#B8ABA6" }}>({salon.reviews})</span>
        </div>
        <div className="salon-price">{priceRangeLabel(salon)}</div>
        <div className="swatches">
          {salon.colors.map((c, i) => (
            <div key={i} className="swatch" style={{ background: c }} />
          ))}
        </div>
      </div>
    </Link>
  );
}
