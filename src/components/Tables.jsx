import { useMemo } from 'react'

function withDataTransform(WrappedComponent, transformFunction) {
  return function(props) {
    const transformedData = useMemo(() => transformFunction(props.list), [props.list])
    return <WrappedComponent {...props} list={transformedData} />
  }
}

export function YearTableBase(props) {
  return (
    <div>
      <h2>Year Table</h2>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item, index) => (
            <tr key={index}>
              <td>{item.year}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function SortTableBase(props) {
  return (
    <div>
      <h2>Sort Table</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function MonthTableBase(props) {
  return (
    <div>
      <h2>Month Table</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function transformYearData(data) {
  const yearMap = {}
  
  data.forEach(item => {
    const year = new Date(item.date).getFullYear()
    if (!yearMap[year]) {
      yearMap[year] = 0
    }
    yearMap[year] += item.amount
  })
  
  return Object.keys(yearMap)
    .map(year => ({ year: parseInt(year), amount: yearMap[year] }))
    .sort((a, b) => b.year - a.year)
}

function transformMonthData(data) {
  const monthMap = {};
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();

  data.forEach(item => {
    const date = new Date(item.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    
    if (year === currentYear) {
      if (!monthMap[month]) {
        monthMap[month] = 0;
      }
      monthMap[month] += item.amount;
    }
  });

  return Object.entries(monthMap)
    .map(([month, amount]) => ({ 
      month: monthNames[parseInt(month) - 1], 
      amount 
    }))
    .sort((a, b) => {
      const monthIndexA = monthNames.indexOf(a.month);
      const monthIndexB = monthNames.indexOf(b.month);
      return monthIndexB - monthIndexA;
    });
}

function transformSortData(data) {
  return [...data]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(item => ({ date: item.date, amount: item.amount }))
}

export const YearTable = withDataTransform(YearTableBase, transformYearData)
export const MonthTable = withDataTransform(MonthTableBase, transformMonthData)
export const SortTable = withDataTransform(SortTableBase, transformSortData)