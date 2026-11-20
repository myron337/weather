'use client';
import { useCallback, useSyncExternalStore } from 'react';

const TICK_MS = 1000;

const subscribe = (onTick: () => void) => {
  const timer = setInterval(onTick, TICK_MS);
  return () => clearInterval(timer);
};

const formatTime = (timeZone: string) => {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'shortOffset'
    }).formatToParts(new Date());

    const get = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((part) => part.type === type)?.value ?? '';

    // shortOffset gives "GMT", "GMT+3", "GMT+5:30" -> "UTC+0", "UTC+3", "UTC+5:30"
    const offset = get('timeZoneName').replace('GMT', '') || '+0';

    return `${get('hour')}:${get('minute')} (UTC${offset})`;
  } catch {
    // unknown zone name
    return '';
  }
};

// current HH:MM in the given IANA zone; '' on the server to avoid hydration mismatch
export const useCityTime = (timeZone?: string) => {
  const getSnapshot = useCallback(
    () => (timeZone ? formatTime(timeZone) : ''),
    [timeZone]
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => '');
};
