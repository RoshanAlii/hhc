import Image from "next/image";
import logo from "@/public/logo.png";

// Official HealthServe logo (raster). Static import so Next applies the
// correct basePath/assetPrefix (e.g. /hhc on GitHub Pages) automatically.
const RATIO = 98 / 237; // intrinsic height / width

export default function Logo({ width = 186 }: { width?: number; tagline?: boolean }) {
  const height = Math.round(width * RATIO);
  return (
    <Image
      src={logo}
      width={width}
      height={height}
      alt="HealthServe — Home Healthcare"
      priority
      style={{ width, height: "auto" }}
    />
  );
}
