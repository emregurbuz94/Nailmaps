"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginUser } from "@/lib/auth-actions";

export default function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, pending] = useActionState(loginUser, undefined);

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="form-field">
          <label className="form-label" htmlFor="email">
            E-posta
          </label>
          <input
            className="form-input"
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="password">
            Şifre
          </label>
          <input
            className="form-input"
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </div>
        {state?.error && <div className="form-error">{state.error}</div>}
        <div className="auth-submit">
          <button className="btn-primary" type="submit" disabled={pending}>
            {pending ? "Giriş yapılıyor…" : "Giriş Yap"}
          </button>
        </div>
      </form>

      <div className="auth-switch">
        Hesabın yok mu? <Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}>Kayıt ol</Link>
      </div>
      <div className="auth-provider-note">Google ile giriş yakında eklenecek.</div>
    </>
  );
}
