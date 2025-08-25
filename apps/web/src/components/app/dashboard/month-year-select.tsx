import { useFormatter } from 'use-intl';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '~/components/ui/carousel';
import { RadioGroup, RadioGroupItemBadge } from '~/components/ui/radio-group';
import { Separator } from '~/components/ui/separator';

import { cn } from '~/lib/utils';

interface Props {
  className?: string;
  value: { month?: number; year: number };
  onValueChange: (value: { month?: number; year: number }) => void;
  lastDate?: { month: number; year: number };
  firstDate?: { month: number; year: number };
}

export function MonthYearSelect({
  className,
  value,
  onValueChange,
  ...props
}: Props) {
  const format = useFormatter();
  const now = new Date();

  const lastDate = props.lastDate ?? {
    month: now.getMonth(),
    year: now.getFullYear(),
  };
  const firstDate = props.firstDate ?? { month: 0, year: 2000 };

  const years = Array.from({ length: 20 })
    .map((_, index) => lastDate.year - index)
    .map((year) => year.toString());
  const selectedYear = value.year;

  const months = Array.from({ length: 12 })
    .map((_, index) => index)
    .map((month) => {
      if (
        (selectedYear == firstDate.year && month < firstDate.month) ||
        (selectedYear == lastDate.year && month > lastDate.month) ||
        (selectedYear == now.getFullYear() && month > now.getMonth())
      ) {
        return undefined;
      }
      return format.dateTime(new Date(selectedYear, month), {
        month: 'long',
      });
    })
    .filter((month) => month != undefined);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <RadioGroup
        value={selectedYear.toString()}
        onValueChange={(value) => {
          const year = parseInt(value);
          onValueChange({ month: undefined, year });
        }}
      >
        <Carousel className="min-w-full" opts={{ dragFree: true }}>
          <CarouselContent>
            {years.map((year) => (
              <CarouselItem key={year} className="basis-auto">
                <RadioGroupItemBadge className="mr-2" value={year}>
                  {year}
                </RadioGroupItemBadge>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </RadioGroup>
      <Separator />
      <RadioGroup
        className="grid-cols-3 grid-rows-5"
        value={value.month == undefined ? 'full-year' : value.month.toString()}
        onValueChange={(value) =>
          onValueChange({
            month: value == 'full-year' ? undefined : parseInt(value),
            year: selectedYear,
          })
        }
      >
        <RadioGroupItemBadge
          className="col-start-1 col-end-4"
          value="full-year"
        >
          Full year
        </RadioGroupItemBadge>
        {months.map((month, index) => (
          <RadioGroupItemBadge key={index} value={index.toString()}>
            {month}
          </RadioGroupItemBadge>
        ))}
      </RadioGroup>
      <div></div>
    </div>
  );
}
