import React from "react";
import styles from "./queue-page.module.css"
import { ElementStates } from "../../types/element-states";
import useForm from "../../utils/hooks/useInput";
import { setDelay } from "../../utils/helpers";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { TCircle } from "./types";
import Queue from "./Queue";


export const QueuePage: React.FC = () => {
  const { values, onChange, clearForm } = useForm({ 'queue': ''});
  const [loadingBtn, setLoadingBtn] = React.useState('')
  
  // для работы с одной и той же очередью
  const [que] = React.useState(new Queue<TCircle, ElementStates>(7, { value: "", color: ElementStates.Default }));
  const [headIndex, setHeadIndex] = React.useState(false)
  // для отслеживания изменений в массиве и ререндера кругов
  const initialState = que.array;
  const [circles, setCircles] = React.useState<Array<TCircle>>(initialState);

  // добавление в очередь
  const handleAdd = async () => {
    setLoadingBtn('add');
    // чтоб не подкрасить больше элементов, чем размер очереди
    if (que.tailIndex < que.arraySize) {
      circles[que.tailIndex] = { value: "", color: ElementStates.Changing }; // подготовительный цвет
      setCircles([...circles]);
      
      await setDelay(SHORT_DELAY_IN_MS);
      que.enqueue({ value: values["queue"], color: ElementStates.Changing }); // добавляем эл-т в исходную очередь
      circles[que.tailIndex - 1] = que.array[que.tailIndex - 1]; // обновляем tail элемент в рендерящемся массиве
      clearForm();
      if (!headIndex) { setHeadIndex(true) };
      setCircles([...circles]);  
  
      await setDelay(SHORT_DELAY_IN_MS);
      circles[que.tailIndex - 1] = {...que.array[que.tailIndex - 1], color: ElementStates.Default}; // конечный цвет
      setCircles([...circles]);
    }
    setLoadingBtn('');
  }

  // удаление из очереди
  const handleDelete = async () => {
    setLoadingBtn('delete');
    // чтоб не подкрасить пустой элемент
    if (!que.isEmpty) {
      circles[que.headIndex] = { ...que.array[que.headIndex], color: ElementStates.Changing }; // подготовительный цвет
      setCircles([...circles]);

      await setDelay(SHORT_DELAY_IN_MS);
      que.dequeue(); // удаляем из исходной очереди
      circles[que.headIndex - 1] = { ...que.array[que.headIndex - 1], color: ElementStates.Default };
      circles[que.headIndex] = { ...que.array[que.headIndex], color: ElementStates.Default };
      setCircles([...circles]);
    }
    setLoadingBtn('');
  }

  // очищение очереди
  const handleClear = () => {
    setLoadingBtn('clear');

    que.clear();
    setHeadIndex(false);
    setCircles([...que.array]);

    setLoadingBtn('');
  }


  return (
    <SolutionLayout title="Очередь">

    <div className={styles.container}>
      <Input extraClass={styles.input} isLimitText={true} maxLength={4} name="queue" value={values["queue"]} onChange={onChange} />
      
      <Button isLoader={loadingBtn === 'add'} disabled={!values["queue"]} 
        text="Добавить" onClick={handleAdd} />
      <Button isLoader={loadingBtn === 'delete'} text="Удалить" onClick={handleDelete} />

      <Button isLoader={loadingBtn === 'clear'} extraClass={styles.btn} text="Очистить" onClick={handleClear} />
    </div>

    <ul className={styles.queue}>
      {circles.map((item, index) => 
        <li key={index}>
          <Circle index={index} letter={item.value} state={item.color} 
            head={index === que.headIndex && (item.value || headIndex)  ? "head" : ""} 
            tail={item.value && index === (que.tailIndex - 1) ? "tail" : ""} />
        </li>
      )}
    </ul>
    
    </SolutionLayout>
  );
};
