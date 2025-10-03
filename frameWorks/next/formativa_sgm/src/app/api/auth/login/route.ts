import { NextRequest, NextResponse } from 'next/server';

const users = [
  { username: 'leo', password: '1234', tipo: 'tecnico' },
];

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      return NextResponse.json({
        sucess: true,
        token: 'fake-jwt-token',
        usuario: { tipo: user.tipo },
      });
    } else {
      return NextResponse.json(
        { sucess: false, error: { message: 'Invalid username or password' } },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { sucess: false, error: { message: 'Server error' } },
      { status: 500 }
    );
  }
}
