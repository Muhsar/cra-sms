import { Dialog, DialogTitle, DialogContent, TextareaAutosize } from '@material-ui/core'
import React from 'react'
import { SingleAutoComplete } from 'components/AutoComplete'

export default function FormDialog({handleSubmit, handleChange, state, setState, handleSelect, students, open, setOpen, bill}) {

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClickClose = () => {
    setOpen(false)
  }
  const [value, setValue] = React.useState<any>();
  
  React.useEffect(() => {
    setState({
      ...state,
      student_id: value,
      fee: students?.filter(std=>std.id===value)[0]?.fee
    })
  }, [value])
  const data = students?.map(student => {
    const val = { label: student.full_name, value: student.id }
    return val
  })
  console.log(state.amount_left)
  return (
    <>
      <button
        onClick={handleClickOpen}
        type="button"
        className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Make Payment
      </button>
      <Dialog onClose={handleClickClose} aria-labelledby="simple-dialog-title" open={open} fullWidth>
        <DialogTitle id="simple-dialog-title">
        <div className="modal-title d-flex align-items-center" id="modal-title-change-username">
                        <div>
                            <div className="mr-3 shadow icon icon-sm icon-shape icon-success rounded-circle">
                            </div>
                        </div>
                        <div>
                    <h6 className="mb-0">Make Payment </h6>
                        </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit}
            className='mx-3 mb-3'>
         
          <div className='my-2'>
              <label htmlFor="student_id">
                Select Student
              </label>
              {
                students?.length &&
              <SingleAutoComplete
              value={value}
              data={data}
              setValue={setValue}
              classStyles="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
              />
            }
            </div>
          <div className='my-2'>
              <label htmlFor="student_bill_id">
                What are you paying for?
              </label>
              <select
              name='student_bill_id'
              id='student_bill_id'
              onChange={handleSelect}
                className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
              >
                <option value="">Please Select What You Are Paying For</option>
                {
                  bill?.map((fee)=>(
                    <option value={fee.id}>{fee.bill.display_name}</option>
                  ))
                }
              </select>
            </div>
            <div className="my-2">
              <label htmlFor="source">Please Select Either Cash Or Transfer</label>
              <select
                required
                name="source"
                id="source"
                onChange={handleSelect}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              >
                <option value="">Please Select Payment Type</option>
                <option value="cash">Cash</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
             <div className='my-2'>
              <label htmlFor="amount">
                Amount Left # {state.amount_left}
              </label>
              <input onChange={handleChange}
                id="amount"
                name="amount"
                type="number"
                max={Number(state.amount_left)}
                autoComplete="amount"
                required
                className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Enter Amount Paid"
              />
            </div>
            <div className="mb-2">

            </div>
            
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full py-2 text-sm font-medium text-white border border-transparent rounded-md cursor-pointer group bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Make Payment
            </button>
              </div>
        </form>
</DialogContent>
</Dialog>

    </>
  )
}
