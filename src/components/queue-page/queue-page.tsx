import React, { useRef, useState } from "react";
import styles from './styles.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import timeout from "../../services/timeout";
import { Queue } from "./utils";

type TQueueItem = {
  text: string;
  state: ElementStates;
}

export const QueuePage: React.FC = () => {
  const newQueue = new Queue<TQueueItem>(7, {
    text: '',
    state: ElementStates.Default
  })
  const queue = useRef(newQueue).current;
  const [value, setValue] = useState('');
  const [elements, setElements] = useState<TQueueItem[]>([...queue.getElements()]);
  const [loading, setLodaing] = useState(false);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!queue.hasFreePlace() || value === '') {
      return
    }
    setLodaing(true);
    let arr = [...queue.getElements()];
    queue.enqueue({
      text: value,
      state: ElementStates.Default,
    })
    arr[queue.getTail()].state = ElementStates.Changing;
    setElements([...arr]);
    await timeout(500)

    setElements([...queue.getElements()]);
    setValue('');
    setLodaing(false)
  }

  const dequeue = () => {
    queue.dequeue();
    setElements([...queue.getElements()])
  }

  const clear = () => {
    queue.clear();
    setElements([...queue.getElements()])
  }
  return (
    <SolutionLayout title="Очередь">
      <form onSubmit={onSubmit} className={styles.form}>
        <Input disabled={loading} type="text" isLimitText={true} value={value} onChange={onChange} maxLength={4} />
        <Button isLoader={loading} disabled={loading || value === '' || !queue.hasFreePlace()} type={'submit'} text="Добавить" />
        <Button disabled={loading || queue.isEmpty()} onClick={dequeue} type={'button'} text="Удалить" id="delete" />
        <Button disabled={loading || queue.isEmpty()} onClick={clear} type={'button'} text="Очистить" id="clear" />
      </form>
      <ul className={styles.solution}>
        {
          elements.map((item, index) => (
            <Circle state={item.state} letter={item.text} key={index} index={index}
              head={item.text !== '' && queue.getHead() === index ? 'head' : ''}
              tail={item.text !== '' && queue.getTail() === index ? 'tail' : ''}
            />
          ))
        }
      </ul>
    </SolutionLayout>
  );
};
