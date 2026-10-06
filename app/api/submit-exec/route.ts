import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SHEETS_EXEC_URL =
  "https://script.google.com/macros/s/AKfycbydKy98tTVPgOlew36ycpr5_XQM5UqwSXTVfr8bQQwxjLttEpdSk4XqRYt23diYDqT3Jg/exec";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const gsRes = await fetch(GOOGLE_SHEETS_EXEC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!gsRes.ok) {
      return NextResponse.json({ success: false }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
