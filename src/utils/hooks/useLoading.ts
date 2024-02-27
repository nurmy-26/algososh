import { useState } from "react";

// кастомный хук для управления лоадером
const useLoading = (initialValue: boolean) => {
  const [isLoading, setLoading] = useState(initialValue);

  const toggleLoading = () => {
    setLoading(!isLoading)
  }

  return {
    isLoading,
    setLoading,
    toggleLoading
  };
};

export default useLoading