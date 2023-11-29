import { Post } from "@/lib/api/server-action-to-api-response-converter";
import { signUpWithCreadential } from "@/lib/services/user";
import { TSignUpForm } from "@/lib/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body: TSignUpForm = await request.json();
    return Post(await signUpWithCreadential(body));
}
