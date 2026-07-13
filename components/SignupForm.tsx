"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser } from "@/lib/auth-actions";

export default function SignupForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, pending] = useActionState(registerUser, undefined);

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="form-field">
          <label className="form-label" htmlFor="name">
            Ad Soyad
          </label>
          <input
            className="form-input"
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
          />
        </div>
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
            minLength={6}
            autoComplete="new-password"
          />
        </div>
        {state?.error && <div className="form-error">{state.error}</div>}
        <div className="auth-submit">
          <button className="btn-primary" type="submit" disabled={pending}>
            {pending ? "Hesap oluşturuluyor…" : "Kayıt Ol"}
          </button>
        </div>
      </form>

      <div className="auth-switch">
        Zaten hesabın var mı? <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}>Giriş yap</Link>
      </div>
      <div className="auth-provider-note">Google ile giriş yakında eklenecek.</div>
    </>
  );
}
