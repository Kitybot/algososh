import { INumbersArray } from "../types/componentsTypes";

export const setAnimation = (time: number) => 
new Promise<void>((resolve) => setTimeout(resolve, time));

export const swap = (arr: INumbersArray[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const randomArr = () => {
  let arr = [];
  let count = Math.floor(Math.random() * (6 - 3) + 3);

  for(let i = 0; i < count; i++) {
    arr.push((Math.round(Math.random() * (100 - 0) + 0)).toString());
  };
  return arr;
};