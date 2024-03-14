import React, { useState } from "react";
import styles from "./fibonacci-page.module.css"
import useForm from "../../utils/hooks/useForm";
import useLoading from "../../utils/hooks/useLoading";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import fibonacciIterative from "./algorithm";


export const FibonacciPage: React.FC = () => {
  const { values, onChange } = useForm({ 'number': ''});
  const { isLoading, setLoading } = useLoading(false);
  // state для отслеживания изменений в массиве и ререндера кругов
  const [circles, setCircles] = useState<Array<number>>([]);

  // если число меньше нуля / поле пусто / число больше 19 - блочим кнопку
  const disabledCondition = Number(values['number']) < 1 || !values['number'] || Number(values['number']) > 19;

  const handleClick = () => {
    setLoading(true);

    const inputNumber = Number(values['number']);
    fibonacciIterative(inputNumber, setCircles, () => setLoading(false));
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">

    <div className={styles.container}>
      <Input isLimitText={true} max={19} name="number" onChange={onChange} placeholder="Введите число от 1 до 19" type="number" />
      <Button isLoader={isLoading} disabled={disabledCondition} extraClass={styles.btn} text="Рассчитать" onClick={handleClick} /> 
    </div>

    <ul className={`${styles.digits} ${circles.length < 11 ? "" : styles.align_left}`}>
      {circles.map((item, index) => 
        <li key={index}>
          <Circle index={index} letter={item.toString()} />
        </li>
      )}
    </ul>
     
    </SolutionLayout>
  );
};

// todo - постараться отделить алгоритм от setState (и уже тогда добавить проверку, монтирован ли компонент)