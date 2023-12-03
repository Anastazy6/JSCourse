export function getExcerpt(maxLength, text) {
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength + 1) + '...';
}

export function capitalize (string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}