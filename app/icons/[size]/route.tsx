import { ImageResponse } from "next/og";
import { AppIconSvg } from "@/lib/app-icon";

const ALLOWED_SIZES = [192, 512];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ size: string }> }
) {
  const { size: sizeParam } = await params;
  const requested = parseInt(sizeParam, 10);
  const size = ALLOWED_SIZES.includes(requested) ? requested : 512;

  return new ImageResponse(<AppIconSvg size={size} />, {
    width: size,
    height: size,
  });
}
