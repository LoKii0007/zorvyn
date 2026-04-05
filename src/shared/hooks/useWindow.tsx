import { useEffect, useState } from "react";
import { useSidebarStore } from "../store/useSidebarStore";

const useWindow = () => {
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { setMini, isMini } = useSidebarStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSmallMobile(window.innerWidth < 425);
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
      setIsDesktop(window.innerWidth >= 1024);
    }

    const handleResize = () => {
      setIsSmallMobile(window.innerWidth < 425);
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isTablet && isMini) {
      setMini(false);
    }
  }, [isTablet, isMini, setMini]);

  return { isSmallMobile, isMobile, isTablet, isDesktop };
};

export default useWindow;
