import { useEffect, useRef, useCallback } from "react";

// a hook used to determine if the component is mounted or not
export const useIsMounted = () => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    // on mount set the ref to true
    isMountedRef.current = true;

    // on unmount set the ref to false
    return () => {
      isMountedRef.current = false;
    };
  });

  // convenience function for running a function only when mounted
  const ifIsMounted = useCallback((fn: () => void) => {
    if (isMountedRef.current) {
      fn();
    }
  }, []);

  return {
    isMountedRef,
    ifIsMounted,
  };
};
