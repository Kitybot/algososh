import React, { useState, useRef, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { nanoid } from "nanoid";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./stack";

interface IStringElement{
  string: string;
  state: ElementStates;
  key: string;
}

interface IState{
  isAlgoritmWork: boolean;
  isAdding: boolean;
  isRemoval: boolean;
}

export const StackPage: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [ newRender, setNewRender ] = useState<boolean>(false);
  const [ isTextInInput, setIsTextInInput ] = useState<boolean>(false);
  const [ state, setState ] = useState<IState>({
    isAlgoritmWork: false,
    isAdding: false,
    isRemoval: false,
  });

  const inputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const stack: React.MutableRefObject<Stack<IStringElement>> = 
    useRef(new Stack<IStringElement>());
  useEffect(() => {
    inputRef.current = document.querySelector('.input-in-container > .text_type_input');
  }, []);

  const checkTextInInput = () => {
    if (inputRef.current?.value !== '') {
      setIsTextInInput(true);
    } else {
      setIsTextInInput(false);
    }
  }

  const addElementInStack = () => {
    setState({
      isAlgoritmWork: true,
      isAdding: true,
      isRemoval: false,
    });
    if (inputRef.current) {
      stack.current.pushElement({
        string: inputRef.current.value,
        state: ElementStates.Changing,
        key: nanoid(),
      });
      inputRef.current.value = '';
      setIsTextInInput(false);
    }
    setNewRender(!newRender);
    setTimeout(() => {
      stack.current.getStack()[stack.current.getStackLength() - 1].state = 
        ElementStates.Default;
      setNewRender(!newRender);
      setState({
        isAlgoritmWork: false,
        isAdding: false,
        isRemoval: false,
      });
    }, SHORT_DELAY_IN_MS);
  };

  const deleteElementInStack = () => {
    setState({
      isAlgoritmWork: true,
      isAdding: false,
      isRemoval: true,
    });
    stack.current.getStack()[stack.current.getStackLength() - 1].state = 
      ElementStates.Changing;
    setNewRender(!newRender);
    setTimeout(() => {
      stack.current.getStack().pop();
      setNewRender(!newRender);
      setState({
        isAlgoritmWork: false,
        isAdding: false,
        isRemoval: false,
      });
    }, SHORT_DELAY_IN_MS);
  };

  const reset = () => {
    stack.current.clear();
    setNewRender(!newRender);
  };

  const circleElements = stack.current.getStack().map((item, index) => {
    if (20 - stack.current.getStackLength() + index >= 0) {
      return <Circle
        state={item.state}
        letter={item.string}
        head={index === stack.current.getStackLength() -1 ? "top" : null}
        index={index}
        extraClass={styles.circle}
        key={item.key}
      />
    }
  });

  return (
    <SolutionLayout title="Стек">

      <div className={styles.controlContainer}>
        <Input
          extraClass={`${styles.input} input-in-container`}
          maxLength={4}
          isLimitText={true}
          onChange={checkTextInInput}
          value={value}
          disabled={state.isAlgoritmWork}
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }}
        />
        <Button
          text="Добавить"
          extraClass={styles.buttonAdd}
          disabled={!isTextInInput || state.isAlgoritmWork}
          onClick={addElementInStack}
          isLoader={state.isAdding}
        />
        <Button
          text="Удалить"
          extraClass={styles.buttonDelette}
          onClick={deleteElementInStack}
          disabled={stack.current.getStackLength() === 0 || state.isAlgoritmWork}
          isLoader={state.isRemoval}
        />
        <Button
          text="Очистить"
          extraClass={styles.buttonReset}
          onClick={reset}
          disabled={stack.current.getStackLength() === 0 || state.isAlgoritmWork}
        />
      </div>
      <div className={styles.circlesContainer}>
        {circleElements && circleElements}      
      </div>
    </SolutionLayout>
  );
};