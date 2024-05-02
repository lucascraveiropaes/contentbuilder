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

interface CompletionOptions {
  model: string;
  messages: { role: string; content: string }[];
  maxTokens?: number;
  temperature?: number;
}

export async function createTranscription(options: TranscriptionOptions) {
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

export async function createSummary(input: string) {
  const { choices: [{ message }]} = await createCompletion({
    model: "gpt-4",
    messages: [{
      "role": "user",
      "content": "Summarize the following content, keeping the summary in the same language of the original content."
    }, {
      "role": "user",
      "content": input
    }],
  });

  return message.content;
}

export async function createCompletion(options: CompletionOptions) {
  try {
    const data: any = {
      model: options.model,
      messages: options.messages,
      max_tokens: options.maxTokens,
      temperature: options.temperature
    };

    // Remove undefined keys
    Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

    const { data: response } = await OpenaiAPI.post("/chat/completions", data, {
      headers: { "Content-Type": "application/json" }
    });

    return response;
  } catch (error) {
    console.error("Error requesting completion:");
    console.log(JSON.stringify(error, null, 2))
    throw error;
  }
};
