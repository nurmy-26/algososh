import React, { useState } from "react";
import styles from "./fibonacci-page.module.css"
import useMounted from "../../utils/hooks/useMounted";
import useForm from "../../utils/hooks/useForm";
import useLoading from "../../utils/hooks/useLoading";
import { setDelay } from "../../utils/helpers";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import getFibonacciSeries from "./algorithm";


export const FibonacciPage: React.FC = () => {
  const isMounted = useMounted();
  const { values, onChange } = useForm({ 'number': ''});
  const { isLoading, setLoading } = useLoading(false);
  // state для отслеживания изменений в массиве и ререндера кругов
  const [circles, setCircles] = useState<Array<number>>([]);

  // если число меньше нуля / поле пусто / число больше 19 - блочим кнопку
  const disabledCondition = Number(values['number']) < 1 || !values['number'] || Number(values['number']) > 19;

  const handleClick = async () => {
    setLoading(true);

    // с помощью алгоритма получаем ряд Фибоначчи
    const fibonacciSeries = getFibonacciSeries(Number(values['number']));

    for (let i = 0; i < fibonacciSeries.length; i++) {
      // на каждом шаге рендерим нужное количество кругов (i + 1), проходя по массиву с задержкой
      setCircles([...fibonacciSeries.slice(0, i + 1)]);

      await setDelay(SHORT_DELAY_IN_MS);
      if (!isMounted.current) return; // если компонент размонтирован - прерываем ф-ю
    }

    setLoading(false);
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">

    <div className={styles.container}>
      <Input isLimitText={true} max={19} name="number" value={values['number']} onChange={onChange}
       placeholder="Введите число от 1 до 19" type="number" />
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
