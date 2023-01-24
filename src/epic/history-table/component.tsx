import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

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

interface DeleteColumn extends BaseColumnPops {
  id: 'delete'
}

type Column =
  | DateColumn
  | SpentColumn
  | TimeColumn
  | ModeColumn
  | CompletedColumn
  | DeleteColumn

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
  {
    id: 'delete',
    label: 'Delete',
  },
]

const Component: React.FC = () => {
  const [history, setHistory] = useLocalStorage<IHistory>('history', [])
  const theme = useTheme()

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

  const handleDelete = (startTime: number) => {
    setHistory(prev => {
      return prev.filter(item => item.startTime !== startTime)
    })
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
            background:
              theme.palette.mode === 'light'
                ? '#f1f1f1'
                : theme.palette.background.default,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor:
              theme.palette.mode === 'light' ? '#888' : '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.mode === 'light' ? '#555' : '#fbfbfb',
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
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        {column.id === 'timeSpent' ? (
                          column.format(row.startTime, row.endTime)
                        ) : column.id === 'date' ? (
                          <Link
                            to={`/stats?date=${row.startTime}`}
                            style={{ color: theme.palette.text.primary }}
                          >
                            {column.format(row.startTime)}
                          </Link>
                        ) : column.id === 'startTime' ? (
                          column.format(row.startTime)
                        ) : column.id === 'endTime' ? (
                          column.format(row.endTime)
                        ) : column.id === 'mode' ? (
                          column.format(row.mode)
                        ) : column.id === 'completed' ? (
                          <span
                            style={{
                              color: row.completed
                                ? theme.palette.success.main
                                : theme.palette.error.main,
                            }}
                          >
                            {column.format(row.completed)}
                          </span>
                        ) : column.id === 'delete' ? (
                          <DeleteOutlineOutlinedIcon
                            onClick={() => handleDelete(row.startTime)}
                            sx={{ cursor: 'pointer' }}
                          />
                        ) : (
                          ''
                        )}
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
