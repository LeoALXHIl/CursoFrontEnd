import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Order from '../../../../models/Order';
import { withRole, withAuth, AuthenticatedRequest } from '../../../../lib/middleware';

export const GET = withAuth(
  async (req: AuthenticatedRequest, context: { params: Promise<Record<string, string | string[]>> }) => {
    try {
      await connectToDatabase();
      const { id } = await context.params;
      const order = await Order.findById(id).populate('items.menuItemId');
      if (!order) {
        return NextResponse.json({ message: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json(order);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
);

export const PUT = withRole(['waiter', 'manager'])(
  async (req: AuthenticatedRequest, context: { params: Promise<Record<string, string | string[]>> }) => {
    try {
      await connectToDatabase();
      const { id } = await context.params;
      const { status } = await req.json();

      // Get user role from request
      const userRole = req.user?.role;

      // Validate status based on role
      if (!status) {
        return NextResponse.json({ message: 'Status is required' }, { status: 400 });
      }

      // Waiters can only set status to 'entregue'
      if (userRole === 'waiter' && status !== 'entregue') {
        return NextResponse.json({ message: 'Waiters can only mark orders as delivered' }, { status: 403 });
      }

      // Managers can set any status
      if (userRole === 'manager' && !['recebido', 'em-preparo', 'entregue'].includes(status)) {
        return NextResponse.json({ message: 'Valid status is required' }, { status: 400 });
      }

      const order = await Order.findByIdAndUpdate(id, { status }, { new: true }).populate('items.menuItemId');
      if (!order) {
        return NextResponse.json({ message: 'Order not found' }, { status: 404 });
      }

      return NextResponse.json(order);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
);

export const DELETE = withRole(['manager'])(
  async (req: AuthenticatedRequest, context: { params: Promise<Record<string, string | string[]>> }) => {
    try {
      await connectToDatabase();
      const { id } = await context.params;
      const order = await Order.findByIdAndDelete(id);
      if (!order) {
        return NextResponse.json({ message: 'Order not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'Order deleted' });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
);
