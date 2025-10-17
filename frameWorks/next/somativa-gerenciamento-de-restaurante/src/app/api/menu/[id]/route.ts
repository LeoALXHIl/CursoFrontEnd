import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import MenuItem from '../../../../models/MenuItem';
import { withRole } from '../../../../lib/middleware';

export const GET = async (req: NextRequest, context: { params: Promise<Record<string, string | string[]>> }) => {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return NextResponse.json({ message: 'Menu item not found' }, { status: 404 });
    }
    return NextResponse.json(menuItem);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};

export const PUT = withRole(['manager'])(
  async (req: NextRequest, context: { params: Promise<Record<string, string | string[]>> }) => {
    try {
      await connectToDatabase();
      const params = await context.params;
      const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;
      const { name, price, category } = await req.json();

      if (!id) {
        return NextResponse.json({ message: 'Menu item id is required' }, { status: 400 });
      }

      if (!name || !price || !category) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
      }

      const menuItem = await MenuItem.findByIdAndUpdate(id, { name, price, category }, { new: true });
      if (!menuItem) {
        return NextResponse.json({ message: 'Menu item not found' }, { status: 404 });
      }

      return NextResponse.json(menuItem);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
);
