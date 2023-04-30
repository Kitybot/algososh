import React, { useRef, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { nanoid } from "nanoid";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { LinkedList } from "./linkedList";
import { LinkedListNode } from "./linkedListNode";
import { ArrowIcon } from "../ui/icons/arrow-icon";

interface ILinkedListNode{
  string: string;
  state: ElementStates;
  uuid: string;
  head: string | React.ReactElement |  null;
  tail: string | React.ReactElement |  null;
}

export const ListPage: React.FC = () => {

  const [ , setNewRender ] = useState<string>(nanoid());
  const [ isStringInputEmpty, setIsStringInputEmpty ] = useState(true);
  const [ isIndexInputEmpty, setIsIndexInputEmpty ] = useState(true);
  const [ state, setState ] = useState({
    isAlgoritmWork: false,
    isAddHead: false,
    isAddTail: false,
    isDeleteHead: false,
    isDeleteTail: false,
    isAddByIndex: false,
    isDeleteByIndex: false,
  });

  const numberArray = useRef<number[]>([]);
  if (numberArray.current.length === 0) {
    for (let i = 1; i <= 4 + Math.round(Math.random() * 2); i++) {
      numberArray.current.push(Math.round(Math.random() * 100));
    }
  }
  let initializingList: ILinkedListNode[] = [];
  for (let i = 0; i <= numberArray.current.length - 1; i++) {
    const number: number = numberArray.current[i];
    initializingList.push({
      string: number.toString(),
      state: ElementStates.Default,
      uuid: nanoid(),
      head: i === 0 ? 'head' : null,
      tail: i === numberArray.current.length - 1 ? 'tail' : null,
    })
  }
  const linkedList = useRef(new LinkedList<ILinkedListNode>(initializingList));

  const stringInputRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    stringInputRef.current = 
      document.querySelector('.input-string-container > .text_type_input');
  }, []);
  const checkStringInput = () => {
    if (stringInputRef.current && stringInputRef.current.value !== '') {
      setIsStringInputEmpty(false);
    }
    if (stringInputRef.current && stringInputRef.current.value === '' && 
      isStringInputEmpty === false) {
      setIsStringInputEmpty(true);
    }
  };




  const indexInputRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    indexInputRef.current = 
      document.querySelector('.input-index-container > .text_type_input');
  }, []);
  const checkIndexInput = () => {
    if (indexInputRef.current && indexInputRef.current.value !== '') {
      setIsIndexInputEmpty(false);
    }
    if (indexInputRef.current && indexInputRef.current.value === '' && 
      isIndexInputEmpty === false) {
      setIsIndexInputEmpty(true);
    }
  };









  function creatNewElement(partList: string): ILinkedListNode {
    return {
      string: stringInputRef.current ? stringInputRef.current.value : '',
      state: ElementStates.Modified,
      uuid: nanoid(),
      head: partList === 'head' ? 'head' : null,
      tail: partList === 'tail' ? 'tail' : null,
    }
  }

  function creatSmallCircle(Element: ILinkedListNode) {
    return <Circle
      state={ElementStates.Changing}
      letter={Element.string}
      isSmall={true}
    />
  }

  const addNewHead = () => {
    const newElement = creatNewElement('head');
    const smallCircle = creatSmallCircle(newElement);
    linkedList.current.head.value.head = smallCircle;
    setState({
      ...state,
      isAlgoritmWork: true,
      isAddHead: true,
    });
    //setNewRender(nanoid());
    setTimeout(() => {
      linkedList.current.head.value.head = null;
      linkedList.current.prepend(newElement);
      setNewRender(nanoid());
      setTimeout(() => {
        linkedList.current.head.value.state = ElementStates.Default;
        if (stringInputRef.current) {
          stringInputRef.current.value = '';
        }
        setIsStringInputEmpty(true);
        setState({
          ...state,
          isAlgoritmWork: false,
          isAddHead: false,
        });
      }, SHORT_DELAY_IN_MS)
    }, SHORT_DELAY_IN_MS);
  };

  const addNewTail = () => {
    const newElement = creatNewElement('tail');
    const smallCircle = creatSmallCircle(newElement);
    const currTail = linkedList.current.tail;
    if (currTail) {currTail.value.head = smallCircle};
    setState({
      ...state,
      isAlgoritmWork: true,
      isAddTail: true,
    });
    //setNewRender(nanoid());
    setTimeout(() => {
      if (currTail) {currTail.value.head = null};
      linkedList.current.append(newElement);
      setNewRender(nanoid());
      setTimeout(() => {
        newElement.state = ElementStates.Default;
        if (stringInputRef.current) {
          stringInputRef.current.value = '';
        }
        setIsStringInputEmpty(true);
        setState({
          ...state,
          isAlgoritmWork: false,
          isAddTail: false,
        });
      }, SHORT_DELAY_IN_MS)
    }, SHORT_DELAY_IN_MS);
  };

  const deleteHead = () => {
    const smallCircle = creatSmallCircle(linkedList.current.head.value);
    linkedList.current.head.value.tail = smallCircle;
    linkedList.current.head.value.string = '';
    //setNewRender(nanoid());
    setState({
      ...state,
      isAlgoritmWork: true,
      isDeleteHead: true,
    });
    setTimeout(() => {
      linkedList.current.deleteHead();
      setState({
        ...state,
        isAlgoritmWork: false,
        isDeleteHead: false,
      });
      //setNewRender(nanoid());
    }, SHORT_DELAY_IN_MS)
  };

  const deleteTail = () => {
    const currTail = linkedList.current.tail;
    if (currTail) {
      const smallCircle = creatSmallCircle(currTail.value);
      currTail.value.tail = smallCircle;
      currTail.value.string = '';
    }
    setState({
      ...state,
      isAlgoritmWork: true,
      isDeleteTail: true,
    });
    //setNewRender(nanoid());
    setTimeout(() => {
      linkedList.current.deleteTail();
      setState({
        ...state,
        isAlgoritmWork: false,
        isDeleteTail: false,
      });
      //setNewRender(nanoid());
    }, SHORT_DELAY_IN_MS)
  };

  const addByIndex = () => {
    const newElement = creatNewElement('');
    const smallCircle = creatSmallCircle(newElement);
    const elementsArray: LinkedListNode<ILinkedListNode>[] = [];
    let currElement: LinkedListNode<ILinkedListNode> | null = linkedList.current.head;
    let index = 0;
    const inputIndex = indexInputRef.current && Number(indexInputRef.current.value);
    currElement.value.head = smallCircle;
    setState({
      ...state,
      isAlgoritmWork: true,
      isAddByIndex: true,
    });
    //setNewRender(nanoid());
    setTimeout(function move() {
      if (currElement && currElement.next && inputIndex !== 0) {
        if (currElement === linkedList.current.head) {
          currElement.value.head = 'head';
        } else {
          currElement.value.head = '';
        }
        currElement.value.state = ElementStates.Changing;
        elementsArray.push(currElement);
        currElement = currElement.next;
        currElement.value.head = smallCircle;
        index++;
        setNewRender(nanoid());
      }
      if (inputIndex !== null && index < inputIndex) {
        setTimeout(move, SHORT_DELAY_IN_MS);
      } else {
        setTimeout(() => {
          const newListElement = linkedList.current.addByIndex(newElement, index);
          elementsArray.push(newListElement);
          if (currElement !== null) {
            currElement.value.head = '';
          }
          setNewRender(nanoid());
          setTimeout(() => {
            elementsArray.forEach(item => {
              item.value.state = ElementStates.Default;
            });
            if (stringInputRef.current && indexInputRef.current) {
              stringInputRef.current.value = '';
              indexInputRef.current.value = '';
            }
            setIsStringInputEmpty(true);
            setIsIndexInputEmpty(true);
            setState({
              ...state,
              isAlgoritmWork: false,
              isAddByIndex: false,
            });
          }, SHORT_DELAY_IN_MS)
        }, SHORT_DELAY_IN_MS);
      }
    }, SHORT_DELAY_IN_MS)
  };

  const deleteByIndex = () => {
    if (indexInputRef.current) {
      setState({
        ...state,
        isAlgoritmWork: true,
        isDeleteByIndex: true,
      });
      let index = 0;
      const inputIndex = Number(indexInputRef.current.value);
      const elementsArray: LinkedListNode<ILinkedListNode>[] = [];
      let currElement = linkedList.current.head;
      setTimeout(function findElementByIndex() {
        currElement.value.state = ElementStates.Changing;
        elementsArray.push(currElement);
        index++;
        setNewRender(nanoid());
        if (index <= inputIndex) {
          if (currElement.next) {
            currElement = currElement.next;
          }
          setTimeout(findElementByIndex, SHORT_DELAY_IN_MS);
        } else {
          setTimeout(() => {
            const currListNode = linkedList.current.getElementByPositionNumber(inputIndex + 1);
            const smallCircle = creatSmallCircle(currListNode.value);
            currListNode.value.tail = smallCircle;
            currListNode.value.state = ElementStates.Default;
            currListNode.value.string = '';
            setNewRender(nanoid());
            setTimeout(() => {
              linkedList.current.deleteByIndex(inputIndex);
              setNewRender(nanoid());
              setTimeout(() => {
                elementsArray.forEach(item => {
                  item.value.state = ElementStates.Default;
                });
                if (indexInputRef.current) {
                  indexInputRef.current.value = ''
                }
                setIsIndexInputEmpty(true);
                setState({
                  ...state,
                  isAlgoritmWork: false,
                  isDeleteByIndex: false,
                });
              }, SHORT_DELAY_IN_MS);
            }, SHORT_DELAY_IN_MS);
          }, SHORT_DELAY_IN_MS);
        }
      }); 
    }
  };

  const creatCircleElements = (linkedListHead: LinkedListNode<ILinkedListNode>): 
    JSX.Element[] => {
    const array: JSX.Element[] = [];
    let listElement: LinkedListNode<ILinkedListNode> | null = linkedListHead;
    let index = 0;
    do {
      if (listElement !== null) {
        array.push(
          <div className={styles.itemJsxArray} key={listElement.value.uuid}>
            <Circle
              state={listElement.value.state}
              letter={listElement.value.string}
              head={listElement.value.head}
              index={index}
              tail={listElement.value.tail}
              extraClass={styles.circle}
            />
            {listElement.next !== null && <ArrowIcon/>}
          </div>
        )
        index++;
        listElement = listElement.next;
      }
    } while (listElement !== null);
    return array;
  };
  const circleElements: JSX.Element[] = creatCircleElements(linkedList.current.head);

  return (
    <SolutionLayout title="Связный список">

      <div className={styles.controlContainer}>
        <Input
          placeholder = "Введите значение"
          maxLength={4}
          extraClass={`${styles.input} input-string-container`}
          onChange={checkStringInput}
          disabled={state.isAlgoritmWork}
        />
        <Button
          text="Добавить в head"
          linkedList="small"
          extraClass={styles.button}
          onClick={addNewHead}
          disabled={isStringInputEmpty || state.isAlgoritmWork}
          isLoader={state.isAddHead}
        />
        <Button
          text="Добавить в tail"
          linkedList="small"
          extraClass={styles.button}
          onClick={addNewTail}
          disabled={isStringInputEmpty || state.isAlgoritmWork}
          isLoader={state.isAddTail}
        />
        <Button
          text="Удалить из head"
          linkedList="small"
          extraClass={styles.button}
          onClick={deleteHead}
          disabled={state.isAlgoritmWork}
          isLoader={state.isDeleteHead}
        />
        <Button
          text="Удалить из tail"
          linkedList="small"
          onClick={deleteTail}
          disabled={state.isAlgoritmWork}
          isLoader={state.isDeleteTail}
        />
        <Input
          placeholder = "Введите индекс"
          maxLength={4}
          extraClass={`${styles.input} input-index-container`}
          onChange={checkIndexInput}
          disabled={state.isAlgoritmWork}
        />
        <Button
          text="Добавить по индексу"
          linkedList="big"
          extraClass={styles.button}
          disabled={isStringInputEmpty || isIndexInputEmpty || state.isAlgoritmWork}
          onClick={addByIndex}
          isLoader={state.isAddByIndex}
        />
        <Button
          text="Удалить по индексу"
          linkedList="big"
          disabled={isIndexInputEmpty || state.isAlgoritmWork}
          onClick={deleteByIndex}
          isLoader={state.isDeleteByIndex}
        />
      </div>
      <div className={styles.circlesContainer}>
        {circleElements}
      </div>
    </SolutionLayout>
  );
};