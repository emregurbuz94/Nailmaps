"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { nextDays, formatDayFull } from "@/lib/dates";
import { createAppointment } from "@/lib/actions";
import { Appointment, Salon } from "@/lib/types";

const SLOTS = [
  "10:00", "10:30", "11:00", "11:30", "13:00", "13:30",
  "14:00", "14:30", "16:00", "16:30", "17:30", "18:00",
];
const TAKEN = [2, 5, 9];

type Step = "service" | "time" | "confirm" | "confirmed";

export default function BookingWizard({ salon }: { salon: Salon }) {
  const router = useRouter();

  const [step, setStep] = useState<Step>("service");
  const [serviceIdx, setServiceIdx] = useState<number | null>(null);
  const [dayIdx, setDayIdx] = useState(0);
  const [slotIdx, setSlotIdx] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState<Appointment | null>(null);
  const [isPending, startTransition] = useTransition();

  const days = useMemo(() => nextDays(7), []);

  const service = serviceIdx !== null ? salon.services[serviceIdx] : null;
  const day = days[dayIdx];
  const time = slotIdx !== null ? SLOTS[slotIdx] : null;

  function backTo(dest: Step | "detail") {
    if (dest === "detail") {
      router.push(`/salon/${salon.id}`);
      return;
    }
    setStep(dest);
  }

  function handleConfirm() {
    if (!service || !time) return;
    startTransition(async () => {
      const appointment = await createAppointment({
        salonId: salon.id,
        serviceId: service.id,
        salonName: salon.name,
        serviceName: service.name,
        duration: service.duration,
        price: service.price,
        dateLabel: day.dayLabel,
        dayNum: day.dayNum,
        monthLabel: day.monthLabel,
        time,
      });
      setConfirmed(appointment);
      setStep("confirmed");
    });
  }

  return (
    <div className="app-shell">
      {step !== "confirmed" && (
        <div className="app-header centered">
          <button
            className="backbtn"
            onClick={() =>
              backTo(step === "service" ? "detail" : step === "time" ? "service" : "time")
            }
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2B2024" strokeWidth="2.4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="logo" style={{ fontSize: 16 }}>
            {step === "confirm" ? "Özet" : "Randevu Al"}
          </div>
          <div style={{ width: 36 }} />
        </div>
      )}

      {step !== "confirmed" && (
        <div className="stepbar">
          <div className="step done" />
          <div className={`step ${step === "time" || step === "confirm" ? "done" : ""}`} />
          <div className={`step ${step === "confirm" ? "done" : ""}`} />
        </div>
      )}

      {step === "service" && (
        <div className="page-scroll">
          <div className="booking-title">Hizmet seç</div>
          <div className="booking-sub">{salon.name} için hizmet seç</div>
          <div>
            {salon.services.map((sv, i) => (
              <div
                key={sv.id}
                className={`opt-row ${serviceIdx === i ? "selected" : ""}`}
                onClick={() => setServiceIdx(i)}
              >
                <div>
                  <div className="opt-name">{sv.name}</div>
                  <div className="opt-sub">{sv.duration}</div>
                </div>
                <div className="opt-price">₺{sv.price}</div>
              </div>
            ))}
          </div>
          <div className="cta-bar">
            <button
              className="btn-primary"
              disabled={serviceIdx === null}
              onClick={() => setStep("time")}
            >
              Devam Et
            </button>
          </div>
        </div>
      )}

      {step === "time" && (
        <div className="page-scroll">
          <div className="booking-title">Tarih ve saat seç</div>
          <div className="booking-sub">Müsait olan saatler gösteriliyor</div>
          <div className="daychips">
            {days.map((d, i) => (
              <div
                key={d.iso}
                className={`daychip ${dayIdx === i ? "selected" : ""}`}
                onClick={() => {
                  setDayIdx(i);
                  setSlotIdx(null);
                }}
              >
                <div className="dname">{d.dayLabel}</div>
                <div className="dnum">{d.dayNum}</div>
              </div>
            ))}
          </div>
          <div className="slotgrid">
            {SLOTS.map((t, i) => (
              <div
                key={t}
                className={`slot ${TAKEN.includes(i) ? "taken" : ""} ${
                  slotIdx === i ? "selected" : ""
                }`}
                onClick={() => !TAKEN.includes(i) && setSlotIdx(i)}
              >
                {t}
              </div>
            ))}
          </div>
          <div className="cta-bar">
            <button className="btn-primary" disabled={slotIdx === null} onClick={() => setStep("confirm")}>
              Devam Et
            </button>
          </div>
        </div>
      )}

      {step === "confirm" && service && time && (
        <div className="page-scroll">
          <div className="summary-card">
            <div className="sum-row heading">{salon.name}</div>
            <div className="sum-row">
              <span>Hizmet</span>
              <span>{service.name}</span>
            </div>
            <div className="sum-row">
              <span>Süre</span>
              <span>{service.duration}</span>
            </div>
            <div className="sum-row">
              <span>Tarih</span>
              <span>{formatDayFull(day.date)}</span>
            </div>
            <div className="sum-row">
              <span>Saat</span>
              <span>{time}</span>
            </div>
            <div className="sum-row total">
              <span>Toplam</span>
              <span>₺{service.price}</span>
            </div>
          </div>
          <div className="menu-item" style={{ marginTop: 14, cursor: "default" }}>
            <span>
              Ödeme yöntemi
              <div className="sub">Salonda ödeme</div>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2B2024" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
          <div className="cta-bar">
            <button className="btn-primary" disabled={isPending} onClick={handleConfirm}>
              {isPending ? "Onaylanıyor…" : "Randevuyu Onayla"}
            </button>
          </div>
        </div>
      )}

      {step === "confirmed" && confirmed && (
        <>
          <div className="confirm-wrap">
            <div className="confirm-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="confirm-title">Randevun alındı!</div>
            <div className="confirm-sub">
              Salon randevunu onayladığında bildirim göndereceğiz. Detayları Randevularım
              sekmesinden takip edebilirsin.
            </div>
            <div className="confirm-card">
              <div className="sum-row heading">{confirmed.salonName}</div>
              <div className="sum-row">
                <span>{confirmed.serviceName}</span>
                <span>₺{confirmed.price}</span>
              </div>
              <div className="sum-row">
                <span>
                  {confirmed.dateLabel} {confirmed.dayNum}, {confirmed.time}
                </span>
                <span></span>
              </div>
            </div>
          </div>
          <div className="cta-bar">
            <button className="btn-primary" onClick={() => router.push("/")}>
              Ana Sayfaya Dön
            </button>
          </div>
        </>
      )}
    </div>
  );
}
