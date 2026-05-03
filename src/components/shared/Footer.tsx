import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full rounded-none border-t border-stone-800 bg-stone-900 font-serif text-sm tracking-wide text-stone-300 transition-all duration-200 ease-in dark:bg-black dark:text-stone-500">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 text-center md:grid-cols-4 md:gap-12 md:px-8 md:py-16 md:text-left">
        <div className="md:col-span-1">
          <span className="mb-4 inline-block text-xl font-bold text-stone-50">
            Terra Coffee
          </span>
          <p className="mt-2 text-stone-400 md:mt-4">
            Sanctuary in every sip. Crafted with intention in the heart of the
            city.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-6 sm:flex-row sm:gap-16 md:col-span-2">
          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="text-stone-400 transition-colors hover:text-orange-400"
            >
              Journal
            </Link>
            <Link
              href="#"
              className="text-stone-400 transition-colors hover:text-orange-400"
            >
              Sustainability
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="text-stone-400 transition-colors hover:text-orange-400"
            >
              Locations
            </Link>
            <Link
              href="#"
              className="text-stone-400 transition-colors hover:text-orange-400"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center md:col-span-1 md:items-end">
          <div className="mb-6 flex gap-4">
            <Link
              href="#"
              className="text-stone-400 transition-colors hover:text-orange-400"
            >
              <span className="material-symbols-outlined">photo_camera</span>
            </Link>
            <Link
              href="#"
              className="text-stone-400 transition-colors hover:text-orange-400"
            >
              <span className="material-symbols-outlined">mail</span>
            </Link>
          </div>
          <p className="text-xs">
            © {new Date().getFullYear()} Terra Coffee. Sanctuary in every sip.
          </p>
        </div>
      </div>
    </footer>
  );
}
