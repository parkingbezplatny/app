import { ErrorApiResponse, Patch } from "@/lib/api/server-action-to-api-response-converter";
import { queryParameterNotFoundMessage } from "@/lib/api/uri-params-helper";
import { updateUserPasswordByEmail } from "@/lib/services/user";
import { TUpdateUserPassword } from "@/lib/types";
import { NextRequest } from "next/server";


export async function PATCH(request: NextRequest) {
    const body: TUpdateUserPassword = await request.json();

    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    if (email === null) {
        return ErrorApiResponse(queryParameterNotFoundMessage('email'));
    } else {
        return Patch(await updateUserPasswordByEmail(email, body));
    }
}

