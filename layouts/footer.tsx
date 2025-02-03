import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-center border-t h-16 text-sm mt-8">
      <span className="text-sm mr-1">Brought to you by</span>
      <Link
        href="https://github.com/alamenai"
        target="_blank"
        className="underline"
      >
        Ala Eddine Menai
      </Link>
    </footer>
  );
};
