import { fireEvent, render } from "@testing-library/react"
import { Button } from "./button"

describe('Button component', () => {
    test('rendering: buttons with text', () => {
      const { asFragment } = render(<Button text="unit test"/>);
      expect(asFragment()).toMatchSnapshot();
    });
    test('rendering: buttons without text', () => {
        const { asFragment } = render(<Button/>);
        expect(asFragment()).toMatchSnapshot();
    });
    test('rendering: the locked button', () => {
        const { asFragment } = render(<Button disabled/>);
        expect(asFragment()).toMatchSnapshot();
    });
    test('rendering: buttons with loading indication', () => {
        const { asFragment } = render(<Button isLoader/>);
        expect(asFragment()).toMatchSnapshot();
    });
    test('We check the correctness of the callback call when clicking on the button', () => {
        const handleClick = jest.fn();
        const { getByText } = render(<Button text="button" onClick={handleClick} />);
        const button = getByText('button');
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});