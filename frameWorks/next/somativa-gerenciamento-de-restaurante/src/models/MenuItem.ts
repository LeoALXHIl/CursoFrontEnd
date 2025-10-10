import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  price: number;
  category: string;
}

const MenuItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

export default mongoose.models.MenuItem || mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
