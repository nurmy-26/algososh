import React, { useState } from "react";
import styles from "./string.module.css"
import { ElementStates } from "../../types/element-states";
import useMounted from "../../utils/hooks/useMounted";
import useForm from "../../utils/hooks/useForm";
import useLoading from "../../utils/hooks/useLoading";
import { setDelay, swap } from "../../utils/helpers";
import { DELAY_IN_MS } from "../../utils/constants/delays";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { TCircle } from "./types";
import reverseArray from "./algorithm";


export const StringComponent: React.FC = () => {
  const isMounted = useMounted();
  const { values, onChange } = useForm({ 'string': ''});
  const { isLoading, setLoading } = useLoading(false);
  // state для отслеживания изменений в массиве и ререндера кругов
  const [circles, setCircles] = useState<Array<TCircle>>([]);

  const handleClick = async () => {
    setLoading(true);

    // берем строку из инпута (и добавляем каждому символу начальный цвет)
    const circleRows = values["string"].split('').map((letter) => ({sign: letter, color: ElementStates.Default}))
    // с помощью алгоритма получаем массив шагов (индексы изменяемых эл-в)
    const stepList = reverseArray(circleRows);

    // производим разворот строки
    for (let i = 0; i < stepList.length; i++) {
      const startIndex = stepList[i]['start'];
      const endIndex = stepList[i]['end'];

      // для одного элемента свап не нужен
      if (circleRows.length > 1) {
        // шаг до свапа - значения кругов еще прежние, цвет - розовый
        circleRows[startIndex].color = ElementStates.Changing;
        circleRows[endIndex].color = ElementStates.Changing;
        setCircles([...circleRows]);

        // интервал между свапами
        await setDelay(DELAY_IN_MS);
        if (!isMounted.current) return; // если компонент размонтирован - прерываем ф-ю

        // свап
        swap(circleRows, startIndex, endIndex);
      }
      // поменявшиеся круги становятся зелеными
      circleRows[startIndex].color = ElementStates.Modified;
      circleRows[endIndex].color = ElementStates.Modified;
      setCircles([...circleRows]); 
    }

    setLoading(false);
  }

  
  return (
    <SolutionLayout title="Строка">

    <div className={styles.container}>
      <Input isLimitText={true} maxLength={11} name="string" onChange={onChange} />
      <Button isLoader={isLoading} disabled={!values["string"]} extraClass={styles.btn} text="Развернуть" onClick={handleClick} /> 
    </div>

    <ul className={styles.string}>
      {circles.map((item, index) => 
        <li key={index}>
          <Circle letter={item.sign} state={item.color} />
        </li>
      )}
    </ul>
    
    </SolutionLayout>
  );
};
