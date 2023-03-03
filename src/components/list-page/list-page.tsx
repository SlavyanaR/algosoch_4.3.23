import React, { FormEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { IListArray, IStateLoader } from "../../types/list-page";
import { delay } from "../../utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./list-page-class";
import ListPageStyles from './list-page.module.css';
import { initialArr, listArr, maxINDEX, maxLEN } from './utils-list-page';


export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number>(1);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [listArray, setListArray] = useState<IListArray[]>(listArr);
  const [isLoader, setIsLoader] = useState<IStateLoader>({
    insertInBegin: false,
    insertAtEnd: false,
    appendByIndex: false,
    removeHead: false,
    removeTail: false,
    removeFrom: false,
  });

  const list = new LinkedList<string>(initialArr);

  const handleClickAddHead = async () => {
    setIsLoader({ ...isLoader, insertInBegin: true });
    setDisabled(true);
    list.prepend(inputValue);
    if (listArray.length > 0) {
      listArray[0].shiftElement = {
        value: inputValue,
        state: ElementStates.Changing,
        position: 'addAction',
      }
    }
    setListArray([...listArray]);
    await delay(SHORT_DELAY_IN_MS);
    listArray[0].shiftElement = null;
    listArray.unshift({
      ...listArray[0],
      value: inputValue,
      state: ElementStates.Modified
    });
    setListArray([...listArray]);
    await delay(SHORT_DELAY_IN_MS);
    listArray[0].state = ElementStates.Default;
    setListArray([...listArray]);
    setIsLoader({ ...isLoader, insertInBegin: false });
    setDisabled(false);
    setInputValue('');
  }

  const onChangeValue = (e: FormEvent<HTMLInputElement>): void => {
    const string = e.currentTarget.value.trim();
    setInputValue(string);
  }

  const handleClickAddTail = async () => {
    setIsLoader({ ...isLoader, insertAtEnd: true });
    setDisabled(true);
    setInputValue('');
    list.append(inputValue);
    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      shiftElement: {
        value: inputValue,
        state: ElementStates.Changing,
        position: 'addAction',
      }
    }
    setListArray([...listArray]);
    await delay(SHORT_DELAY_IN_MS);
    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      shiftElement: null
    }

    listArray.push({
      value: inputValue,
      state: ElementStates.Modified,
      shiftElement: null,
    })
    setListArray([...listArray]);
    await delay(SHORT_DELAY_IN_MS);
    listArray[listArray.length - 1].state = ElementStates.Default;
    setListArray([...listArray]);
    setIsLoader({ ...isLoader, insertAtEnd: false });
    setDisabled(false);
  }

  const handleClickRemoveHead = async () => {
    setIsLoader({ ...isLoader, removeHead: true });
    setDisabled(true);
    listArray[0] = {
      ...listArray[0],
      value: '',
      shiftElement: {
        value: listArray[0].value,
        state: ElementStates.Changing,
        position: "removeAction"
      }
    }
    list.deleteHead();
    setListArray([...listArray]);
    await delay(SHORT_DELAY_IN_MS);
    listArray.shift();
    setListArray([...listArray]);
    setIsLoader({ ...isLoader, removeHead: false });
    setDisabled(false);
  }

  const handleClickRemoveTail = async () => {
    setIsLoader({ ...isLoader, removeTail: true });
    setDisabled(true);
    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      value: '',
      shiftElement: {
        value: listArray[listArray.length - 1].value,
        state: ElementStates.Changing,
        position: "removeAction"
      }
    }
    list.deleteTail();
    setListArray([...listArray]);
    await delay(SHORT_DELAY_IN_MS);
    listArray.pop();
    setListArray([...listArray]);
    setIsLoader({ ...isLoader, removeTail: false });
    setDisabled(false);
  }
  const onChangeIndex = (e: FormEvent<HTMLInputElement>): void => {
    const number = e.currentTarget.value.trim();
    setInputIndex(Number(number));
  }

  const handleClickAddByIndex = async () => {
    setIsLoader({ ...isLoader, appendByIndex: true });
    setDisabled(true);
    list.addByIndex(inputValue, inputIndex);
    for (let i = 0; i <= inputIndex; i++) {
      listArray[i] = {
        ...listArray[i],
        state: ElementStates.Changing,
        shiftElement: {
          value: inputValue,
          state: ElementStates.Changing,
          position: "addAction"
        }
      }
      await delay(SHORT_DELAY_IN_MS);
      setListArray([...listArray]);
      if (i > 0) {
        listArray[i - 1] = {
          ...listArray[i - 1],
          shiftElement: null
        }
      }
      setListArray([...listArray]);
    }
    await delay(SHORT_DELAY_IN_MS);
    listArray[inputIndex] = {
      ...listArray[inputIndex],
      state: ElementStates.Default,
      shiftElement: null
    }
    listArray.splice(inputIndex, 0, {
      value: inputValue,
      state: ElementStates.Modified,
      shiftElement: null
    })
    setListArray([...listArray]);
    listArray[inputIndex].state = ElementStates.Default;
    listArray.forEach((elem: IListArray) => {
      elem.state = ElementStates.Default;
    })
    await delay(SHORT_DELAY_IN_MS);
    setListArray([...listArray]);
    setInputValue('');
    setInputIndex(1);
    setIsLoader({ ...isLoader, appendByIndex: false });
    setDisabled(false);
  }

  const handleClickRemoveByIndex = async () => {
    setIsLoader({ ...isLoader, removeFrom: true });
    setDisabled(true);
    list.deleteByIndex(inputIndex);
    for (let i = 0; i <= inputIndex; i++) {
      listArray[i] = {
        ...listArray[i],
        state: ElementStates.Changing,
      }
      await delay(SHORT_DELAY_IN_MS);
      setListArray([...listArray]);
    }
    listArray[inputIndex] = {
      ...listArray[inputIndex],
      value: '',
      shiftElement: {
        value: listArray[inputIndex].value,
        state: ElementStates.Changing,
        position: "removeAction"
      }
    }
    await delay(SHORT_DELAY_IN_MS);
    setListArray([...listArray]);
    listArray.splice(inputIndex, 1)
    listArray[inputIndex - 1] = {
      ...listArray[inputIndex - 1],
      value: listArray[inputIndex - 1].value,
      state: ElementStates.Modified,
      shiftElement: null
    }
    await delay(SHORT_DELAY_IN_MS);
    setListArray([...listArray]);
    listArray.forEach((elem) => {
      elem.state = ElementStates.Default;
    })
    await delay(SHORT_DELAY_IN_MS);
    setListArray([...listArray]);
    setIsLoader({ ...isLoader, removeFrom: false });
    setDisabled(false);
    setInputIndex(1);
  }


  return (
    <SolutionLayout title="Связный список">
      <form className={ListPageStyles.form} onSubmit={(e) => e.preventDefault()} >
        <Input
          extraClass={`${ListPageStyles.input} mr-6`}
          placeholder="Введите значение"
          onChange={onChangeValue}
          maxLength={4}
          disabled={disabled}
          value={inputValue}
          isLimitText={true}
        />
        <div className={ListPageStyles.button_container}>
          <Button
            text="Добавить в head"
            extraClass={ListPageStyles.button_small}
            onClick={handleClickAddHead}
            disabled={!inputValue || disabled || listArray.length >= maxINDEX}
            isLoader={isLoader.insertInBegin}
          />
          <Button
            text="Добавить в tail"
            extraClass={ListPageStyles.button_small}
            onClick={handleClickAddTail}
            disabled={!inputValue || disabled || listArray.length >= maxINDEX}
            isLoader={isLoader.insertAtEnd}
          />
          <Button
            text="Удалить из head"
            extraClass={ListPageStyles.button_small}
            onClick={handleClickRemoveHead}
            disabled={listArray.length <= 1 || disabled}
            isLoader={isLoader.removeHead}
          />
          <Button
            text="Удалить из tail"
            extraClass={ListPageStyles.button_small}
            onClick={handleClickRemoveTail}
            disabled={listArray.length <= 1 || disabled}
            isLoader={isLoader.removeTail}
          />
        </div>
      </form>
      <form className={ListPageStyles.form} onSubmit={(e) => e.preventDefault()} >
        <Input
          type="number"
          maxLength={maxLEN}
          max={maxINDEX}
          isLimitText={false}
          onChange={onChangeIndex}
          disabled={disabled}
          value={inputIndex}
          placeholder="Введите индекс"
          extraClass={`${ListPageStyles.input} mr-6`}

        />
        <div className={ListPageStyles.button_container}>
          <Button
            text="Добавить по индексу"
            extraClass={ListPageStyles.button_big}
            onClick={handleClickAddByIndex}
            disabled={
              !inputValue
              || !inputIndex
              || disabled
              || inputIndex > listArray.length - 1
              || listArray.length >= maxINDEX
            }
            isLoader={isLoader.appendByIndex}
          />
          <Button
            text="Удалить по индексу"
            extraClass={ListPageStyles.button_big}
            onClick={handleClickRemoveByIndex}
            disabled={
              listArray.length === 0
              || disabled
              || inputIndex > listArray.length - 1
              || inputIndex < 1
            }
            isLoader={isLoader.removeFrom}
          />
        </div>
      </form>
      <ul className={ListPageStyles.list}>
        {listArray.map((item, index) => {
          return (
            <li className={ListPageStyles.item} key={index}>
              {item.shiftElement && (
                <Circle
                  extraClass={`${ListPageStyles.circle_small} ${ListPageStyles[`${item.shiftElement.position}`]}`}
                  letter={item.shiftElement.value}
                  state={item.shiftElement.state}
                  isSmall
                />
              )}
              <Circle
                letter={item.value}
                index={index}
                head={index === 0 && !item.shiftElement ? "head" : ""}
                tail={index === listArray.length - 1 && !item.shiftElement ? "tail" : ""}
                isSmall={false}
                state={item.state}
                extraClass="mr-12"
              />
              {index < listArray.length - 1 &&
                <ArrowIcon fill={item.state !== ElementStates.Changing ? "#0032FF" : "#d252e1"} />}
            </li>)
        })}
      </ul>F
    </SolutionLayout>
  );
};
