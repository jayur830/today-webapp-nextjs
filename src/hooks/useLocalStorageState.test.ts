import { renderHook } from '@testing-library/react';

import useLocalStorageState from './useLocalStorageState';

describe('useLocalStorageState', () => {
  beforeEach(() => {
    // 테스트 전 localStorage 초기화
    window.localStorage.clear();
  });

  it('초기값을 올바르게 설정한다', () => {
    const { result } = renderHook(() => useLocalStorageState('testKey', 'initialValue'));
    expect(result.current[0]).toBe('initialValue');
  });

  it('localStorage에 저장된 값이 있으면 해당 값을 사용한다', () => {
    window.localStorage.setItem('testKey', JSON.stringify('storedValue'));
    const { result } = renderHook(() => useLocalStorageState('testKey', 'initialValue'));
    expect(result.current[0]).toBe('storedValue');
  });

  it('localStorage에 값이 없으면 초기값을 사용한다', () => {
    const { result } = renderHook(() => useLocalStorageState('testKey', 'initialValue'));
    expect(result.current[0]).toBe('initialValue');
  });

  it('복잡한 객체도 올바르게 불러온다', () => {
    const complexObject = { name: 'test', value: 123, nested: { a: 1, b: 2 } };
    window.localStorage.setItem('testKey', JSON.stringify(complexObject));
    const { result } = renderHook(() => useLocalStorageState('testKey', {}));
    expect(result.current[0]).toEqual(complexObject);
  });
});
