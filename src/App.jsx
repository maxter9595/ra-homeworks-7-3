import { useState, useEffect } from 'react'
import { MonthTable, YearTable, SortTable } from './components/Tables'
import './styles/main.css'

export default function App() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json')
      .then(response => response.json())
      .then(data => {
        setList(data.list)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <div id="app">
      <MonthTable list={list} />
      <YearTable list={list} />
      <SortTable list={list} />
    </div>
  )
}