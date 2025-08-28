import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET all blogs
export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// CREATE new blog
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const blog = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        excerpt: data.excerpt,
        category: data.category,
        tags: data.tags || [],
        imageUrl: data.imageUrl,
        published: data.published || false,
        author: data.author || "Rohit Yadav"
      }
    });

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create blog' }, { status: 500 });
  }
}
