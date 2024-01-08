import {
  ErrorApiResponse,
  Get,
} from "@/lib/api/server-action-to-api-response-converter";
import { authOptions } from "@/lib/nextauth/authOptions";
import { getUsers } from "@/lib/services/user";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.isAdmin) return ErrorApiResponse("Nie masz dostępu.");

  return Get(await getUsers());
}
