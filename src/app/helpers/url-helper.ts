export const getComparableUrlPathname = (): string =>
  location.pathname.startsWith('/tee-timers')
    ? location.pathname.replace('/tee-timers', '')
    : location.pathname;
