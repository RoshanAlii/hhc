import type { Metadata } from "next";
import PortalView from "@/components/PortalView";
export const metadata: Metadata = { title: "My account" };
export default function AccountPage() { return <PortalView screen="overview" />; }
