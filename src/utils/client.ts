"use client"
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export async function captureVideoFrame (videoSrc: string, fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.onloadedmetadata = () => {
      video.currentTime = 5;
    };
    video.onerror = () => {
      reject(new Error(`Failed to load video file: ${fileName}`));
    };
    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL();
      URL.revokeObjectURL(videoSrc);
      resolve(imageUrl);
    };
  });
};

export async function fileToHash(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  return bufferToHex(hashBuffer as Buffer);
};

function bufferToHex(buffer: Buffer) {
  return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
};
