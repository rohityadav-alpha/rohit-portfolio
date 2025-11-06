import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const postType = searchParams.get("postType") || "blog";

    const comments = await prisma.postComment.findMany({
      where: {
        postId,
        postType,
        approved: true,
        parentId: null,
      },
      include: {
        replies: {
          where: { approved: true },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("Comments fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const data = await request.json();
    const { userName, userEmail, comment, postType, userId, parentId } = data;

    if (!userName || !userEmail || !comment || !postType || !userId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const newComment = await prisma.postComment.create({
      data: {
        postId,
        postType,
        userName,
        userEmail,
        comment,
        userId,
        parentId: parentId || null,
        ipAddress,
        approved: false,
      },
    });

    return NextResponse.json({
      success: true,
      comment: newComment,
      message: "Comment submitted for approval",
    });
  } catch (error) {
    console.error("Comment creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
