import { Paintbrush } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2 w-fit">
      <Paintbrush />
      <span className="text-nowrap">Vibrant UI</span>
    </Link>
  );
};
