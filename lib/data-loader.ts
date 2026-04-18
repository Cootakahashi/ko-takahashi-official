/**
 * Safely loads JSON data from the /data directory via fetch.
 * Returns typed data or null on failure. Errors are silent in production.
 */
export async function getJsonData<T = unknown>(filename: string): Promise<T | null> {
  try {
    const response = await fetch(`/data/${filename}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json() as T;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(`[DataLoader] Failed to load ${filename}:`, error);
    }
    return null;
  }
}
