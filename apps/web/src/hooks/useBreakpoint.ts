import { useMediaQuery } from './use-media-query';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export function useBreakpoint(breakpoint: Breakpoint) {
  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]})`);
}
