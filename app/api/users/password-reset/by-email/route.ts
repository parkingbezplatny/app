import {
  ErrorApiResponse,
  Patch,
} from "@/lib/api/server-action-to-api-response-converter";
import { queryParameterNotFoundMessage } from "@/lib/api/uri-params-helper";
import { authOptions } from "@/lib/nextauth/authOptions";
import { updateUserPasswordByEmail } from "@/lib/services/user";
import { TUpdateUserPassword } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  const body: TUpdateUserPassword = await request.json();
  const session = await getServerSession(authOptions);

  if (!session) return ErrorApiResponse("Musisz być zalogowany.");

  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  if (email === null || email !== session.user.email) {
    return ErrorApiResponse(queryParameterNotFoundMessage("email"));
  } else {
    return Patch(await updateUserPasswordByEmail(email, body));
  }
}
