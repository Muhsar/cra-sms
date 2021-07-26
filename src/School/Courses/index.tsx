import React from 'react'
import Title from './Title'
import Table from './Table'
import { ClassList } from 'Mock/ClassList';
import { Nigeria } from 'components/state&lga';
import CourseCards from './CourseCards';

export default function Courses({state, handleChange, handleSubmit, handleSearch, setState, rooms, courses, open, setOpen, school, selected, setSelected}) {
  return (
    <>
      <Title handleSearch={handleSearch} handleSubmit={handleSubmit} state={state} handleChange={handleChange} setState={setState} rooms={rooms} open={open} setOpen={setOpen} selected={selected} setSelected={setSelected} />
      {/* <Table handleNameOrder={handleNameOrder} list={list} handleNext={handleNext} handlePrevious={handlePrevious} listCount={listCount} order={order} courses={courses} /> */}
      <CourseCards courses={courses} school={school} />
    </>
  )
}
