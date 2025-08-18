import { Button } from '../ui/button';
import { LoadingSpinner } from '../ui/loading-spinner';
import { useFormContext } from './form-context';

export function FormSubmitButton({
  label,
  defaultInvalid = false,
}: {
  label: string;
  defaultInvalid?: boolean;
}) {
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={(state) =>
        [state.canSubmit, state.isSubmitting, state.isDefaultValue] as const
      }
    >
      {([canSubmit, isSubmitting, isDefaultValue]) => {
        console.log(canSubmit);
        return (
          <Button
            type="submit"
            disabled={!canSubmit || (isDefaultValue && defaultInvalid)}
          >
            {isSubmitting && <LoadingSpinner className="size-4" />}
            <p>{label}</p>
            {isSubmitting && <div className="size-4" />}
          </Button>
        );
      }}
    </form.Subscribe>
  );
}
