import {  fireEvent, render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import { BrowserRouter, Route, Router } from "react-router-dom";
import { StringComponent } from "./string";

describe('String component', () => {
    test('Строка с нечетным количеством символов', () => {
        render(
            <BrowserRouter>
                <StringComponent/>
            </BrowserRouter>
        );
        const input: HTMLInputElement = screen.getByPlaceholderText('Введите текст');
        input.value = 'Hallo';
        const button: HTMLButtonElement = screen.getByRole('button', {name: 'Развернуть'});
        setTimeout( async () => {
          fireEvent.click(button);
          const array = await screen.findAllByTestId('text-in-circle');
          jest.useFakeTimers();
          expect(array).toHaveLength(5);
          expect(array[0].textContent).toBe('H');
          expect(array[1].textContent).toBe('a');
          expect(array[2].textContent).toBe('l');
          expect(array[3].textContent).toBe('l');
          expect(array[4].textContent).toBe('o');
          act(() => {
            jest.runAllTimers();
          });
          const newArray = screen.getAllByTestId('text-in-circle');
          expect(newArray).toHaveLength(5);
          expect(newArray[0].textContent).toBe('o');
          expect(newArray[1].textContent).toBe('l');
          expect(newArray[2].textContent).toBe('l');
          expect(newArray[3].textContent).toBe('a');
          expect(newArray[4].textContent).toBe('H');
        }, 100);
      });

      test('Строка с четным количеством символов', () => {
        render(<BrowserRouter>
            <StringComponent/>
        </BrowserRouter>);
        const input: HTMLInputElement = screen.getByPlaceholderText('Введите текст');
        input.value = 'Pele';
        const button: HTMLButtonElement = screen.getByRole('button', {name: 'Развернуть'});
        setTimeout( async () => {
          fireEvent.click(button);
          const array = await screen.findAllByTestId('text-in-circle');
          jest.useFakeTimers();
          expect(array).toHaveLength(4);
          expect(array[0].textContent).toBe('P');
          expect(array[1].textContent).toBe('e');
          expect(array[2].textContent).toBe('l');
          expect(array[3].textContent).toBe('e');
          act(() => {
            jest.runAllTimers();
          });
          const newArray = screen.getAllByTestId('text-in-circle');
          expect(newArray).toHaveLength(4);
          expect(newArray[0].textContent).toBe('e');
          expect(newArray[1].textContent).toBe('l');
          expect(newArray[2].textContent).toBe('e');
          expect(newArray[3].textContent).toBe('P');
        }, 100);
      });

      test('Строка с одним символом.', () => {
        render(<BrowserRouter>
            <StringComponent/>
        </BrowserRouter>);
        const input: HTMLInputElement = screen.getByPlaceholderText('Введите текст');
        input.value = 'e';
        const button: HTMLButtonElement = screen.getByRole('button', {name: 'Развернуть'});
        setTimeout( async () => {
          fireEvent.click(button);
          const array = await screen.findAllByTestId('text-in-circle');
          jest.useFakeTimers();
          expect(array).toHaveLength(1);
          expect(array[0].textContent).toBe('e');
          act(() => {
            jest.runAllTimers();
          });
          const newArray = screen.getAllByTestId('text-in-circle');
          expect(newArray).toHaveLength(1);
          expect(newArray[0].textContent).toBe('e');
        }, 100);
      });

      test('Пустая строка.', () => {
        render(<BrowserRouter>
            <StringComponent/>
        </BrowserRouter>);
        const input: HTMLInputElement = screen.getByPlaceholderText('Введите текст');
        const button: HTMLButtonElement = screen.getByRole('button', {name: 'Развернуть'});
        expect(input.value).toBe('');
        expect(button.disabled).toBe(true);
        button.disabled = false;
        expect(button.disabled).toBe(false);
        fireEvent.click(button);
        const array = screen.queryAllByTestId('text-in-circle');
        jest.useFakeTimers();
        expect(array).toHaveLength(0);
        act(() => {
          jest.runAllTimers();
        });
        const newArray = screen.queryAllByTestId('text-in-circle');
        expect(newArray).toHaveLength(0);
    });

});