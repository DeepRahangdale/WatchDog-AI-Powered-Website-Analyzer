import { useState } from 'react';

export const useChatbot = (text) => {
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, question: message })
      });

      if (!response.ok) {
        throw new Error(`Chatbot request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result.answer;

    } catch (error) {
      console.error('Chatbot request error:', error.message);
      return 'Sorry, I could not understand the question.';

    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
