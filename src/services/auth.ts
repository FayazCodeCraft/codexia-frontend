"use server";

import { ServerActionResponse } from "@/types/serverFetchResponse";
import { FetchAndValidateError, serverFetch } from "@/utils/http";

export async function signUp(data: {
  email: string;
  password: string;
}): Promise<ServerActionResponse> {
  try {
    const response = await serverFetch("POST", "auth/register", data);
    return {
      type: "success",
      data: response,
    };
  } catch (error) {
    if (error instanceof FetchAndValidateError) {
      return {
        type: "error",
        errors: error.errors,
      };
    }

    return {
      type: "error",
      errors: { errorMessages: ["Something went wrong. Try again"] },
    };
  }
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<ServerActionResponse> {
  try {
    const response = await serverFetch("POST", "auth/login", data);
    return {
      type: "success",
      data: response,
    };
  } catch (error) {
    if (error instanceof FetchAndValidateError) {
      return {
        type: "error",
        errors: error.errors,
      };
    }

    return {
      type: "error",
      errors: { errorMessages: ["Something went wrong. Try again"] },
    };
  }
}
