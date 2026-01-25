import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Cron job to check prices executed successfully",
  });
}

export async function POST(request) {
  return NextResponse.json({
    message: "Cron job to check prices executed successfully",
  });
}
