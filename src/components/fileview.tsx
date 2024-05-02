"use client"
import { fileToDownloadFromText } from "utils/client";
import type { EventType } from "models/event";
import type { FileType } from "models/file";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";

export default function FileView({ event }: { event: EventType }) {
  const handleDownload = (file: FileType) => fileToDownloadFromText(file.transcription);

  return (
    <div className="grid grid-cols-1 w-full gap-6 mt-8 w-[80%] max-w-[40rem]">
      {event.files?.map((file: FileType) => (
        <div key={file.name} onClick={ () => handleDownload(file) } className="transition-all flex flex-row w-full items-center gap-4 p-4 pr-6 cursor-pointer rounded-md bg-slate-100 hover:shadow-xl hover:shadow-slate-300/50">
          <Image src="/icons/text.png" alt="File Icon" className="object-contain" width={40} height={40}/>

          <div className="flex flex-col flex-grow min-w-0 gap-1">
            <p className="truncate flex-grow text-ellipsis overflow-hidden">{file.name}</p>
            <p className="text-xs text-slate-400 uppercase">{file.transcription.length} chars</p>
          </div>

          <FaDownload className="text-slate-600"/>
        </div>
      ))}
    </div>
  );
}
