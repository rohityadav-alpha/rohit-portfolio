import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const comment = await prisma.postComment.update({
      where: { id },
      data: { approved: true }
    });

    return NextResponse.json({
      success: true,
      comment
    });

  } catch (error) {
    console.error('Comment approval error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to approve comment' },
      { status: 500 }
    );
  }
}
