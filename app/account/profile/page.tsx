import type { Metadata } from "next";
import PortalView from "@/components/PortalView";
export const metadata: Metadata = { title: "Profile & preferences" };
export default function ProfilePage() { return <PortalView screen="profile" />; }
