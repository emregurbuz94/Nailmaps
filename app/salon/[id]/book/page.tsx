import { notFound } from "next/navigation";
import { getSalonById } from "@/lib/salons";
import BookingWizard from "@/components/BookingWizard";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const salon = await getSalonById(id);
  if (!salon) notFound();

  return <BookingWizard salon={salon} />;
}
