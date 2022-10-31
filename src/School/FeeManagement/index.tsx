import React from 'react'
import Title from './Title'
import Table from './Table'
import { ClassList } from 'Mock/ClassList';
import { Nigeria } from 'components/state&lga';

export default function FeeManagement({state, handleChange, handleSelect, handleSubmit, handleSearch, setState, history, students, open, setOpen, bill}) {
  return (
    <>
      <Title handleSearch={handleSearch} handleSubmit={handleSubmit} state={state} handleChange={handleChange} setState={setState} handleSelect={handleSelect} students={students} open={open} setOpen={setOpen} bill={bill} />
      <Table history={history} />
    </>
  )
}
