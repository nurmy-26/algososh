import React, { useState } from "react";
import styles from "./stack-page.module.css"
import { ElementStates } from "../../types/element-states";
import useMounted from "../../utils/hooks/useMounted";
import useForm from "../../utils/hooks/useForm";
import { setDelay } from "../../utils/helpers";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { TCircle } from "./types";
import Stack from "./Stack";


export const StackPage: React.FC = () => {
  const isMounted = useMounted();
  const { values, onChange, clearForm } = useForm({ 'stack': ''});
  
  // для работы с одним и тем же стеком
  const [st] = useState(new Stack<TCircle, ElementStates>());
  const [topIndex, setTopIndex] = useState(-1);
  // для отслеживания изменений в массиве и ререндера кругов
  const [circles, setCircles] = useState<Array<TCircle>>([]);

  // добавление в стек
  const handleAdd = async () => {
    const newItem = { value: values["stack"], color: ElementStates.Changing };
    st.push(newItem);
    setTopIndex(st.peakIndex);
    setCircles([...st.array]);
    clearForm();

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return; // если компонент размонтирован - прерываем ф-ю
    st.color = ElementStates.Default;
    setCircles([...st.array]);
  }

  // удаление из стека
  const handleDelete = async () => {
    st.color = ElementStates.Changing;
    setCircles([...st.array]);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    st.pop();
    setTopIndex(st.peakIndex);
    setCircles([...st.array]);
  }

  // очищение стека
  const handleClear = () => {
    st.clear();
    setCircles([...st.array]);
  }


  return (
    <SolutionLayout title="Стек">

    <div className={styles.container}>
      <Input extraClass={styles.input} isLimitText={true} maxLength={4} name="stack" value={values["stack"]} onChange={onChange} />
      
      {/* ограничение стека - 11 элементов, чтобы влезал на экран */}
      <Button disabled={!values["stack"] || st.size > 10} text="Добавить" onClick={handleAdd} />
      <Button disabled={st.size < 1} text="Удалить" onClick={handleDelete} />

      <Button disabled={st.size < 1} extraClass={styles.btn} text="Очистить" onClick={handleClear} />
    </div>

    <ul className={styles.stack}>
      {circles.map((item, index) => 
        <li key={index}>
          <Circle index={index} letter={item.value} state={item.color} head={index === topIndex ? "top" : ""} />
        </li>
      )}
    </ul>
    
    </SolutionLayout>
  );
};
