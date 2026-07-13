import Link from "next/link";
import { auth } from "@/lib/auth";
import { logoutUser } from "@/lib/auth-actions";
import BottomNav from "@/components/BottomNav";

const MENU = [
  { label: "Kayıtlı salonlar" },
  { label: "Ödeme yöntemlerim" },
  { label: "Bildirim tercihleri" },
  { label: "Yardım & Destek" },
];

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="app-shell">
      <div className="page-scroll">
        {!session?.user ? (
          <div className="empty-wrap">
            <div className="section-title">Hesabına giriş yap</div>
            <div className="header-sub">
              Profilini görmek ve randevularını yönetmek için giriş yapman gerekiyor.
            </div>
            <Link
              href="/login?callbackUrl=%2Fprofile"
              className="btn-primary"
              style={{ display: "inline-block", marginTop: 16, textAlign: "center" }}
            >
              Giriş Yap
            </Link>
          </div>
        ) : (
          <>
            <div className="profile-head">
              <div className="avatar" />
              <div>
                <div className="salon-name" style={{ fontSize: 17 }}>
                  {session.user.name}
                </div>
                <div className="header-sub">{session.user.email}</div>
              </div>
            </div>

            {MENU.map((item) => (
              <div className="menu-item" key={item.label}>
                {item.label} <span className="sub"></span>
              </div>
            ))}

            <form action={logoutUser}>
              <div className="menu-item" style={{ justifyContent: "center", color: "var(--wine-dark)" }}>
                <button
                  type="submit"
                  style={{
                    background: "none",
                    border: "none",
                    font: "inherit",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  Çıkış Yap
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
