import React, { useState, FormEvent } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { IStackLoader } from "../../types/stack-page";
import { delay } from "../../utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack-page-class";
import StackPageSlyles from './stack-page.module.css';

const stack = new Stack<string>();
const maxLEN = 4;
const maxSIZE = 10;

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [stackArray, setStackArray] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoader, setIsLoader] = useState<IStackLoader>({
    addValue: false,
    removeValue: false,
    clearValue: false,
    disabled: false,
  });

  const push = async (item: string) => {
    setIsLoader({
      ...isLoader,
      addValue: true,
      disabled: true
    });
    stack.push(item);
    setStackArray(stack.printStack());
    setInputValue('');
    await delay(SHORT_DELAY_IN_MS);
    setCurrentIndex(currentIndex + 1);
    setIsLoader({
      ...isLoader,
      addValue: false,
      disabled: false
    });
  }
  const pop = async () => {
    setIsLoader({
      ...isLoader,
      removeValue: true,
      disabled: true
    });
    setCurrentIndex(stack.getSize() - 1);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArray([...stack.printStack()]);
    setIsLoader({
      ...isLoader,
      removeValue: false,
      disabled: false
    });
  }

  const peak = () => {
    return stack.peak();
  }

  const clear = () => {
    setIsLoader({
      ...isLoader,
      clearValue: true,
      disabled: true
    });
    stack.clear();
    setStackArray(stack.printStack());
    setCurrentIndex(0);
    setIsLoader({
      ...isLoader,
      clearValue: false,
      disabled: false
    });
  }

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const string = e.currentTarget.value.trim();
    setInputValue(string);
  }

  return (
    <SolutionLayout title="Стек">
      <form className={StackPageSlyles.form}>
        <div className={StackPageSlyles.container}>
          <Input
          extraClass="mr-6"
          onChange={onChange}
          isLimitText={true}
          maxLength={maxLEN}
          value={inputValue}
          disabled={isLoader.disabled || stackArray.length > maxSIZE}
          />
          <Button
            text="Добавить"
            extraClass="mr-6"
            onClick={() => push(inputValue)}
            isLoader={isLoader.addValue}
            disabled={!inputValue || isLoader.disabled || stackArray.length > maxSIZE}
          />
          <Button
            text="Удалить"
            extraClass="mr-6"
            onClick={() => pop()}
            isLoader={isLoader.removeValue}
            disabled={stackArray.length < 1 || isLoader.disabled}
          />
        </div>
        <Button
          text="Очистить"
          onClick={() => clear()}
          isLoader={isLoader.clearValue}
          disabled={stackArray.length < 1 || isLoader.disabled}
        />
      </form>
      <ul className={StackPageSlyles.list}>
        {stackArray.map((item, index: number) => {
          return (
            <Circle
              key={index}
              letter={item}
              index={index}
              head={peak() === index ? "top" : ''}
              state={index === currentIndex ? ElementStates.Changing : ElementStates.Default}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
