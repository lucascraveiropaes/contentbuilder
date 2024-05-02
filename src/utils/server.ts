export async function fileToHash(file: Blob): Promise<string | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-512", arrayBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    return hashHex;
  } catch (error) {
    console.error("Error hashing the file:", error);
    return null;
  }
}
