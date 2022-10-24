/* This example requires Tailwind CSS v2.0+ */
import { Dialog, DialogTitle, DialogContent, TextareaAutosize } from '@material-ui/core'
import React from 'react'

export default function NewModal({
  // setID,
    // ID,
    handleChange,
    handleSubmit,
    // personId,
    open,
    setOpen,
    Component,
    Trigger
  }) {
//   const [open, setOpen] = useState(true)
// const trigger = Component()
  return (
      <>
      {/* <Component /> */}
      {Trigger}
      <Dialog onClose={()=>setOpen(false)} aria-labelledby="simple-dialog-title" open={open} fullWidth className="">
        <DialogTitle id="simple-dialog-title">
        <div className="modal-title d-flex align-items-center" id="modal-title-change-username">
                        <div>
                            <div className="mr-3 shadow icon icon-sm icon-shape icon-success rounded-circle">
                                {/* <LocalAtmIcon className='cursor-pointer ' /> */}
                            </div>
                        </div>
                        <div>
              <h6 className="mb-0">
                
              </h6>
                        </div>
          </div>
        </DialogTitle>
        <DialogContent className='my-auto h-96'>
          {Component}
</DialogContent>
</Dialog>
                    </>
  )
}
