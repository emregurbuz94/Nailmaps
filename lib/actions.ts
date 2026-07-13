"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import { Appointment } from "./types";

interface CreateAppointmentInput {
  salonId: string;
  serviceId: string;
  salonName: string;
  serviceName: string;
  duration: string;
  price: number;
  dateLabel: string;
  dayNum: number;
  monthLabel: string;
  time: string;
}

export async function createAppointment(
  input: CreateAppointmentInput
): Promise<Appointment> {
  const row = await prisma.appointment.create({
    data: {
      salonId: input.salonId,
      serviceId: input.serviceId,
      salonName: input.salonName,
      serviceName: input.serviceName,
      duration: input.duration,
      price: input.price,
      dateLabel: input.dateLabel,
      dayNum: input.dayNum,
      monthLabel: input.monthLabel,
      time: input.time,
      status: "pending",
    },
  });

  revalidatePath("/appointments");

  return {
    id: row.id,
    salonId: row.salonId,
    salonName: row.salonName,
    serviceName: row.serviceName,
    duration: row.duration,
    price: row.price,
    dateLabel: row.dateLabel,
    dayNum: row.dayNum,
    monthLabel: row.monthLabel,
    time: row.time,
    status: row.status as Appointment["status"],
  };
}
