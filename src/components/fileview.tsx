"use client"
import { fileToDownloadFromText } from "utils/client";
import type { EventType } from "models/event";
import type { FileType } from "models/file";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";

interface FileViewProps {
  event: EventType;
  keyAccess: string;
}

export default function FileView({ event, keyAccess }: FileViewProps) {
  const handleDownload = (file: any) => {
    const [ fileName ] = file.name.split(".");
    const name = [keyAccess.toUpperCase(), fileName].join(" - ");
    return fileToDownloadFromText(name, file[keyAccess])
  };

  return (
    <div className="grid grid-cols-1 w-full gap-6 mt-8 w-[80%] max-w-[40rem]">
      {event.files?.map((file: any) => (
        <div key={file.name} onClick={ () => handleDownload(file) } className={`transition-all flex flex-row w-full items-center gap-4 p-4 pr-6 cursor-pointer rounded-md border-2 ${file.status === "Completed" ? "bg-slate-100 border-transparent" : "bg-red-200 border-red-500"} hover:shadow-xl hover:shadow-slate-300/50`}>
          <Image src="/icons/text.png" alt="File Icon" className="object-contain" width={40} height={40}/>

          <div className="flex flex-col flex-grow min-w-0 gap-1">
            <p className="truncate flex-grow text-ellipsis overflow-hidden">{file.name}</p>
            <p className="text-xs text-slate-500 uppercase">
              {(file.status !== "Completed") ? (
                "Task Failed"
              ) : (
                <>{file[keyAccess] ? file[keyAccess].length : 0} chars</>
              )}
            </p>
          </div>

          <FaDownload className="text-slate-600"/>
        </div>
      ))}
    </div>
  );
}
