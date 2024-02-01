import React, { useState } from "react";
import styles from './styles.module.css';
import { reversString } from "./utils";
import timeout from "../../services/timeout";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";

type TLetter = {
  letter: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState('');
  const [array, setArray] = useState<TLetter[]>([]);
  const [loading, setLodaing] = useState(false)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLodaing(true)

    let newArray = value.split('').map(letter => ({
      letter: letter,
      state: ElementStates.Default
    }))

    setArray([...newArray]);
    const result = reversString(value);
    const middle = Math.floor(value.length / 2)
    for (let i = 0; i < middle; i++) {
      const changeElement = [i, value.length - 1 - i];
      await timeout(1000);

      newArray[changeElement[0]].state = ElementStates.Changing;
      newArray[changeElement[1]].state = ElementStates.Changing;
      setArray([...newArray]);
      await timeout(1000);

      newArray = [...result[i].map((letter, index) => ({
        letter: letter,
        state: index <= changeElement[0] || index >= changeElement[1] ? ElementStates.Modified : ElementStates.Default
      }))]
      setArray([...newArray]);
    }
    setLodaing(false)
  }

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={onSubmit} className={styles.form}>
        <Input maxLength={11} type="text" value={value} onChange={onChange} />
        <Button disabled={value === ''} type={'submit'} text={'Развернуть'} isLoader={loading} />
        <p className={styles.text}>Максимум - 11 символов</p>
      </form>
      <div className={styles.solution}>
        {
          array.map((item, index) => (
            <Circle state={item.state} letter={item.letter} key={index} />
          ))
        }
      </div>
    </SolutionLayout>
  );
};
