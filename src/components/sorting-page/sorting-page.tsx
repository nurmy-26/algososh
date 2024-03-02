import React from "react";
import styles from "./sorting-page.module.css"
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { getRandomArr } from "../../utils/helpers";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { TClickedState, TColumn } from "./types";
import { makeBubbleSort, makeSelectionSort } from "./algorithm";


export const SortingPage: React.FC = () => {
  const [isClicked, setClicked] = React.useState<TClickedState>('');
  const [sortType, setSortType] = React.useState('selection');
  // state для отслеживания изменений в массиве и ререндера столбцов
  const [columns, setColumns] = React.useState<Array<TColumn>>([]);

  // выбор варианта сортировки
  const handleSelection = () => setSortType('selection');
  const handleBubble = () => setSortType('bubble');

  // по возрастанию
  const handleAscending = () => {
    setClicked('asc');

    if (sortType === 'selection') {
      makeSelectionSort(columns, setColumns, setClicked, 'min');
    } else {
      makeBubbleSort(columns, setColumns, setClicked, 'min');
    }
  }

  // по убыванию
  const handleDescending = () => {
    setClicked('desc');

    if (sortType === 'selection') {
      makeSelectionSort(columns, setColumns, setClicked, 'max');
    } else {
      makeBubbleSort(columns, setColumns, setClicked, 'max');
    }
  }

  // новый массив
  const handleNewArr = () => {
    const newArray = getRandomArr().map((number) => ({value: number, color: ElementStates.Default}));
    setColumns([...newArray]);
  }


  return (
    <SolutionLayout title="Сортировка массива">

    <div className={styles.container}>
      <div className={`${styles.field} ${styles.field_radio}`}>
        <RadioInput checked={sortType === 'selection'} disabled={isClicked !== ''} label="Выбор" name="sort" onChange={handleSelection} />
        <RadioInput checked={sortType === 'bubble'} disabled={isClicked !== ''} label="Пузырёк" name="sort" onChange={handleBubble} />
      </div>

      <div className={`${styles.field} ${styles.field_btn}`}>
        <Button isLoader={isClicked === 'asc'} disabled={isClicked === 'desc'} extraClass={styles.btn} text="По возрастанию" onClick={handleAscending} sorting={Direction.Ascending} />
        <Button isLoader={isClicked === 'desc'} disabled={isClicked === 'asc'} extraClass={styles.btn} text="По убыванию" onClick={handleDescending} sorting={Direction.Descending} />
      </div>

      <Button disabled={isClicked !== ''} extraClass={styles.btn} text="Новый массив" onClick={handleNewArr} /> 
    </div>

    <ul className={styles.columns}>
      {columns.map((item, index) => 
        <li key={index}>
          <Column index={item.value} state={item.color} />
        </li>
      )}
    </ul>
     
    </SolutionLayout>
  );
};
