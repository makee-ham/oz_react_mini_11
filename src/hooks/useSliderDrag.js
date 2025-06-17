import { useState, useRef } from "react";

export default function useSliderDrag(currentPage, setCurrentPage, totalPages) {
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isClickPrevented = useRef(false);
  const bounceTimer = useRef(null);
  const startX = useRef(null);

  const handleStart = (e) => {
    startX.current = e.clientX || e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleMove = (e) => {
    if (!isDragging || startX.current === null) return;
    const currentX = e.clientX || e.touches[0].clientX;
    const diff = startX.current - currentX;

    if (Math.abs(diff) > 10) isClickPrevented.current = true;

    if (diff > 50) {
      if (currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
      else bounce(-60);
      setIsDragging(false);
    } else if (diff < -50) {
      if (currentPage > 0) setCurrentPage((p) => p - 1);
      else bounce(60);
      setIsDragging(false);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    startX.current = null;
    setTimeout(() => (isClickPrevented.current = false), 50);
  };

  const bounce = (amount) => {
    setOffsetX(amount);
    clearTimeout(bounceTimer.current);
    bounceTimer.current = setTimeout(() => setOffsetX(0), 200);
  };

  const bindDrag = {
    onMouseDown: handleStart,
    onMouseMove: handleMove,
    onMouseUp: handleEnd,
    onMouseLeave: handleEnd,
    onTouchStart: handleStart,
    onTouchMove: handleMove,
    onTouchEnd: handleEnd,
  };

  return { bindDrag, offsetX, isDragging, isClickPrevented };
}
