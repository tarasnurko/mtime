import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, styled } from '@mui/material'

import { StatsOption } from '../../epic/stats-option'
import { Stat } from '../../epic/stat'
import { useLocalStorage } from '../../hooks'
import { IHistory } from '../../epic/history-table'

const Wrapper = styled(Container)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 30px 20px 30px',
  gap: '20px',
  overflowX: 'hidden',

  '::-webkit-scrollbar': {
    width: '0.4em',
  },
  '::-webkit-scrollbar-track': {
    background:
      theme.palette.mode === 'light'
        ? '#f1f1f1'
        : theme.palette.background.default,
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.mode === 'light' ? '#888' : '#f1f1f1',
  },
  '::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.mode === 'light' ? '#555' : '#fbfbfb',
  },
}))
interface StatValues {
  workTime: number
  restTime: number
}

const Page: React.FC = () => {
  const [history] = useLocalStorage<IHistory>('history', [])
  const [searchParams] = useSearchParams()

  const [statDate, setStatDate] = useState<string>(() => {
    const paramTimestamp = searchParams.get('date')

    const date =
      paramTimestamp && !isNaN(+paramTimestamp)
        ? new Date(+paramTimestamp)
        : new Date()

    const year = date.getFullYear()
    const month =
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()

    return `${year}-${month}-${day}`
  })

  const [dayStats, setDayStats] = useState<StatValues>({
    workTime: 0,
    restTime: 0,
  })

  const [weekStats, setWeekStats] = useState<StatValues>({
    workTime: 0,
    restTime: 0,
  })

  const [monthStats, setMonthStats] = useState<StatValues>({
    workTime: 0,
    restTime: 0,
  })

  const [yearStats, setYearStats] = useState<StatValues>({
    workTime: 0,
    restTime: 0,
  })

  const handleStatOption = (value: string) => setStatDate(value)

  const isSameDays = (date1: Date, date2: Date) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()

  const getDateValues = () => {
    const normalizedStatDate = new Date(statDate)

    const dayValues: StatValues = {
      workTime: 0,
      restTime: 0,
    }

    const weekValues: StatValues = {
      workTime: 0,
      restTime: 0,
    }

    const monthValues: StatValues = {
      workTime: 0,
      restTime: 0,
    }

    const yearValues: StatValues = {
      workTime: 0,
      restTime: 0,
    }

    const firstWeekDay = new Date(
      new Date(normalizedStatDate).setDate(
        normalizedStatDate.getDate() -
          normalizedStatDate.getDay() +
          (!normalizedStatDate.getDay() ? -6 : 1)
      )
    )

    const weekDays: Date[] = [firstWeekDay]

    for (let i = 1; i < 7; i++) {
      const copiedFirstWeekDay = new Date(firstWeekDay.getTime())

      weekDays[i] = new Date(
        copiedFirstWeekDay.setDate(copiedFirstWeekDay.getDate() + i)
      )
    }

    for (const row of history) {
      const rowDate = new Date(row.startTime)

      // check for day
      if (isSameDays(normalizedStatDate, rowDate)) {
        const spentTime = row.endTime - row.startTime
        row.mode === 'WORK'
          ? (dayValues.workTime += spentTime)
          : (dayValues.restTime += spentTime)
      }

      // check for week
      weekDays.forEach(item => {
        if (!isSameDays(item, rowDate)) return

        const spentTime = row.endTime - row.startTime

        row.mode === 'WORK'
          ? (weekValues.workTime += spentTime)
          : (weekValues.restTime += spentTime)
      })

      // check for month
      if (
        normalizedStatDate.getFullYear() === rowDate.getFullYear() &&
        normalizedStatDate.getMonth() === rowDate.getMonth()
      ) {
        const spentTime = row.endTime - row.startTime

        row.mode === 'WORK'
          ? (monthValues.workTime += spentTime)
          : (monthValues.restTime += spentTime)
      }

      // check for year
      if (normalizedStatDate.getFullYear() === rowDate.getFullYear()) {
        const spentTime = row.endTime - row.startTime

        row.mode === 'WORK'
          ? (yearValues.workTime += spentTime)
          : (yearValues.restTime += spentTime)
      }
    }

    setDayStats(dayValues)
    setWeekStats(weekValues)
    setMonthStats(monthValues)
    setYearStats(yearValues)
  }

  useEffect(() => {
    getDateValues()
  }, [statDate])

  return (
    <Wrapper>
      <StatsOption value={statDate} onChange={handleStatOption} />
      <Stat title="Day Stats" stats={dayStats} />
      <Stat title="Week Stats" stats={weekStats} />
      <Stat title="Month Stats" stats={monthStats} />
      <Stat title="Year Stats" stats={yearStats} />
    </Wrapper>
  )
}

export default Page
