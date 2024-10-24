import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const processAIRequest = async (input: string, fileUrls: string[]): Promise<string> => {
  try {
    const messages = [
      { role: 'system', content: 'You are an AI assistant helping users with their AI project ideas.' },
      { role: 'user', content: input },
    ];

    if (fileUrls.length > 0) {
      messages.push({ role: 'user', content: `I've uploaded the following files: ${fileUrls.join(', ')}. Please consider these in your response.` });
    }

    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error processing AI request:', error);
    throw new Error('Failed to process AI request');
  }
};