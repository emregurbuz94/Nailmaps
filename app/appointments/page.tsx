import { getAppointments } from "@/lib/appointments";
import BottomNav from "@/components/BottomNav";

export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const appointments = await getAppointments();

  return (
    <div className="app-shell">
      <div className="app-header">
        <div className="logo" style={{ fontSize: 20 }}>
          Randevularım
        </div>
      </div>

      <div className="page-scroll">
        {appointments.length === 0 ? (
          <div className="empty-wrap">
            <div className="section-title">Henüz randevun yok</div>
            <div className="header-sub">
              Keşfet sekmesinden bir salon seçip randevu alabilirsin.
            </div>
          </div>
        ) : (
          appointments.map((apt) => (
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
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}
