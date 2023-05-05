import React, { FormEvent, useMemo, useState } from "react";
import styles from './queue-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./queue";
import { IQueueSymbols } from "../../types/components-Types";
import { ElementStates } from "../../types/element-states";
import { setAnimation } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { queueSize } from "../../constants/element-captions";

export const QueuePage: React.FC = () => {

  const queue = useMemo(() => new Queue<string>(queueSize), []);

  const initialQueue: IQueueSymbols[] = Array.from({length: queueSize}, () => ({
    symbol: '',
    state: ElementStates.Default,
    head: null,
    tail: null,
  }));

  const [num, setNumber] = useState('');
  const [array, setArray] = useState<IQueueSymbols[]>(initialQueue);

  const [buttonState, setButtonState] = useState(true);
  const [addButton, setAddButton] = useState(true);
  const [addLoader, setAddLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [clearLoader, setClearLoader] = useState(false);

  const handleChangeInput = (evt: FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setNumber(evt.currentTarget.value);
    evt.currentTarget.value ? setAddButton(false) : setAddButton(true);
  };

  const handleAddNumber = async () => {
    if (queue.qLength >= queue.qSize) {
      setAddButton(true)
      return;
    };
    setButtonState(true);
    setAddLoader(true);

    queue.enqueue(num);
    array[queue.getHead()].head = 'head';
    if (queue.getTail() > 0) {
      array[queue.getTail() - 1].tail = null;
    };
    array[queue.getTail()].state = ElementStates.Changing;
    array[queue.getTail()].symbol = num;
    array[queue.getTail()].tail = 'tail';
    await setAnimation(SHORT_DELAY_IN_MS);
    setArray([...array]);
    await setAnimation(SHORT_DELAY_IN_MS);
    setArray([...array]);
    array[queue.getTail()].state = ElementStates.Default;

    setNumber('');
    setAddButton(true);
    setButtonState(false);
    setAddLoader(false);
  };

  const handleDeleteNumber = async () => {
    setDeleteLoader(true);
    setButtonState(true);

    if (queue.getHead() === queue.getTail()) {
      handleResetQueue();
    };
    queue.dequeue();
    array[queue.getHead() - 1].head = null;
    array[queue.getHead() - 1].symbol = '';
    array[queue.getHead() - 1].state = ElementStates.Changing;
    await setAnimation(SHORT_DELAY_IN_MS);
    setArray([...array]);
    array[queue.getHead()].head = 'head';
    await setAnimation(SHORT_DELAY_IN_MS);
    array[queue.getHead() - 1].state = ElementStates.Default;
    setArray([...array]);

    setDeleteLoader(false);
    setButtonState(false);
  };

  const handleResetQueue = async () => {
    setClearLoader(true);
    setButtonState(true);

    queue.clear();
    setArray(initialQueue);
    await setAnimation(SHORT_DELAY_IN_MS);

    setClearLoader(false);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.form}> 
        <div className={styles.input}>
          <Input 
            isLimitText 
            maxLength={4} 
            name='numInput' 
            value={num} 
            onChange={handleChangeInput}/>
          <Button 
            text={'Добавить'} 
            type='button' 
            disabled={addButton} 
            onClick={handleAddNumber}
            isLoader={addLoader}/>
          <Button 
            text={'Удалить'} type='button' 
            disabled={buttonState} 
            onClick={handleDeleteNumber}
            isLoader={deleteLoader}/>
          <Button 
            text={'Очистить'} 
            type='button' 
            disabled={buttonState} 
            onClick={handleResetQueue}
            extraClass='ml-35'
            isLoader={clearLoader}/>
        </div>
        <ul className={styles.list}>

          { array && (
            array.map((item, index) => {
              return(
                <li key={index}>
                  <Circle 
                    letter={item?.symbol} 
                    index={index} 
                    head={item.head} 
                    tail={item.tail}
                    state={item.state}/>
                </li>
              )
            })
          )}

        </ul>
      </div>
    </SolutionLayout>
  )};