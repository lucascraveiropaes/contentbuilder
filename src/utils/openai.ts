import axios, { AxiosRequestConfig } from "axios";

export const OpenaiAPI = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "multipart/form-data"
  }
});

interface TranscriptionOptions {
  file: Blob;
  model: string;
  language?: string;
  prompt?: string;
  responseFormat?: "json" | "text" | "srt" | "verbose_json" | "vtt";
  temperature?: number;
  timestampGranularities?: ("word" | "segment")[];
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
}

export const createTranscription = async (options: TranscriptionOptions) => {
  const formData = new FormData();
  formData.append("file", options.file);
  formData.append("model", options.model);

  if (options.language) formData.append("language", options.language);
  if (options.prompt) formData.append("prompt", options.prompt);
  if (options.responseFormat) formData.append("response_format", options.responseFormat);
  if (options.temperature) formData.append("temperature", options.temperature.toString());
  if (options.timestampGranularities) {
    options.timestampGranularities.forEach(granularity => formData.append("timestamp_granularities[]", granularity));
  }

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: options.onUploadProgress as any
  };

  try {
    const response = await OpenaiAPI.post("/audio/transcriptions", formData, config);
    return response.data;
  } catch (error) {
    console.error("Error requesting transcription:", error);
    throw error;
  }

};
