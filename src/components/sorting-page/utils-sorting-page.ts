import { IRandomArr } from "../../types/sorting-page";

export const minLEN: number = 3;
export const maxLEN: number = 17;
export const array: string = 'array';
export const initial: string = 'default';
export const desc: string = 'Direction.Descending';
export const asc: string = 'Direction.Ascending';

export const randomIntFromInterval = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export const swap = (arr: IRandomArr[], firstIndex: number, secondIndex: number): void => {
	const temp = arr[firstIndex];
	arr[firstIndex] = arr[secondIndex];
	arr[secondIndex] = temp;
};

export const selectionSort = (array: IRandomArr[]) => {
	const { length } = array;
	for (let i = 0; i < length; i++) {
		let maxInd = i;
		for (let j = i + 1; j < length; j++) {
			if (array[maxInd].num < array[j].num) {
				maxInd = j;
			}
		}
		if (maxInd !== i) {
			swap(array, i, maxInd);
		}
	}
	return array;
};

export const bubbleSort = (array: IRandomArr[]) => {
	const { length } = array;
	for (let i = 0; i < length; i++) {
		for (let compareIndex = 0; compareIndex < length - i - 1; compareIndex++) {
			const left = array[compareIndex].num;
			const right = array[compareIndex + 1].num;
			if (left < right) {
				array[compareIndex].num = right;
				array[compareIndex + 1].num = left;
			}
		}
	}

	return array;
}