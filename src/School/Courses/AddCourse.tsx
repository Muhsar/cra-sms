import { Dialog, DialogTitle, DialogContent, TextareaAutosize } from '@material-ui/core'
import React from 'react'
import { MultipleAutoComplete } from 'components/AutoComplete'

export default function FormDialog({handleSubmit, handleChange, state, setState, rooms, open, setOpen}) {
  // const [open, setOpen] = React.useState<boolean>(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClickClose = () => {
    setOpen(false)
  }
  
  const [options, setOptions] = React.useState([])
  const [selected, setSelected] = React.useState([])
  React.useEffect(() => {
    setOptions(rooms?.map(room => {
      const newOption = { label: room.name, value: room.id }
      return newOption
    }))
    setState({
      ...state,
      class_ids: selected.map(val => {
        const classId = val.value
        return classId
    })})
  },[rooms, selected])
  return (
    <>
      <button
        onClick={handleClickOpen}
        type="button"
        className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Add New Course
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
                    <h6 className="mb-0">Add New Course </h6>
                        </div>
          </div>
        </DialogTitle>
        <DialogContent className='my-auto h-96'>
          <form onSubmit={handleSubmit} className='mx-3 mb-3'>
          <div className='my-2'>
              <label htmlFor="name">
                Course Name
              </label>
              <input onChange={handleChange}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Enter Course Name"
              />
            </div>
            <div>
      <h1>Select Classes</h1>
              {/* <pre>{JSON.stringify(selected)}</pre> */}
              <MultipleAutoComplete
                data={options}
                value={selected}
                setValue={setSelected}
                classStyles="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
              />
    </div>
            
          <div>
            <button
              type="submit"
              className="relative mt-5 flex justify-center w-full py-2 text-sm font-medium text-white border border-transparent rounded-md cursor-pointer group bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Add New Course
            </button>
              </div>
        </form>
</DialogContent>
</Dialog>
    </>
  )
}
