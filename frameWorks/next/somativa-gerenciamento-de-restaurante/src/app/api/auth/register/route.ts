import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { hashPassword } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    if (!['manager', 'waiter'].includes(role)) {
      return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
