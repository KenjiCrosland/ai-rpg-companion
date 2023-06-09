export async function generateLocationResponse(
  prompt,
  validateJson = null,
  maxAttempts = 3,
) {
  let attempts = 0;
  let validJson = false;
  let errorThrown = false;
  let responseData;

  while (attempts < maxAttempts && !validJson && !errorThrown) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'davinci:ft-personal:location-generator-2023-04-23-02-29-36',
          prompt: `${prompt} ->`,
          max_tokens: 1000,
          temperature: 8.5,
          stop: '###',
        }),
      };
      let response;
      if (import.meta.env.DEV) {
        requestOptions.headers.Authorization = `Bearer ${
          import.meta.env.VITE_OPENAI_API_KEY
        }`;
        response = await fetch(
          'https://api.openai.com/v1/chat/completions',
          requestOptions,
        );
      } else {
        response = await fetch(
          '/wp-json/open-ai-proxy/api/v1/proxy',
          requestOptions,
        );
      }
      responseData = await response.json();
      const jsonString = responseData.choices[0].message.content;

      validJson = validateJson(jsonString);
    } catch (error) {
      console.error('Error generating response:', error);
      errorThrown = true;
    }
    attempts++;
  }

  if (!validJson) {
    throw new Error(
      'Failed to generate a valid response. Please try again later.',
    );
  }

  return responseData.choices[0].message.content;
}
