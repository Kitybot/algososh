import React, { FormEvent, useState, MouseEvent, Dispatch } from "react";
import styles from './sorting-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { INumbersArray } from "../../types/components-Types";
import { DELAY_IN_MS } from "../../utils/constants/delays";
import { setAnimation, swap } from "../../utils/utils";

export const SortingPage: React.FC = () => {

  const [loaderAscending, setLoaderAscending] = useState(false);
  const [loaderDescending, setLoaderDescending] = useState(false);
  const [diasbleState, setDiasbleState] = useState(false);

  const [array, setArray] = useState<INumbersArray[]>([]);
  const [sortingType, setSortingType] = useState<Direction>();
  const [sortingMethod, setSortingMethod] = useState('sorting');

  const randomArr = () => {
    let arr: INumbersArray[] = [];
    let count = Math.floor(Math.random() * (17 - 3) + 3);

    for(let i = 0; i < count; i++) {
      arr.push({
        num: Math.round(Math.random() * (100 - 0) + 0),
        state: ElementStates.Default
      });
    };
    setArray(arr);
  };

  const handleRandomArrayGenerate = (evt: FormEvent) => {
    evt.preventDefault();
    randomArr();
  };

  // сортировка выбором
  const ascendingChoosing: string = 'arr[i].num > arr[j].num';
  const descendingChoosing: string = 'arr[i].num < arr[j].num';

  const getSelectionSort = async (arr:  INumbersArray[], type: string, 
    loader: Dispatch<React.SetStateAction<boolean>>) => {
    loader(true);
    setDiasbleState(true);

    for(let i = 0; i < arr.length; i++) {
      for(let j = i; j < arr.length; j++) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        setArray([...arr]);
        await setAnimation(DELAY_IN_MS);
        if(eval(type)) {
          arr[j].state = ElementStates.Changing;
          swap(arr, i, j);
        };
        arr[j].state = ElementStates.Default;
        arr[i].state = ElementStates.Modified;
        setArray([...arr]);
      };
    };

    loader(false);
    setDiasbleState(false);
    return setArray(arr);
  };
  

   // сортировка пузырьком
   const ascendingBubble: string = 'arr[i].num > arr[i + 1].num';
   const descendingBubble: string = 'arr[i].num < arr[i + 1].num';
 
   const getBubbleSort = async (arr: INumbersArray[], type: string,
  loader: Dispatch<React.SetStateAction<boolean>>) => {
    loader(true);
    setDiasbleState(true);

     for (let j = 0; j < arr.length; j++) {
        for (let i = 0; i < arr.length - j - 1; i++) {
          arr[i].state = ElementStates.Changing;
          arr[i + 1].state = ElementStates.Changing;
          setArray(array);
          await setAnimation(DELAY_IN_MS);
          if (eval(type)) {
            swap(arr, i, i + 1);
          };
          arr[i].state = ElementStates.Default;
          arr[i + 1].state = ElementStates.Default;
            setArray([...arr]);
        }
        arr[arr.length - j - 1].state = ElementStates.Modified;
        setArray([...arr]);
        await setAnimation(DELAY_IN_MS);
     };

     loader(false);
     setDiasbleState(false);
     return setArray(arr);
   };

  const handleAscendingSort = (evt: MouseEvent) => {
    evt.preventDefault();
    setSortingType(Direction.Ascending);
    if(sortingMethod === 'sorting') {
      getSelectionSort(array, ascendingChoosing, setLoaderAscending);
    } else if (sortingMethod === 'bubble') {
      getBubbleSort(array, ascendingBubble, setLoaderAscending)
    };
  };

  const handleDescendingSort = (evt: MouseEvent) => {
    evt.preventDefault();
    setSortingType(Direction.Descending);
    if(sortingMethod === 'sorting') {
      getSelectionSort(array, descendingChoosing, setLoaderDescending)
    } else if (sortingMethod === 'bubble') {
      getBubbleSort(array, descendingBubble, setLoaderDescending)
    };
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={`${styles.form}`} onSubmit={handleRandomArrayGenerate}>
        <div className={styles.radioSet}>
          <RadioInput 
            label="Выбор" 
            extraClass="mt-10" 
            name="radio" 
            value="sorting" 
            defaultChecked
            onChange={() => setSortingMethod('sorting')} 
            disabled={diasbleState}/> 
          <RadioInput 
            label="Пузырёк" 
            extraClass="mt-10" 
            name="radio" 
            value="bubble"
            onChange={() => setSortingMethod('bubble')} 
            disabled={diasbleState}/>
        </div>
        <div className={styles.adjustmentSet}>
          <Button 
            text={'По возрастанию'} 
            sorting={Direction.Ascending} 
            disabled={diasbleState}
            onClick={handleAscendingSort} 
            isLoader={loaderAscending} 
            extraClass={styles.button}/>
          <Button 
            text={'По убыванию'} 
            sorting={Direction.Descending} 
            disabled={diasbleState}
            onClick={handleDescendingSort} 
            isLoader={loaderDescending} 
            extraClass={styles.button}/>
        </div>
        <Button 
          text={'Новый массив'} 
          type='submit' 
          disabled={diasbleState}/>
      </form>
      <ul className={styles.columnSet}>

        { array && (
          array.map((number, index) => {
            return (
              <li key={index} className={styles.column}>
                <Column 
                  index={number.num}  
                  state={number.state}/>
              </li>
            )
          })
        )}

      </ul>
    </SolutionLayout>
  );
};