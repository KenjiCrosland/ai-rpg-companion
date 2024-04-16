export function canGenerateStatblock() {
  const MAX_GENERATIONS = 5;
  const storage = window.localStorage;
  let generationCount = parseInt(storage.getItem('generationCount')) || 0;
  let firstGenerationTime = parseInt(storage.getItem('firstGenerationTime'));

  if (generationCount >= MAX_GENERATIONS) {
    const currentTime = new Date().getTime();
    if (!firstGenerationTime || currentTime - firstGenerationTime >= 86400000) {
      // 24 hours in milliseconds
      storage.setItem('generationCount', '1');
      storage.setItem('firstGenerationTime', currentTime.toString());
      return true;
    } else {
      const resetTime = new Date(firstGenerationTime + 86400000);
      const alertMessage = `You have reached the 5 statblock generation limit for a 24-hour period. Please come back at ${resetTime.toLocaleString()} or you can access unlimited statblock generation as a $5 patron.`;
      alert(alertMessage); // Displaying an alert message
      return false;
    }
  } else {
    if (generationCount === 0) {
      storage.setItem('firstGenerationTime', new Date().getTime().toString());
    }
    storage.setItem('generationCount', (generationCount + 1).toString());
    return true;
  }
}
