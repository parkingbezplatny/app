import {
  Delete,
  ErrorApiResponse,
  Post,
} from "@/lib/api/server-action-to-api-response-converter";
import { authOptions } from "@/lib/nextauth/authOptions";
import {
  addToFavoriteParkingById,
  removeFromFavoriteParkingById,
} from "@/lib/services/parking";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { parkingId: string } }
) {
  const { parkingId } = params;
  const session = await getServerSession(authOptions);

  if (!session) return ErrorApiResponse("Musisz być zalogowany.");
  if (!parkingId) return ErrorApiResponse("Musisz podać id parkingu");

  return Post(
    await addToFavoriteParkingById(parkingId, session.user.id.toString())
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { parkingId: string } }
) {
  const { parkingId } = params;
  const session = await getServerSession(authOptions);

  if (!session) return ErrorApiResponse("Musisz być zalogowany.");
  if (!parkingId) return ErrorApiResponse("Musisz podać id parkingu");

  return Delete(
    await removeFromFavoriteParkingById(parkingId, session.user.id.toString())
  );
}
// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const formatting = searchParams.get("formatting");
//   const city = searchParams.get("city");

//   if (city != null && formatting != null) {
//     return ErrorApiResponse(
//       "Parametry city i formatting nie mogą występować jednocześnie"
//     );
//   } else if (city != null) {
//     return Get(await getParkingsByCity(city));
//   } else if (formatting !== null) {
//     if (validParkingsFormatting.includes(formatting)) {
//       switch (formatting) {
//         case parkingsFormatting[parkingsFormatting.map]:
//           return Get(await getParkingsForMap());
//       }
//     } else {
//       return ErrorApiResponse("Nieprawidłowy parametr formatting");
//     }
//   } else {
//     return Get(await getParkings());
//   }
// }
