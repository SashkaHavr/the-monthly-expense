import { useState } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useFormatter } from 'use-intl';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';

import { MonthYearSelect } from './month-year-select';

export function ChooseMonthYearButton() {
  const now = new Date();
  const format = useFormatter();

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
    year:
      month.month == undefined
        ? lastCompareDate.getFullYear() - 1
        : lastCompareDate.getFullYear(),
  };

  const setDefaultCompareMonth = (
    value: { month?: number; year: number },
    compare: boolean,
  ) => {
    if (!compare) {
      setCompareMonth(undefined);
      return;
    }

    const newCompareDate = new Date(value.year, (value.month ?? 1) - 1);
    setCompareMonth({
      month: value.month == undefined ? undefined : newCompareDate.getMonth(),
      year:
        value.month == undefined
          ? newCompareDate.getFullYear() - 1
          : newCompareDate.getFullYear(),
    });
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-full" variant="outline">
            {format.dateTime(new Date(month.year, month.month ?? 0), {
              year: 'numeric',
              month: month.month != undefined ? 'long' : undefined,
            })}
            {compareMonth &&
              ` - ${format.dateTime(
                new Date(compareMonth.year, compareMonth.month ?? 0),
                {
                  year: 'numeric',
                  month: compareMonth.month != undefined ? 'long' : undefined,
                },
              )}`}
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle>Choose Month and Year</DialogTitle>
              <DialogDescription>
                Please select the month and year you want to view.
              </DialogDescription>
            </DialogHeader>
          </VisuallyHidden>
          <MonthYearSelect
            value={month}
            onValueChange={(value) => {
              setMonth(value);
              setDefaultCompareMonth(value, compare);
            }}
          />
          <div className="flex items-center gap-2">
            <Switch
              checked={compare}
              onCheckedChange={(value) => {
                setCompare(value);
                setDefaultCompareMonth(month, value);
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
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
