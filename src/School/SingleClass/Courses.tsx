import React from 'react'
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Switch } from '@headlessui/react'
import { MultipleAutoComplete } from 'components/AutoComplete';
export default function SingleClassCourses({courses, roomCourses, handleSubmit, state, setState, selected, setSelected, open, setOpen  }) {
  // const [open, setOpen] = React.useState<boolean>(false)
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
// const [open, setOpen] = React.useState(false)
  const handleClickOpen = (e:any) => {
    e.preventDefault()
    setOpen(true)
  }
  const handleClickClose = () => {
    setOpen(false)
  }

  const [options, setOptions] = React.useState(courses?.map(course => {
    const newOption = { label: course.name, value: course.id }
    return newOption
  }))
  // const [selected, setSelected] = React.useState([])
  // const [state, setState] = React.useState()
  const [subjects, setSubjects] = React.useState([])
  const handleEnabled = (id) => {
    const subjectValue = subjects.find(subject => subject.subject_id === id) 
    setState({
      subjects: state?.subjects?.map(subject => {
      const newSubject = { subject_id: subject.subject_id, is_compulsory: subject.subject_id === id ? !subject.is_compulsory : subject.is_compulsory, name: subject.name }
      return newSubject
    })})
  }
  React.useEffect(() => {
    setOptions(courses?.map(course => {
      const newOption = { label: course.name, value: course.id }
      return newOption
    }))
    setState({
      subjects: selected?.map(val => {
        const subject = {subject_id: val.value, is_compulsory: true, name: val.label}
        return subject
      })
    })
    // if (selected) {
    //   setSubjects(selected?.map(option => {
    //     const subject = {subject_id: option.value, is_compulsory: true, name: option.label}
    //     return subject
    //   }))
    // }
    },[courses, selected, subjects])
  return (
    <>
      <div className="py-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <h2 className="text-xl leading-6 font-medium text-gray-900">
        Assigned Courses
      </h2>
      <div className="mt-3 sm:mt-0 sm:ml-4">
        <label htmlFor="search_candidate" className="sr-only">
          Search
        </label>
        <div className="flex rounded-md shadow-sm">
          <div className="relative flex-grow focus-within:z-10">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {/* <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" /> */}
            </div>
          </div>
          {/* <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
          >
            <SortAscendingIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            <span className="ml-2">Sort</span>
            <ChevronDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          </button> */}
            {/* <SlideOver title="Add Course" Component={Component} /> */}
            <>
      <button
        onClick={handleClickOpen}
        type="button"
        className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Assign Course
      </button>
      <Dialog onClose={handleClickClose} aria-labelledby="simple-dialog-title" open={open} fullWidth className="">
        <DialogTitle id="simple-dialog-title">
        <div className="modal-title d-flex align-items-center" id="modal-title-change-username">
                        <div>
                            <div className="mr-3 shadow icon icon-sm icon-shape icon-success rounded-circle">
                                {/* <LocalAtmIcon className='cursor-pointer ' /> */}
                            </div>
                        </div>
                        <div>
                    <h6 className="mb-0">Assign Course </h6>
                        </div>
          </div>
        </DialogTitle>
        <DialogContent className='my-auto h-96'>
                  <form
                    onSubmit={handleSubmit}
                    className='mx-3 mb-3'>
          <div>
              
      <h1 className='my-2'>Select New Course To Add</h1>
                      <MultipleAutoComplete
                      data={options}
                      value={selected}
                      setValue={setSelected}
                      classStyles="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                      />
                    </div>
                    <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-4">
                      {
                        state?.subjects && state?.subjects?.map(subject => (
                          <Switch.Group as="div" className="flex items-center p-4 shadow m-4">
      <Switch
        checked={subject.is_compulsory}
        onChange={()=>handleEnabled(subject.subject_id)}
        className={classNames(
          subject.is_compulsory ? 'bg-gray-700' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            subject.is_compulsory ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
            )}
            />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900">{subject.name} </span>
        {/* <span className="text-sm text-gray-500">(Save 10%)</span> */}
      </Switch.Label>
    </Switch.Group>
            ))
          }
                    </div>
            
          <div>
            <button
              type="submit"
              className="relative mt-5 flex justify-center w-full py-2 text-sm font-medium text-white border border-transparent rounded-md cursor-pointer group bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Assign Course
            </button>
              </div>
        </form>
</DialogContent>
</Dialog>
    </>
          {/* <FormDialog handleSubmit={handleSubmit} handleChange={handleChange} state={state} setState={setState} rooms={rooms} /> */}
        </div>
      </div>
    </div>
     
      <div className="flex flex-wrap -m-2 pt-5" id="Guests">
      {roomCourses?.map((course: any, index) => (
        <div
          className="w-full p-2 lg:w-1/3 md:w-1/2 sm:w-full searchBody"
          key={index}
        >
          <div className="flex items-center h-full p-4 transform border border-gray-200 rounded-lg shadow hover:scale-105  cursor-pointer hover:bg-gray-200 bg-gray-100">
            <div
              className={`avatar avatar-lg text-white flex-shrink-0 rounded-full mr-4 bg-gray-700 p-3`}
            >
            </div>
            <div className="flex-grow">
              <h2 className="font-medium text-gray-900 title-font">{course.subject.name}</h2>
              {/* <p className="font-medium text-gray-900 title-font">{room?.name}</p> */}
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}
