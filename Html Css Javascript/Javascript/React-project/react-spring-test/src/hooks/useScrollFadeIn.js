import { useRef } from "react";

const useScrollFadeIn = () => {
  const dom = useRef();

  return {
    ref: dom,
  };
};