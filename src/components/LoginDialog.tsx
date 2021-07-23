/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog } from "@material-ui/core";
import { ExclamationIcon, OfficeBuildingIcon, UserCircleIcon } from "@heroicons/react/outline";
import {Link} from "react-router-dom"
export default function LoginDialog({open, setOpen, school}) {
  // const [open, setOpen] = useState(false);

  // const cancelButtonRef = useRef();

  return (
    <>
      <Dialog onClose={()=>setOpen(false)} aria-labelledby="simple-dialog-title" open={open} fullWidth>
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden mx-auto transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-center max-w-md">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-grow">
      <h3 className="text-lg leading-6 text-gray-900 font-dosis">Choose Account</h3>
      <div className="mt-3 mb-3 px-3">
                                      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                                          <Link to={`/${school}/school/`}><div className="border border-grey-500 cursor-pointer p-4 shadow text-gray-700 transition-all transform hover:scale-105">
                                              <p className="text-center">School Owner</p>
                                          </div>
                                          </Link>
                                          <Link to={`/${school}/staff/`}><div className="border border-grey-500 cursor-pointer p-4 shadow text-gray-700 transition-all transform hover:scale-105">
                                              <p className="text-center">Teacher</p>
                                          </div>
                                          </Link>
                                      </div>
                   
                  </div>
                  </div>
                  </div>
                  </div>
    </Dialog>
      </>
  );
}
