/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, MoonIcon, PlusIcon, CakeIcon } from '@heroicons/react/outline'
import { TextareaAutosize } from '@material-ui/core';
import query from 'api/useQuery';
import { queryKeys } from '../../api/queryKey';
import jwt_decode from 'jwt-decode';
import { STUDENT } from 'api/apiUrl';

export default function MessageComponent({handleSelect, roomOptions, studentsOption, state, setState}) {
  // const [open, setOpen] = useState(false)
  // const easysch_token = jwt_decode(localStorage?.easysch_token)
const handleRecipient = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const recipient = e.target.value
  setState({...state, steps:{group:  null, recipient}})
}
const handleGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const group = e.target.value
  setState({...state, steps:{recipient: state.steps.recipient, group}})
}
const handleStudent = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const student = e.target.value
  setState({...state, student, student_ids: [student]})
}
const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
  const title = e.target.value
  setState({...state, title})
}
const handleBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const body = e.target.value
  setState({...state, body})
}

  return (
    <div className="">
     <div className="my-2 min-w-full">
    <label htmlFor="recipient">Recipients</label>
    <select
      onChange={handleRecipient}
      id="recipient"
      name="recipient"
      autoComplete="recipient"
      required
      className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
      placeholder="Enter Course Name"
    >
      <option>Please Select Recipients</option>
      <option value="Single">
        Single
      </option>
      <option value="Group">Group</option>
    </select>
  </div>
  {
    state.steps.recipient==="Single" &&
     <div className="my-2 min-w-full">
    <label htmlFor="student">Select Student</label>
    <select
      onChange={handleStudent}
      id="student"
      name="student"
      autoComplete="student"
      required
      className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
      placeholder="Enter Course Name"
    >
      <option>Please Select Student</option>
      {
        studentsOption?.map((student, index)=> (
      <option key={index} value={student.value}>
        {student.label}
      </option>
        ))
      }
    </select>
  </div>
  }
  {
    state.steps.recipient==="Group" &&
     <div className="my-2 min-w-full">
    <label htmlFor="group">Group</label>
    <select
      onChange={handleGroup}
      id="group"
      name="group"
      autoComplete="group"
      required
      className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
      placeholder="Enter Course Name"
    >
      <option>Please Select Group</option>
      <option value="all">All Students</option>
      <option value="debtors">
        Debtors
      </option>
      {
        roomOptions?.map((room, index)=> (
          <>
          <option key={index} value={room.value}>
            {room.label} Students
          </option>
          </>
        ))
      }
    </select>
  </div>
  }
     <div className="my-2 min-w-full">
    <label htmlFor="title">Title</label>
    <input
      onChange={handleTitle}
      id="title"
      name="title"
      required
      autoComplete="title"
      placeholder="Please Enter Message Title"
      className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
      placeholder="Enter Course Name"
    />
  </div>
     <div className="my-2 min-w-full">
    <label htmlFor="body">Message</label>
  <TextareaAutosize onChange={handleBody} required id="body" placeholder="Enter Text Message Here....................." rowsMin={4} className="relative block w-full px-3 py-2 mb-1 mt-3 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm" />
              </div>
              </div>
  )
}
