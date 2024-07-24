import { auth } from "@/auth";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 * Custom error class representing an error during data fetching and validation.
 *
 *
 * @param statusCode - The HTTP status code associated with the error.
 * @param message - The error message describing the issue.
 * @param errors - Additional details about the errors.
 */
export class FetchAndValidateError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errors: Record<string, string[] | undefined>
  ) {
    super(message);
  }
}

export async function serverFetch(
  httpMethod: HttpMethod,
  endPoint: string,
  body?: object
) {
  const session = await auth();
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${session?.accessToken}`);
  headers.set("Content-Type", "application/json");

  const apiUrl = `http:localhost:8000/api/v1/${endPoint}`;
  const res = await fetch(apiUrl, {
    method: httpMethod,
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const rawData = (await res.json()) as Record<string, unknown>;
    const errorMessages = (
      Array.isArray(rawData.message)
        ? rawData.message
        : [rawData.message].filter(Boolean)
    ) as string[];

    throw new FetchAndValidateError(res.status, res.statusText, {
      errorMessages: errorMessages.length ? errorMessages : ["Unknown error"],
    });
  }

  const rawData = (await res.json()) as Record<string, unknown>;

  return rawData;
}
