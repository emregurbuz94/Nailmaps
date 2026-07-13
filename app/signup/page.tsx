import SignupForm from "@/components/SignupForm";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="app-shell">
      <div className="auth-wrap">
        <div className="logo">
          NailMaps<span className="dot">.</span>
        </div>
        <div className="auth-title" style={{ marginTop: 24 }}>
          Hesap oluştur
        </div>
        <div className="auth-sub">
          Randevularını takip etmek ve salonlara hızlıca ulaşmak için bir hesap aç.
        </div>

        <SignupForm callbackUrl={callbackUrl || "/"} />
      </div>
    </div>
  );
}
