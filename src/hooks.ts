import { useEffect, RefObject } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useOutsideAlerter(
  ref: RefObject<HTMLScriptElement>,
  handler: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        event.target instanceof HTMLElement &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]); // eslint-disable-line react-hooks/exhaustive-deps
}

export function useKeyDown(targetKey: string, handler: () => void) {
  function downHandler(event: KeyboardEvent) {
    if (event.key === targetKey) {
      handler();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", downHandler);
    return () => {
      document.removeEventListener("keydown", downHandler);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
