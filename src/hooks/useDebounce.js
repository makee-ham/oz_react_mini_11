import { useEffect, useRef, useState } from "react";

export default function useDebounce(targetValue, delay = 100) {
  const [debouncedValue, setDebouncedValue] = useState(targetValue);
  const timerRef = useRef(0);

  const cleanupDebounce = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const debouncing = () => {
    cleanupDebounce();
    timerRef.current = setTimeout(() => {
      setDebouncedValue(targetValue);
    }, delay);
  };

  useEffect(() => {
    debouncing();
  }, [targetValue]);

  useEffect(() => {
    return () => {
      cleanupDebounce();
    };
  }, []);

  return debouncedValue;
}
