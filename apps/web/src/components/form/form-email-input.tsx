import { Input } from '../ui/input';
import { useFieldContext } from './form-context';

export function FormEmailInput() {
  const field = useFieldContext<string>();
  return (
    <Input
      placeholder="user@example.com"
      id={field.name}
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
}
