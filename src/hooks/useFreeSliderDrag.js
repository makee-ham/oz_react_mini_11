import { useRef } from "react";

export default function useFreeSliderDrag() {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isClickPrevented = useRef(false);
  const bounceTimeout = useRef(null);

  const applyBounce = (ref, direction = "left") => {
    const el = ref.current;
    if (!el) return;

    const bounceDistance = direction === "left" ? 30 : -30;

    el.style.transition = "transform 0.2s ease";
    el.style.transform = `translateX(${bounceDistance}px)`;

    clearTimeout(bounceTimeout.current);
    bounceTimeout.current = setTimeout(() => {
      el.style.transform = "translateX(0)";
    }, 200);
  };

  const bindDrag = (ref) => ({
    onMouseDown: (e) => {
      isDragging.current = true;
      startX.current = e.pageX;
      scrollLeft.current = ref.current.scrollLeft;
      isClickPrevented.current = false;
    },
    onMouseMove: (e) => {
      if (!isDragging.current) return;
      const walk = e.pageX - startX.current;
      if (Math.abs(walk) > 5) {
        isClickPrevented.current = true;
      }
      const el = ref.current;
      el.scrollLeft = scrollLeft.current - walk;

      // 바운스 조건 확인
      if (el.scrollLeft <= 0) applyBounce(ref, "left");
      else if (el.scrollLeft + el.clientWidth >= el.scrollWidth)
        applyBounce(ref, "right");
    },
    onMouseUp: () => {
      isDragging.current = false;
      setTimeout(() => (isClickPrevented.current = false), 50);
    },
    onMouseLeave: () => {
      isDragging.current = false;
    },
    onTouchStart: (e) => {
      startX.current = e.touches[0].clientX;
      scrollLeft.current = ref.current.scrollLeft;
      isClickPrevented.current = false;
    },
    onTouchMove: (e) => {
      const walk = e.touches[0].clientX - startX.current;
      if (Math.abs(walk) > 5) {
        isClickPrevented.current = true;
      }
      const el = ref.current;
      el.scrollLeft = scrollLeft.current - walk;

      // 바운스 조건
      if (el.scrollLeft <= 0) applyBounce(ref, "left");
      else if (el.scrollLeft + el.clientWidth >= el.scrollWidth)
        applyBounce(ref, "right");
    },
    onTouchEnd: () => {
      isDragging.current = false;
      setTimeout(() => (isClickPrevented.current = false), 50);
    },
  });

  return { bindDrag, isClickPrevented };
}
