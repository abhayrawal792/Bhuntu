/**
 * Gemini Web2API Integration Helper for Bhuntu App
 * Base URL: http://localhost:8081/v1 (Runs locally with zero token costs)
 */

const LOCAL_GEMINI_API_BASE = 'http://localhost:8081/v1';

/**
 * Send a prompt to the local Gemini proxy server
 * @param {string} prompt - The user query or instruction
 * @param {object} options - Optional parameters
 * @param {string} options.model - Model name (default: 'gemini-3.5-flash-thinking')
 * @param {number} options.thinkDepth - Thinking depth 0 (deepest) to 4 (shallowest)
 * @returns {Promise<string>} - AI response text
 */
export async function askGemini(prompt, options = {}) {
  const {
    model = 'gemini-3.5-flash-thinking',
    thinkDepth = 0,
    systemPrompt = ''
  } = options;

  const targetModel = thinkDepth !== undefined && !model.includes('@think=')
    ? `${model}@think=${thinkDepth}`
    : model;

  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content: prompt });

  try {
    const response = await fetch(`${LOCAL_GEMINI_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-gemini'
      },
      body: JSON.stringify({
        model: targetModel,
        messages: messages
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error calling local Gemini proxy:', error);
    throw error;
  }
}
