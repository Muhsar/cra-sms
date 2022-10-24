import React from "react"
import {Doughnut} from 'react-chartjs-2';

export default function DebtorsChart({debt, paid}) {
  const [chart, setChart] = React.useState({
    labels: [
      `Debt: #${debt}`,
      `Paid: #${paid}`,
    ],
    datasets: [{
      data: [debt, paid],
      backgroundColor: [
      '#dc2626',
      '#059669',
      ],
      hoverBackgroundColor: [
      '#bb1d1d',
      '#076548',
      ]
    }]
  })
  React.useEffect(()=> {
    setChart({
      labels: [
        `Debt: #${debt}`,
        `Paid: #${paid}`,
      ],
      datasets: [{
        data: [debt, paid],
        backgroundColor: [
        '#dc2626',
        '#059669',
        ],
        hoverBackgroundColor: [
        '#bb1d1d',
        '#076548',
        ]
      }]
    })
  },[debt, paid])
  return (
    <>
    <div
      className="relative bg-white p-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden h-auto w-auto"
    >
    <>
      <h2 className="text-xl leading-6 font-medium text-gray-900">Debtors Stats</h2>
      <Doughnut
        // className="h-auto w-auto"
        data={chart}
        width={200}
        height={200}
      />
    </>
    </div>
    </>
  )
}
