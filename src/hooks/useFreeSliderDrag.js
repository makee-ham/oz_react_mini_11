import { useRef } from "react";

export default function useFreeSliderDrag() {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const bindDrag = (ref) => ({
    onMouseDown: (e) => {
      isDragging.current = true;
      startX.current = e.pageX - ref.current.offsetLeft;
      scrollLeft.current = ref.current.scrollLeft;
    },
    onMouseMove: (e) => {
      if (!isDragging.current) return;
      const x = e.pageX - ref.current.offsetLeft;
      const walk = x - startX.current;
      ref.current.scrollLeft = scrollLeft.current - walk;
    },
    onMouseUp: () => {
      isDragging.current = false;
    },
    onMouseLeave: () => {
      isDragging.current = false;
    },
    onTouchStart: (e) => {
      startX.current = e.touches[0].clientX - ref.current.offsetLeft;
      scrollLeft.current = ref.current.scrollLeft;
    },
    onTouchMove: (e) => {
      const x = e.touches[0].clientX - ref.current.offsetLeft;
      const walk = x - startX.current;
      ref.current.scrollLeft = scrollLeft.current - walk;
    },
    onTouchEnd: () => {
      isDragging.current = false;
    },
  });

  return { bindDrag };
}
