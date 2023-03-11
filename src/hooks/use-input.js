import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(null);

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const inputInvalid = isTouched && validateValue(enteredValue);

  const resetInput = () => {
    setEnteredValue("");
    setIsTouched(null);
  };

  return {
    enteredValue,
    inputInvalid,
    valueChangeHandler,
    resetInput,
    inputBlurHandler,
  };
};

export default useInput;
