import { ErrorApiResponse, Get, Post } from '@/lib/api/server-action-to-api-response-converter';
import { createParking, getParkings, getParkingsByCity, getParkingsForMap } from '@/lib/services/parking';
import { TCreateParking } from '@/lib/types';
import { NextRequest } from 'next/server';

enum parkingsFormatting {
    map,
}

const validParkingsFormatting = Object.values(parkingsFormatting);

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const formatting = searchParams.get('formatting');
    const city = searchParams.get('city');
    
    if (city != null && formatting != null) {
        return ErrorApiResponse('Parametry city i formatting nie mogą występować jednocześnie');
    }
    else if (city != null) {
        return Get(await getParkingsByCity(city));
    }
    else if (formatting !== null) {
        if (validParkingsFormatting.includes(formatting)) {
            switch (formatting) {
                case parkingsFormatting[parkingsFormatting.map]: 
                    return Get(await getParkingsForMap());
            }
        } 
        else {
            return ErrorApiResponse('Nieprawidłowy parametr formatting');
        }
    }
    else {
        return Get(await getParkings());
    }
}

export async function POST(request: NextRequest) {
    const body: TCreateParking = await request.json();
    return Post(await createParking(body));
}
