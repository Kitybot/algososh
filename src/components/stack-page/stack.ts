interface IStack<T> {
  push: (item: T) => T[];
  pop: () => void;
  getSize: () => number;

}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  constructor(container: T[]) {
    this.container = container;
  }


  push = (item: T): T[] => {
    this.container.push(item);
    return this.container
  };


  pop = (): T[] => {
    if (this.getSize() >= 0) {
      this.container.pop();
    }
    return this.container
  }
  getSize = () => this.container.length;
}