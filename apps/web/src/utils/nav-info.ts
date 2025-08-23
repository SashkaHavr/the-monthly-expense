import type { LinkProps } from '@tanstack/react-router';

export interface NavInfo {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  to: LinkProps['to'];
}
