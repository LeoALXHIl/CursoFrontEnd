import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import { withAuth } from '../../../lib/middleware';

export const GET = withAuth(
  async (req: NextRequest, context: { params: Promise<Record<string, string | string[]>> }) => {
    try {
      await connectToDatabase();
      const users = await User.find({}, '-password'); // Exclude password
      return NextResponse.json(users);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
    }
  }
);
