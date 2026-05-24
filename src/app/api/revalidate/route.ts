import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(request: NextRequest): Promise<Response> {
  const secret =
    request.headers.get("x-revalidation-secret") ||
    request.nextUrl.searchParams.get("secret");

  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  let tag: string | null = null;
  let path: string | null = null;

  try {
    const body = await request.json();
    tag = body.tag || null;
    path = body.path || null;
  } catch (error) {
    // If request has no JSON body, read query parameters instead
    console.info("Fallback to query parameters:", error);
    tag = request.nextUrl.searchParams.get("tag");
    path = request.nextUrl.searchParams.get("path");
  }

  if (!tag && !path) {
    return NextResponse.json(
      { success: false, message: "Missing tag or path to revalidate" },
      { status: 400 },
    );
  }

  try {
    if (tag) {
      revalidateTag(tag);
    }
    if (path) {
      revalidatePath(path);
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      tag,
      path,
      now: Date.now(),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message: "Revalidation failed", error: errorMessage },
      { status: 500 },
    );
  }
}
