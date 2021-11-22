import Link from 'next/link';
import Image from 'next/image';

const Logo = () => (
  <Link href="/">
    <div className="flex items-center space-x-2 cursor-pointer">
      <Image src="/leaf.svg" alt="Logo" width={32} height={32} />
      <span className="hidden sm:inline-block font-extrabold text-3xl text-gray-700">
        Neeyah Store
      </span>
    </div>
  </Link>
);

export default Logo;
