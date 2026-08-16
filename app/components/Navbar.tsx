import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-black">
      <div>
        <h1 className="text-lg md:text-2xl text-mist-50 font-bold text-center mt-2 md:mt-4">
          MR. MOVIES
        </h1>
      </div>
      <div className="flex justify-center text-white">
        <div className="flex gap-2">
          <Link href="/" className="transition-colors hover:text-gray-600">
            Home
          </Link>
          <Link href="/Movie" className="transition-colors hover:text-gray-600">
            Movies
          </Link>
          <div className="flex-1"></div>
        </div>
      </div>
    </nav>
  );
}
