'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useLayoutEffect, useState } from 'react';

export default function useLocalStorageState<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialValue);

  useLayoutEffect(() => {
    const storage = localStorage.getItem(key);
    if (storage) {
      setState(JSON.parse(storage ?? '{}'));
    }
  }, []);

  return [state, setState];
}
