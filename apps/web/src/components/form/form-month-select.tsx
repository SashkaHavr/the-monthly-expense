import { useFormatter } from 'use-intl';

import { getCurrentMonth } from '~/utils/month';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useFieldContext } from './form-context';

export function FormMonthSelect() {
  const format = useFormatter();
  const currentMonth = getCurrentMonth();
  const twelvePastMonths = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(currentMonth);
    month.setMonth(month.getMonth() - i);
    return {
      timestamp: month.getTime().toString(),
      formattedStr: format.dateTime(month, 'monthYear'),
    };
  });

  const field = useFieldContext<string>();

  return (
    <Select
      value={field.state.value}
      onValueChange={(value) => field.handleChange(value)}
    >
      <SelectTrigger
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
      >
        <SelectValue placeholder="Select a month">
          {
            twelvePastMonths.find((m) => m.timestamp === field.state.value)
              ?.formattedStr
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
  );
}
