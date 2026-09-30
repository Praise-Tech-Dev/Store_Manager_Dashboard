const PROBE_URL = "https://fakestoreapi.com/users/1";
const TIMEOUT_MS = 2500;

export async function isUpstreamApiHealthy(): Promise<boolean> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(PROBE_URL, {
      method: "GET",
      signal: controller.signal,
      cache: "no-store", // Guarantees a real wire check every time
      headers: {
        Accept: "application/json",
      },
    });

    // If Cloudflare blocks with 403 or server errors with 523/500, it's unhealthy
    return response.ok;
  } catch {
    // Catches network failure, Cloudflare challenge CORS aborts, and timeouts
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}
