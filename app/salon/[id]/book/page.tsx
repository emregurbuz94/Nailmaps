import { notFound, redirect } from "next/navigation";
import { getSalonById } from "@/lib/salons";
import { auth } from "@/lib/auth";
import BookingWizard from "@/components/BookingWizard";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();
  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(`/salon/${id}/book`)}`);
  }

  const salon = await getSalonById(id);
  if (!salon) notFound();

  return <BookingWizard salon={salon} />;
}
