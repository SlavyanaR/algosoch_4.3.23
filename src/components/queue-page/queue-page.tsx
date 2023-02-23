import React, { useState, FormEvent } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { IOueueLoader } from "../../types/queue-page";
import { delay } from "../../utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./queue-page-class";
import QueePageStyles from './queue-page.module.css';

const SIZE: number = 7;
const maxLEN: number = 4

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [queue] = useState(new Queue<string>(SIZE));
  const [queueArray, setQueueArray] = useState<(string | undefined)[]>(queue.printQueue());
  const [head, setHead] = useState<number>(queue.getHead());
  const [tail, setTail] = useState<number>(queue.getTail());
  const [isLoader, setIsLoader] = useState<IOueueLoader>({
    addValue: false,
    removeValue: false,
    clearValue: false,
    disabled: false,
  });

  const enqueue = async (item: string) => {
    setIsLoader({
      ...isLoader,
      addValue: true,
      disabled: true
    });
    queue.enqueue(item);
    setInputValue('')
    setQueueArray([...queue.printQueue()]);
    setTail(queue.getTail());
    setCurrentIndex(tail % queue.getSize());
    await delay(SHORT_DELAY_IN_MS);
    setCurrentIndex(-1);
    await delay(SHORT_DELAY_IN_MS);
    setIsLoader({
      ...isLoader,
      addValue: false,
      disabled: false
    });
  }

  const dequeue = async () => {
    setIsLoader({
      ...isLoader,
      removeValue: true,
      disabled: true
    });
    if (queue) {
      queue.dequeue();
      setQueueArray([...queue.printQueue()]);
      setCurrentIndex((head & queue.getSize()));
      await delay(SHORT_DELAY_IN_MS);
      setHead(queue.getHead());
      setCurrentIndex(-1);
      await delay(SHORT_DELAY_IN_MS);
    }
    setIsLoader({
      ...isLoader,
      removeValue: false,
      disabled: false
    });
  }

  const clear = () => {
    setIsLoader({
      ...isLoader,
      clearValue: true,
      disabled: true
    });
    queue.clear();
    setQueueArray(queue.printQueue());
    setHead(queue.getHead());
    setTail(queue.getTail());
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
    <SolutionLayout title="Очередь">
      <form className={QueePageStyles.form} onSubmit={(e) => e.preventDefault()} >
        <div className={QueePageStyles.container}>
          <Input
            extraClass="mr-6"
            onChange={onChange}
            isLimitText={true}
            maxLength={maxLEN}
            value={inputValue}
            disabled={isLoader.disabled}
          />
          <Button
            text="Добавить"
            extraClass="mr-6"
            onClick={() => enqueue(inputValue)}
            isLoader={isLoader.addValue}
            disabled={!inputValue || tail === SIZE || isLoader.disabled}
          />
          <Button
            text="Удалить"
            onClick={() => dequeue()}
            isLoader={isLoader.removeValue}
            disabled={queue.isEmpty() || isLoader.disabled}
          />
        </div>
        <Button
          text="Очистить"
          onClick={() => clear()}
          isLoader={isLoader.clearValue}
          disabled={(head === 0 && tail === 0 )|| isLoader.disabled}
        />
      </form>
      <ul className={QueePageStyles.list}>
        {queueArray.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item}
              index={index}
              head={(index === head && !queue.isEmpty()) ? "head" : ""}
              tail={(index === tail - 1 && !queue.isEmpty()) ? "tail" : ""}
              state={index === currentIndex ? ElementStates.Changing : ElementStates.Default}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
