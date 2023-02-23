import React from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
<form>
  <div>
    <Input/>
    <Button
    text="Добавить"
    />
    <Button
    text="Удалить"
    />
  </div>
  <Button
    text="Очистить"
  />
</form>


    </SolutionLayout>
  );
};
