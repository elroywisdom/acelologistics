import { NextResponse } from "next/server";
import { fetchPlaceAutocomplete } from "@/lib/places";

/** Thin proxy in front of Google Places Autocomplete (New) — see
 * lib/places.ts for why this exists server-side instead of calling Places
 * directly from the browser (key secrecy + billing safety). */
export async function POST(request: Request) {
  let body: { input?: unknown; sessionToken?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const input = typeof body.input === "string" ? body.input.trim() : "";
  const sessionToken = typeof body.sessionToken === "string" ? body.sessionToken : "";

  if (!input || input.length < 2 || !sessionToken) {
    return NextResponse.json({ ok: true, suggestions: [] });
  }

  const result = await fetchPlaceAutocomplete(input, sessionToken);
  return NextResponse.json({ ok: true, suggestions: result.suggestions });
}
