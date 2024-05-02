import { EnhancedFile } from "hooks/preview";
import JSZip, { JSZipObject } from "jszip";

const jsZip = new JSZip();

export async function compressFiles(file: EnhancedFile[]): Promise<Blob> {
  file.forEach((file) => {
    jsZip.file(file.name, file);
  })

  const zipBlob = await jsZip.generateAsync({ type: "blob" });

  return zipBlob;
}

export async function decodeFiles(zipFile: File): Promise<File[]> {
  try {
    const filePromises: Promise<File>[] = [];
    const arrayBuffer = await zipFile.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    Object.keys(zip.files).forEach((filename) => {
      const file: any = zip.files[filename];

      if (!file.dir) {
        const filePromise = file.async('uint8array').then((uint8array: any) => {
          const blob = new Blob([uint8array], { type: file.type });
          return new File([blob], filename, { type: file.type });
        });

        filePromises.push(filePromise);
      }
    });

    return await Promise.all(filePromises);
  } catch (e) {
    console.error(e);
    throw new Error("Failed to decompress the zip file.");
  }
}
