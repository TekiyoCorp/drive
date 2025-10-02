"use client";

import { useState, useEffect, useRef } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface InViewResult {
  ref: (node?: Element | null) => void;
  inView: boolean;
  entry?: IntersectionObserverEntry;
}

// Lightweight intersection observer hook that doesn't load the heavy library until needed
export function useInViewOptimized(
  options: UseInViewOptions = {}
): InViewResult {
  const [inView, setInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const elementRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { threshold = 0, rootMargin = "0px", triggerOnce = false } = options;

  useEffect(() => {
    if (!elementRef.current) return;

    // Use native IntersectionObserver instead of the heavy library
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setEntry(entry);
        setInView(entry.isIntersecting);

        if (entry.isIntersecting && triggerOnce && observerRef.current) {
          observerRef.current.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(elementRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  const ref = (node?: Element | null) => {
    if (elementRef.current && observerRef.current) {
      observerRef.current.disconnect();
    }
    elementRef.current = node || null;
  };

  return { ref, inView, entry };
}
