import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/mongodb';
import Order from '../../../../../models/Order';
import { withRole } from '../../../../../lib/middleware';

export const POST = withRole(['manager','waiter'])(
  async (req: NextRequest, context: { params: Promise<Record<string, string | string[]>> }) => {
    try {
      await connectToDatabase();
      const { id } = await context.params;
      const { paymentMethod } = await req.json();

      if (!id) {
        return NextResponse.json({ message: 'Order id is required' }, { status: 400 });
      }

      const order = await Order.findById(id);
      if (!order) {
        return NextResponse.json({ message: 'Order not found' }, { status: 404 });
      }

      order.paid = true;
      order.paidAt = new Date();
      if (paymentMethod) order.paymentMethod = paymentMethod;
      await order.save();

      return NextResponse.json(order);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
);
