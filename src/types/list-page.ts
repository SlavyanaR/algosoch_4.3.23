import { ElementStates } from "./element-states";


interface IShiftElement {
	value: string;
	state: ElementStates;
	position: 'addAction' | 'removeAction';
}

export interface IListArray {
	value: string,
	state: ElementStates
	shiftElement: IShiftElement | null;
}

export interface IStateLoader {
	insertInBegin: boolean,
	insertAtEnd: boolean,
	appendByIndex: boolean,
	removeHead: boolean,
	removeTail: boolean,
	removeFrom: boolean
}