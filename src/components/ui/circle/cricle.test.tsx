import { render } from "@testing-library/react"
import { Circle } from "./circle";


describe('Circle component', () => {
    test('rendering: without a letter', () => {
      const { asFragment } = render(<Circle/>);
      expect(asFragment()).toMatchSnapshot();
    });
    test('rendering: with letters', () => {
        const { asFragment } = render(<Circle letter="q"/>);
        expect(asFragment()).toMatchSnapshot();
    });
    test('rendering: head', () => {
      const { asFragment } = render(<Circle head='head'/>);
      expect(asFragment()).toMatchSnapshot();
    });
    test('rendering: react-element in head', () => {
      const { asFragment } = render(<Circle head={<Circle/>}/>);
      expect(asFragment()).toMatchSnapshot();
    });
    test('rendering: tail', () => {
      const { asFragment } = render(<Circle tail='qwer'/>);
      expect(asFragment()).toMatchSnapshot();
    });
    test('rendering: react-element in tail', () => {
        const { asFragment } = render(<Circle tail={<Circle/>}/>);
        expect(asFragment()).toMatchSnapshot();
    });
    test('rendering: index', () => {
      const { asFragment } = render(<Circle index={1}/>);
      expect(asFragment()).toMatchSnapshot();
    });
    test('rendering: propom', () => {
      const { asFragment } = render(<Circle tail='qwer'/>);
      expect(asFragment()).toMatchSnapshot();
    });
    test('rendering: isSmall', () => {
      const { asFragment } = render(<Circle isSmall={true}/>);
      expect(asFragment()).toMatchSnapshot();
    });
    test('rendering: default', () => {
      const { asFragment } = render(<Circle state={'default'}/>);
      expect(asFragment()).toMatchSnapshot();
    });
    test('rendering: changing', () => {
      const { asFragment } = render(<Circle state={'changing'}/>);
      expect(asFragment()).toMatchSnapshot();
    });
    test('rendering: modified', () => {
        const { asFragment } = render(<Circle state={'modified'}/>);
        expect(asFragment()).toMatchSnapshot();
    });
    
});