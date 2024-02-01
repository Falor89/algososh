export const fibonachi = (n: number) => {
    const arr: number[] = [1]
    for (let i = 1; i <= n; i++) {
        if (i === 1) {
            arr.push(1)
        }
        else {
            const nextNum = arr[i - 1] + arr[i - 2]
            arr.push(nextNum)
        }
    }
    return arr
}