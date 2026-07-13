import BottomNav from "@/components/BottomNav";

const MENU = [
  { label: "Kayıtlı salonlar" },
  { label: "Ödeme yöntemlerim" },
  { label: "Bildirim tercihleri" },
  { label: "Yardım & Destek" },
];

export default function ProfilePage() {
  return (
    <div className="app-shell">
      <div className="page-scroll">
        <div className="profile-head">
          <div className="avatar" />
          <div>
            <div className="salon-name" style={{ fontSize: 17 }}>
              Elif Yılmaz
            </div>
            <div className="header-sub">elif.yilmaz@mail.com</div>
          </div>
        </div>

        {MENU.map((item) => (
          <div className="menu-item" key={item.label}>
            {item.label} <span className="sub"></span>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
