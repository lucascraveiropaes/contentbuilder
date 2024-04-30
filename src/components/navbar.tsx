import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex flex-row px-12 py-4 justify-between gap-4">
      <Link href="/" className="w-[180px] h-[37]">
        <Image
          className="relative w-full dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/logo.svg"
          alt="ContentBuilder AI Logo"
          width={180}
          height={37}
          priority
        />
      </Link>

      <ul className="flex space-x-8">
        <li className="hover:text-main">
          <Link href="/dubbing">Video Dubbing</Link>
        </li>
        <li className="hover:text-main">
          <Link href="/summary">Content Summary</Link>
        </li>
        <li className="hover:text-main">
          <Link href="/transcription">Content Transcription</Link>
        </li>
      </ul>
    </nav>
  )
}
