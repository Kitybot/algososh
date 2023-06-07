import { IStack } from "../../types/componentsTypes";
  
export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if(this.size > 1){
    this.container.pop();
    } else {
      return;
    }
  };

  peak = () => {
    if (this.size !== 0) {
      return this.container[this.size - 1];
    };
    return undefined;
  };

  clear = (): void => {
      this.container = [];
  };

  get size() {
      return this.container.length;
  };

  get elements() {
    return this.container;
  };
};