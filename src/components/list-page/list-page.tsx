import React, { useState } from "react";
import styles from "./list-page.module.css"
import { HEAD, TAIL } from "../../utils/constants/element-captions";
import { ElementStates } from "../../types/element-states";
import useMounted from "../../utils/hooks/useMounted";
import useForm from "../../utils/hooks/useForm";
import { getRandomArr, setDelay } from "../../utils/helpers";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { TCircle, TClickedState } from "./types";
import List from "./List";


// todo - перенести в helpers и заменить в других местах или сделать назначение цвета по условию
const itemWithNewIndex = (item: TCircle, newIndex: number) => {
  return { ...item, index: newIndex };
}
const itemWithNewColor = (item: TCircle, newColor: ElementStates) => {
  return { ...item, color: newColor };
}


export const ListPage: React.FC = () => {
  const isMounted = useMounted();
  const { values, onChange, clearForm } = useForm({ 'value': '', 'ind': ''});
  const [isClicked, setClicked] = useState<TClickedState>('');
  
  const initialList = getRandomArr({min: 3, max: 5}, {min: 0, max: 99}).map((item) => (
    { value: item.toString(), color: ElementStates.Default }));
  const [list] = useState(new List<TCircle>(initialList));
  const initialCircles = list.array;
  const [circles, setCircles] = useState<Array<TCircle>>(initialCircles);

  const [tempAdded, setTempAdded] = useState<TCircle | null>(null);
  const [tempDeleted, setTempDeleted] = useState<TCircle | null>(null);

  // получаем маленький кружок JSX.Element на основе переданных данных
  const getSmallCircle = (item: TCircle) => {
    return (
      <Circle letter={item.value} state={item.color} isSmall />
    )
  };

  const getHead = (index: number) => {
    if (tempAdded && index === tempAdded.index) {
      return getSmallCircle(tempAdded);
    } else if (index === list.headIndex) {
      return HEAD;
    } else {
      return "";
    }
  }
  const getTail = (index: number) => {
    if (tempDeleted && index === tempDeleted.index) {
      return getSmallCircle(tempDeleted);
    } else if (index === list.tailIndex) {
      return TAIL;
    } else {
      return "";
    }
  }

  // добавить в head
  const handleAddHead = async () => {
    setClicked('add-h');

    const newItem = { value: values["value"], color: ElementStates.Changing };
    // добавляем во временное хранилище для отображения мини-кружка
    setTempAdded(itemWithNewIndex(newItem, 0));
    setCircles(list.array);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return; // если компонент размонтирован - прерываем ф-ю
    setTempAdded(null);
    list.prepend(itemWithNewColor(newItem, ElementStates.Modified)); // добавляем в список
    setCircles(list.array);
    
    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    list.array[0].color = ElementStates.Default;
    setCircles(list.array);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    clearForm();
    setClicked('');
  }
  // добавить в tail
  const handleAddTail = async () => {
    setClicked('add-t');

    const newItem = { value: values["value"], color: ElementStates.Changing };
    setTempAdded(itemWithNewIndex(newItem, list.listSize - 1));
    setCircles(list.array);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    setTempAdded(null);
    list.append(itemWithNewColor(newItem, ElementStates.Modified));
    setCircles(list.array);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    list.array[list.listSize - 1].color = ElementStates.Default;
    setCircles(list.array);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    clearForm();
    setClicked('');
  }
  // добавить по индексу
  const handleAddIndex = async () => {
    setClicked('add-i');

    const newItem = { value: values["value"], color: ElementStates.Changing };
    const ind = Number(values["ind"]);
    setTempAdded(itemWithNewIndex(newItem, ind));
    setCircles(list.array);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    setTempAdded(null);
    list.insertAt(itemWithNewColor(newItem, ElementStates.Modified), ind);
    setCircles(list.array);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    list.array[ind].color = ElementStates.Default;
    setCircles(list.array);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    clearForm();
    setClicked('');
  }

  // удалить из head
  const handleDeleteHead = async () => {
    setClicked('del-h');

    const arrBeforeDelete = list.array;
    const deletedItem = arrBeforeDelete[0];
    setTempDeleted(deletedItem 
      ? {...deletedItem, value: deletedItem?.value.toString(), color: ElementStates.Changing, index: 0}
      : null
    );
    arrBeforeDelete[0].value = "";
    setCircles(arrBeforeDelete);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    list.removeHead();
    setTempDeleted(null);
    setCircles(list.array);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    setClicked('');
  }
  // удалить из tail
  const handleDeleteTail = async () => {
    setClicked('del-t');

    const arrBeforeDelete = list.array;
    const deletedItem = arrBeforeDelete[list.listSize - 1];
    setTempDeleted(deletedItem 
      ? {...deletedItem, value: deletedItem?.value.toString(), color: ElementStates.Changing, index: list.listSize - 1} 
      : null
    );
    arrBeforeDelete[list.listSize - 1].value = "";
    setCircles(arrBeforeDelete);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    list.removeTail();
    setTempDeleted(null);
    setCircles(list.array);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    setClicked('');
  }
  // удалить по индексу
  const handleDeleteIndex = async () => {
    setClicked('del-i');

    const ind = Number(values["ind"]);
    const arrBeforeDelete = list.array;
    const deletedItem = arrBeforeDelete[ind];
    setTempDeleted(deletedItem 
      ? {...deletedItem, value: deletedItem?.value.toString(), color: ElementStates.Changing, index: ind} 
      : null
    );
    arrBeforeDelete[ind].value = "";
    setCircles(arrBeforeDelete);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    list.deleteAt(ind);
    setTempDeleted(null);
    setCircles(list.array);

    await setDelay(SHORT_DELAY_IN_MS);
    if (!isMounted.current) return;
    clearForm();
    setClicked('');
  }

  // проверка условий блокировки кнопки добавления по индексу
  const addByIndDisabledCondition = !values["value"] || !values["ind"] || Number(values["ind"]) < 0 || Number(values["ind"]) > list.listSize - 1 || list.listSize > 7;
  // проверка условий блокировки кнопки удаления по индексу
  const delByIndDisabledCondition = !values["ind"] || Number(values["ind"]) < 0 || Number(values["ind"]) > list.listSize - 1 || list.listSize < 1;

  // проверка, нажата ли любая кнопка кроме текущей
  const isClickedNotThisBtn = (btn: TClickedState) => {
    return !(isClicked === '' || isClicked === btn)
  }

  return (
    <SolutionLayout title="Связный список">

    <div className={styles.container}>
      <div>
        <Input disabled={isClicked !== ''}
          extraClass={`${styles.input} mb-6`} isLimitText={true} maxLength={4} name="value" 
          value={values['value']} onChange={onChange} placeholder="Введите значение" />
        <Input disabled={isClicked !== ''}
          extraClass={styles.input} name="ind" 
          value={values['ind']} onChange={onChange} placeholder="Введите индекс" type="number" />
      </div>
      
      <div className={styles.btns_box}>
        {/* ограничиваем максимальную длину списка до 8 эл-в */}
        <Button isLoader={isClicked === 'add-h'} 
          disabled={!values["value"] || list.listSize > 7 || isClickedNotThisBtn('add-h')} 
          extraClass={styles.btn1} text="Добавить в head" onClick={handleAddHead} />
        <Button isLoader={isClicked === 'add-t'} 
          disabled={!values["value"] || list.listSize > 7 || isClickedNotThisBtn('add-t')} 
          extraClass={styles.btn2} text="Добавить в tail" onClick={handleAddTail} />

        <Button isLoader={isClicked === 'add-i'} 
          disabled={addByIndDisabledCondition || isClickedNotThisBtn('add-i')} 
          extraClass={styles.btn3} text="Добавить по индексу" onClick={handleAddIndex} />
      </div>
      
      <div className={styles.btns_box}>
        <Button isLoader={isClicked === 'del-h'} 
          disabled={list.listSize < 1 || isClickedNotThisBtn('del-h')} 
          extraClass={styles.btn1} text="Удалить из head" onClick={handleDeleteHead} />
        <Button isLoader={isClicked === 'del-t'} 
          disabled={list.listSize < 1 || isClickedNotThisBtn('del-t')} 
          extraClass={styles.btn2} text="Удалить из tail" onClick={handleDeleteTail} />

        <Button isLoader={isClicked === 'del-i'} 
          disabled={delByIndDisabledCondition || isClickedNotThisBtn('del-i')} 
          extraClass={styles.btn3} text="Удалить по индексу" onClick={handleDeleteIndex} />
      </div>
    </div>

    <ul className={styles.list}>
      {circles.map((item, index) => 
        <li key={index} className={styles.item}>
          <Circle index={index} letter={item.value} state={item.color} 
          head={getHead(index)}
          tail={getTail(index)} />

          {/* стрелочка для всех элементов, кроме последнего */}
          { index !== (circles.length - 1) &&
            <ArrowIcon />}
        </li>
      )}
    </ul>
    
    </SolutionLayout>
  );
};
