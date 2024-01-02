import { Delete, Get, Patch } from "@/lib/api/server-action-to-api-response-converter";
import { deleteParkingById, getParkingById, updateParkingById } from "@/lib/services/parking";
import { TUpdateParking } from "@/lib/types";
import { NextRequest } from "next/server";

interface Params {
    params: {
        id: string;
    }
}

export async function GET(request: NextRequest, {params}: Params) {
    return Get(await getParkingById(params.id));
}

export async function PATCH(request: NextRequest, {params}: Params) {
    const body: TUpdateParking = await request.json();
    return Patch(await updateParkingById(params.id, body));
}

export async function DELETE(request: NextRequest, {params}: Params) {
    return Delete(await deleteParkingById(params.id));
}