"use client"
import { useRouter } from "next/navigation";
import FilePicker from "components/filepicker";
import Header from "components/header";
import axios from "axios";

export default function Home() {
  const router = useRouter()

  const onSubmit = async (zip: Blob) => {
    const formData = new FormData();
    formData.append("zip", zip);

    try {
      const { status, data: { data }} = await axios.post("/api/transcriptions", formData);

      if (status === 200)
        return router.push(`/transcription/${data.id}`);

      throw new Error(`Server responded with status: ${status}`);
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-[85%]">
      <Header title="Content Transcription" subtitle="Select a file to upload and click next"/>

      <div className="flex flex-row w-full gap-10 justify-center items-center mt-8">
        <FilePicker onSubmit={ onSubmit }/>
      </div>
    </main>
  );
}
