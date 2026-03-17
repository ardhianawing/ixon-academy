/**
 * API Fetcher utility for client-side data fetching.
 * Returns typed data from IXON API routes.
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetcher<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new ApiError(res.status, json.error ?? "Request failed");
  }

  return json.data as T;
}
