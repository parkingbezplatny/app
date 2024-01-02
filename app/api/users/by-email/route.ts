import { ErrorApiResponse, Get, Patch, Post } from '@/lib/api/server-action-to-api-response-converter';
import { queryParameterNotFoundMessage } from '@/lib/api/uri-params-helper';
import { createParking } from '@/lib/services/parking';
import { getUserByEmail, updateUserByEmail } from '@/lib/services/user';
import { TCreateParking, TUpdateUserUsername } from '@/lib/types';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    if (email === null) {
        return ErrorApiResponse(queryParameterNotFoundMessage('email'));
    }
    else {
        return Get(await getUserByEmail(email));
    }
}

export async function POST(request: NextRequest) {
    const body: TCreateParking = await request.json();
    return Post(await createParking(body));
}

export async function PATCH(request: NextRequest) {
    const body: TUpdateUserUsername = await request.json();

    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    if (email === null) {
        return ErrorApiResponse(queryParameterNotFoundMessage('email'));
    }
    else {
        return Patch(await updateUserByEmail(email, body));
    }
}