import React, { useState, useRef, useEffect } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { nanoid } from "nanoid";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "./queue";
import { HEAD, TAIL } from "../../constants/element-captions";

// интерфейс элемента очереди
interface IElement {
  letter: string;
  index: number;
  state: ElementStates;
  uuid: string;
  head: string | null;
  tail: string | null;
}

// интерфейс состояния исполнения алгоритма
interface IState {
    isAlgoritmWork: boolean;
  addValue: boolean;
  deleteValue: boolean;
}

export const QueuePage: React.FC = () => {
  // состояние для проведения принудительного рендеринга
  const [ , setNewRender ] = useState<string>('');
  const [value, setValue] = useState<string>('');
  // является ли значение поля input пустой строкой или он заполнен
  const [ isInputEmpty, setIsInputEmpty ] = useState<boolean>(true);
  // состояние работы алгоритма очереди
  const [ state, setState ] = useState<IState>({
    isAlgoritmWork: false,
    addValue: false,
    deleteValue: false,
  });

  // поле input
  const inputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  useEffect(() => {
    inputRef.current = document.querySelector('.input-in-container > .text_type_input');
  }, []);
  // создание экземпляра класса очереди и его первоначальное заполнение
  const queue = useRef(new Queue<IElement>());
  if(queue.current.getQueue().length === 0) {
    for (let i = 0; i <= 6; i++) {
      queue.current.pushInitialElement({
        letter: '',
        index: i,
        state: ElementStates.Default,
        uuid: nanoid(),
        head: null,
        tail: null,
      });
    }
  }

  // обработка события набора текста в поле input
  const handleChangeInput = () => {
    if (inputRef.current && inputRef.current.value === '') {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
    }
  };

  // очитска очереди
  const clearQueue = () => {
    queue.current.getQueue().forEach(item => {
      item.letter = ''
      item.head = null;
      item.tail = null;
    })
    queue.current.changeHeadIndex(0);
    queue.current.changeTailIndex(0);
    setNewRender(nanoid());
  };

  // добавление значения поля input в очередь
  const addValueInQueue = () => {
    setState({
      isAlgoritmWork: true,
      addValue: true,
      deleteValue: false,
    });
    const array = queue.current.getQueue();
    const arrayHead = array[(queue.current.getHeadIndex())];
    // добавление первого значения в пустую очередь
    if (arrayHead.letter === '' && inputRef.current) {
      arrayHead.state = ElementStates.Changing;
      setNewRender(nanoid());
      setTimeout(() => {
        if (inputRef.current !== null) {
          arrayHead.letter = inputRef.current.value;
          arrayHead.head = 'HEAD';
          arrayHead.tail = 'TAIL';
          inputRef.current.value = '';
          setIsInputEmpty(true);
        }
        setTimeout(() => {
          arrayHead.state = ElementStates.Default;
          setState({
            isAlgoritmWork: false,
            addValue: false,
            deleteValue: false,
          });
        }, SHORT_DELAY_IN_MS);
      }, SHORT_DELAY_IN_MS);
      // добавление значения в очередь, когда в ней уже есть другие значения
    } else if (inputRef.current) {
      const tailIndex = queue.current.getTailIndex();
      const newTailIndex = tailIndex + 1 < queue.current.getQueueLength() ? tailIndex + 1 : 0;
      const arrayOldTail = array[tailIndex];
      const arrayNewTail = array[newTailIndex];
      arrayNewTail.state = ElementStates.Changing;
      setNewRender(nanoid());
      setTimeout(() => {
        if (inputRef.current !== null) {
          arrayOldTail.tail = null;
          arrayNewTail.letter = inputRef.current.value;
          arrayNewTail.tail = 'TAIL';
          queue.current.changeTailIndex(newTailIndex);
          inputRef.current.value = '';
          setIsInputEmpty(true);
        }
        setTimeout(() => {
          arrayNewTail.state = ElementStates.Default;
          setState({
            isAlgoritmWork: false,
            addValue: false,
            deleteValue: false,
          });
        }, SHORT_DELAY_IN_MS);
      }, SHORT_DELAY_IN_MS);
    }
  };

  // удаление значения в очереди
  const deleteValueInQueue = () => {
    setState({
      isAlgoritmWork: true,
      addValue: false,
      deleteValue: true,
    });
    const headIndex = queue.current.getHeadIndex();
    const newHeadIndex = headIndex + 1 < queue.current.getQueueLength() ? headIndex + 1 : 0;
    const arrayOldHead = queue.current.getQueue()[headIndex];
    const arrayNewHead = queue.current.getQueue()[newHeadIndex];
    arrayOldHead.state =  ElementStates.Changing;
    setNewRender(nanoid());
    setTimeout(() => {
      arrayOldHead.letter = '';
      if (headIndex === queue.current.getTailIndex()) {
        arrayOldHead.tail = null;
      } else {
        arrayOldHead.head = null;
        arrayNewHead.head = 'HEAD';
        queue.current.changeHeadIndex(newHeadIndex);
      }
      arrayOldHead.state =  ElementStates.Default;
      setState({
        isAlgoritmWork: false,
        addValue: false,
        deleteValue: false,
      });
    }, SHORT_DELAY_IN_MS);
  };

  // формирование списка JSX-элементов для визуального отображения очереди
  const circleElements = queue.current.getQueue().map(item => 
    <Circle
      state={item.state}
      letter={item.letter}
      index={item.index}
      key={item.uuid}
      extraClass={styles.circle}
      head={item.head}
      tail={item.tail}
    />
  );

  // определение факта того, что очередь заполнена полностью
  const isQueueFull = () => {
    const tailIndex = queue.current.getTailIndex();
    const headIndex = queue.current.getHeadIndex();
    return (tailIndex === (queue.current.getQueueLength() - 1) && headIndex === 0) || 
      (tailIndex + 1 ===  headIndex);
  };

  // определение факта того, что очередь пустая
  const isQueueEmpty = () => {
    return  queue.current.getHeadIndex() === 0 &&
            queue.current.getTailIndex() === 0 && 
            queue.current.getQueue()[0].letter === '' ? true : false;
  };

  return (
    <SolutionLayout title="Очередь">

      <div className={styles.controlContainer}>
        <Input
          extraClass={`${styles.input} input-in-container`}
          maxLength={4}
          isLimitText={true}
          disabled={isQueueFull() || state.isAlgoritmWork}
          onChange={handleChangeInput}
          value={value}
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }}
        />
        <Button
          text="Добавить"
          extraClass={styles.buttonAdd}
          onClick={addValueInQueue}
          disabled={isQueueFull() || isInputEmpty || state.isAlgoritmWork}
          isLoader={state.addValue}
        />
        <Button
          text="Удалить"
          extraClass={styles.buttonDelette}
          onClick={deleteValueInQueue}
          disabled={queue.current.getQueue()[queue.current.getHeadIndex()].letter === '' || 
            state.isAlgoritmWork}
          isLoader={state.deleteValue}
        />
        <Button
          text="Очистить"
          extraClass={styles.buttonReset}
          onClick={clearQueue}
          disabled={isQueueEmpty() || state.isAlgoritmWork}
        />
      </div>
      <div className={styles.circlesContainer}>
        {circleElements && circleElements}      
      </div>
    </SolutionLayout>
  );
};