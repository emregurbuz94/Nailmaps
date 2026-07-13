export type ServicePattern = "marble" | "french" | "glitter" | "dots";

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
}

export interface Salon {
  id: string;
  name: string;
  district: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  about: string;
  pattern: ServicePattern;
  colors: [string, string, string];
  services: Service[];
}

export type AppointmentStatus = "confirmed" | "pending";

export interface Appointment {
  id: string;
  salonId: string;
  salonName: string;
  serviceName: string;
  duration: string;
  price: number;
  dateLabel: string;
  dayNum: number;
  monthLabel: string;
  time: string;
  status: AppointmentStatus;
}
