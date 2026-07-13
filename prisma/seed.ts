import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const SALONS = [
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
    colorA: "#93314C",
    colorB: "#C6A15B",
    colorC: "#2B2024",
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
    colorA: "#F1DCDF",
    colorB: "#C6A15B",
    colorC: "#93314C",
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
    colorA: "#C6A15B",
    colorB: "#93314C",
    colorC: "#F1DCDF",
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
    colorA: "#93314C",
    colorB: "#F1DCDF",
    colorC: "#C6A15B",
    services: [
      { id: "dogal-manikur", name: "Doğal Bakım Manikür", duration: "40 dk", price: 280 },
      { id: "cicek-nail-art", name: "Çiçek Desenli Nail Art", duration: "60 dk", price: 580 },
      { id: "oje-cikarma", name: "Kalıcı Oje Çıkarma", duration: "20 dk", price: 100 },
    ],
  },
];

async function main() {
  for (const { services, ...salon } of SALONS) {
    await prisma.salon.upsert({
      where: { id: salon.id },
      update: salon,
      create: salon,
    });
    for (const service of services) {
      await prisma.service.upsert({
        where: { id: service.id },
        update: { ...service, salonId: salon.id },
        create: { ...service, salonId: salon.id },
      });
    }
  }

  const existingAppointments = await prisma.appointment.count();
  if (existingAppointments === 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inDays = (n: number) => {
      const d = new Date(today);
      d.setDate(d.getDate() + n);
      return d;
    };
    const monthAbbr = [
      "Oca", "Şub", "Mar", "Nis", "May", "Haz",
      "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara",
    ];

    const a = inDays(5);
    const b = inDays(11);

    await prisma.appointment.createMany({
      data: [
        {
          salonId: "bella-nails-studio",
          serviceId: "jel-oje",
          salonName: "Bella Nails Studio",
          serviceName: "Kalıcı Oje (Jel)",
          duration: "60 dk",
          price: 500,
          dateLabel: a.getDate() === today.getDate() ? "Bug." : "Gün",
          dayNum: a.getDate(),
          monthLabel: monthAbbr[a.getMonth()],
          time: "14:30",
          status: "confirmed",
        },
        {
          salonId: "marbled-beauty-bar",
          serviceId: "mani-pedi",
          salonName: "Marbled Beauty Bar",
          serviceName: "Manikür + Pedikür",
          duration: "75 dk",
          price: 550,
          dateLabel: b.getDate() === today.getDate() ? "Bug." : "Gün",
          dayNum: b.getDate(),
          monthLabel: monthAbbr[b.getMonth()],
          time: "11:00",
          status: "pending",
        },
      ],
    });
  }

  console.log("Seed tamamlandı.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
