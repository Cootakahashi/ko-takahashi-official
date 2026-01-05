/**
 * Safely loads JSON data from the /data directory via fetch.
 * Works in Browser/Client-side environments.
 */
export async function getJsonData(filename: string) {
  try {
    // In a browser environment, we fetch from the public path
    const response = await fetch(`/data/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`[DataLoader] Error loading ${filename}:`, error);
    return null;
  }
}