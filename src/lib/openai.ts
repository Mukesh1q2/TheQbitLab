import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Chat completions
export async function createChatCompletion(
  messages: Array<{
    role: 'system' | 'user' | 'assistant'
    content: string
  }>,
  model = 'gpt-3.5-turbo',
  temperature = 0.7,
  maxTokens?: number
) {
  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    })

    return completion
  } catch (error) {
    console.error('Error creating chat completion:', error)
    throw error
  }
}

// Text completions (for older models)
export async function createTextCompletion(
  prompt: string,
  model = 'gpt-3.5-turbo-instruct',
  temperature = 0.7,
  maxTokens = 150
) {
  try {
    const completion = await openai.completions.create({
      model,
      prompt,
      temperature,
      max_tokens: maxTokens,
    })

    return completion
  } catch (error) {
    console.error('Error creating text completion:', error)
    throw error
  }
}

// Image generation
export async function generateImage(
  prompt: string,
  size: "1024x1024" | "1792x1024" | "1024x1792" = "1024x1024",
  quality: "standard" | "hd" = "standard",
  n = 1
) {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size,
      quality,
      n,
    })

    return response
  } catch (error) {
    console.error('Error generating image:', error)
    throw error
  }
}

// Embeddings
export async function createEmbedding(
  input: string | string[],
  model = 'text-embedding-ada-002'
) {
  try {
    const response = await openai.embeddings.create({
      model,
      input,
    })

    return response
  } catch (error) {
    console.error('Error creating embedding:', error)
    throw error
  }
}

// Audio transcription
export async function transcribeAudio(
  audioFile: File,
  model = 'whisper-1'
) {
  try {
    const response = await openai.audio.transcriptions.create({
      model,
      file: audioFile,
    })

    return response
  } catch (error) {
    console.error('Error transcribing audio:', error)
    throw error
  }
}

// Speech synthesis
export async function createSpeech(
  text: string,
  voice = 'alloy',
  model = 'tts-1'
) {
  try {
    const response = await openai.audio.speech.create({
      model,
      voice,
      input: text,
    })

    return response
  } catch (error) {
    console.error('Error creating speech:', error)
    throw error
  }
}

// List available models
export async function listModels() {
  try {
    const response = await openai.models.list()
    return response
  } catch (error) {
    console.error('Error listing models:', error)
    throw error
  }
}