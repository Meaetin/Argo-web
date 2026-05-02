import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const { error } = await resend.contacts.create({
    email: body.email,
  });

  if (error) {
    if (error.message?.toLowerCase().includes("already exists")) {
      return NextResponse.json(
        { error: "You're already on the waitlist!" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
