import React, { useState } from "react";
import styles from './styles.module.css';
import { fibonachi } from "./utils";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import timeout from "../../services/timeout";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [array, setArray] = useState<number[]>([]);
  const [loading, setLodaing] = useState(false)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLodaing(true)
    setArray([])

    const array = fibonachi(Number(value));
    for (let i = 0; i < array.length; i++) {
      await timeout(500)
      setArray(value => [...value, array[i]])
    }
    setLodaing(false)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={onSubmit} className={styles.form}>
        <Input max={19} type="text" value={value} onChange={onChange} />
        <Button disabled={Number(value) <= 0 || Number(value) > 19} type={'submit'} text={'Развернуть'} isLoader={loading} />
        <p className={styles.text}>Максимальное число - 19</p>
      </form>
      <div className={styles.solution}>
        {
          array.map((item, index) => (
            <Circle letter={`${item}`} key={index} index={index} />
          ))
        }
      </div>
    </SolutionLayout>
  );
};
