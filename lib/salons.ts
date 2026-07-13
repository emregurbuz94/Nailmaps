import { Salon } from "./types";

// Örnek/sabit salon verisi. İleride burası gerçek bir veritabanı
// sorgusuna (örn. Postgres/Supabase) dönüştürülebilir; geri kalan
// uygulama sadece bu fonksiyonları çağırdığı için başka hiçbir yer
// değişmesine gerek kalmaz.
const SALONS: Salon[] = [
  {
    id: "bella-nails-studio",
    name: "Bella Nails Studio",
    district: "Alsancak",
    address: "Alsancak, Kıbrıs Şehitleri Cd. No:24",
    lat: 38.438,
    lng: 27.142,
    rating: 4.9,
    reviews: 212,
    about:
      "Steril ekipman ve 8 yıllık deneyimli ekibiyle jel, akrilik ve nail art konusunda uzman bir stüdyo.",
    pattern: "marble",
    colors: ["#93314C", "#C6A15B", "#2B2024"],
    services: [
      { id: "manikur-klasik", name: "Klasik Manikür", duration: "45 dk", price: 350 },
      { id: "jel-oje", name: "Jel Oje (Kalıcı)", duration: "60 dk", price: 500 },
      { id: "akrilik", name: "Akrilik Uzatma", duration: "90 dk", price: 700 },
      { id: "nail-art", name: "Nail Art (parça başı)", duration: "10 dk", price: 40 },
    ],
  },
  {
    id: "marbled-beauty-bar",
    name: "Marbled Beauty Bar",
    district: "Konak",
    address: "Konak, Mimar Sinan Cd. No:8",
    lat: 38.4185,
    lng: 27.1275,
    rating: 4.7,
    reviews: 158,
    about:
      "Ferah ve pastel bir atmosferde manikür-pedikür, mermer desen ve fransız tarzı uzman kadromuzla.",
    pattern: "french",
    colors: ["#F1DCDF", "#C6A15B", "#93314C"],
    services: [
      { id: "mani-pedi", name: "Manikür + Pedikür", duration: "75 dk", price: 550 },
      { id: "fransiz-jel", name: "Fransız Tarzı Jel", duration: "60 dk", price: 480 },
      { id: "parafin", name: "Parafin Bakım", duration: "30 dk", price: 300 },
    ],
  },
  {
    id: "glow-nail-house",
    name: "Glow Nail House",
    district: "Bostanlı",
    address: "Bostanlı, Cemal Gürsel Cd. No:112",
    lat: 38.461,
    lng: 27.1015,
    rating: 4.8,
    reviews: 301,
    about: "Glitter ve ombre uygulamalarında uzmanlaşmış, canlı ve enerjik bir ekip.",
    pattern: "glitter",
    colors: ["#C6A15B", "#93314C", "#F1DCDF"],
    services: [
      { id: "ombre-jel", name: "Ombre Jel Oje", duration: "60 dk", price: 520 },
      { id: "glitter", name: "Glitter Kaplama", duration: "50 dk", price: 450 },
      { id: "pedikur-klasik", name: "Klasik Pedikür", duration: "45 dk", price: 320 },
    ],
  },
  {
    id: "petal-and-polish",
    name: "Petal & Polish",
    district: "Karşıyaka",
    address: "Karşıyaka, Girne Bulvarı No:56",
    lat: 38.466,
    lng: 27.114,
    rating: 4.6,
    reviews: 94,
    about: "Çiçek desenli nail art ve doğal bakım ürünleriyle çalışan butik bir salon.",
    pattern: "dots",
    colors: ["#93314C", "#F1DCDF", "#C6A15B"],
    services: [
      { id: "dogal-manikur", name: "Doğal Bakım Manikür", duration: "40 dk", price: 280 },
      { id: "cicek-nail-art", name: "Çiçek Desenli Nail Art", duration: "60 dk", price: 580 },
      { id: "oje-cikarma", name: "Kalıcı Oje Çıkarma", duration: "20 dk", price: 100 },
    ],
  },
];

// Kullanıcının varsayılan konumu (demo amaçlı sabit; ileride tarayıcı
// konum izniyle değiştirilebilir).
export const USER_LOCATION = { lat: 38.4368, lng: 27.1428, label: "Alsancak" };

export function getSalons(): Salon[] {
  return SALONS;
}

export function getSalonById(id: string): Salon | undefined {
  return SALONS.find((s) => s.id === id);
}

export function priceRangeLabel(salon: Salon): string {
  const prices = salon.services.map((s) => s.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return `₺${min} – ₺${max}`;
}
