import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useFieldContext } from './form-context';

export function FormSelect({
  valueDisplay,
  children,
}: {
  valueDisplay?: (value: string) => string | undefined;
  children: React.ReactNode;
}) {
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
          {valueDisplay ? valueDisplay(field.state.value) : undefined}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
}
