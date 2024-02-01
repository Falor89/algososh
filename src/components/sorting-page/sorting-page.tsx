import React, { useEffect, useState } from "react";
import styles from './styles.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import timeout from "../../services/timeout";
import { bubbleSortByStep, selectSortSteps, swap } from "./utils";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";

type TArrayItem = {
  number: number;
  state: ElementStates;
}

export const SortingPage: React.FC = () => {

  const [array, setArray] = useState<TArrayItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState('select');
  const [type, setType] = useState('');

  useEffect(() => {
    getRandomArr()
  }, [])

  const randomArr = () => {
    return Array.from({ length: Math.ceil((Math.random() * 14) + 3) }, () => Math.ceil(Math.random() * 100))
  }

  const getRandomArr = () => {
    setArray(randomArr().map(item => ({
      number: item,
      state: ElementStates.Default
    })))
  }

  const resetArrayState = () => {
    return [...array.map(item => ({
      number: item.number,
      state: ElementStates.Default
    }))]
  }

  const sorting = (type: 'asc' | 'desc') => {
    setType(type);
    sortType === 'select' ? bubbleSort(type) : selectSort(type)
  }

  const bubbleSort = async (type: 'asc' | 'desc') => {
    setLoading(true);
    let arr = resetArrayState();
    setArray([...arr])
    let i = 0;

    while (i < arr.length - 1) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        await timeout(200)
        arr[j].state = ElementStates.Changing
        arr[j + 1].state = ElementStates.Changing
        setArray([...arr]);
        await timeout(200)

        const arrNums = bubbleSortByStep(type, array.map(item => item.number), i, j)
        arr = arr.map((item, index) => ({
          number: arrNums[index],
          state: item.state,
        }))
        setArray([...arr])
        await timeout(200)
        arr[j].state = ElementStates.Default
      }
      i++
      arr[arr.length - i].state = ElementStates.Modified;
      setArray([...arr]);
    }
    arr[0].state = ElementStates.Modified;
    setArray([...arr])
    setLoading(false)
    setType('')
  }

  const selectSort = async (type: 'asc' | 'desc') => {
    setLoading(true);
    const result = selectSortSteps(type, [...array.map(item => item.number)])
    let arr = resetArrayState();
    setArray([...arr])
    let i = 0;
    while (i < arr.length) {
      let selected = i;
      arr[i].state = ElementStates.Changing;
      setArray([...arr]);
      for (let n = i + 1; n < arr.length; n++) {
        await timeout(250);
        arr[n].state = ElementStates.Changing;
        setArray([...arr]);
        if (type === 'asc' ? arr[selected].number > arr[n].number : arr[selected].number < arr[n].number) {
          await timeout(250)
          arr[selected].state = ElementStates.Default;
          selected = n
          setArray([...arr]);
        } else {
          await timeout(250)
          arr[n].state = ElementStates.Default;
          setArray([...arr]);
        }
      }
      await timeout(2000)
      arr = arr.map((item, index) => ({
        state: item.state,
        number: result[i][index]
      }))
      arr[selected].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setArray([...arr]);
      i++
    }
    arr[0].state = ElementStates.Modified
    setArray([...arr]);
    setLoading(false);
    setType('');
  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => { setSortType((e.currentTarget as HTMLInputElement).value) }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.form}>
        <RadioInput label={'Выбор'} disabled={loading} onChange={onChange} checked={'select' === sortType} value={'select'} />
        <RadioInput label={'Пузырёк'} disabled={loading} onChange={onChange} checked={'bubble' === sortType} value={'bubble'} />
        <Button text={'По возрастанию'} isLoader={type === 'abc'} disabled={loading} sorting={Direction.Ascending} onClick={() => { sorting('asc') }} />
        <Button text={'По убыванию'} isLoader={type === 'desc'} disabled={loading} sorting={Direction.Descending} onClick={() => { sorting('desc') }} />
        <Button text={'Новый массив'} disabled={loading} onClick={getRandomArr} />
      </div>
      <div className={styles.solution}>
        {
          array.map((item, index) => (
            <Column index={item.number} key={index} state={item.state} />
          ))
        }
      </div>
    </SolutionLayout>
  );
};
