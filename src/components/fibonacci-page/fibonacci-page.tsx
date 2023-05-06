import React, { useRef, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

interface IFibo {
  value: number;
  index: number;
  uuid: string;
}

export const FibonacciPage: React.FC = () => {

  // массив данных об элементах с числами Фибоначчи
  const [ arrayFibo, setArrayFibo ] = useState<IFibo[]>([]);
  // значение поля input
  const [ quantity, setQuantity ] = useState<number | null>(null);
  // состояние развертывания массива JSX-элементов с числами Фибоначчи
  const [ isFiboMading, setIsFiboMading ] = useState<boolean>(false);
  // состояние валидности поля input
  const [ isInputValid, setIsInputValid ] = useState<boolean>(false);


  // поиск поля input в DOM
  const input: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  useEffect(() => {
    input.current = document.querySelector('.input-in-container > .text_type_input');
  }, []);
  const getIsInputValid = () => {
    const stateInput = input && input.current ? input.current.validity.valid : false;
    setIsInputValid(stateInput);
  };

  // формирование массива данных об элементах с числами Фибоначчи
  useEffect(() => {
    if (quantity !== null) {
      setIsFiboMading(true);
      const getFibonacciNumbers = (quantity: number): void => {
        let array: IFibo[] = [];
        let beforPrev: number = 0, prev: number = 0;
        if (quantity !== null) {
          for (let i = 0; i <= quantity; i++) {
            if (i === 0) {
              beforPrev = 1;
            }
            const curr = beforPrev + prev;
            array.push(
              {
                value: curr,
                index: i,
                uuid: nanoid(),
              }
            );
            beforPrev = prev;
            prev = curr
          }
        }
        setArrayFibo(array);
      }

      let i = 0;
      setTimeout(() => {
        (function showArrayFiboIncrementally() {
          getFibonacciNumbers(i);
          if (i < quantity) {
            setTimeout(showArrayFiboIncrementally, SHORT_DELAY_IN_MS);
          } else {
            setIsFiboMading(false);
          }
          i++;
        })();
      }, SHORT_DELAY_IN_MS)
    }
  }, [quantity]);

  // получение значения из поля input
  const setNumber = () => {
    input.current !== null && setQuantity(Number(input.current.value));
  };

  // формирование массива JSX-элементов с числами Фибоначчи
  const elementsFibo = arrayFibo.length === 0 ? null : arrayFibo.map( item => {
    return (<Circle
      letter={String(item.value)}
      index={item.index}
      key={item.uuid}
      extraClass={styles.circle}
    />)
  });

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
    <div className={styles.elementsContainer}>
      <Input 
        placeholder="Введите число"
        max={19}
        type='number'
        isLimitText={true}
        extraClass={`${styles.input} input-in-container`}
        disabled={isFiboMading}
        onChange={getIsInputValid}
      />
      <Button 
        text='Рассчитать'
        onClick={setNumber}
        extraClass={styles.button}
        isLoader={isFiboMading}
        disabled={isFiboMading || !isInputValid}
      />
    </div>
    <div className={styles.numberContainer}>
      {elementsFibo && elementsFibo}      
    </div>
    </SolutionLayout>
  );
};