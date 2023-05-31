import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { SortingPage } from "./sorting-page";

jest.useFakeTimers()

describe('Sorting component', () => {
    describe('Пузырьком.', () => {
        test('Массив из нескольких чисел. По возрастанию.', () => {
          render(<BrowserRouter><SortingPage/></BrowserRouter> );
          const array = screen.getAllByTestId('number-column');
          const radioInputBubble: HTMLInputElement = screen.getByLabelText('Пузырёк');
          const buttonAscending = screen.getByText('По возрастанию');
          fireEvent.click(radioInputBubble);
          expect(array).toHaveLength(array.length);
          expect(radioInputBubble).toHaveProperty('checked');
          fireEvent.click(buttonAscending);
          const newArray = screen.getAllByTestId('number-column');
          expect(newArray).toHaveLength(array.length);
          for (let index = 0; index < array.length; index++) {
            expect(Number(newArray[index].textContent) <= Number(newArray[index++].textContent)).toBe(true);
          }
        });

         test('Массив из нескольких чисел. По убыванию.', () => {
          render(<BrowserRouter><SortingPage/></BrowserRouter>);
          const array = screen.getAllByTestId('number-column');
          const radioInputBubble: HTMLInputElement = screen.getByLabelText('Пузырёк');
          const buttonDescending = screen.getByText('По убыванию');
          fireEvent.click(radioInputBubble);
          expect(array).toHaveLength(array.length);
          expect(radioInputBubble).toHaveProperty('checked');
          fireEvent.click(buttonDescending);
          /* act(() => {
            jest.runAllTimers();
          }); */
          const newArray = screen.getAllByTestId('number-column');
          expect(newArray).toHaveLength(array.length);
          for (let index = array.length - 1; index > 0; index--) {
            expect(Number(newArray[index].textContent) >= Number(newArray[index--].textContent)).toBe(true);
          }
        });

        test('Массив из одного числа. По возрастанию.', () => {
          render(<BrowserRouter><SortingPage/></BrowserRouter>);
          const array = screen.getAllByTestId('number-column');
          const radioInputBubble: HTMLInputElement = screen.getByLabelText('Пузырёк');
          const buttonAscending = screen.getByText('По возрастанию');
          fireEvent.click(radioInputBubble);
          if(array.length === 1){
            expect(radioInputBubble).toHaveProperty('checked');
            fireEvent.click(buttonAscending);
            const newArray = screen.getAllByTestId('number-column');
            expect(Number(array[0].textContent) === Number(newArray[0].textContent)).toBeTruthy();
          }
        });
        test('Массив из одного числа. По убыванию.', () => {
          render(<BrowserRouter><SortingPage/></BrowserRouter>);
          const array = screen.getAllByTestId('number-column');
          const radioInputBubble: HTMLInputElement = screen.getByLabelText('Пузырёк');
          const buttonDescending = screen.getByText('По убыванию');
          fireEvent.click(radioInputBubble);
          if(array.length === 1){
            expect(radioInputBubble).toHaveProperty('checked');
            fireEvent.click(buttonDescending);
            const newArray = screen.getAllByTestId('number-column');
            expect(Number(array[0].textContent) === Number(newArray[0].textContent)).toBeTruthy();
          }
        });

        test('Пустой массив. По возрастанию.', () => {
          render(<BrowserRouter><SortingPage/></BrowserRouter>);
          const array = screen.queryAllByTestId('number-column');
          const radioInputBubble: HTMLInputElement = screen.getByLabelText('Пузырёк');
          const buttonAscending = screen.getByText('По возрастанию');
          fireEvent.click(radioInputBubble);
          expect(radioInputBubble).toHaveProperty('checked');
          fireEvent.click(buttonAscending);
          if(array.length === 0){
            const newArray = screen.getAllByTestId('number-column');
            expect(newArray).toHaveLength(0);
          }
        });

        test('Пустой массив. По убыванию.', () => {
          render(<BrowserRouter><SortingPage/></BrowserRouter>);
          const array = screen.queryAllByTestId('number-column');
          const radioInputBubble: HTMLInputElement = screen.getByLabelText('Пузырёк');
          const buttonDescending = screen.getByText('По убыванию');
          fireEvent.click(radioInputBubble);
          expect(radioInputBubble).toHaveProperty('checked');
          fireEvent.click(buttonDescending);
          if(array.length === 0){
            const newArray = screen.getAllByTestId('number-column');
            expect(newArray).toHaveLength(0);
          }
        });
      });

      describe('Выбором', () => {

        test('Массив из нескольких чисел. По возрастанию.', () => {
          render(<BrowserRouter><SortingPage/></BrowserRouter>);
          const array = screen.getAllByTestId('number-column');
          const radioInputChoice: HTMLInputElement = screen.getByLabelText('Выбор');
          const buttonAscending = screen.getByText('По возрастанию');
          fireEvent.click(radioInputChoice);
          expect(array).toHaveLength(array.length);
          expect(radioInputChoice).toHaveProperty('checked');
          fireEvent.click(buttonAscending);
 /*          act(() => {
            jest.runAllTimers();
          }); */
          const newArray = screen.getAllByTestId('number-column');
          expect(newArray).toHaveLength(array.length);
          for (let index = 0; index < array.length; index++) {
            expect(Number(newArray[index].textContent) <= Number(newArray[index++].textContent)).toBe(true);
          }
        });

        test('Массив из нескольких чисел. По убыванию.', () => {
          render(<BrowserRouter><SortingPage/></BrowserRouter>);
          const array = screen.getAllByTestId('number-column');
          const radioInputChoice: HTMLInputElement = screen.getByLabelText('Выбор');
          const buttonDescending = screen.getByText('По убыванию');
          fireEvent.click(radioInputChoice);
          expect(array).toHaveLength(array.length);
          expect(radioInputChoice).toHaveProperty('checked');
          fireEvent.click(buttonDescending);
          /* act(() => {
            jest.runAllTimers();
          }); */
          const newArray = screen.getAllByTestId('number-column');
          expect(newArray).toHaveLength(array.length);
          for (let index = array.length - 1; index > 0; index--) {
            expect(Number(newArray[index].textContent) >= Number(newArray[index--].textContent)).toBe(true);
          }
        });

        test('Массив из одного числа. По возрастанию.', () => {
          render(<BrowserRouter><SortingPage/></BrowserRouter>);
          const array = screen.getAllByTestId('number-column');
          const radioInputChoice: HTMLInputElement = screen.getByLabelText('Выбор');
          const buttonAscending = screen.getByText('По возрастанию');
          fireEvent.click(radioInputChoice);
          expect(radioInputChoice).toHaveProperty('checked');
          fireEvent.click(buttonAscending);
          if(array.length === 1){
            expect(radioInputChoice).toHaveProperty('checked');
            fireEvent.click(radioInputChoice);
            const newArray = screen.getAllByTestId('number-column');
            expect(Number(array[0].textContent) === Number(newArray[0].textContent)).toBeTruthy();
          }
        });

        test('Массив из одного числа. По убыванию.', () => {
          render(<BrowserRouter><SortingPage/></BrowserRouter>);
          const array = screen.getAllByTestId('number-column');
          const radioInputChoice: HTMLInputElement = screen.getByLabelText('Выбор');
          const buttonDescending = screen.getByText('По убыванию');
          fireEvent.click(radioInputChoice);
          expect(radioInputChoice).toHaveProperty('checked');
          fireEvent.click(buttonDescending);
          if(array.length === 1){
            expect(radioInputChoice).toHaveProperty('checked');
            fireEvent.click(radioInputChoice);
            const newArray = screen.getAllByTestId('number-column');
            expect(Number(array[0].textContent) === Number(newArray[0].textContent)).toBeTruthy();
          }
        });

        test('Пустой массив. По возрастанию.', () => {
          render(<BrowserRouter><SortingPage/></BrowserRouter>);
          const array = screen.queryAllByTestId('number-column');
          const radioInputChoice: HTMLInputElement = screen.getByLabelText('Выбор');
          const buttonAscending = screen.getByText('По возрастанию');
          fireEvent.click(radioInputChoice);;
          expect(radioInputChoice).toHaveProperty('checked');
          fireEvent.click(buttonAscending);
          if(array.length === 0){
            expect(radioInputChoice).toHaveProperty('checked');
            fireEvent.click(radioInputChoice);
            const newArray = screen.getAllByTestId('number-column');
          }
        });

        test('Пустой массив. По убыванию.', () => {
          render(<BrowserRouter><SortingPage/></BrowserRouter>);
          const array = screen.queryAllByTestId('number-column');
          const radioInputChoice: HTMLInputElement = screen.getByLabelText('Выбор');
          const buttonDescending = screen.getByText('По убыванию');
          fireEvent.click(radioInputChoice);
          expect(radioInputChoice).toHaveProperty('checked');
          fireEvent.click(buttonDescending);
          if(array.length === 0){
            expect(radioInputChoice).toHaveProperty('checked');
            fireEvent.click(radioInputChoice);
            const newArray = screen.getAllByTestId('number-column');
          }
        }); 
    })
})