import TestRenderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Тестирование компонента Circle.', () => {

  it('Circle без текста', () => {
    const tree = TestRenderer.create(<Circle/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с текстом', () => {
    const tree = TestRenderer.create(<Circle letter='Text'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с head', () => {
    const tree = TestRenderer.create(<Circle head='head'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с react-элементом в head', () => {
    const reactElement =  <Circle
                            letter='Text'
                            isSmall={true}
                          />;
    const tree = TestRenderer.create(<Circle head={reactElement}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с tail', () => {
    const tree = TestRenderer.create(<Circle tail='tail'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с react-элементом в tail', () => {
    const reactElement =  <Circle
                            letter='Text'
                            isSmall={true}
                          />;
    const tree = TestRenderer.create(<Circle tail={reactElement}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с index', () => {
    const tree = TestRenderer.create(<Circle index={0}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle с пропсом isSmall={true}', () => {
    const tree = TestRenderer.create(<Circle isSmall={true}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle в состоянии default', () => {
    const tree = TestRenderer.create(<Circle state={ElementStates.Default}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('Circle в состоянии changing', () => {
    const tree = TestRenderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Circle в состоянии modified', () => {
    const tree = TestRenderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});