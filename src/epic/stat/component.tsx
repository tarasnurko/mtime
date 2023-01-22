import React from 'react'

import {
  Typography,
  useTheme,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material'

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar'

interface IProps {
  title: string
  stats: {
    workTime: number
    restTime: number
  }
}

const Component: React.FC<IProps> = ({ title, stats }) => {
  const theme = useTheme()

  const getMinutes = (time: number) => (time / 1000 / 60).toFixed(2)
  const getHours = (time: number) => (time / 1000 / 60 / 60).toFixed(2)

  const overallMinutes = getMinutes(stats.workTime + stats.restTime)
  const overallHours = getHours(stats.workTime + stats.restTime)

  const workMinutes = getMinutes(stats.workTime)
  const workHours = getHours(stats.workTime)

  const workPercentage = Math.round(
    (100 * stats.workTime) / (stats.workTime + stats.restTime)
  )

  const restMinutes = getMinutes(stats.restTime)
  const restHours = getHours(stats.restTime)

  const workColor =
    theme.palette.mode === 'light'
      ? theme.palette.primary.main
      : theme.palette.primary.dark
  const restColor =
    theme.palette.mode === 'light'
      ? theme.palette.secondary.main
      : theme.palette.secondary.dark

  return (
    <Card sx={{ overflow: 'unset' }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        {stats.workTime || stats.restTime ? (
          <>
            <Grid
              container
              sx={{ marginTop: '10px', alignItems: 'center' }}
              columnSpacing={1}
            >
              <Grid item xs={6}>
                <Box sx={{ width: '100%' }}>
                  <CircularProgressbarWithChildren
                    value={workPercentage}
                    strokeWidth={6}
                    styles={{
                      root: { width: '100%' },
                      trail: { stroke: theme.palette.grey[300] },
                      path: {
                        stroke: workColor,
                      },
                    }}
                  >
                    <CircularProgressbar
                      value={100 - workPercentage}
                      strokeWidth={6}
                      counterClockwise
                      styles={{
                        root: {
                          width: '100%',
                          marginTop: '-19px',
                          marginLeft: '1px',
                        },
                        trail: {
                          color: 'transparent',
                          strokeLinecap: 'butt',
                        },
                        path: {
                          stroke: restColor,
                        },
                      }}
                    />
                  </CircularProgressbarWithChildren>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="subtitle2">Overall:</Typography>
                  <Typography variant="body2">
                    {overallMinutes}m ({overallHours}h)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container rowSpacing={2} sx={{ marginTop: '10px' }}>
              <Grid container columnSpacing={1}>
                <Grid item xs={4}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    Work:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">
                    {workMinutes}m ({workHours}h) | {workPercentage}%
                  </Typography>
                </Grid>
              </Grid>
              <Grid container columnSpacing={1}>
                <Grid item xs={4} sx={{ color: theme.palette.secondary.main }}>
                  <Typography variant="subtitle2">Rest:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">
                    {restMinutes}m ({restHours}h) | {100 - workPercentage}%
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography variant="subtitle1">No Data</Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default Component
