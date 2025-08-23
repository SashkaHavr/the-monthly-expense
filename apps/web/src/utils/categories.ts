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
    label: string;
    color: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
  }
> = {
  housing: { label: 'Housing', color: 'bg-red-500', icon: Home },
  daily: { label: 'Daily', color: 'bg-blue-500', icon: ShoppingCart },
  financial: { label: 'Financial', color: 'bg-green-500', icon: PiggyBank },
  insurance: { label: 'Insurance', color: 'bg-yellow-500', icon: Shield },
  income: { label: 'Income', color: 'bg-purple-500', icon: DollarSign },
};

export const subcategoryInfo: Record<
  SubcategorySlug,
  {
    label: string;
  }
> = {
  rent: {
    label: 'Rent',
  },
  utilities: {
    label: 'Utilities',
  },
  internet: {
    label: 'Internet',
  },
  maintenance: {
    label: 'Maintenance',
  },
  furniture: {
    label: 'Furniture',
  },
  'housing-other': {
    label: 'Other',
  },
  groceries: {
    label: 'Groceries',
  },
  dining: {
    label: 'Dining & Restaurants',
  },
  transportation: {
    label: 'Transportation',
  },
  shopping: {
    label: 'Shopping',
  },
  entertainment: {
    label: 'Entertainment',
  },
  'personal-care': {
    label: 'Personal Care',
  },
  medical: {
    label: 'Medical & Health',
  },
  'daily-other': {
    label: 'Other',
  },
  savings: {
    label: 'Savings',
  },
  investments: {
    label: 'Investments',
  },
  'loan-repayments': {
    label: 'Loan Repayments',
  },
  'bank-fees': {
    label: 'Bank Fees',
  },
  'financial-other': {
    label: 'Other',
  },
  'health-insurance': {
    label: 'Health Insurance',
  },
  'car-insurance': {
    label: 'Car Insurance',
  },
  'home-insurance': {
    label: 'Home Insurance',
  },
  'insurance-other': {
    label: 'Other',
  },
  salary: {
    label: 'Salary',
  },
  freelance: {
    label: 'Freelance Income',
  },
  gifts: {
    label: 'Gifts',
  },
  'income-other': {
    label: 'Other',
  },
};
