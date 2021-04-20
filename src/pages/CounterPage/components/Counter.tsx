import React from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks";

import {
  selectCount,
  increment,
  decrement,
} from "../../../slices/counterSlice";

export default function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  function handleIncrement() {
    dispatch(increment());
  }

  function handleDecrement() {
    dispatch(decrement());
  }

  return (
    <div>
      <span>{count}</span>
      <br />
      <button type="button" onClick={handleIncrement}>
        INCREMENT
      </button>
      <button type="button" onClick={handleDecrement}>
        DECREMENT
      </button>
    </div>
  );
}
