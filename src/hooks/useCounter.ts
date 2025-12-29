"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export function useCounter(
  end: number,
  duration: number = 2000,
  suffix: string = "",
  prefix: string = ""
) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = startValue + (end - startValue) * easeOut;
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  const formatNumber = (num: number) => {
    if (end >= 1000000000) {
      return (num / 1000000000).toFixed(num === end ? 0 : 1) + "B";
    }
    if (end >= 1000000) {
      return (num / 1000000).toFixed(num === end ? (end % 1000000 === 0 ? 0 : 1) : 1) + "M";
    }
    if (end >= 1000) {
      return Math.floor(num).toLocaleString();
    }
    if (end < 10 && end % 1 !== 0) {
      return num.toFixed(1);
    }
    return Math.floor(num).toString();
  };

  return {
    ref,
    value: `${prefix}${formatNumber(count)}${suffix}`,
    isInView,
  };
}
