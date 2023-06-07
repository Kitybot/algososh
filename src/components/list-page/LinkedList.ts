import { ILinkedList } from "../../types/componentsTypes";
import { randomArr } from "../../utils/utils";

export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  };
};
  
export class LinkedList<T> implements ILinkedList<T> {
   head: LinkedListNode<T> | null;
   size: number;

  constructor(arrStr: T[]) { 
    this.head = null;
    this.size = randomArr().length;
  };

  append(value: T) {
    const node = new LinkedListNode(value);

    if(!this.head) {
      this.head = node
    };
    let curr = this.head
    while(curr.next) {
      curr = curr.next
    };
    curr.next = node
    this.size++
  };

  prepend(value: T) {
    const node = new LinkedListNode(value);

    if(!this.head) {
      node.next = this.head;
    };
    this.head = node;
    this.size++
  };

  deleteHead() {
    if(!this.head) {
      return;
    } else {
      this.head = this.head.next;
      this.size--
    };
  };

  deleteTail() {
    this.deleteByIndex(this.size - 1);
  };

  deleteByIndex(index: number){
    if (this.head && index >= 0 && index < this.size) { 
      let idx = 0;
      let curr = this.head;
      let prev = curr;

      if (index === 0) {
        this.head = curr.next;
      } else {
        while (idx < index) {
          idx++
          if (curr.next) {
            prev = curr;
            curr = curr.next;
          };
        };
        prev.next = curr.next;
      };
      this.size--
    } else {
      throw new Error ('Index is incorrect or line is empty');
    };
  };

  addByIndex(value: T, index: number) {
    const node = new LinkedListNode(value);

    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let curr = this.head;
      let currIndex = 0;
      while(currIndex < index) {
        currIndex++
        if(curr?.next && currIndex !== index) {
          curr = curr.next;
        };
      };

      if(curr?.next && currIndex === index) {
        node.next = curr.next;
        curr.next = node;
      };
    };
    this.size++
  };

  getHead() {
    return this.head;
  };
};