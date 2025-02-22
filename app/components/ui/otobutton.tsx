import { House } from "lucide-react";
import Link from "next/link";

const OtoButton = ({ url }: { url: string }) => {
  return (
    <Link href={url}>
      <button
        className="
        bg-[#71db71]
        hover:bg-[#89ce8b]
        rounded-lg
        px-8
        py-4
        flex
        items-center
        gap-4
        transition-colors
        duration-300
        cursor-pointer
        border
        border-[#03080303]
      "
      >
        <House className="w-6 h-6" />
        <span className="text-lg">
          Zobacz oryginalne ogłoszenie na <strong>otodom.pl</strong>
        </span>
      </button>
    </Link>
  );
};

export default OtoButton;
