import { Paintbrush } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Paintbrush />
      <span>Vibrant UI</span>
    </Link>
  );
};
