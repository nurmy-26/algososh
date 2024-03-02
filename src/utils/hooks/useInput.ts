import { ChangeEvent, useState } from "react";

// кастомный хук для управления значением инпута формы
const useForm = (inputValues: { [key: string]: string } = {}) => {
  const [values, setValues] = useState(inputValues);

  return {
    values,
    onChange: (e: ChangeEvent<HTMLInputElement>) => setValues({...values, [e.target.name]: e.target.value}),
    clearForm: () => setValues(inputValues)
  };
};

export default useForm

// // кастомный хук для управления значениями инпутов формы (принимает объект с начальными значениями полей)
// export const useForm = (inputValues: { [key: string]: string } = {}) => {
//   const [values, setValues] = React.useState(inputValues);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setValues({...values, [e.target.name]: e.target.value})
//   }

//   return {
//     handleChange,
//     values,
//     setValues
//   };
// };
