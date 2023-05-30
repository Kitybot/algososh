import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./string.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  // состояние для элементов строки
  const [invertedString, setInvertedString] = useState<Array<{string: string; state: ElementStates; key: string}>>([]);
  const [mark, setMark] = useState<boolean>(false);
  const [isStringInvert, setIsStringInvert] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [ isInputEmpty, setIsInputEmpty ] = useState<boolean>(true);
  const input = useRef(null);

  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };



  // разворот строки
  useEffect(() => {
    if (invertedString.length > 0) {
      setIsStringInvert(true);
      // если в строке только один элемент
      if (invertedString.length === 1) {
        setTimeout(() => {
          const newString = [{...invertedString[0]}];
          newString[0].state = ElementStates.Modified;
          setInvertedString(newString);
          setIsStringInvert(false);
        }, DELAY_IN_MS);
      } else {
        // количество элементов: четное - полный разворот; нечетное - всего кроме центра
        const middleString = invertedString.length / 2;
        let changedString = invertedString.map(item => ({...item}));
        const invert = (number: number): void => {
          let i = 0;
          // показ перемещаемых элементов
          setTimeout(function invert() {
            changedString = changedString.map(item => ({...item}));
            changedString[i].state = ElementStates.Changing;
            changedString[changedString.length - (i + 1)].state = ElementStates.Changing;
            setInvertedString(changedString);
            // перемещение элементов
            setTimeout(() => {
              changedString = changedString.map(item => ({...item}));
              const temp = changedString[i];
              changedString[i] = changedString[changedString.length - (i + 1)];
              changedString[changedString.length - (i + 1)] = temp;
              changedString[i].state = ElementStates.Modified;
              changedString[changedString.length - (i + 1)].state = ElementStates.Modified;
              setInvertedString(changedString);
              // повторный вызов функции, если необходимо
              if (i < number) {
                setTimeout(invert, DELAY_IN_MS)
              }
              // изменение центрального элемента у массива с нечетным количеством элементов
              if (i >= number && invertedString.length%2) {
                const middle = Math.ceil(middleString);
                setTimeout(() => {
                  changedString = changedString.map(item => ({...item}));
                  changedString[middle - 1].state = ElementStates.Modified;
                  setInvertedString(changedString);
                  setIsStringInvert(false);
                }, DELAY_IN_MS);
              }
              if (i >= number && invertedString.length%2 === 0) {
                setIsStringInvert(false);
              }
              i++;
            }, DELAY_IN_MS);
          }, DELAY_IN_MS);
        }
        invert(Math.trunc(middleString) - 1);
      }
    }
  }, [mark]);
  

  // формирование из введенной в input строки массива элементов строки
  const handleClick = () => {
    const newString = inputValue.split('').map(item => ({
      string: item,
      state: ElementStates.Default,
      key: nanoid(),
    }));
    setInvertedString(newString); 
    setMark(!mark); 
  };
  const stringInCircle = invertedString.length === 0 ? null : invertedString.map(item => {
    return (
      <Circle
        letter={item.string}
        state={item.state}
        extraClass={styles.extraCircle}
        key={item.key}
      />
    )
  });

  return (
    <SolutionLayout title="Строка">

      <div className={styles.elementsContainer}>
        <Input 
          placeholder="Введите текст"
          maxLength={11}
          isLimitText={true}
          extraClass={`${styles.input} input-in-container`}
          disabled={isStringInvert}
          value={inputValue} 
          onChange={handleChange}
        />
        <Button 
          text='Развернуть'
          onClick={handleClick}
          isLoader={isStringInvert}
          disabled={isStringInvert || isInputEmpty}
        />
      </div>
      <div className={styles.stringsContainer}>
        {stringInCircle && stringInCircle}
      </div>
    </SolutionLayout>
  );
};