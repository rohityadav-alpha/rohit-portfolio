import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Test if BlogPost table exists
    const blogCount = await prisma.blogPost.count();
    return NextResponse.json({ 
      success: true, 
      message: 'Blog API connection working',
      blogCount: blogCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Blog test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Database connection failed',
      details: 'Check if BlogPost table exists and migrations are applied'
    }, { status: 500 });
  }
}
