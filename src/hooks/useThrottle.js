import { useRef, useCallback } from "react";

export default function useSimpleThrottle(callback, delay) {
  const lastCall = useRef(0);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  const throttledCallback = useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callbackRef.current(...args);
      }
    },
    [delay]
  );

  return throttledCallback;
}
