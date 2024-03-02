import React from "react";
import styles from "./string.module.css"
import { ElementStates } from "../../types/element-states";
import useForm from "../../utils/hooks/useInput";
import useLoading from "../../utils/hooks/useLoading";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { TCircle } from "./types";
import reverseArray from "./algorithm";


export const StringComponent: React.FC = () => {
  const { values, onChange } = useForm({ 'string': ''});
  const { isLoading, setLoading } = useLoading(false);
  // state для отслеживания изменений в массиве и ререндера кругов
  const [circles, setCircles] = React.useState<Array<TCircle>>([]);

  const handleClick = () => {
    setLoading(true);

    // берем строку из инпута (и добавляем каждому символу начальный цвет)
    const circleRows = values["string"].split('').map((letter) => ({sign: letter, color: ElementStates.Default}))
    // запускаем разворот строки с помощью алгоритма
    reverseArray(circleRows, setCircles, () => setLoading(false))
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
