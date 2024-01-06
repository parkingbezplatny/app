import {
  ErrorApiResponse,
  Get,
} from "@/lib/api/server-action-to-api-response-converter";
import { authOptions } from "@/lib/nextauth/authOptions";
import { getFavoriteParkings } from "@/lib/services/favorite";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return ErrorApiResponse("Musisz być zalogowany.");

  return Get(await getFavoriteParkings(session.user.id));
}
