import Header from "components/header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-[85%]">
      <Header title="Select a service" subtitle="All services powered by AI"/>

      <div className="flex flex-row w-full gap-10 justify-center items-center mt-8">
        <Card title="Video Dubbing" src="/icons/dubbing.png" href="/dubbing"/>
        <Card title="Content Summary" src="/icons/summary.png" href="/summary"/>
        <Card title="Content Transcription" src="/icons/transcription.png" href="/transcription"/>
      </div>
    </main>
  );
}

interface CardProps {
  title: string;
  src: string;
  href: string;
}

function Card({ title, src, href }: CardProps) {
  return (
    <Link href={ href } className="flex flex-col justify-center items-center p-4 w-full max-w-[260px] rounded-lg border-[1px] border-slate-300/30 aspect-square transition-all shadow-md hover:shadow-xl">
      <Image src={ src } alt={ title } width={130} height={130}/>
      <p className="mt-6 text-slate-600">{ title }</p>
    </Link>
  )
}
