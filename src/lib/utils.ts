export function parseJSON<T = any>(data: unknown): T | null {
  if (typeof data !== 'string') return null;

  try {
    const parsed = JSON.parse(data);
    return typeof parsed === 'object' && parsed !== null ? parsed as T : null;
  } catch {
    return null;
  }
};