import { ErrorApiResponse, Get } from '@/lib/api/server-action-to-api-response-converter';
import { getUsers, getUsersWithPagination } from '@/lib/services/user';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const skip = searchParams.get('skip');
    const take = searchParams.get('take');

    let skipNumber: number = 0;
    if (skip !== null) {
        const skipNumber = parseInt(skip);
        if (isNaN(skipNumber)) {
            return ErrorApiResponse('Parametr skip musi być liczbą');
        }
    }
    
    let takeNumber: number = 0;
    if (take !== null) {
        const takeNumber = parseInt(take);
        if (isNaN(takeNumber)) {
            return ErrorApiResponse('Parametr take musi być liczbą');
        }
    }

    if (skip !== null && take !== null) {
        return Get(await getUsersWithPagination(skipNumber, takeNumber));
    } 
    else if (take !== null) {
        return Get(await getUsersWithPagination(0, takeNumber));
    }
    else {
        return Get(await getUsers());
    }
}
