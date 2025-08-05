import {
  DollarSign,
  Home,
  PiggyBank,
  Shield,
  ShoppingCart,
} from 'lucide-react';

export const categories = [
  {
    id: 'housing',
    name: 'Housing & Utilities',
    icon: Home,
    color: 'bg-blue-500',
    subcategories: [
      { id: 'rent', name: 'Rent/Mortgage' },
      { id: 'utilities', name: 'Utilities' },
      { id: 'internet', name: 'Internet & Phone' },
      { id: 'maintenance', name: 'Maintenance' },
      { id: 'furniture', name: 'Furniture' },
    ],
  },
  {
    id: 'daily',
    name: 'Daily Spending',
    icon: ShoppingCart,
    color: 'bg-purple-500',
    subcategories: [
      { id: 'groceries', name: 'Groceries' },
      { id: 'dining', name: 'Dining Out' },
      { id: 'transportation', name: 'Transportation' },
      { id: 'shopping', name: 'Shopping' },
      { id: 'entertainment', name: 'Entertainment' },
      { id: 'personal-care', name: 'Personal Care' },
    ],
  },
  {
    id: 'financial',
    name: 'Financial & Savings',
    icon: PiggyBank,
    color: 'bg-green-500',
    subcategories: [
      { id: 'savings', name: 'Savings' },
      { id: 'investments', name: 'Investments' },
      { id: 'loan-repayments', name: 'Loan Repayments' },
      { id: 'bank-fees', name: 'Bank Fees' },
    ],
  },
  {
    id: 'insurance',
    name: 'Insurance & Health',
    icon: Shield,
    color: 'bg-red-500',
    subcategories: [
      { id: 'health-insurance', name: 'Health Insurance' },
      { id: 'car-insurance', name: 'Car Insurance' },
      { id: 'home-insurance', name: 'Home Insurance' },
      { id: 'medical', name: 'Medical' },
    ],
  },
  {
    id: 'income',
    name: 'Income',
    icon: DollarSign,
    color: 'bg-emerald-500',
    subcategories: [
      { id: 'salary', name: 'Salary/Wages' },
      { id: 'freelance', name: 'Freelance' },
      { id: 'gifts', name: 'Gifts' },
      { id: 'other', name: 'Other' },
    ],
  },
];

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  subcategories: { id: string; name: string }[];
}

export interface Subcategory {
  id: string;
  name: string;
}
