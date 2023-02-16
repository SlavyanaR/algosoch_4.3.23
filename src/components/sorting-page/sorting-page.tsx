import React from "react";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import SortingPageStyles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { delay } from "../../utils";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

import { IRandomArr } from "../../types/sorting-page";




export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <form className={SortingPageStyles.form}>
        <div className={SortingPageStyles.container}>
          <RadioInput
            label="Выбор" />

          <RadioInput
            label="Пузырек"
          />
        </div>
        <div className={SortingPageStyles.container}>
          <Button
            text="По возрастанию" />
          <Button
            text="По убыванию" />
            <Button
            text="Новый массив"/>
        </div>
      </form>

    </SolutionLayout>
  );
};
