import {
  ErrorApiResponse,
  Get,
  Post,
} from "@/lib/api/server-action-to-api-response-converter";
import { authOptions } from "@/lib/nextauth/authOptions";
import { getUserById, updateUserAdminById } from "@/lib/services/user";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) return ErrorApiResponse("Brak id.");
  const session = await getServerSession(authOptions);
  if (!session?.user.isAdmin) return ErrorApiResponse("Nie masz dostępu.");

  return Get(await getUserById(id));
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) return ErrorApiResponse("Brak id.");
  const session = await getServerSession(authOptions);
  if (!session?.user.isAdmin) return ErrorApiResponse("Nie masz dostepu.");
  const data: { isAdmin: boolean } = await req.json();

  return Post(await updateUserAdminById(id, data.isAdmin));
}
