import EventManager from "models/event";
import FileView from "components/fileview";
import Header from "components/header";

export default async function Page({ params }: { params: { id: string } }) {
  const event = await EventManager.get(params.id);

  return (
    <main className="flex flex-col justify-center items-center h-[85%]">
      <Header title="Content Transcription" subtitle="Download the transcription of your files"/>

      <FileView event={ event } keyAccess="transcription"/>
    </main>
  );
}
