import { useCallback } from "react";
import { useEffect } from "react";

const useScrollPos = () => {
  const handleScroll = useCallback(() => {
    const currentScrollPosition = window.scrollY;
    console.log(currentScrollPosition);
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [handleScroll])
}

export default useScrollPos;