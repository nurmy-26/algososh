import { ChangeEvent, useState } from "react";

// кастомный хук для управления значением инпута(ов) формы
const useForm = (inputValues: { [key: string]: string } = {}) => {
  const [values, setValues] = useState(inputValues);

  return {
    values,
    onChange: (e: ChangeEvent<HTMLInputElement>) => setValues({...values, [e.target.name]: e.target.value}),
    clearForm: () => setValues(inputValues)
  };
};

export default useForm