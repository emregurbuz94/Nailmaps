import { useSyncExternalStore } from "react";
import { Appointment } from "./types";
import { nextDays } from "./dates";

// Gerçek bir veritabanı/backend gelene kadar randevular tarayıcının
// localStorage'ında tutulur. Bu dosya tek giriş noktası olduğu için
// ileride bir API çağrısına dönüştürmek diğer sayfaları etkilemez.
const STORAGE_KEY = "nailmaps.appointments";

const listeners = new Set<() => void>();
let cachedSnapshot: Appointment[] | null = null;

function seedAppointments(): Appointment[] {
  const days = nextDays(14);
  const a = days[5];
  const b = days[11];
  return [
    {
      id: "seed-1",
      salonId: "bella-nails-studio",
      salonName: "Bella Nails Studio",
      serviceName: "Kalıcı Oje (Jel)",
      duration: "60 dk",
      price: 500,
      dateLabel: a.dayLabel,
      dayNum: a.dayNum,
      monthLabel: a.monthLabel,
      time: "14:30",
      status: "confirmed",
    },
    {
      id: "seed-2",
      salonId: "marbled-beauty-bar",
      salonName: "Marbled Beauty Bar",
      serviceName: "Manikür + Pedikür",
      duration: "75 dk",
      price: 550,
      dateLabel: b.dayLabel,
      dayNum: b.dayNum,
      monthLabel: b.monthLabel,
      time: "11:00",
      status: "pending",
    },
  ];
}

function readAppointments(): Appointment[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedAppointments();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    return JSON.parse(raw) as Appointment[];
  } catch {
    return [];
  }
}

function getSnapshot(): Appointment[] {
  if (cachedSnapshot === null) cachedSnapshot = readAppointments();
  return cachedSnapshot;
}

function getServerSnapshot(): Appointment[] {
  return [];
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAppointments(): Appointment[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function addAppointment(input: Omit<Appointment, "id" | "status">): Appointment {
  const appointment: Appointment = {
    ...input,
    id: `apt-${Date.now()}-${Math.round(Math.random() * 1000)}`,
    status: "pending",
  };
  cachedSnapshot = [appointment, ...getSnapshot()];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedSnapshot));
  listeners.forEach((listener) => listener());
  return appointment;
}
