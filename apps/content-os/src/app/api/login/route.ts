import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  createSession,
  verifyCredentials,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@duleme/auth";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  let data: z.infer<typeof schema>;
  try {
    data = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!verifyCredentials(data.email, data.password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  cookies().set({
    name: SESSION_COOKIE,
    value: createSession(data.email),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
  return NextResponse.json({ ok: true });
}
