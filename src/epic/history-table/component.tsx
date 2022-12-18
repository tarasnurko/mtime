import React, { useState } from 'react'

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { useLocalStorage } from '../../hooks'
import { IHistory } from './constants'

interface BaseColumnPops {
  [key: string]: any
  label: string
  minWidth?: number
  align?: 'right'
}

interface DateColumn extends BaseColumnPops {
  id: 'date'
  format: (value: number) => string
}

interface SpentColumn extends BaseColumnPops {
  id: 'timeSpent'
  format: (startTime: number, endTime: number) => string
}

interface TimeColumn extends BaseColumnPops {
  id: 'startTime' | 'endTime'
  format: (value: number) => string
}

interface ModeColumn extends BaseColumnPops {
  id: 'mode'
  format: (value: string) => string
}

interface CompletedColumn extends BaseColumnPops {
  id: 'completed'
  format: (value: boolean) => string
}

type Column =
  | DateColumn
  | SpentColumn
  | TimeColumn
  | ModeColumn
  | CompletedColumn

const columns: Column[] = [
  {
    id: 'date',
    label: 'Date',
    format: value =>
      new Intl.DateTimeFormat().format(new Date(value)).toString(),
  },
  {
    id: 'timeSpent',
    label: 'Time Spent',
    format: (startTime, endTime) =>
      `${new Date(endTime - startTime).getMinutes()}m ${new Date(
        endTime - startTime
      ).getSeconds()}s`,
  },
  {
    id: 'startTime',
    label: 'Start Time',
    format: value =>
      new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      }).format(new Date(value)),
  },
  {
    id: 'endTime',
    label: 'End Time',
    format: value =>
      new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      }).format(new Date(value)),
  },
  {
    id: 'mode',
    label: 'Mode',
    format: value => value.toLowerCase(),
  },
  {
    id: 'completed',
    label: 'Compleated',
    format: value => (value ? 'compleated' : 'not compleated'),
  },
]

const Component: React.FC = () => {
  const [history] = useLocalStorage<IHistory>('history', [])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Container sx={{ width: '100%', height: '100%', padding: '10px' }}>
      <TableContainer
        sx={{
          height: '90%',
          '&::-webkit-scrollbar': {
            width: '0.4em',
            height: '0.4em',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align="left"
                  sx={{
                    padding: '5px 10px 10px 10px',
                    fontSize: '0.775rem',
                    lineHeight: '1rem',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {history
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover key={index}>
                  {columns.map(column => {
                    return (
                      <TableCell
                        key={column.id}
                        align="left"
                        sx={{
                          padding: '5px 10px',
                          fontSize: '0.775rem',
                          lineHeight: '1.1',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {column.id === 'timeSpent'
                          ? column.format(row.startTime, row.endTime)
                          : column.id === 'date'
                          ? column.format(row.startTime)
                          : column.id === 'startTime'
                          ? column.format(row.startTime)
                          : column.id === 'endTime'
                          ? column.format(row.endTime)
                          : column.id === 'mode'
                          ? column.format(row.mode)
                          : column.id === 'completed'
                          ? column.format(row.completed)
                          : ''}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          width: '100%',
          height: '10%',
          overflow: 'visible',
          '& .MuiToolbar-root': {
            width: '100%',
            minHeight: 'unset',
            paddingLeft: '5px',
            fontSize: '0.775rem',
            lineHeight: '1rem',
            '& .MuiTablePagination-selectLabel': {
              fontSize: '0.775rem',
              lineHeight: '1rem',
            },
            '& .MuiInputBase-root': {
              marginRight: '6px',
            },
            '& .MuiSelect-select': {
              paddingLeft: '2px',
              paddingRight: '20px',
            },
            '& .MuiTablePagination-displayedRows': {
              fontSize: '0.775rem',
              lineHeight: '1rem',
              maxWidth: '70px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            '& .MuiTablePagination-actions': {
              marginLeft: '8px',
            },
            '& .MuiButtonBase-root-JLPEZ': {
              padding: '2px',
            },
          },
        }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={history.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  )
}

export default Component
