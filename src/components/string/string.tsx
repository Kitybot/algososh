import React, { useState, useEffect, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./string.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

interface IStringElement{
  string: string;
  state: ElementStates;
  key: string;
}

export const ChildrenOfStringComponent: React.FC = () => {
  // состояние для элементов строки
  const [ mark, setMark ] = useState<boolean>(false);
  const [ invertedString, setInvertedString ] = useState<IStringElement[]>([]);
  const [ isStringInvert, setIsStringInvert ] = useState<boolean>(false);
  const [ isInputEmpty, setIsInputEmpty ] = useState<boolean>(true);

  // поиск поля input в DOM
  const input: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  useEffect(() => {
    input.current = document.querySelector('.input-in-container > .text_type_input');
  }, []);

  // отключение кнопки разворота строки, если в поле вводе нет значения, и наоборот
  const controlInputValue = () => {
    if (input.current) {
      if (input.current.value.length === 0 && isInputEmpty === false) {
        setIsInputEmpty(true);
      } else if (input.current.value.length > 0 && isInputEmpty === true) {
        setIsInputEmpty(false);
      }
    }
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
  const useTextInput = () => {
    if (input.current !== null) {
      const newString = input.current.value.split('').map(item => ({
        string: item,
        state: ElementStates.Default,
        key: nanoid(),
      }));
      setInvertedString(newString);
      setMark(!mark);
    }
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
    <>
      <div className={styles.elementsContainer}>
        <Input 
          maxLength={11}
          isLimitText={true}
          extraClass={`${styles.input} input-in-container`}
          disabled={isStringInvert}
          onChange={controlInputValue}
        />
        <Button 
          text='Развернуть'
          onClick={useTextInput}
          isLoader={isStringInvert}
          disabled={isStringInvert || isInputEmpty}
        />
      </div>
      <div className={styles.stringsContainer}>
        {stringInCircle && stringInCircle}
      </div>
    </>
  );
};

export const StringComponent: React.FC = () => {

  return (
    <SolutionLayout title="Строка">
      <ChildrenOfStringComponent />
    </SolutionLayout>
  );
};