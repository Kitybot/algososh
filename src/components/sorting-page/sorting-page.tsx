import React, { useState, useLayoutEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { nanoid } from "nanoid";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

interface INumberArray {
  number: number;
  state: ElementStates;
  uuid: string;
}

interface IIsSorting {
  state: boolean;
  method: string;
}
export type TNumber = Array<{
  number: number
  color: string
  
}>

export const SortingPage: React.FC = () => {

  // данные об элементах-колонках в сортируемом-массиве
  const [ numberArray, setNumberArray ] = useState<INumberArray[]>([]);
  // выбранный метод сортировки
  const [ isMethodChoice, setIsMethodChoice ] = useState<boolean>(true);
  // состояние процесса сортировки
  const [ isSorting, setIsSorting ] = useState<IIsSorting>({state: false, method:''});
  const [loader, setLoader] = useState<string>('');
  // формирование данных о массиве для сортировки
  const getNewArray = () => {
    const quantity = Math.round((Math.random() * 14) + 3);
    setLoader('2')
    const array: INumberArray[] = [];
    for (let i = 1; i <= quantity; i++) {
      array.push({
        number: Math.round((Math.random() * 100)),
        state: ElementStates.Default,
        uuid: nanoid(),
      });
    }
    setNumberArray(array);
    setLoader('')
  };
  useLayoutEffect(() => {
    getNewArray();
  }, []);

  // формирование массива для сортировки
  const colunmsArray = numberArray.map(item => 
    <Column 
      index={item.number}
      state={item.state}
      extraClass={styles.column}
      key={item.uuid}
    />
  );

  // смена метода сортировки
  const changeMethod = () => {
    setIsMethodChoice(!isMethodChoice);
  };

  // сортировка
  // глубокое копирование массива с данными об элементах-колонках
  function madeNewArray(datasArray: INumberArray[], changeColor: boolean = false) {
    const array: INumberArray[] = [];
    for (let i = 0; i < datasArray.length; i++) {
      array[i] = {...datasArray[i]}
      if (changeColor) {
        array[i].state = ElementStates.Default;
      }
    }
    return array;
  }

  // восстановление цвета, если новая сортировка после предыдущей без смены массива
  function restoreColorColumns(datasArray: INumberArray[]) {
    const newArray = madeNewArray(datasArray, true);
    setNumberArray(newArray);
    return newArray
  }

  // сортировка пузырьком
  const sortArrayBubble = (direction: string) => {
    setIsSorting({state: true, method: direction});
    // переменная с актуальным значением массива данных об элементах-колонках
    let datasArray = numberArray;
    // переменная с информацией о том, были ли изменения при последней итерации
    let isChangeInLastIteration = true;
    // переменная с номером итерации
    let numberIteration = 1;

    // операции при сравнении двух соседних колонок
    function miniSort(first: number, second: number): void {
      const newArray = madeNewArray(datasArray);
      newArray[first].state = ElementStates.Changing;
      newArray[second].state = ElementStates.Changing;
      if ((direction === "ascending" && newArray[first].number >= newArray[second].number) ||
          (direction === "descending" && newArray[first].number <= newArray[second].number)){
        const temp = newArray[first];
        newArray[first] = newArray[second];
        newArray[second] = temp;
        isChangeInLastIteration = true;
      }
      if (first !== 0) {
        newArray[first-1].state = ElementStates.Default;
      }
      setNumberArray(newArray);
      datasArray = newArray;
    }

    // фиксирование позиции последней колонки после последнего сравнения
    function fixPosition(lastColumnNumber: number): void {
      const newArray = madeNewArray(datasArray);
      newArray[lastColumnNumber - 1].state = ElementStates.Default;
      newArray[lastColumnNumber].state = ElementStates.Modified;
      setNumberArray(newArray);
      datasArray = newArray;
    }

    // фиксирование позиций оставшихся колонок, когда последняя интерация ничего не изменила
    function fixLastColunms(lastColumnNumber: number): void {
      const newArray = madeNewArray(datasArray);
      for (let i = 0; i <= lastColumnNumber - 1; i++){
        newArray[i].state = ElementStates.Modified;
      }
      setNumberArray(newArray);
      datasArray = newArray;
    }

    // сортировка массива
    if (datasArray[0].state === ElementStates.Modified) {
      datasArray = restoreColorColumns(datasArray);
    }
    setTimeout(() => {
      // итерация (один проход по всему массиву)
      (function iteration() {
        isChangeInLastIteration = false;
        const lastColumnNumber = datasArray.length - numberIteration;
        let firstColumn = 0;
        // сравнение соседних колонок
        setTimeout(function miniIteration() {
          const secondColumn = firstColumn + 1;
          miniSort(firstColumn, secondColumn);
          // определение необходимости далее сравнивать колонки
          if (secondColumn < lastColumnNumber) {
            setTimeout(() => {
              miniIteration();
              // определение необходимости фиксировать последнюю колонку
              if(secondColumn + 1 === lastColumnNumber) {
                setTimeout(() => {
                  fixPosition(lastColumnNumber);
                  // выбираем: новая итерация или фиксация оставшихся слева колонок
                  if (numberIteration < datasArray.length && 
                    isChangeInLastIteration === true) {
                    setTimeout(iteration, SHORT_DELAY_IN_MS);
                  } 
                  if (isChangeInLastIteration === false) {
                    setTimeout(() => {
                      fixLastColunms(lastColumnNumber);
                      setIsSorting({state: false, method:''});
                    }, SHORT_DELAY_IN_MS);
                  }
                }, SHORT_DELAY_IN_MS);
              }
            }, SHORT_DELAY_IN_MS);
          } else if (lastColumnNumber === 1) {
            setTimeout(() => {
              fixLastColunms(lastColumnNumber + 1);
              setIsSorting({state: false, method:''});
            }, SHORT_DELAY_IN_MS);
          }
          firstColumn++;
        });
        numberIteration++;
      })()
    }, SHORT_DELAY_IN_MS);
  }

  // сортировка выбором
  const sortArrayChoice = (direction: string): void => {
    // перевод кнопок в нерабочее состояние на время сортировки
    setIsSorting({state: true, method: direction});
    // переменная с актуальным значением массива данных об элементах-колонках
    let datasArray = numberArray;
    datasArray = madeNewArray(datasArray);
    // перменная с номером последнего индекса массива
    const lastIndex = datasArray.length - 1;
    // сортировка
    if (datasArray[0].state === ElementStates.Modified) {
      datasArray = restoreColorColumns(datasArray);
    }
    setTimeout(
      // один проход по всему массиву. Параметр функции - номер начального индекса в итерации
      function iteration(currentIndex: number = 0) {
        // выделение цветом колонки с начальным индексом
        datasArray[currentIndex].state = ElementStates.Changing;
        setNumberArray(datasArray);
        // перменная с индексом второй колонки, с которой сравниваем
        let comparisonIndex = currentIndex + 1;
        // индекс колонки с искомым значением (самым большим или маленьким из найденных)
        let valueIndex = currentIndex;
        // операции сравнения значений колонок и его последствия от результата
        setTimeout(function miniIteration() {
          // визуализация перехода от одной колонки к другой для сравнения их значения
          datasArray = madeNewArray(datasArray);
          datasArray[comparisonIndex].state = datasArray && ElementStates.Changing;
          if (comparisonIndex - 1 > currentIndex) {
            datasArray[comparisonIndex - 1].state = ElementStates.Default;
          }
          setNumberArray(datasArray);
          // сравнение значений колнок с индексами valueIndex и comparisonIndex
          if ((direction === "ascending" && 
              datasArray[comparisonIndex].number < datasArray[valueIndex].number) || 
              (direction === "descending" && 
              datasArray[comparisonIndex].number > datasArray[valueIndex].number)) {
            valueIndex = comparisonIndex;
          }
          // определение необходимости в новой миниитерации (просмотрены ли все значения)
          if (comparisonIndex < lastIndex) {
            setTimeout(miniIteration, SHORT_DELAY_IN_MS);
          }
          // фиксация результата после окончания одного прохода по массиву
          if (comparisonIndex === lastIndex) {
            setTimeout(() => {
              datasArray = madeNewArray(datasArray);
              // перемещение элемента с искомым значением, если им не является начальный элемент
              if (currentIndex !== valueIndex) {
                const temp = datasArray[valueIndex];
                datasArray[valueIndex] = datasArray[currentIndex];
                datasArray[currentIndex] = temp;
                datasArray[valueIndex].state = ElementStates.Default;
              }
              // фиксация цветом результата прохода по элементу
              datasArray[currentIndex].state = ElementStates.Modified;
              datasArray[lastIndex].state = ElementStates.Default;
              setNumberArray(datasArray);
              // определение необходимости в новом проходе по незафикисрованной части массива
              if (currentIndex < lastIndex -1 ) {
                setTimeout(() => {iteration(currentIndex + 1)});
              } else {
                // фиксация цветом последней колонки, если новый проход по массиву не нужен
                setTimeout(() => {
                  datasArray = madeNewArray(datasArray);
                  datasArray[lastIndex].state = ElementStates.Modified;
                  setNumberArray(datasArray);
                  // перевод кнопок в рабочее состояние после окончания сортировки
                  setIsSorting({state: false, method:''});
                }, SHORT_DELAY_IN_MS);
              }
            }, SHORT_DELAY_IN_MS);
          }
          comparisonIndex++;
        }, SHORT_DELAY_IN_MS);
      }
    );
  }

  const sortArray = (direction: string) => {
    if (isMethodChoice) {
      sortArrayChoice(direction)
    } else {
      sortArrayBubble(direction);
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">

      <div className={styles.controlContainer}>
        <RadioInput
          label="Выбор"
          name="method"
          value="choice"
          extraClass={styles.radioInput}
          defaultChecked={isMethodChoice}
          onClick={changeMethod}
          disabled={isSorting.state}
        />
        <RadioInput
          label="Пузырёк"
          name="method"
          value="bubble"
          extraClass={styles.radioInput}
          defaultChecked={!isMethodChoice}
          onClick={changeMethod}
          disabled={isSorting.state}
        />
        <Button 
          type="button"
          text="По возрастанию"
          sorting={Direction.Ascending}
          extraClass={styles.button}
          onClick={() => {
            sortArray("ascending")
          }}
          isLoader={isSorting.method === "ascending"}
          disabled={isSorting.state}
        />
        <Button 
          type="button"
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass={styles.button}
          onClick={() => {
            sortArray("descending")
          }}
          isLoader={isSorting.method === "descending"}
          disabled={isSorting.state}
        />
        <Button 
          type="button"
          text="Новый массив"
          extraClass={styles.button}
          onClick={getNewArray}
          disabled={isSorting.state}
          isLoader={loader === '2'? true: false}
        />
      </div>
      <div className={styles.columnsContainer}>
        {numberArray.length > 0 && colunmsArray}
      </div>
    </SolutionLayout>
  );
};