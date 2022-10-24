import React from 'react'
import FeeList from './FeeList'
import FeeTable from './FeeTable'

export default function FeeHistory({history}) {
  return (
    <>
      <FeeTable history={history} />
      <FeeList history={history} />
    </>
  )
}
