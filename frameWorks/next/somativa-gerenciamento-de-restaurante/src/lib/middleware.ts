import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, JWTPayload } from './auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

export function withAuth(handler: (req: AuthenticatedRequest, context: { params?: Record<string, string | string[]> }) => Promise<NextResponse>) {
  return async (req: NextRequest, context: { params?: Record<string, string | string[]> }) => {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    (req as AuthenticatedRequest).user = payload;
    return handler(req as AuthenticatedRequest, context);
  };
}

export function withRole(roles: string[]) {
  return (handler: (req: AuthenticatedRequest, context: { params?: Record<string, string | string[]> }) => Promise<NextResponse>) => {
    return withAuth(async (req: AuthenticatedRequest, context: { params?: Record<string, string | string[]> }) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
      }
      return handler(req, context);
    });
  };
}
