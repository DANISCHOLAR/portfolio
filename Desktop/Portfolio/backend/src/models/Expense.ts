import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  category: string;
  amount: number;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new Schema<IExpense>(
  {
    category: {
      type: String,
      required: true,
      enum: ['Food', 'Transport', 'Entertainment', 'Shopping', 'Other'],
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
  },
  {
    timestamps: true,
  }
);

export const Expense = mongoose.model<IExpense>('Expense', expenseSchema);
