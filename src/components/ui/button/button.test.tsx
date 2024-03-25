import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";


describe('Button', () => {

  test('Отрисовка кнопки без текста', () => {
    render(<Button />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toMatchSnapshot();
  });

  test('Отрисовка кнопки с текстом', () => {
    render(<Button text="Развернуть" />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toMatchSnapshot();
  });

  test('Отрисовка заблокированной кнопки', () => {
    render(<Button disabled />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
    expect(btn).toMatchSnapshot();
  });

  test('Отрисовка кнопки с индикатором загрузки', () => {
    render(<Button isLoader />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toMatchSnapshot();
  });

  test('При клике на кнопку вызывается колбэк', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick} text="Рассчитать" />);
    fireEvent.click(screen.getByText(/рассчитать/i));
    expect(handleClick).toBeCalledTimes(1);
  });

})