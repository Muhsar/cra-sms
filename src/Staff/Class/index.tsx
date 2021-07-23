import React from 'react'
import Title from './Title'
import Table from './Table'

export default function Students({handleNameOrder, list, handleSearch, handleNext, handlePrevious, listCount, order}) {
  return (
    <>
      <Title handleSearch={handleSearch} />
      <Table handleNameOrder={handleNameOrder} list={list} handleNext={handleNext} handlePrevious={handlePrevious} listCount={listCount} order={order} />
    </>
  )
}
