import React, { useState, useEffect, ChangeEvent } from "react";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import SortingPageStyles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { delay } from "../../utils";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { initial, minLEN, maxLEN, randomIntFromInterval, swap, desc, asc, array } from "./utils-sorting-page";
import { IRandomArr } from "../../types/sorting-page";




export const SortingPage: React.FC = () => {

  const [radioOption, setRadioOption] = useState<string>("selection-sort");
  const [isLoader, setIsLoader] = useState<string>(initial);
  const [randomArray, setRandomArray] = useState<IRandomArr[]>([]);

  const randomArr = (min: number, max: number, minLen = minLEN, maxLen = maxLEN): IRandomArr[] => {
    setIsLoader('array')
    const length: number = randomIntFromInterval(minLen, maxLen);
    const lotteryNumbers: IRandomArr[] = [];

    for (let i = 0; i <= length - 1; i++) {
      lotteryNumbers.push({
        num: randomIntFromInterval(min, max),
        state: ElementStates.Default
      });
    }
    return lotteryNumbers;
  }

  useEffect(() => {
    setRandomArray(randomArr(0, 100))
  }, []);

  const onClickNewArray = (): void => {
    setRandomArray(randomArr(0, 100));
  }

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>): void => {
    setRadioOption((e.target as HTMLInputElement).value);
  };

  const selectionSort = async (array: IRandomArr[], direction: boolean): Promise<IRandomArr[]> => {
    const { length } = array;
    for (let i = 0; i < length; i++) {
      let maxInd = i;
      array[maxInd].state = ElementStates.Changing;
      for (let j = i + 1; j < length; j++) {
        array[j].state = ElementStates.Changing;
        setRandomArray([...array]);
        await delay(DELAY_IN_MS);
        if (direction ? array[j].num < array[maxInd].num : array[j].num > array[maxInd].num) {
          maxInd = j;
          array[j].state = ElementStates.Changing;
          array[maxInd].state = i === maxInd ? ElementStates.Changing : ElementStates.Default;
        }
        if (j !== maxInd) {
          array[j].state = ElementStates.Default;
        }
        setRandomArray([...array]);
      }
      swap(array, maxInd, i);
      array[maxInd].state = ElementStates.Default;
      array[i].state = ElementStates.Modified;
      setRandomArray([...array]);
    }
    setIsLoader('default');
    return array;
  };

  const bubbleSort = async (array: IRandomArr[], direction: boolean): Promise<IRandomArr[]> => {
    const { length } = array;
    for (let i = 0; i < length; i++) {
      for (let compareIndex = 0; compareIndex < length - i - 1; compareIndex++) {
        const left = array[compareIndex].num;
        const right = array[compareIndex + 1].num;
        array[compareIndex].state = ElementStates.Changing;
        array[compareIndex + 1].state = ElementStates.Changing;
        setRandomArray([...array]);
        await delay(DELAY_IN_MS);
        if (direction ? left > right : left < right) {
          array[compareIndex].num = right;
          array[compareIndex + 1].num = left;
        }
        array[compareIndex].state = ElementStates.Default;
        if (array[compareIndex + 1]) {
          array[compareIndex + 1].state = ElementStates.Default;
        }
        setRandomArray([...array]);
      }
      array[array.length - i - 1].state = ElementStates.Modified;
      setRandomArray([...array])
    }
    setIsLoader('default');
    return array;
  }

  const onClickSort = async (direction: string): Promise<void> => {
    setIsLoader(direction);
    const compare = direction === 'Direction.Ascending';
    if (radioOption === 'selection-sort') {
      setRandomArray([...await selectionSort(randomArray, compare)]);
    } else {
      setRandomArray([...await bubbleSort(randomArray, compare)]);
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={SortingPageStyles.form}>
        <div className={SortingPageStyles.container}>
          <RadioInput
            label="Выбор"
            name={"sorting-type"}
            value={"selection-sort"}
            defaultChecked
            extraClass="mr-20"
            onChange={onChangeRadio}
            disabled={isLoader === desc || isLoader === asc}
          />

          <RadioInput
            label="Пузырек"
            name={"sorting-type"}
            value={"selection-sort"}
            defaultChecked
            onChange={onChangeRadio}
            disabled={isLoader === desc || isLoader === asc}
          />
        </div>
        <div className={SortingPageStyles.container}>
          <Button
            text="По возрастанию"
            extraClass="mr-6"
            onClick={() => onClickSort(asc)}
            isLoader={isLoader === asc}
            disabled={isLoader === desc}
            sorting={Direction.Ascending}
          />
          <Button
            text="По убыванию"
            extraClass="mr-40"
            onClick={() => onClickSort(desc)}
            sorting={Direction.Ascending}
            isLoader={isLoader === desc}
            disabled={isLoader === asc}
          />
          <Button
            text="Новый массив"
            onClick={onClickNewArray}
            disabled={isLoader !== array && isLoader !== initial}
          />
        </div>
      </form>
      <ul className={SortingPageStyles.list}>
                {randomArray.map((element: IRandomArr, index: number, state: IRandomArr[]) => {
                    return (
                        <Column
                            key={index}
                            index={element.num}
                            state={element.state}
                        />)
                })}
            </ul>

    </SolutionLayout>
  );
};
