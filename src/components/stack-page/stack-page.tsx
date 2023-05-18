import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack";
import styles from './stack-page.module.css';

export const StackPage: React.FC = () => {
  const [value, setValue] = useState<string>('');
  let [array, setArray] = useState<any[]>([]);
  const [isShownTimeout, setIsShownTimeout] = useState<string>('');

  const st = new Stack<string>(array);

  const delay = (delay: number) => new Promise((resolve) => setInterval(resolve, delay));


  const addItem = async(value: string) => {
    
    setIsShownTimeout('0')
    await delay(500)
    setArray([st?.push(value)]);
    setArray([...array]);
    setValue('')
    setIsShownTimeout('')
  }
  const delItem = async () => {
    setIsShownTimeout('1')
    await delay(500)
    setArray([st?.pop()]);
    setArray([...array]);
    setIsShownTimeout('')
  }
  const clear = async() => {
    setIsShownTimeout('2')
    await delay(500)
    setArray([array.splice(0, array.length)]);
    setArray([...array]);
    setIsShownTimeout('')
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.input}>
        <Input
          isLimitText={true}
          maxLength={4}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          type="text" value={value}
          extraClass={`${styles.inputStack}`}
        />
        <Button
          text='Добавить'
          onClick={() => addItem(value)}
          disabled={value ? false : true}
          isLoader={isShownTimeout === '0'}
        />
        <Button
          isLoader={isShownTimeout === '1'}
          text='Удалить'
          onClick={delItem}
          disabled={array.length ? false : true}
        />
        <Button
          isLoader={isShownTimeout === '2'}
          text='Очистить'
          onClick={clear}
          extraClass={`${styles.btnNewArr} ${styles.btn}`}
          disabled={array.length ? false : true}
        />
      </div>
      <ul className={styles.circle}>
          {array?.map((item, index: number) => {
            return (
              <li key={index}>< Circle
                head={array.length - 1 === index ? "top" : ''}
                letter={item}
                key={index}
                index={index}
                /* state={index === currentIndex ? 'changing' : 'default'} */ />
              </li>
            )
          })}
        </ul>
    </SolutionLayout>
  );
};