import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { postId, postType, userId } = await request.json();

    // Validation
    if (!postId || !postType || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['blog', 'project'].includes(postType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid post type' },
        { status: 400 }
      );
    }

    // Get IP address
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    // Check if already liked
    const existingLike = await prisma.postLike.findUnique({
      where: {
        postId_userId_postType: {
          postId,
          userId,
          postType
        }
      }
    });

    let liked = false;

    if (existingLike) {
      // Unlike
      await prisma.postLike.delete({
        where: { id: existingLike.id }
      });
      liked = false;
    } else {
      // Like
      await prisma.postLike.create({
        data: {
          postId,
          postType,
          userId,
          ipAddress
        }
      });
      liked = true;
    }

    // Get total likes
    const totalLikes = await prisma.postLike.count({
      where: { postId, postType }
    });

    return NextResponse.json({
      success: true,
      liked,
      totalLikes
    });

  } catch (error) {
    console.error('Like toggle error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
}
