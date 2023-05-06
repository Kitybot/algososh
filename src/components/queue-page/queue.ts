export class Queue <T> {
  queue: T[];
  headIndex: number;
  tailIndex: number;
  constructor() {
    this.queue = [];
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  getQueue() {
    return this.queue;
  }

  getQueueLength() {
    return this.queue.length;
  }

  getHeadIndex() {
    return this.headIndex;
  }

  changeHeadIndex(number: number) {
    this.headIndex = number;
  }

  getTailIndex() {
    return this.tailIndex;
  }

  changeTailIndex(number: number) {
    this.tailIndex = number;
  }

  pushInitialElement(element: T) {
    this.queue.push(element);
  }
}