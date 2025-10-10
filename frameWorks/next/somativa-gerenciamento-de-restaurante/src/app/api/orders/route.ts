import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Order from '../../../models/Order';
import MenuItem from '../../../models/MenuItem';
import { withRole, withAuth } from '../../../lib/middleware';

export const GET = withAuth(
  async (req: NextRequest) => {
    try {
      await connectToDatabase();
      const orders = await Order.find({}).populate('items.menuItemId');
      return NextResponse.json(orders);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
);

export const POST = withRole(['waiter'])(
  async (req: NextRequest) => {
    try {
      await connectToDatabase();
      const { tableNumber, items } = await req.json();

      if (!tableNumber || !items || !Array.isArray(items)) {
        return NextResponse.json({ message: 'Table number and items are required' }, { status: 400 });
      }

      let total = 0;
      const populatedItems = [];

      for (const item of items) {
        const menuItem = await MenuItem.findById(item.menuItemId);
        if (!menuItem) {
          return NextResponse.json({ message: `Menu item ${item.menuItemId} not found` }, { status: 400 });
        }
        total += menuItem.price * item.quantity;
        populatedItems.push({ menuItemId: item.menuItemId, quantity: item.quantity });
      }

      const order = new Order({ tableNumber, items: populatedItems, total });
      await order.save();

      return NextResponse.json(order, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
);
