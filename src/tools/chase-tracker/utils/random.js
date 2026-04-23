export function pickRandom(array) {
  if (!Array.isArray(array) || array.length === 0) return undefined;
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

export function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}
