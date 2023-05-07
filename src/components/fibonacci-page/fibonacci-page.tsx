import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from './fibonacci-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { setAnimation } from "../../utils/utils";

export const FibonacciPage: React.FC = () => {

  const [loader, setLoader] = useState(false);
  const [buttonState, setButtonState] = useState(true);

  const [array, setArray] = useState<number[]>([]);
  const [value, setValue] = useState('');

  const handleChangeValue = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const value = Number(evt.target.value);
    setValue(String(value));
   if(value <= 19 && value >= 1) {
    setButtonState(false);
   } else {
    setButtonState(true);
   };
  }; 

  const  getFibonacciNumbers = async (number: number) => {
    setLoader(true);

    const array: number [] = [];
    for(let i = 0; i < number + 1; i++) {
      if (i === 0 || i === 1) {
        array.push(1);
      } else {
        array.push(array[i - 2] + array[i - 1]);
      };
      setArray([...array]);
      await setAnimation(SHORT_DELAY_IN_MS);
    };

    setLoader(false);
  };

  const handleShowSequence = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setValue('');
    const form = evt.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      numberInput: HTMLInputElement;
    };

    const number = Number(formElements.numberInput.value);
    getFibonacciNumbers(number);
    setButtonState(true);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={styles.form} onSubmit={handleShowSequence}> 
        <div className={styles.input}>
          <Input 
            type='number' 
            name='numberInput' 
            onChange={handleChangeValue} 
            isLimitText={true} 
            maxLength={2} 
            max={19} 
            value={value}/>
          <Button 
            text={'Рассчитать'} 
            type='submit' 
            disabled={buttonState}
            isLoader={loader}/>
        </div>
      </form>
      <ul className={styles.list}> 

        { array && (
          array.map((number, index) => {
            return (
              <li key={index}>
                <Circle 
                  letter={String(number)} 
                  index={index}/>
              </li>
            )
          })
        )}

      </ul>
    </SolutionLayout>
  )};