import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToLocation = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }

    window.scrollTo({ top: 0 });
  }, [hash, pathname]);

  return null;
};

export default ScrollToLocation;
