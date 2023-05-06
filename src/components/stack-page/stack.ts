export class Stack<T> extends Array {
  array: T[]; 
  constructor() {
    super();
    this.array = [];
  }

  getStack() {
    return this.array;
  }

  getStackLength() {
    return this.array.length;
  }

  pushElement(element: T) {
    this.array.push(element);
  }

  pope() {
    this.array.pop();
  }

  clear() {
    this.array = [];
  }
}