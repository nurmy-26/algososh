import React, { useState } from "react";
import styles from "./sorting-page.module.css"
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import useMounted from "../../utils/hooks/useMounted";
import { getRandomArr, setDelay } from "../../utils/helpers";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { SortTypes, ClickedState, TStep } from "./types";
import { makeBubbleSortSteps, makeSelectionSortSteps } from "./algorithm";


export const SortingPage: React.FC = () => {
  const isMounted = useMounted();
  const [isClicked, setClicked] = useState<ClickedState>(ClickedState.EMPTY);
  const [sortType, setSortType] = useState('selection');
  // при открытии страницы генерируется случайный массив
  const initialColumns = getRandomArr();
  // state для отслеживания изменений в массиве и ререндера столбцов
  const [columns, setColumns] = useState<Array<number>>(initialColumns);
  const initialStep = {
    trav1: -1,
    trav2: -1,
    sorted: [],
    arr: []
  }
  const [step, setStep] = useState<TStep>(initialStep); // для изменения цвета на каждом шаге

  // выбор варианта сортировки
  const handleSelection = () => setSortType('selection');
  const handleBubble = () => setSortType('bubble');

  // по возрастанию
  const handleAscending = async () => {
    setClicked(ClickedState.ASC);
    let stepList: TStep[] = [];
    setStep(initialStep); // для сброса шага при повторном запуске

    // с помощью алгоритма получаем массив шагов (снапшоты между свапами)
    if (sortType === 'selection') {
      stepList = makeSelectionSortSteps(columns, SortTypes.Min);
    } else {
      stepList = makeBubbleSortSteps(columns, SortTypes.Min);
    }
    
    // рендерим столбцы, проходя по массиву шагов с задержкой
    for (let i = 0; i < stepList.length; i++) {
      setColumns([...stepList[i].arr]);
      // и обновляем state шага для корректного изменения цвета столбцов
      setStep({...stepList[i]});

      await setDelay(SHORT_DELAY_IN_MS);
      if (!isMounted.current) return; // если компонент размонтирован - прерываем ф-ю
    }

    setClicked(ClickedState.EMPTY);
  }

  // по убыванию
  const handleDescending = async () => {
    setClicked(ClickedState.DESC);
    let stepList: TStep[] = [];
    setStep(initialStep);

    if (sortType === 'selection') {
      stepList = makeSelectionSortSteps(columns, SortTypes.Max);
    } else {
      stepList = makeBubbleSortSteps(columns, SortTypes.Max);
    }

    for (let i = 0; i < stepList.length; i++) {
      setColumns([...stepList[i].arr]);
      setStep({...stepList[i]});

      await setDelay(SHORT_DELAY_IN_MS);
      if (!isMounted.current) return;
    }

    setClicked(ClickedState.EMPTY);
  }

  // новый массив
  const handleNewArr = () => {
    setStep(initialStep);
    // создаем рандомный массив значений
    const newArray = getRandomArr().map(number => number);
    setColumns([...newArray]);
  }

  // вместо перезаписи цвета на каждом шаге цвет будет вычисляться в зависимости от условий
  const getColor = (index: number) => {
    // розовый - для trav1 и trav2 элементов на каждом шаге
    return (index === step.trav1 || index === step.trav2) ? ElementStates.Changing 
      // зеленый - для уже измененных
      : (step.sorted.includes(index)) ? ElementStates.Modified 
      // все остальные - дефолтный цвет
      : ElementStates.Default;
  }


  return (
    <SolutionLayout title="Сортировка массива">

    <div className={styles.container}>
      <div className={`${styles.field} ${styles.field_radio}`}>
        <RadioInput checked={sortType === 'selection'} disabled={isClicked !== ClickedState.EMPTY} label="Выбор" name="sort" onChange={handleSelection} />
        <RadioInput checked={sortType === 'bubble'} disabled={isClicked !== ClickedState.EMPTY} label="Пузырёк" name="sort" onChange={handleBubble} />
      </div>

      <div className={`${styles.field} ${styles.field_btn}`}>
        <Button isLoader={isClicked === ClickedState.ASC} disabled={isClicked === ClickedState.DESC} extraClass={styles.btn} text="По возрастанию" onClick={handleAscending} sorting={Direction.Ascending} />
        <Button isLoader={isClicked === ClickedState.DESC} disabled={isClicked === ClickedState.ASC} extraClass={styles.btn} text="По убыванию" onClick={handleDescending} sorting={Direction.Descending} />
      </div>

      <Button disabled={isClicked !== ClickedState.EMPTY} extraClass={styles.btn} text="Новый массив" onClick={handleNewArr} /> 
    </div>

    <ul className={styles.columns}>
      {columns.map((item, index) => 
        <li key={index}>
          <Column index={item} state={getColor(index)} />
        </li>
      )}
    </ul>
     
    </SolutionLayout>
  );
};
