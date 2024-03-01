import { ChangeEvent, useState } from "react";

// кастомный хук для управления значением инпута формы
const useInput = (initialValue: string) => {
  const [inputValue, setValue] = useState(initialValue);

  return {
    inputValue,
    onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    clearInput: () => setValue('')
  };
};

export default useInput