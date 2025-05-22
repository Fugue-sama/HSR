
import { useEffect, useState } from "react"
import axios from "axios"

export const useReports = () => {
  const [reports, setReports] = useState([])
  useEffect(() => {
    axios.get('/api/reports').then(res => {
      setReports(res.data)
    })
  }, [])
  return reports
}