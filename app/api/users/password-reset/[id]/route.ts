import { Patch } from "@/lib/api/server-action-to-api-response-converter";
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
    return Patch(await updateUserPasswordById(params.id, body));
}

