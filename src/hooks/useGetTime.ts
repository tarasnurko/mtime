import { useState, useEffect } from 'react'

const getSeconds = (miliseconds: number): string => {
  const time = Math.floor((miliseconds / 1000) % 60)
  return time > 9 ? time.toString() : `0${time}`
}

const getMinutes = (miliseconds: number): string => {
  const time = Math.floor(miliseconds / 1000 / 60)
  return time > 9 ? time.toString() : `0${time}`
}

const useGetTime = (): [string, string, number] => {
  const [minutes, setMinutes] = useState<string>('')
  const [seconds, setSeconds] = useState<string>('')
  const [miliseconds, setMiliseconds] = useState<number>(0)

  useEffect(() => {
    const removeEventListener = window.timerApi.getTime((data: number) => {
      if (data <= 0) {
        setMinutes('00')
        setSeconds('00')
      } else {
        setSeconds(getSeconds(data))
        setMinutes(getMinutes(data))
        setMiliseconds(data)
      }

      console.log(data)
    })

    return () => {
      removeEventListener()
      setSeconds('')
      setMinutes('')
      setMiliseconds(0)
    }
  }, [])

  return [minutes, seconds, miliseconds]
}

export default useGetTime
