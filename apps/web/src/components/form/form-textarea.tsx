import { Textarea } from '../ui/textarea';
import { useFieldContext } from './form-context';

export function FormTextarea({ placeholder }: { placeholder: string }) {
  const field = useFieldContext<string>();
  return (
    <Textarea
      placeholder={placeholder}
      id={field.name}
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
}
