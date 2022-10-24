import React, { Fragment, useRef, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, TextareaAutosize } from '@material-ui/core'
import { ExclamationIcon, MoonIcon, PlusIcon, CakeIcon } from '@heroicons/react/outline'
import ModalLayout from 'components/Modal'
// import { DialogTitle, TextareaAutosize } from '@material-ui/core';

export default function ScoreModal({setID,
  ID,
  handleChange,
  handleSubmit,
  personId,
  open,
  setOpen,
  Component
}) {
  // const [open, setOpen] = useState(false)
  
  const cancelButtonRef = useRef()
  const trigger = Component(setOpen)
  const content =  (
    <>
      <form onSubmit={handleSubmit} className='mx-3 mb-3'>
          <div className='my-2'>
              <label htmlFor="name">
                First CA
              </label>
              <input onChange={handleChange}
                id="first_ca"
                name="first_ca"
                type="number"
                autoComplete="first_ca"
                
                className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Enter First CA Score"
              />
            </div>
          <div className='my-2'>
              <label htmlFor="name">
                Second CA
              </label>
              <input onChange={handleChange}
                id="second_ca"
                name="second_ca"
                type="number"
                autoComplete="second_ca"
                
                placeholder="Enter Second CA Score"
                className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
              />
            </div>
          <div className='my-2'>
              <label htmlFor="name">
                Exam
              </label>
              <input onChange={handleChange}
                id="exam"
                name="exam"
                type="number"
                autoComplete="exam"
                
                placeholder="Enter Exam Score"
                className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
              />
            </div>
            
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full py-2 mt-5 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md cursor-pointer group hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Save
            </button>
              </div>
        </form>
      </>
    )
  
  const title = "Add/Edit Students Score"
  return (
    <>
      {/* {trigger} */}
      <ModalLayout title={title} content={content} trigger={trigger} open={open} setOpen={setOpen} />
      </>
  )
}
