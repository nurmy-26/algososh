import React, { useState } from "react";
import styles from "./string.module.css"
import { ElementStates } from "../../types/element-states";
import useMounted from "../../utils/hooks/useMounted";
import useForm from "../../utils/hooks/useForm";
import useLoading from "../../utils/hooks/useLoading";
import { setDelay } from "../../utils/helpers";
import { DELAY_IN_MS } from "../../utils/constants/delays";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import getReversedStringStepArrays from "./algorithm";


export const StringComponent: React.FC = () => {
  const isMounted = useMounted();
  const { values, onChange } = useForm({ 'string': ''});
  const { isLoading, setLoading } = useLoading(false);
  // state для отслеживания изменений в массиве и ререндера кругов
  const [circles, setCircles] = useState<Array<string>>([]);
  const [step, setStep] = useState(0);

  const handleClick = async () => {
    setLoading(true);

    // с помощью алгоритма получаем массив шагов (снапшоты строки между свапами)
    const stepList = getReversedStringStepArrays(values["string"]);
    setStep(0); // для сброса счетчика при повторном запуске

    // исп-ть step для while step < stepList.length не получится, так как setState не меняет состояние использующегося кода
    for (let i = 0; i < stepList.length; i++) {
      // рендерим круги, проходя по массиву шагов с задержкой
      setCircles([...stepList[i]]);

      await setDelay(DELAY_IN_MS);
      if (!isMounted.current) return; // если компонент размонтирован - прерываем ф-ю
      setStep(prevStep => prevStep + 1);
    }

    setLoading(false);
  }

  // вместо перезаписи цвета на каждом шаге цвет будет вычисляться в зависимости от условий
  const getCircleColor = (index: number, maxIndex: number) => {
    // зеленый - для уже измененных
    return (index < step || index > (maxIndex - step)) ? ElementStates.Modified 
      // розовый - для start и end элементов на каждом шаге
      : (index === step || index === (maxIndex - step)) ? ElementStates.Changing 
      // все остальные - дефолтный цвет
      : ElementStates.Default;
  }

  
  return (
    <SolutionLayout title="Строка">

    <div className={styles.container}>
      <Input isLimitText={true} maxLength={11} name="string" value={values['string']} onChange={onChange} />
      <Button isLoader={isLoading} disabled={!values["string"]} extraClass={styles.btn} text="Развернуть" onClick={handleClick} /> 
    </div>

    <ul data-cy="list" className={styles.string}>
      {circles.map((item, index) => 
        <li key={index}>
          <Circle letter={item} state={getCircleColor(index, circles.length - 1)} />
        </li>
      )}
    </ul>
    
    </SolutionLayout>
  );
};
