import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get("redirect") || "/";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`,
    {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (response.ok) {
    // 🚀 Step 3: Redirect back with a `refresh=true` query param to force middleware to run
    return NextResponse.redirect(`${redirectTo}?refresh=true`);
  } else {
    return NextResponse.redirect("/sign-in");
  }
}
