import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  if (!code) {
    console.error("❌ No authorization code received.");
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=no_code`
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  console.log("======================================");
  console.log("OAuth Callback");
  console.log("Origin:", requestUrl.origin);
  console.log("Code Present:", !!code);
  console.log("Exchange Error:", error);
  console.log("======================================");

  if (error) {
    console.error("❌ OAuth Exchange Failed:", error.message);

    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=oauth`
    );
  }

  console.log("✅ Session created successfully.");
  console.log("➡ Redirecting to:", `${requestUrl.origin}${next}`);

  return NextResponse.redirect(`${requestUrl.origin}${next}`);
};