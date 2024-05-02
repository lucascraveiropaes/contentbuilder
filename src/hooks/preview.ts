import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { captureVideoFrame } from "utils/client";

export interface EnhancedFile extends File {
  preview: string;
}

const useFilesWithPreview = (acceptedFiles: Blob[]): [EnhancedFile[], Dispatch<SetStateAction<EnhancedFile[]>>] => {
  const [filesWithPreview, setFilesWithPreview] = useState<EnhancedFile[]>([]);

  useEffect(() => {
    const updatePreviews = async () => {
      const files = await Promise.all(acceptedFiles.map(async (file: any) => {
        if (file.type.startsWith("video")) {
          const url = URL.createObjectURL(file);
          try {
            file.preview = await captureVideoFrame(url, file.name);
          } catch (error) {
            console.error(error);
            file.preview = "video.png";
          } finally {
            URL.revokeObjectURL(url);
          }
        } else {
          file.preview = "audio.png";
        }

        return file;
      }));

      setFilesWithPreview(files);
    };

    if (acceptedFiles.length > 0) {
      updatePreviews();
    }
  }, [acceptedFiles]);

  return [filesWithPreview, setFilesWithPreview];
};

export default useFilesWithPreview;
