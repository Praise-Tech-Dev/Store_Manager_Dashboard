export const fetchWithTimeout = (input: RequestInfo | URL, ms = 3500) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(input, { signal: controller.signal }).finally(() =>
    clearTimeout(timer),
  );
};
