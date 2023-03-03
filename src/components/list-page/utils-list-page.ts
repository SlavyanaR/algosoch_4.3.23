import { ElementStates } from "../../types/element-states";
import { IListArray } from "../../types/list-page";


export const maxLEN: number = 1;
export const maxINDEX: number = 9;

export const initialArr = ['0', '34', '8', '1'];
export const listArr: IListArray[] = initialArr.map((item) => ({
	value: item,
	state: ElementStates.Default,
	shiftElement: null
}))
