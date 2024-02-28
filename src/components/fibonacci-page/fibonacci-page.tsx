import React from "react";
import styles from "./fibonacci.module.css"
import useInput from "../../utils/hooks/useInput";
import useLoading from "../../utils/hooks/useLoading";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import fibonacciIterative from "./algorithm";


export const FibonacciPage: React.FC = () => {
  const { inputValue, onChange } = useInput('');
  const { isLoading, setLoading } = useLoading(false);
  // state для отслеживания изменений в массиве и ререндера кругов
  const [circles, setCircles] = React.useState<Array<number>>([]);

  // если число меньше нуля / поле пусто / число больше 19 - блочим кнопку
  const disabledCondition = Number(inputValue) < 1 || !inputValue || Number(inputValue) > 19;

  const handleClick = () => {
    setLoading(true);

    const inputNumber = Number(inputValue);
    fibonacciIterative(inputNumber, setCircles, () => setLoading(false));
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">

    <div className={styles.container}>
      <Input isLimitText={true} max={19} onChange={onChange} placeholder="Введите число от 1 до 19" type="number" />
      <Button isLoader={isLoading} disabled={disabledCondition} extraClass={styles.btn} text="Развернуть" onClick={handleClick} /> 
    </div>

    <ul className={styles.digits}>
      {circles.map((item, index) => 
        <li key={index}>
          <Circle index={index} letter={item.toString()} />
        </li>
      )}
    </ul>
     
    </SolutionLayout>
  );
};
