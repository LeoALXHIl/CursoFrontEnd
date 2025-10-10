import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Order from '../../../models/Order';
import { withAuth } from '../../../lib/middleware';

export const GET = withAuth(
  async (req: NextRequest) => {
    try {
      await connectToDatabase();
      const orders = await Order.find({ status: 'Recebido' }).populate('items.menuItemId').sort({ createdAt: 1 });
      return NextResponse.json(orders);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
);
