import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const postType = searchParams.get('postType') || 'blog';
    const userId = searchParams.get('userId');

    const totalLikes = await prisma.postLike.count({
      where: { postId, postType }
    });

    let userLiked = false;
    if (userId) {
      const like = await prisma.postLike.findUnique({
        where: {
          postId_userId_postType: {
            postId,
            userId,
            postType
          }
        }
      });
      userLiked = !!like;
    }

    return NextResponse.json({
      success: true,
      totalLikes,
      userLiked
    });

  } catch (error) {
    console.error('Like count error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch likes' },
      { status: 500 }
    );
  }
}
