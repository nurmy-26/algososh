import { useEffect, useRef } from "react";

// кастомный хук для отслеживания монтирования компонента
const useMounted = () => {
  const isMounted = useRef(false);

  // при монтировании и демонтировании компонента обновляем значение isMounted до актуального
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; }
  }, [])

  return isMounted;
};

export default useMounted