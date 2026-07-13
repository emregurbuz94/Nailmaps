import Link from "next/link";
import { getAppointments } from "@/lib/appointments";
import { auth } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";

export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const session = await auth();

  return (
    <div className="app-shell">
      <div className="app-header">
        <div className="logo" style={{ fontSize: 20 }}>
          Randevularım
        </div>
      </div>

      <div className="page-scroll">
        {!session?.user ? (
          <div className="empty-wrap">
            <div className="section-title">Randevularını görmek için giriş yap</div>
            <div className="header-sub">
              Hesabın yoksa hemen bir tane oluşturabilirsin.
            </div>
            <Link
              href="/login?callbackUrl=%2Fappointments"
              className="btn-primary"
              style={{ display: "inline-block", marginTop: 16, textAlign: "center" }}
            >
              Giriş Yap
            </Link>
          </div>
        ) : (
          <AppointmentsList userId={session.user.id} />
        )}
      </div>

      <BottomNav />
    </div>
  );
}

async function AppointmentsList({ userId }: { userId: string }) {
  const appointments = await getAppointments(userId);

  if (appointments.length === 0) {
    return (
      <div className="empty-wrap">
        <div className="section-title">Henüz randevun yok</div>
        <div className="header-sub">
          Keşfet sekmesinden bir salon seçip randevu alabilirsin.
        </div>
      </div>
    );
  }

  return (
    <>
      {appointments.map((apt) => (
        <div className="apt-card" key={apt.id}>
          <div className="apt-date">
            <div className="m">{apt.monthLabel}</div>
            <div className="d">{apt.dayNum}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="salon-name">{apt.salonName}</div>
            <div className="salon-dist" style={{ marginTop: 3 }}>
              {apt.time} · {apt.serviceName}
            </div>
            <div className={`apt-status ${apt.status === "pending" ? "pending" : ""}`}>
              {apt.status === "confirmed" ? "Onaylandı" : "Bekliyor"}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
