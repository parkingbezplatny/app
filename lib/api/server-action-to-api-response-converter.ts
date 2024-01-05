import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import {
  ApiResponse,
  ExceptionServerFunctionResponse,
  ServerFunctionResponse,
  serverFunctionToApiResponse,
} from "../helpers/server-function-response";

function handleResponse<T>(
  serverActionResponse: ServerFunctionResponse<T>,
  status: HttpStatusCode
): NextResponse {
  const response = serverFunctionToApiResponse<T>(serverActionResponse);

  if (serverActionResponse instanceof ExceptionServerFunctionResponse) {
    return NextResponse.json(response, {
      status: HttpStatusCode.InternalServerError,
    });
  }

  if (!response.success) {
    return NextResponse.json(response, { status: HttpStatusCode.BadRequest });
  }

  return NextResponse.json(response, { status });
}

export function ErrorApiResponse(message: string): NextResponse {
  const response = new ApiResponse<null>(false, message, null);
  return NextResponse.json(response, { status: HttpStatusCode.BadRequest });
}

export function Get<T>(
  serverActionResponse: ServerFunctionResponse<T>
): NextResponse {
  return handleResponse(serverActionResponse, HttpStatusCode.Ok);
}

export function Post<T>(
  serverActionResponse: ServerFunctionResponse<T>
): NextResponse {
  return handleResponse(serverActionResponse, HttpStatusCode.Created);
}

export function Put<T>(
  serverActionResponse: ServerFunctionResponse<T>
): NextResponse {
  return handleResponse(serverActionResponse, HttpStatusCode.Ok);
}

export function Delete<T>(
  serverActionResponse: ServerFunctionResponse<T>
): NextResponse {
  return handleResponse(serverActionResponse, HttpStatusCode.Ok);
}

export function Patch<T>(
  serverActionResponse: ServerFunctionResponse<T>
): NextResponse {
  return handleResponse(serverActionResponse, HttpStatusCode.Ok);
}
