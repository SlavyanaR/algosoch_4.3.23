import { ElementStates } from "../../types/element-states";

export const maxLEN = 11;


export const stateCircle = (index: number, currIndex: number, arr: Array<string | number>) => {
	let arrLength = arr.length - 1
	if (currIndex < index || currIndex > arrLength - index) {
		return ElementStates.Modified
	}
	if (currIndex === index || currIndex === arrLength - index) {
		return ElementStates.Changing
	}
	return ElementStates.Default
}

export const swap = (arr: string[], firstIndex: number, secondIndex: number): void => {
	[arr[firstIndex], arr[secondIndex - firstIndex]] = [arr[secondIndex - firstIndex], arr[firstIndex]];
};


export function reversString (string: string) {
	const arrayOfLetters = string.split('');
	let end = arrayOfLetters.length;

	for (let i = 0; i < Math.floor(end / 2); i++) {
		swap(arrayOfLetters, i, end - 1);
	}

	return arrayOfLetters;
}
