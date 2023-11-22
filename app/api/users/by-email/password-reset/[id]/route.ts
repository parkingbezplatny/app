import { ErrorApiResponse, Patch } from "@/lib/api/server-action-to-api-response-converter";
import { queryParameterNotFoundMessage } from "@/lib/api/uri-params-helper";
import { updateUserPasswordById } from "@/lib/services/user";
import { TUpdateUserPassword } from "@/lib/types";
import { NextRequest } from "next/server";

interface Params {
    params: {
        id: string;
    }
}

export async function PATCH(request: NextRequest, {params}: Params) {
    const body: TUpdateUserPassword = await request.json();

    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    if (email === null) {
        return ErrorApiResponse(queryParameterNotFoundMessage('email'));
    } else {
        return Patch(await updateUserPasswordById(email, body));
    }
}

