import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import React from "react";

export default function FormDialog({
  handleChange,
  handleSubmit,
  open,
  setOpen,
}) {
  const [state, setState] = React.useState({
    name: "",
    fee: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button
        onClick={()=>setOpen(true)}
        type="button"
        className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Create Class
      </button>
      <Dialog
        onClose={()=>setOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle id="simple-dialog-title">
          <div
            className="modal-title d-flex align-items-center"
            id="modal-title-change-username"
          >
            <div>
              <div className="mr-3 shadow icon icon-sm icon-shape icon-success rounded-circle"></div>
            </div>
            <div>
              <h6 className="mb-0">Add New Class </h6>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="mx-3 mb-3">
            <div className="my-2">
              <label htmlFor="name">Class Name</label>
              <input
                onChange={handleChange}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Enter Class Name"
              />
            </div>

            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full py-2 text-sm font-medium text-white border border-transparent rounded-md cursor-pointer group bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Create Class
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
