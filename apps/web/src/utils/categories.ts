import {
  DollarSign,
  Home,
  PiggyBank,
  Shield,
  ShoppingCart,
} from 'lucide-react';

import type {
  CategorySlug,
  SubcategorySlug,
} from '@the-monthly-expense/utils/categories';

export const categoryInfo: Record<
  CategorySlug,
  {
    name: string;
    color: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
  }
> = {
  housing: { name: 'Housing', color: 'bg-red-500', icon: Home },
  daily: { name: 'Daily', color: 'bg-blue-500', icon: ShoppingCart },
  financial: { name: 'Financial', color: 'bg-green-500', icon: PiggyBank },
  insurance: { name: 'Insurance', color: 'bg-yellow-500', icon: Shield },
  income: { name: 'Income', color: 'bg-purple-500', icon: DollarSign },
};

export const subcategoryInfo: Record<
  SubcategorySlug,
  {
    name: string;
  }
> = {
  rent: {
    name: 'Rent',
  },
  utilities: {
    name: 'Utilities',
  },
  internet: {
    name: 'Internet',
  },
  maintenance: {
    name: 'Maintenance',
  },
  furniture: {
    name: 'Furniture',
  },
  'housing-other': {
    name: 'Other',
  },
  groceries: {
    name: 'Groceries',
  },
  dining: {
    name: 'Dining & Restaurants',
  },
  transportation: {
    name: 'Transportation',
  },
  shopping: {
    name: 'Shopping',
  },
  entertainment: {
    name: 'Entertainment',
  },
  'personal-care': {
    name: 'Personal Care',
  },
  medical: {
    name: 'Medical & Health',
  },
  'daily-other': {
    name: 'Other',
  },
  savings: {
    name: 'Savings',
  },
  investments: {
    name: 'Investments',
  },
  'loan-repayments': {
    name: 'Loan Repayments',
  },
  'bank-fees': {
    name: 'Bank Fees',
  },
  'financial-other': {
    name: 'Other',
  },
  'health-insurance': {
    name: 'Health Insurance',
  },
  'car-insurance': {
    name: 'Car Insurance',
  },
  'home-insurance': {
    name: 'Home Insurance',
  },
  'insurance-other': {
    name: 'Other',
  },
  salary: {
    name: 'Salary',
  },
  freelance: {
    name: 'Freelance Income',
  },
  gifts: {
    name: 'Gifts',
  },
  'income-other': {
    name: 'Other',
  },
};
