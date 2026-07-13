import LoginForm from "@/components/LoginForm";

export default async function LoginPage({
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
          Tekrar hoş geldin
        </div>
        <div className="auth-sub">Randevularını görmek için giriş yap.</div>

        <LoginForm callbackUrl={callbackUrl || "/"} />
      </div>
    </div>
  );
}
