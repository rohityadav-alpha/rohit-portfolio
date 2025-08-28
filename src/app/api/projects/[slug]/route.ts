// D:\rohit-portfolio\src\app\api\projects\[slug]\route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const project = await prisma.portfolioProject.findUnique({
      where: { slug }
    });
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await request.json();
    const project = await prisma.portfolioProject.update({
      where: { slug },
      data: {
        title: data.title,
        description: data.description,
        techStack: data.techStack,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        category: data.category,
        imageUrls: data.imageUrls || []
      }
    });
    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await prisma.portfolioProject.delete({
      where: { slug }
    });
    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 500 });
  }
}
