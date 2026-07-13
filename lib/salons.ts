import { prisma } from "./db";
import { Salon, ServicePattern } from "./types";

// Veriler artık SQLite veritabanından (prisma/dev.db) geliyor.
// Örnek/başlangıç verisi prisma/seed.ts içinde tanımlı; ileride
// gerçek bir yönetim ekranı veya farklı bir veritabanı sağlayıcısına
// geçmek de bu dosyayı değiştirmek anlamına gelir, uygulamanın geri
// kalanı Salon/Service tipini olduğu gibi kullanmaya devam eder.

// Kullanıcının varsayılan konumu (demo amaçlı sabit; ileride tarayıcı
// konum izniyle değiştirilebilir).
export const USER_LOCATION = { lat: 38.4368, lng: 27.1428, label: "Alsancak" };

function toSalon(row: {
  id: string;
  name: string;
  district: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  about: string;
  pattern: string;
  colorA: string;
  colorB: string;
  colorC: string;
  services: { id: string; name: string; duration: string; price: number }[];
}): Salon {
  return {
    id: row.id,
    name: row.name,
    district: row.district,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    rating: row.rating,
    reviews: row.reviews,
    about: row.about,
    pattern: row.pattern as ServicePattern,
    colors: [row.colorA, row.colorB, row.colorC],
    services: row.services,
  };
}

export async function getSalons(): Promise<Salon[]> {
  const rows = await prisma.salon.findMany({ include: { services: true } });
  return rows.map(toSalon);
}

export async function getSalonById(id: string): Promise<Salon | undefined> {
  const row = await prisma.salon.findUnique({
    where: { id },
    include: { services: true },
  });
  return row ? toSalon(row) : undefined;
}
