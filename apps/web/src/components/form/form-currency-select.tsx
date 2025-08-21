import { useLocale } from 'use-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useFieldContext } from './form-context';

export function FormCurrencySelect() {
  const locale = useLocale();
  const currencies = Intl.supportedValuesOf('currency').filter(
    (currency) => currency != 'RUB',
  );
  const displayNames = new Intl.DisplayNames([locale], { type: 'currency' });

  const field = useFieldContext<string>();

  const currencyDisplay = (currency: string) =>
    `${displayNames.of(currency)} (${currency})`;

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
          {currencyDisplay(field.state.value)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency} value={currency}>
            {currencyDisplay(currency)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
