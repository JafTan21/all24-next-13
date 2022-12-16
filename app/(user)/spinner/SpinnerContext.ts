import React from "react";

interface ISpinnerContext {
  disabled: boolean;
  disabledSet: (x: boolean) => void;
  win_number: number;
  loading: boolean;
}

export const SpinnerContext = React.createContext<ISpinnerContext>({
  disabled: true,
  disabledSet: (x: boolean) => {},
  win_number: 16,
  loading: false,
});
