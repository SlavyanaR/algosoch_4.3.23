import React, { useState, FormEvent } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import FibonacciPageStyles from './fibonacci-page.module.css';
import { maxLen, maxValue, GetFibonacciNumbers, minValue } from "./utils-fibonacci-page";
import { delay } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";


export const FibonacciPage: React.FC = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number | string>('');
  const [fibonacciArray, setFibonacciArray] = useState<Array<number>>()

  const getFibonacciArray = async (inputValue: number) => {
    setIsLoader(true);
    const array = GetFibonacciNumbers(inputValue);
    for (let i = 0; i <= array.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setFibonacciArray(array.slice(0, i + 1))
    }
    setIsLoader(false);
  }

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const number = e.currentTarget.value.trim();
    setInputValue(number);
  }

  const onClickForm = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    getFibonacciArray(Number(inputValue))
    setInputValue('');
  }

  const inputLimit = minValue <= inputValue && inputValue <= maxValue ? false : true;

  const justifyStyle = fibonacciArray && fibonacciArray.length < 10 ?
    { justifyContent: 'center' } : { justifyContent: 'flex-start' };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={FibonacciPageStyles.form} onSubmit={onClickForm} >
        <Input
          extraClass="mr-6"
          type="number"
          isLimitText={true}
          maxLength={maxLen}
          max={maxValue}
          onChange={onChange}
          disabled={isLoader}
          value={inputValue}
        />
        <Button
          text="Рассчитать"
          onClick={onClickForm}
          disabled={inputLimit}
          isLoader={isLoader}
        />
      </form>
      <ul className={FibonacciPageStyles.list} style={justifyStyle}>
        {fibonacciArray && fibonacciArray.map((elem: number, index: number) => {
          return (
            <Circle
              key={index}
              letter={`${elem}`}
              index={index}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
