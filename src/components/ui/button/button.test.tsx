import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Рендеринг Кнопки', () => {

  it('Кнопка с текстом', () => {
    const tree = renderer.create(<Button text='Кнопка' type='button'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Кнопка без текста', () => {
    const tree = renderer.create(<Button type='button'/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Заблокированная кнопка', () => {
    const tree = renderer.create(<Button type='button' disabled={true}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Кнопка с активным лоадером', () => {
    const tree = renderer.create(<Button type='button' isLoader={true}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Вызов колбэка при нажатии на кнопку', () => {
    window.alert = jest.fn();
    render(
      <Button 
        type='button' 
        text='Кнопка' 
        onClick={() => {alert('Кнопка нажата')}}
      />
    );
    const button = screen.getByText('Кнопка');
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith('Кнопка нажата');
  })
});