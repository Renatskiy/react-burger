import { useEffect } from "react";

export const useHiddenScrollBody = (show: boolean) => {
  useEffect((): any => {
    if (show) {
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = "unset");
  }, [show]);
};
