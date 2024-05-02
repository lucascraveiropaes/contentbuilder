"use client";
import React, { useState } from "react";
import useFilesWithPreview from "hooks/preview";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { compressFiles } from "utils/compress";
import { useDropzone } from "react-dropzone";
import { formatBytes } from "utils/client";

interface FilePickerProps {
  onSubmit: (files: Blob) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ onSubmit }) => {
  const [acceptedFiles, setAcceptedFiles] = useState<Blob[]>([]);

  const onDrop: any = async (files: File[]) => setAcceptedFiles(files);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".wmv", ".avi"],
      "audio/*": [".mp3", ".wav", ".aac"]
    }
  });

  const [files, updateFiles] = useFilesWithPreview(acceptedFiles);
  const hasFiles = Boolean(acceptedFiles.length > 0);
  const isLoading = Boolean(hasFiles && files.length === 0);

  const handleDelete = (filePath: string) => {
    const newFiles = files.filter(file => file.name !== filePath);
    updateFiles(newFiles);

    if (newFiles.length === 0) setAcceptedFiles([]);
  };

  const handleNext = async () => onSubmit(await compressFiles(files));

  return (
    <section className="flex flex-col w-full gap-6 items-center px-8">
      <div className="w-full max-w-[50rem] border-2 border-slate-400 text-slate-600 border-dashed rounded-lg">
        {(!hasFiles) && (
          <div {...getRootProps({className: "dropzone flex-center w-full h-[20rem]" })}>
            <input {...getInputProps()} />
            <p>Drag & Drop some files here, or click to select files</p>
          </div>
        )}
        {(hasFiles) && (
          <>
            {(isLoading) ? (
              <div className="flex-center w-full h-[20rem]">
                <p>Wait a moment...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 divide-y-2 divide-slate-400 divide-dashed">
                {files.map((file: any) => (
                  <div key={file.path || file.name} className="flex flex-row items-center gap-4 p-4 hover:bg-black/5">
                    <img src={file.preview} alt={`preview-${file.name}`} className="w-20 aspect-video rounded object-contain"/> {/* Assuming image preview for simplicity */}

                    <div className="flex flex-col flex-grow min-w-0 gap-1">
                      <p className="truncate flex-grow text-ellipsis overflow-hidden">{file.name}</p>
                      <p className="text-xs text-slate-400 uppercase">{formatBytes(file.size)}</p>
                    </div>

                    <button className="p-3 rounded hover:bg-red-100 hover:text-red-500" onClick={() => handleDelete(file.path)}>
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {(hasFiles && !isLoading) && (
        <button onClick={ handleNext } className="flex-center gap-3 bg-main text-white/90 text-lg font-medium p-2.5 px-6 rounded transition-all hover:shadow-lg hover:text-white">
          Next <FaArrowRight />
        </button>
      )}
    </section>
  );
}

export default FilePicker;
