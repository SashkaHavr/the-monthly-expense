import { useLayoutEffect, useRef } from 'react';
import { useFormatter, useLocale } from 'use-intl';

import { cn } from '~/lib/utils';

function escapeRegex(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function BigNumberInput({
  className,
  value,
  onValueChange,
  ...props
}: Omit<
  React.ComponentProps<'input'>,
  'value' | 'onValueChange' | 'type' | 'pattern'
> & {
  value: number;
  onValueChange: (value: number) => void;
}) {
  const format = useFormatter();
  const locale = useLocale();

  const parts = Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
  }).formatToParts(1111.1);

  const currency = parts.find((part) => part.type == 'currency')?.value ?? '';
  const group = parts.find((part) => part.type == 'group')?.value ?? '';
  const decimal = parts.find((part) => part.type == 'decimal')?.value ?? '';
  const allExtraChars = [currency, group, decimal];

  const stringValue = format.number(value, {
    style: 'currency',
    currency: 'EUR',
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const caretPosition = useRef({
    selectionStart: 1,
    selectionEnd: 1,
  });

  const setCaretPosition = (pos: number) => {
    const input = inputRef.current;
    if (!input) return;
    caretPosition.current.selectionStart = pos;
    caretPosition.current.selectionEnd = pos;
    input.setSelectionRange(
      caretPosition.current.selectionStart,
      caretPosition.current.selectionEnd,
    );
  };

  useLayoutEffect(() => {
    setCaretPosition(caretPosition.current.selectionStart);
  }, [value]);

  return (
    <input
      ref={inputRef}
      value={stringValue}
      autoFocus
      type="text"
      pattern="[0-9]*"
      data-slot="input"
      onKeyDown={(e) => {
        const input = e.target as HTMLInputElement;
        const caretPos = input.selectionStart ?? 0;
        if (e.key == 'Backspace') {
          if (caretPos > 0) {
            const prevChar = input.value[caretPos - 1]!;
            if (!allExtraChars.includes(prevChar)) {
              return;
            } else {
              setCaretPosition(caretPos - 1);
            }
          }
          e.preventDefault();
          return;
        }
        if (e.key == 'Delete') {
          e.preventDefault();
          return;
        }
        if (allExtraChars.includes(e.key)) {
          setCaretPosition(caretPos + 1);
          e.preventDefault();
          return;
        }
      }}
      onChange={(e) => {
        const escapedDecimal = escapeRegex(decimal);
        const dotsCount = (
          e.target.value.match(new RegExp(escapedDecimal, 'g')) ?? []
        ).length;
        if (dotsCount != 1) {
          onValueChange(value);
          return;
        }

        const escapedGroup = escapeRegex(group);
        const groupsCount = (
          e.target.value.match(new RegExp(escapedGroup, 'g')) ?? []
        ).length;
        const oldGroupsCount = (
          stringValue.match(new RegExp(escapedGroup, 'g')) ?? []
        ).length;
        if (groupsCount > oldGroupsCount) {
          setCaretPosition(e.target.selectionStart ?? 0);
        }

        let newValue = parseFloat(e.target.value.replace(/[^0-9.-]+/g, ''));
        newValue = isNaN(newValue) ? 0 : newValue;
        newValue = Math.floor(newValue * 100) / 100;
        setCaretPosition(e.target.selectionStart ?? 0);

        if (value < 1 && newValue > 1) {
          newValue =
            Math.floor(newValue / 10) + (newValue - Math.floor(newValue));
        }

        onValueChange(newValue);
      }}
      className={cn(className, 'text-center text-4xl font-bold outline-none')}
      {...props}
    />
  );
}
