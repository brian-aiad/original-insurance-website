import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash && pathname === window.location.pathname) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReduced ? "auto" : "auto", // snap to top
    });
  }, [pathname]);

  return null;
}
