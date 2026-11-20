'use client';
import { useEffect, useState } from 'react';
import type { Coordinates } from '@/store/geocoding/geocoding.type';

type GeolocationStatus = 'pending' | 'success' | 'error';

const isSupported = () =>
  typeof navigator !== 'undefined' && 'geolocation' in navigator;

export const useGeolocation = (enabled = true) => {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [status, setStatus] = useState<GeolocationStatus>(() =>
    isSupported() ? 'pending' : 'error'
  );

  useEffect(() => {
    if (!enabled || !isSupported()) return;

    let cancelled = false;

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        if (cancelled) return;
        setCoords({ latitude, longitude });
        setStatus('success');
      },
      () => {
        if (!cancelled) setStatus('error');
      },
      { maximumAge: 10 * 60 * 1000, timeout: 10 * 1000 }
    );

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { coords, status };
};
