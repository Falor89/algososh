export const reversString = (array: string) => {
    const nums = array.split('');
    const length = nums.length;
    const result = [];
    for (let i = 0; i < length - 1; i++) {
        const changeElement = [i, length - 1 - i];
        console.log(changeElement)
        const swap = array[changeElement[0]]

        nums[changeElement[0]] = nums[changeElement[1]]
        nums[changeElement[1]] = swap
        result.push([...nums])
    }
    return result
}