export type TStep = {
  trav1: number,
  trav2: number,
  sorted: number[],
  arr: number[]
}

export enum ClickedState {
  ASC = 'asc',
  DESC = 'desc',
  EMPTY = ''
}

export enum SortTypes {
  Min = 'min',
  Max = 'max'
}
