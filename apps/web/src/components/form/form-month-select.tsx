import { useFormatter } from 'use-intl';

import { useBreakpoint } from '~/hooks/useBreakpoint';
import { cn } from '~/lib/utils';
import { getCurrentMonth, getMonthISOString } from '~/utils/month';
import { RadioGroup, RadioGroupItemBadge } from '../ui/radio-group';
import { useFieldContext } from './form-context';

export function FormMonthSelect({ className }: { className?: string }) {
  const format = useFormatter();
  const currentMonth = getCurrentMonth();
  const threePastMonths = Array.from({ length: 3 }, (_, i) => {
    const month = new Date(currentMonth);
    month.setMonth(month.getMonth() - i);
    return {
      iso: getMonthISOString(month),
      formattedStr: format.dateTime(month, 'monthYear'),
    };
  });

  const field = useFieldContext<string>();
  const sm = useBreakpoint('sm');

  return (
    <RadioGroup
      className={cn(
        'gid grid-cols-3 justify-center justify-items-stretch',
        className,
      )}
      value={field.state.value}
      onValueChange={(value) => field.handleChange(value)}
      name={field.name}
      onBlur={field.handleBlur}
    >
      {threePastMonths.map((month, index) => (
        <RadioGroupItemBadge
          key={month.iso}
          value={month.iso}
          id={`month-${index}`}
        >
          <span className="flex flex-col items-center">
            {sm
              ? month.formattedStr
              : month.formattedStr
                  .split(' ')
                  .map((word, i) => <span key={i}>{word}</span>)}
          </span>
        </RadioGroupItemBadge>
      ))}
    </RadioGroup>
  );
}
