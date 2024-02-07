import React, { useState, useRef, SyntheticEvent } from "react";
import styles from './styles.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import timeout from "../../services/timeout";
import { Stack } from "./utils";
import { SHORT_DELAY_IN_MS, DELAY_IN_MS, VERY_SHORT_DELAY_IN_MS } from "../../constants/delays";


type TArrItem = {
  text: string;
  state: ElementStates;
}


export const StackPage: React.FC = () => {

  const newArr = new Stack<TArrItem>();
  const curStack = useRef(newArr).current;

  const [value, setValue] = useState('');
  const [stack, setStack] = useState<TArrItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('');

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (loading || value === '') {
      return
    }
    setLoading(true);
    setAction('add');
    let array = [...curStack.getItems()];
    array.push({
      text: value,
      state: ElementStates.Changing,
    })

    setStack([...array])
    await timeout(SHORT_DELAY_IN_MS)
    curStack.push({
      text: value,
      state: ElementStates.Default,
    })
    setStack([...curStack.getItems()]);
    setValue('')
    setLoading(false);
    setAction('')
  }

  const pop = async () => {
    if (curStack.getSize() === 0) {
      return
    }
    setLoading(true);
    setAction('pop');
    let array = [...curStack.getItems()];
    (array[array.length - 1] as TArrItem).state = ElementStates.Changing;
    setStack([...array]);
    await timeout(SHORT_DELAY_IN_MS);

    curStack.pop();
    setStack([...curStack.getItems()]);
    setValue('');
    setLoading(false);
    setAction('')
  }

  const clear = async () => {
    curStack.clear();
    setStack([...curStack.getItems()])
  }

  return (
    <SolutionLayout title="Стек">
      <form onSubmit={onSubmit} className={styles.form}>
        <Input type='text' isLimitText={true} maxLength={4} value={value} onChange={onChange}></Input>
        <Button isLoader={action === 'add'} disabled={loading || value === ''} type="submit" text="Добавить" ></Button>
        <Button isLoader={action === 'pop'} disabled={loading || curStack.getSize() === 0} onClick={pop} type="button" text='Удалить'></Button>
        <Button disabled={loading || curStack.getSize() === 0} onClick={clear} type='button' text='Очистить'></Button>
      </form>
      <ul className={styles.solution}>
        {
          stack.map((item, index) => (
            <Circle state={item.state} letter={item.text} key={index} index={index} head={index === stack.length - 1 ? 'top' : ''} />
          ))
        }
      </ul>

    </SolutionLayout >
  );
};
