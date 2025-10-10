import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  menuItemId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  tableNumber: number;
  items: IOrderItem[];
  status: 'recebido' | 'em-preparo' | 'entregue';
  total: number;
  createdAt: Date;
}

const OrderItemSchema: Schema = new Schema({
  menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema({
  tableNumber: { type: Number, required: true },
  items: [OrderItemSchema],
  status: { type: String, enum: ['recebido', 'em-preparo', 'entregue'], default: 'recebido' },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
