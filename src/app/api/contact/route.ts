import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ 
        success: false, 
        error: 'All fields are required' 
      }, { status: 400 });
    }

    const contact = await prisma.portfolioContact.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! I will get back to you soon.',
      contact: {
        id: contact.id,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send message. Please try again.' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const contacts = await prisma.portfolioContact.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ 
      success: true, 
      contacts 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch contacts' 
    }, { status: 500 });
  }
}
