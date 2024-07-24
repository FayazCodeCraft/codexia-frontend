export interface ServerActionErrorResponse {
  type: "error";
  errors: Record<string, string[] | undefined>;
}

export interface ServerActionSuccessResponse {
  type: "success";
  data: Record<string, unknown>;
}

export type ServerActionResponse =
  | ServerActionErrorResponse
  | ServerActionSuccessResponse;
