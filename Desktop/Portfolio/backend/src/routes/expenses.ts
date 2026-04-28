import express, { Router, Request, Response } from 'express';
import { Expense } from '../models/Expense';

const router: Router = express.Router();

// Get all expenses
router.get('/expenses', async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Get expense by ID
router.get('/expenses/:id', async (req: Request, res: Response) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ error: 'Failed to fetch expense' });
  }
});

// Create new expense
router.post('/expenses', async (req: Request, res: Response) => {
  try {
    const { category, amount, description, date } = req.body;

    // Validation
    if (!category || amount === undefined) {
      return res.status(400).json({ error: 'Category and amount are required' });
    }

    const newExpense = new Expense({
      category,
      amount,
      description,
      date: date ? new Date(date) : new Date(),
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

// Update expense
router.put('/expenses/:id', async (req: Request, res: Response) => {
  try {
    const { category, amount, description, date } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        category,
        amount,
        description,
        date: date ? new Date(date) : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(updatedExpense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

// Delete expense
router.delete('/expenses/:id', async (req: Request, res: Response) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully', expense: deletedExpense });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// Get expenses by category
router.get('/expenses/category/:category', async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find({ category: req.params.category }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses by category:', error);
    res.status(500).json({ error: 'Failed to fetch expenses by category' });
  }
});

// Get expense statistics
router.get('/stats/summary', async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find();
    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const categoryBreakdown = expenses.reduce((acc: any, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    res.json({
      totalExpenses: totalAmount,
      totalCount: expenses.length,
      categoryBreakdown,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;
