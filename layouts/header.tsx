import { Logo } from "@/components/core/logo";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "./navbar";

export const Header = () => {
  return (
    <header className="flex py-8 px-24 space-x-2  sticky  top-0 z-50 bg-white h-20">
      <Logo />
      <Badge className="bg-rose-500 hover:bg-rose-500">Alpha</Badge>
      <Navbar />
    </header>
  );
};