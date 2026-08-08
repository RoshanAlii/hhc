import type { Metadata } from "next";
import ConfirmationView from "@/components/ConfirmationView";

export const metadata: Metadata = { title: "Booking confirmation", robots: { index: false, follow: false } };

export default function ConfirmationPage() {
  return <ConfirmationView />;
}
