export const minValue: number = 1;
export const maxValue: number = 19;
export const maxLen: number = 2;

export function GetFibonacciNumbers(count: number) {
    const numbers = [1, 1];
    for (let i = 2; i <= count; i++) {
        const a = numbers[i - 1];
        const b = numbers[i - 2];
        numbers.push(a + b);
    }
    return numbers;
}
