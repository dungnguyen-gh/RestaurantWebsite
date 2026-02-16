import { NextResponse } from "next/server";

// Simple auth check - in production, verify JWT or session
export async function GET() {
  // For demo purposes, return a mock admin
  // In production, validate the token/session and return the actual admin
  return NextResponse.json({
    admin: null,
  });
}
