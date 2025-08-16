import { Button } from '../ui/button';
import { LoadingSpinner } from '../ui/loading-spinner';
import { useFormContext } from './form-context';

export function FormSubmitButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button type="submit" disabled={!canSubmit}>
          {isSubmitting && <LoadingSpinner className="size-4" />}
          <p>{label}</p>
          {isSubmitting && <div className="size-4" />}
        </Button>
      )}
    </form.Subscribe>
  );
}
