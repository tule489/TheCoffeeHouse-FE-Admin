import React, { useEffect, useState } from 'react'
import { Box, LinearProgress } from '@mui/material'
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'

import axios from 'axios'
import domainName from 'src/environment/domainName'

const Stats = () => {
  const [selectedValue, setSelectedValue] = useState('Month')
  const [selectedMonth, setSelectedMonth] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [dataByDay, setDataByDay] = useState(
    Array.apply(null, Array(31)).map(function () {
      return 0
    }),
  )
  const [dataByMonth, setDataByMonth] = useState(
    Array.apply(null, Array(12)).map(function () {
      return 0
    }),
  )

  const date = new Date()
  const defaultListMonth = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ]
  const defaultListDay = [
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
    '13th',
    '14th',
    '15th',
    '16th',
    '17th',
    '18th',
    '19th',
    '20th',
    '21th',
    '22th',
    '23th',
    '24th',
    '25th',
    '26th',
    '27th',
    '28th',
    '29th',
    '30th',
    '31th',
  ]
  var listMonth = []
  var listDay = []
  var timeLineByMonth

  if (date.getMonth() === 0) {
    timeLineByMonth = `Tháng 1 ${date.getFullYear()}`
    listMonth.push(defaultListMonth[0])
  } else if (date.getMonth() === 11) {
    timeLineByMonth = `Tháng 1 - Tháng 12 ${date.getFullYear()}`
    for (let i = 0; i <= date.getMonth(); i++) {
      listMonth.push(defaultListMonth[i])
    }
  } else {
    timeLineByMonth = `Tháng 1 - Tháng ${date.getMonth() + 1} ${date.getFullYear()}`
    for (let i = 0; i <= date.getMonth(); i++) {
      listMonth.push(defaultListMonth[i])
    }
  }
  if (selectedValue === 'Day') {
    for (let i = 0; i < new Date(date.getFullYear(), Number(selectedMonth) + 1, 0).getDate(); i++) {
      listDay.push(defaultListDay[i])
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      var temp_1 = Array.apply(null, Array(31)).map(function () {
        return 0
      })

      var temp_2 = Array.apply(null, Array(12)).map(function () {
        return 0
      })

      if (selectedValue === 'Day') {
        const responseOrderByDay = await axios.get(
          `${domainName}/api/v1/report/getOrderByDay/${Number(selectedMonth) + 1}`,
        )
        responseOrderByDay.data.data.forEach((element) => {
          temp_1[element.day - 1] = element.totalMoney
        })
      } else {
        const responseOrderByMonth = await axios.get(
          `${domainName}/api/v1/report/getOrderByMonth/${date.getFullYear()}`,
        )
        responseOrderByMonth.data.data.forEach((element) => {
          temp_2[element.month - 1] = element.totalMoney
        })
      }

      setDataByDay(temp_1)
      setDataByMonth(temp_2)
    }
    fetchData()
  }, [selectedMonth, selectedValue])

  const onDownload = async () => {
    setIsLoading(true)
    await axios
      .post(`${domainName}/api/v1/report/export/excel`, '', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        responseType: 'arraybuffer',
      })
      .then((result) => {
        const link = document.createElement('a')
        const now = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        link.href = window.URL.createObjectURL(new Blob([result.data]))
        link.setAttribute('download', `Bao-cao-doanh-thu_${now}.xlsx`)
        document.body.appendChild(link)
        link.click()
        setIsLoading(false)
      })
  }

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (
        ''
      )}

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Doanh thu
              </h4>
              <div className="small text-medium-emphasis">
                {selectedValue === 'Month' ? (
                  timeLineByMonth
                ) : (
                  <select
                    style={{ border: '1px solid rgba(0,0,0,0.1)', marginTop: '5px' }}
                    value={selectedMonth}
                    onChange={(event) => {
                      setSelectedMonth(event.target.value)
                    }}
                  >
                    {listMonth.map((month, key) => {
                      return (
                        <option key={key} value={key}>
                          {month} {date.getFullYear()}
                        </option>
                      )
                    })}
                  </select>
                )}
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton
                color="primary"
                className="float-end"
                onClick={onDownload}
                disabled={isLoading}
              >
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === selectedValue}
                    onClick={() => setSelectedValue(value)}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '420px', marginTop: '40px', width: '100%' }}
            data={{
              labels: selectedValue === 'Month' ? listMonth : listDay,
              datasets: [
                {
                  label: 'Doanh thu',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: selectedValue === 'Month' ? dataByMonth : dataByDay,
                  fill: true,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Stats
