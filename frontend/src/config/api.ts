export function getApiUrl(): string {
  const url = import.meta.env.VITE_API_URL;

  if (!url) {
    console.warn(
      "[config] VITE_API_URL não definido, usando fallback"
    );
    return "http://localhost:3000";
  }

  return url;
}