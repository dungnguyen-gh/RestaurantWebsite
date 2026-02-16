import { NextResponse } from "next/server";

export async function POST() {
  // In production, clear the session/token
  return NextResponse.json({ message: "Logged out successfully" });
}
