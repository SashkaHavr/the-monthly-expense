import { createFormHook } from '@tanstack/react-form';

import { fieldContext, formContext } from './form-context';
import { FormEmailInput } from './form-email-input';
import { FormMoneyInput } from './form-money-input';
import { FormMonthSelect } from './form-month-select';
import { FormSubmitButton } from './form-submit-button';
import { FormTextarea } from './form-textarea';

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  // We'll learn more about these options later
  fieldComponents: {
    FormEmailInput,
    FormMoneyInput,
    FormTextarea,
    FormMonthSelect,
  },
  formComponents: { FormSubmitButton },
});
