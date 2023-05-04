import React, { ChangeEvent, useMemo, useState } from "react";
import styles from './list-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { IListSymbols} from "../../types/components-Types";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./linkedListNode";
import { setAnimation, randomArr } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";

export const ListPage: React.FC = () => {

  const initialList: IListSymbols[] = randomArr().map(symbol => ({
    symbol: symbol,
    state: ElementStates.Default,
    head: null,
    tail: null,
  }));

  const list = useMemo(() => new LinkedList<string>(randomArr()), []);


  const [value, setValue] = useState(''); 
  const [ind, setInd] = useState(''); 
  const [array, setArray] = useState<IListSymbols[]>(initialList); 

  const [addHeadLoader, setAddHeadLoader] = useState(false); 
  const [addTailLoader, setAddTailLoader] = useState(false); 
  const [deleteHeadLoader, setDeleteHeadLoader] = useState(false); 
  const [deleteTailLoader, setDeleteTailLoader] = useState(false); 

  const [valueButtonState, setValueButtonState] = useState(true);
  const [indButtonState, setIndButtonState] = useState(true);

  const [addByIdx, setAddByIdx] = useState(false); 
  const [deleteByIdx, setDeleteByIdx] = useState(false); 

  const handleChangeInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const value = evt.currentTarget.value;
    value ? setValueButtonState(false) : setValueButtonState(true);
    setValue(value);
  };

  const handleChangeInputInd = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const value = evt.currentTarget.value;
    value ? setIndButtonState(false) : setIndButtonState(true);
    const numValue = Number(evt.currentTarget.value);
    if(numValue < 0 || numValue > array.length - 1) {
      setIndButtonState(true);
    };
    setInd(value);
  };

  const handleAddHead = async () => {
    setAddHeadLoader(true);
    setValueButtonState(true);

    array[0].head = null;
    array[0].smallCircle = {
      symbol: value,
    };
    setArray([...array]);
    await setAnimation(SHORT_DELAY_IN_MS);
    array[0].smallCircle = undefined;

    list.prepend(value);
    array.unshift({
      symbol: value,
      state: ElementStates.Modified,
    });
    setArray([...array]);
    await setAnimation(SHORT_DELAY_IN_MS);
    array[0].state = ElementStates.Default;
    setArray([...array]);

    setValue('');
    setAddHeadLoader(false);
    setValueButtonState(true);
  };

  const handleAddTail = async () => {
    setAddTailLoader(true);
    setValueButtonState(true);

    array[array.length - 1].smallCircle = {
      symbol: value,
    };
    setArray([...array]);
    await setAnimation(SHORT_DELAY_IN_MS);
    array[array.length - 1].smallCircle = undefined;

    list.append(value);
    array.push({
      symbol: value,
      state: ElementStates.Modified,
    });
    setArray([...array]);
    await setAnimation(SHORT_DELAY_IN_MS);
    array[array.length - 1].state = ElementStates.Default;
    setArray([...array]);

    setValue('');
    setAddTailLoader(false);
    setValueButtonState(true);
  };

  const handleDeleteHead = async() => {
    setDeleteHeadLoader(true);
    setValueButtonState(true);

    if(!list.getHead()) {
      throw new Error ('List is empty');
    } else {
      array[0].smallCircle = {
        symbol: array[0].symbol,
      };
      array[0].symbol = '';
      setArray([...array]);
      await setAnimation(SHORT_DELAY_IN_MS);

      list.deleteHead();
      array.shift();
    };
    setArray([...array]);

    setDeleteHeadLoader(false);
    setValueButtonState(false);
  };

  const handleDeleteTail = async () => {
    setDeleteTailLoader(true);
    setValueButtonState(true);

    if(!list.getHead()) {
      throw new Error ('List is empty');
    } else {
      array[array.length - 1].smallCircle = {
        symbol: array[array.length - 1].symbol,
      };
      array[array.length - 1].symbol = '';
      setArray([...array]);
      await setAnimation(SHORT_DELAY_IN_MS);

      list.deleteTail();
      array.pop();
    };
    setArray([...array]);

    setDeleteTailLoader(false);
    setValueButtonState(false);
  };


  const handleAddByIndex = async () => {
    setAddByIdx(true);
    setIndButtonState(true);
    setValueButtonState(true);

    let index = Number(ind);
    list.addByIndex(value, index);
    for(let i = 0; i < index; i++) {
      array[i].state = ElementStates.Changing;
      await setAnimation(SHORT_DELAY_IN_MS);
      setArray([...array])
    };
    await setAnimation(SHORT_DELAY_IN_MS);

    array[index].smallCircle = {
      symbol: value,
    };
    setArray([...array]);
    await setAnimation(SHORT_DELAY_IN_MS);

    array[index].smallCircle = undefined;
    array.splice(index, 0, { symbol: value, state: ElementStates.Modified});
    setArray([...array]);
    array.map((num: IListSymbols) => {
      return num.state = ElementStates.Default;
    });
    await setAnimation(SHORT_DELAY_IN_MS);

    setInd('');
    setValue('');
    setAddByIdx(false);
    setIndButtonState(true);
    setValueButtonState(true);
  };

  const handleDeleteByIndex = async () => {
    setDeleteByIdx(true);
    setIndButtonState(true);

    let index = Number(ind);
    list.deleteByIndex(index);
    for(let i = 0; i < index; i++) {
      array[i].state = ElementStates.Changing;
      await setAnimation(SHORT_DELAY_IN_MS);
      setArray([...array]);
    };
    await setAnimation(2000);

    array[index].smallCircle = {
      symbol: array[index].symbol,
    };
    array[index].symbol = '';  
    setArray([...array]);
    await setAnimation(SHORT_DELAY_IN_MS);

    array[index].smallCircle = undefined;
    array.splice(index, 1);
    setArray([...array]);
    array.map((num: IListSymbols) => {
      return num.state = ElementStates.Default;
    });
    await setAnimation(SHORT_DELAY_IN_MS);

    setInd('');
    setValue('');
    setDeleteByIdx(false);
    setIndButtonState(true);
   };

  return (
    <SolutionLayout title="Связный список">
      <div> 
        <div className={styles.set}>
          <Input 
            isLimitText={true} 
            maxLength={4} 
            placeholder={"Введите значение"}
            extraClass={`${styles.input} mb-6`} 
            value={value}
            onChange={handleChangeInputValue}/>
          <Button 
            text={'Добавить в head'} 
            type={'button'} 
            onClick={handleAddHead}
            extraClass={styles.buttonSmall}
            isLoader={addHeadLoader}
            disabled={valueButtonState}/>
          <Button 
            text={'Добавить в tail'} 
            type={'button'} 
            onClick={handleAddTail}
            extraClass={styles.buttonSmall}
            isLoader={addTailLoader}
            disabled={valueButtonState}/>
          <Button 
            text={'Удалить из head'} 
            type={'button'} 
            onClick={handleDeleteHead}
            extraClass={styles.buttonSmall}
            isLoader={deleteHeadLoader}
            disabled={valueButtonState}/>
          <Button 
            text={'Удалить из tail'} 
            type={'button'} 
            onClick={handleDeleteTail}
            extraClass={styles.buttonSmall}
            isLoader={deleteTailLoader}
            disabled={valueButtonState}/>
        </div>
        <div className={styles.set}>
          <Input 
            isLimitText={false} 
            placeholder={"Введите индекс"} 
            value={ind}
            extraClass={styles.input}
            onChange={handleChangeInputInd}/>
          <Button 
            text={'Добавить по индексу'} 
            type={'button'} 
            onClick={handleAddByIndex}
            extraClass={styles.buttonBig}
            isLoader={addByIdx}
            disabled={indButtonState}/>
          <Button 
            text={'Удалить по индексу'} 
            type={'button'} 
            onClick={handleDeleteByIndex}
            extraClass={styles.buttonBig}
            isLoader={deleteByIdx}
            disabled={indButtonState}/>
        </div>
        <ul className={styles.list}>

          { array && (
            array.map((item, index) => {
              return (
                <li key={index} className={styles.circle}>
                  { item.smallCircle && (
                    <Circle 
                    isSmall 
                    extraClass={addTailLoader || addHeadLoader || addByIdx ? 
                      styles.smallCircle :
                      styles.smallCircleBottom}
                    letter={item.smallCircle?.symbol}
                    state={ElementStates.Changing}/>
                  )}
                  <Circle 
                    state={item.state} 
                    letter={item.symbol}
                    head={index === 0 && item.smallCircle === undefined ? 'head' : ''}
                    tail={index === array.length - 1 && item.smallCircle === undefined ? 'tail' : ''}
                    index={index}/>
                    <ArrowIcon />
                </li>
              )
            })
          )}

        </ul>
      </div>
    </SolutionLayout>
  );
};