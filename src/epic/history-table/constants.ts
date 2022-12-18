export interface IHistoryRow {
  startTime: number
  endTime: number
  mode: string
  completed: boolean
}

export interface IHistory extends Array<IHistoryRow> {}
