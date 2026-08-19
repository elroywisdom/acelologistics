import "server-only";

/** Google Places API (New) — Autocomplete, proxied server-side so the API
 * key never reaches the browser (the same architecture Shuttlers.co uses:
 * their frontend calls their own backend, which is what actually talks to
 * Places — confirmed by inspecting their network traffic on 2026-08-19,
 * `api.shuttlers.africa/search/autocomplete/address?...&sessionToken=...`).
 *
 * We deliberately call Autocomplete only — no Place Details request — and
 * hand the browser the prediction's own formatted text as the field value.
 * Acelo doesn't need lat/lng (no map display, no distance calc yet), and
 * skipping Place Details keeps every session billed at the cheaper
 * per-request Autocomplete rate instead of the ~6x-pricier "session with a
 * Details call" rate. If a map or route-distance feature gets built later,
 * add a `/api/places/details` route the same way rather than fetching
 * Details on every keystroke. */

const PLACES_AUTOCOMPLETE_URL = "https://places.googleapis.com/v1/places:autocomplete";

// Abuja city centre — biases (not restricts) results toward Acelo's home
// market without excluding a customer typing an address in Lagos, Kaduna,
// etc. A 60km radius comfortably covers the FCT and its usual pickup spots.
const ABUJA_LOCATION_BIAS = {
  circle: {
    center: { latitude: 9.0765, longitude: 7.3986 },
    radius: 60000,
  },
};

export type PlaceSuggestion = {
  placeId: string;
  text: string;
};

export type PlacesAutocompleteResult =
  | { ok: true; suggestions: PlaceSuggestion[] }
  | { ok: false; reason: "not_configured" | "upstream_error"; suggestions: [] };

export async function fetchPlaceAutocomplete(
  input: string,
  sessionToken: string,
): Promise<PlacesAutocompleteResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    // Not an error — GOOGLE_PLACES_API_KEY just isn't set up yet. Callers
    // treat this the same as "no suggestions" and the input field keeps
    // working as plain text, same pattern as lib/email.ts's graceful no-op
    // when RESEND_API_KEY is missing.
    return { ok: false, reason: "not_configured", suggestions: [] };
  }

  try {
    const response = await fetch(PLACES_AUTOCOMPLETE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "suggestions.placePrediction.placeId,suggestions.placePrediction.text",
      },
      body: JSON.stringify({
        input,
        sessionToken,
        includedRegionCodes: ["ng"],
        locationBias: ABUJA_LOCATION_BIAS,
        languageCode: "en",
      }),
    });

    if (!response.ok) {
      console.error("[places] Autocomplete request failed:", response.status, await response.text());
      return { ok: false, reason: "upstream_error", suggestions: [] };
    }

    const data = await response.json();
    const suggestions: PlaceSuggestion[] = (data.suggestions ?? [])
      .map((s: { placePrediction?: { placeId?: string; text?: { text?: string } } }) => {
        const prediction = s.placePrediction;
        if (!prediction?.placeId || !prediction.text?.text) return null;
        return { placeId: prediction.placeId, text: prediction.text.text };
      })
      .filter((s: PlaceSuggestion | null): s is PlaceSuggestion => s !== null);

    return { ok: true, suggestions };
  } catch (error) {
    console.error("[places] Autocomplete request threw:", error);
    return { ok: false, reason: "upstream_error", suggestions: [] };
  }
}
