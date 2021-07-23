import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import React from 'react'
import { MultipleAutoComplete } from 'components/AutoComplete'

export default function StudentCourseForm({courses, handleSelect, state, selected, setSelected, setState, handleSubmit, open, setOpen}) {
  // const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState()
  React.useEffect(() => {
  const newOptions = (courses && courses?.map(course => {
          const val = { label: course?.subject.name, value: course?.id }
          return val
}
  ))
    setOptions(newOptions)
    setState({
      ...state,
      subject_ids: selected.map(id => {
        const ids = id.value
        return ids
      })
    })
  }, [state?.class_id, selected, courses])
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Assign Course
      </button>
      <Dialog open={open} onClose={()=>setOpen(false)} aria-labelledby="form-dialog-title" fullWidth>
          <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Assign Course</DialogTitle>
        <DialogContent>
      
            <div className="sm:col-span-full pt-5 pb-12">
            <label className="block text-sm font-medium text-gray-700">
              Select Classes
            </label>
              {
                options &&
                <MultipleAutoComplete
                data={options}
                value={selected}
                setValue={setSelected}
                classStyles="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                />
              }
          </div>
        </DialogContent>
        <DialogActions className="pt-5">
            <button
              type="button"
              onClick={()=>setOpen(false)}
        className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Cancel
      </button>
          <button
        type="submit"
        className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Assign
      </button>
        </DialogActions>
          </form>
      </Dialog>
      </>
  )
}
