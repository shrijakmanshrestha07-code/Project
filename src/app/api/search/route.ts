import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query")?.trim();
  const type = request.nextUrl.searchParams.get("type") || "multi";
  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "TMDB token is not configured." },
      { status: 500 }
    );
  }

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const allowedTypes = ["movie", "tv", "multi"];

  if (!allowedTypes.includes(type)) {
    return NextResponse.json(
      { error: "Invalid search type." },
      { status: 400 }
    );
  }

  const url = new URL(
    `https://api.themoviedb.org/3/search/${type}`
  );

  url.searchParams.set("query", query);
  url.searchParams.set("include_adult", "false");

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "TMDB search failed." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Unable to connect to TMDB." },
      { status: 502 }
    );
  }
}