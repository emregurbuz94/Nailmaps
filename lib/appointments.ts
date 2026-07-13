import { prisma } from "./db";
import { Appointment, AppointmentStatus } from "./types";

export async function getAppointments(): Promise<Appointment[]> {
  const rows = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
  });
  return rows.map((r) => ({
    id: r.id,
    salonId: r.salonId,
    salonName: r.salonName,
    serviceName: r.serviceName,
    duration: r.duration,
    price: r.price,
    dateLabel: r.dateLabel,
    dayNum: r.dayNum,
    monthLabel: r.monthLabel,
    time: r.time,
    status: r.status as AppointmentStatus,
  }));
}
