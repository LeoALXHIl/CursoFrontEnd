import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import MenuItem from '../../../models/MenuItem';
import { withRole } from '../../../lib/middleware';

export const GET = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const menuItems = await MenuItem.find({});
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};

export const POST = withRole(['manager'])(
  async (req: NextRequest, context: { params: Promise<Record<string, string | string[]>> }) => {
    try {
      await connectToDatabase();
      const { name, price, category } = await req.json();

      if (!name || !price || !category) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
      }

      const menuItem = new MenuItem({ name, price, category });
      await menuItem.save();

      return NextResponse.json(menuItem, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
);
