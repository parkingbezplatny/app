import { Delete, Get, Patch } from "@/lib/api/server-action-to-api-response-converter";
import { deleteUserById, getUserById, updateUserById } from "@/lib/services/user";
import { TUpdateUserUsername } from "@/lib/types";
import { NextRequest } from "next/server";

interface Params {
    params: {
        id: string;
    }
}

export async function GET(request: NextRequest, {params}: Params) {
    return Get(await getUserById(params.id));
}

export async function PATCH(request: NextRequest, {params}: Params) {
    const body: TUpdateUserUsername = await request.json();
    return Patch(await updateUserById(params.id, body));
}

export async function DELETE(request: NextRequest, {params}: Params) {
    return Delete(await deleteUserById(params.id));
}