import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get('filter') || 'all';

    let whereCondition = {};
    
    if (filter === 'pending') {
      whereCondition = { approved: false };
    } else if (filter === 'approved') {
      whereCondition = { approved: true };
    }

    const comments = await prisma.postComment.findMany({
      where: whereCondition,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      comments
    });

  } catch (error) {
    console.error('Admin comments fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}
