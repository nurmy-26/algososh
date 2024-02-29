import { ElementStates } from "../../types/element-states";


export type TColumn = {
  value: number;
  color: ElementStates;
}

export type TClickedState = 'asc' | 'desc' | '';