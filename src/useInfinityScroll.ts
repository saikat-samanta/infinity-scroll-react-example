import React from "react";

export interface useInfinityScrollProps {
  ref?: React.RefObject<any>;
  option?: Omit<IntersectionObserverInit, "root">;
  onScrollEnd?: () => Promise<void> | void;
}

export const useInfinityScroll = ({
  ref,
  onScrollEnd,
  option = {}
}: useInfinityScrollProps) => {
  const isCalled = React.useRef<IntersectionObserverEntry | null>(null);
  const observer = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries, observer) => {
        if (
          entries[0].isIntersecting &&
          !isCalled.current?.target.isSameNode(entries[0].target)
        ) {
          isCalled.current = entries[0];
          void onScrollEnd?.();
          observer.unobserve(entries[0].target);
          observer.observe(ref?.current.lastChild as Element);
        }
      },
      {
        root: ref?.current,
        ...option
      }
    );
    if (ref?.current) {
      observer.current?.observe(ref?.current.lastChild as Element);
    }
  }, [onScrollEnd, option, ref]);
  return observer.current?.disconnect;
};
