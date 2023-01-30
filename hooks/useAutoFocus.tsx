import { useRef } from "react";

export default function useAutoFocus() {
  const ref = useRef<HTMLInputElement>(null);
  return {
    ref,
    focus: function () {
      ref.current?.focus();
    },
  };
}
