import React, { useState, FormEvent} from "react";
import styles from './stack-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./stack";
import { IStackSymbols } from "../../types/components-Types";
import { ElementStates } from "../../types/element-states";
import { setAnimation } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";

export const StackPage: React.FC = () => {

  const stack = new Stack<string>();

  const [value, setValue] = useState('');
  const [array, setArray] = useState<IStackSymbols[]>([]);

  const [addLoader, setAddLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [clearLoader, setClearLoader] = useState(false);
  const [buttonState, setButtonState] = useState(true); 
  const [addButton, setAddButton] = useState(true);

  const handleChangeValue = (evt: FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    evt.currentTarget.value ? setAddButton(false) : setAddButton(true);
    setValue(evt.currentTarget.value);
  };

  const handleAddToStack = async () => {
    setAddLoader(true);
    setButtonState(true)

    stack.push(value);
    array.push({
      symbol: stack.peak() ? stack.peak() : '',
      state: ElementStates.Changing
    });

    setArray([...array]);
    await setAnimation(SHORT_DELAY_IN_MS);
    array[array.length - 1].state = ElementStates.Default;

    setArray([...array]);
    setAddLoader(false);
    setButtonState(false);
    setValue('')
  };

  const handleDeleteNumber = async () => {
    setDeleteLoader(true);
    setButtonState(true);

    array[array.length - 1].state = ElementStates.Changing;
    await setAnimation(SHORT_DELAY_IN_MS);
    
    stack.pop();
    array.pop();
    setArray([...array])

    setButtonState(false);
    setDeleteLoader(false);
  };

  const handleClearStack = async () => {
    setClearLoader(true);
    setButtonState(true);

    await setAnimation(SHORT_DELAY_IN_MS);
    stack.clear();
    setArray([]);

    setClearLoader(false);
  };
  
  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={(evt) => {
        evt.preventDefault();
        handleAddToStack();
        setAddButton(true)
        }}> 
        <div className={styles.input}>
          <Input 
            isLimitText 
            maxLength={4} 
            name='numInput' 
            onChange={handleChangeValue} 
            value={value}/>
          <Button 
            text={'Добавить'} 
            type='submit' 
            disabled={addButton} 
            isLoader={addLoader}/>
          <Button 
            text={'Удалить'} 
            type='button' 
            disabled={buttonState} 
            isLoader={deleteLoader}
            onClick={handleDeleteNumber}/>
          <Button 
            text={'Очистить'} 
            type='reset' 
            extraClass='ml-35' 
            disabled={buttonState}
            isLoader={clearLoader} 
            onClick={handleClearStack}/>
        </div>
        <ul className={styles.list}>

          { array && (
            array.map((item, index) => {
              return(
                <li key={index}>
                  <Circle 
                    letter={item?.symbol} 
                    index={index} 
                    state={item.state}
                    head={array.length - 1 === index  ? 'top' : ''}/>
                </li>
              )
            })
          )}

        </ul>
      </form>
    </SolutionLayout>
  );
};