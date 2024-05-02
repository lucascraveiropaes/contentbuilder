"use client"
import axios from "axios";
import type { EnhancedFile } from "hooks/preview";
import FilePicker from "components/filepicker";
import Header from "components/header";

export default function Home() {
  // fileToHash

  const onSubmit = async (files: EnhancedFile[]) => {
    const formData = new FormData();

    files.forEach(file => {
      if (file.name)
        formData.append("files[]", file, file.name);
    });

    try {
      const response = await axios.post("/api/transcriptions", formData);

      if (response.status === 200) {
        console.log("Success: ", response);
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-[85%]">
      <Header title="Content Sumary" subtitle="Select a file to upload and click next"/>

      <div className="flex flex-row w-full gap-10 justify-center items-center mt-8">
        <FilePicker onSubmit={ onSubmit }/>
      </div>
    </main>
  );
}
