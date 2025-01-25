import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WavyText from "@/components/wavy-text";
import Link from "next/link";

const Page = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center pt-24">
      <Badge className="bg-rose-500 hover:bg-rose-500">Alpha</Badge>
      <WavyText text="Vibrant UI" />
      <p className="text-2xl">Make your user interfaces more vibrant.</p>
      <Link href="https://github.com/alamenai/vibrant-ui" target="_blank">
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-full mt-16">
          See on Github
        </Button>
      </Link>
    </div>
  );
};

export default Page;
