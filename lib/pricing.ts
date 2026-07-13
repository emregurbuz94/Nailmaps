import { Salon } from "./types";

// Saf yardımcı fonksiyon: veritabanına dokunmadığı için hem sunucu hem
// istemci bileşenlerinden (SalonCard gibi) güvenle import edilebilir.
export function priceRangeLabel(salon: Salon): string {
  const prices = salon.services.map((s) => s.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return `₺${min} – ₺${max}`;
}
