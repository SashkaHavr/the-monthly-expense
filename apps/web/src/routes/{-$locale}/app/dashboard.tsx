import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';

import { MonthYearSelect } from '~/components/app/dashboard/month-year-select';

export const Route = createFileRoute('/{-$locale}/app/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const now = new Date();

  const [month, setMonth] = useState<{ month?: number; year: number }>({
    month: now.getMonth(),
    year: now.getFullYear(),
  });

  const [compare, setCompare] = useState(false);

  const [compareMonth, setCompareMonth] = useState<
    { month?: number; year: number } | undefined
  >(undefined);
  const lastCompareDate = new Date(month.year, (month.month ?? 1) - 1);
  const lastCompareMonth = {
    month: month.month == undefined ? 11 : lastCompareDate.getMonth(),
    year: lastCompareDate.getFullYear(),
  };

  return (
    <div className="flex flex-col gap-4 px-8 pt-12">
      <MonthYearSelect
        value={month}
        onValueChange={(value) => {
          const newCompareDate = new Date(value.year, (value.month ?? 1) - 1);
          setMonth(value);
          setCompareMonth({
            month:
              value.month == undefined ? undefined : newCompareDate.getMonth(),
            year: newCompareDate.getFullYear(),
          });
        }}
      />
      <div className="flex items-center gap-2">
        <Switch
          checked={compare}
          onCheckedChange={(value) => {
            const newCompareDate = new Date(month.year, (month.month ?? 1) - 1);
            setCompareMonth(
              value
                ? {
                    month:
                      month.month == undefined
                        ? undefined
                        : newCompareDate.getMonth(),
                    year: newCompareDate.getFullYear(),
                  }
                : undefined,
            );
            setCompare(value);
          }}
        />
        <Label>Compare with</Label>
      </div>
      {compare && compareMonth && (
        <MonthYearSelect
          value={compareMonth}
          onValueChange={setCompareMonth}
          lastDate={lastCompareMonth}
        />
      )}
    </div>
  );
}
