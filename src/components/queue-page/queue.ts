interface IQueue<T> {
  enqueue: (item: T) => void,
  dequeue: () => void,
  clear: () => void,
  peak: () => T | null,
  getHead: () => number,
  getTail: () => number,
}
  
export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  };
  
  enqueue = (value: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    } else {
        this.container[this.tail % this.size] = value;  
        this.tail++
        this.length++
      };
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    } else if (this.head === this.size) {
      this.head = 0;
    } else {
      this.container[this.head % this.size] = null;
        this.head++
        this.length--
      };
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }; 
    if (!this.isEmpty()) {
      return this.container[this.head];
    };
      return null;
  };
  
  clear = () => {
    this.container = [];
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  getHead() {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    return this.head;
  };

  getTail() {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    return this.tail - 1;
  };

  isEmpty = () => this.length === 0;

  get elements() {
    return this.container;
  };

  get qLength() {
    return this.length;
  };

  get qSize() {
    return this.size;
  };
};