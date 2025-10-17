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
  paid?: boolean;
  paidAt?: Date;
  paymentMethod?: string;
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
  paid: { type: Boolean, default: false },
  paidAt: { type: Date },
  paymentMethod: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
