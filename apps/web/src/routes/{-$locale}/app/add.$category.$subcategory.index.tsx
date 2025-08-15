// import { useState } from 'react';
import { useState } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { useFormatter } from 'use-intl';

import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';

import { BigNumberInput } from '~/components/app/add/big-number-input';

export const Route = createFileRoute(
  '/{-$locale}/app/add/$category/$subcategory/',
)({
  beforeLoad: ({ params, context }) => {
    const subcategory = context.category.subcategories.find(
      (c) => c.id == params.subcategory,
    );
    if (!subcategory) {
      throw redirect({
        to: '/{-$locale}/app/add/$category',
        params: { category: params.category },
      });
    }
    return { subcategory };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const format = useFormatter();

  const twelvePastMonths = Array.from({ length: 12 }, (_, i) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    now.setDate(1);
    now.setMonth(now.getMonth() - i);
    return {
      timestamp: now.getTime().toString(),
      formattedStr: format.dateTime(now, 'monthYear'),
    };
  });

  const [selectedMonth, setSelectedMonth] = useState(
    twelvePastMonths[0]?.timestamp ?? '',
  );

  const [amount, setAmount] = useState(0);

  return (
    <div className="flex flex-col px-8">
      <div className="flex h-12 items-center">
        <Button variant="ghost" size="icon" asChild>
          <Route.Link to="/{-$locale}/app/add/$category">
            <ArrowLeftIcon />
          </Route.Link>
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-center text-2xl font-bold">Enter Details</h1>
        <div className="flex flex-col gap-6">
          <BigNumberInput
            className="self-center"
            value={amount}
            onValueChange={setAmount}
          />
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Select a month">
                {
                  twelvePastMonths.find(
                    (month) => month.timestamp === selectedMonth,
                  )?.formattedStr
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {twelvePastMonths.map((month) => (
                <SelectItem key={month.timestamp} value={month.timestamp}>
                  {month.formattedStr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea placeholder="Description" />
        </div>
      </div>
    </div>
  );
}
