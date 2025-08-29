// D:\rohit-portfolio\src\app\api\projects\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Function to generate unique slug
async function generateUniqueSlug(baseSlug: string) {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingProject = await prisma.portfolioProject.findUnique({
      where: { slug }
    });

    if (!existingProject) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

export async function GET() {
  try {
    const projects = await prisma.portfolioProject.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ 
      success: true, 
      projects 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch projects' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Generate base slug from title
    const baseSlug = data.title.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Generate unique slug
    const uniqueSlug = await generateUniqueSlug(baseSlug);
    
    const project = await prisma.portfolioProject.create({
      data: {
        title: data.title,
        description: data.description,
        slug: uniqueSlug, // Use unique slug
        techStack: data.techStack,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        category: data.category,
        imageUrls: data.imageUrls || []
      }
    });

    return NextResponse.json({ 
      success: true, 
      project 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create project' 
    }, { status: 500 });
  }
}
