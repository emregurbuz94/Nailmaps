"use client";

import { useMemo, useState } from "react";
import SalonCard from "./SalonCard";
import { Salon } from "@/lib/types";

interface SalonWithDistance {
  salon: Salon;
  distanceLabel: string;
}

interface Filter {
  key: string;
  label: string;
  match?: string;
}

const FILTERS: Filter[] = [
  { key: "all", label: "Tümü" },
  { key: "today", label: "Bugün müsait" },
  { key: "gel", label: "Jel", match: "Jel" },
  { key: "permanent", label: "Kalıcı Oje", match: "Kalıcı" },
  { key: "pedicure", label: "Pedikür", match: "Pedikür" },
];

export default function DiscoverList({ items }: { items: SalonWithDistance[] }) {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    const filter = FILTERS.find((f) => f.key === active);
    if (!filter || !filter.match) return items;
    return items.filter(({ salon }) =>
      salon.services.some((s) => s.name.includes(filter.match as string))
    );
  }, [active, items]);

  return (
    <>
      <div className="filters">
        {FILTERS.map((f) => (
          <div
            key={f.key}
            className={`chip ${active === f.key ? "active" : ""}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </div>
        ))}
      </div>

      <div className="section-row">
        <div className="section-title">Yakınındaki salonlar</div>
        <div className="section-count">{filtered.length} sonuç</div>
      </div>

      <div className="salon-list">
        {filtered.map(({ salon, distanceLabel }) => (
          <SalonCard key={salon.id} salon={salon} distanceLabel={distanceLabel} />
        ))}
      </div>
    </>
  );
}
