import FilePicker from "components/filepicker";
import Header from "components/header";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-[85%]">
      <Header title="Content Sumary" subtitle="Select a file to upload and click next"/>

      <div className="flex flex-row w-full gap-10 justify-center items-center mt-8">
        <FilePicker/>
      </div>
    </main>
  );
}
