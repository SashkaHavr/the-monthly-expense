import { MoneyInput } from '../app/add/money-input';
import { useFieldContext } from './form-context';

export function FormMoneyInput({ className }: { className?: string }) {
  const field = useFieldContext<number>();
  return (
    <MoneyInput
      className={className}
      id={field.name}
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onValueChange={(value) => field.handleChange(value)}
    />
  );
}
