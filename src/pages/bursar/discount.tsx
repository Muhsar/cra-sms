import { ChevronDownIcon, SearchIcon, SortAscendingIcon } from '@heroicons/react/outline'
import { DialogContent, DialogTitle } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import { SettingsInputComponent } from '@material-ui/icons'
import { getRequest, postRequest } from 'api/apiCall'
import { STUDENTBASIC, ADDDISCOUNT, GETDISCOUNT } from 'api/apiUrl'
import { queryKeys } from 'api/queryKey'
import { ToastContext } from 'App'
import { SingleAutoComplete } from 'components/AutoComplete'
import BursarLayout from 'components/BursarLayout'
import ModalLayout from 'components/Modal'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import React from 'react'
import { useMutation, useQuery } from 'react-query'

export default function Discount() {
  const easysch_token: { school_uid: any } = jwtDecode(
    localStorage?.easysch_token
  );
  const [state, setState] = React.useState({
    student_id: null,
    fee: ""
  })
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<any>();
  const { data: studentList } = useQuery(
    [queryKeys.getStudents, easysch_token?.school_uid],
    async () => await getRequest({ url: STUDENTBASIC(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid,
    }
  );
  const { data: debtList } = useQuery(
    [queryKeys.getDebtors, easysch_token?.school_uid],
    async () => await getRequest({ url: GETDISCOUNT(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid,
    }
  );
  const [students, setStudents] = React.useState(studentList?.data);
  const [debtors, setDebtors] = React.useState(debtList?.data);
  React.useEffect(() => {
    setStudents(studentList?.data);
    setDebtors(debtList?.data)
  }, [ studentList?.data, debtList?.data]);
  console.log(debtors)
  React.useEffect(() => {
    setState({
      ...state,
      student_id: value
    })
  }, [value])
  const data = students?.map(student => {
    const val = { label: student.full_name, value: student.id }
    return val
  })
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      fee: e.target.value
    })
  }
  const { showAlert } = React.useContext(ToastContext);
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      });
      setOpen(false);
      // cache.invalidateQueries();
    },
  });
  const handleSubmit = (e: any) => {
    e.preventDefault()
    mutate({
      url: ADDDISCOUNT(easysch_token?.school_uid, state.student_id),
      data: {
        amount: state.fee,
        student_id: state.student_id,
        bill_type: "school_fee",
        // unit: 1
      }
    })
  }
  return (
    <BursarLayout currentPage="Discount">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900 capitalize">
          Student Discount
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
        <label htmlFor="search_candidate" className="sr-only">
          Search
        </label>
        <div className="flex rounded-md shadow-sm">
          <div className="relative flex-grow focus-within:z-10">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="search"
              name="search_students "
              id="search_students"
              className="block w-full pl-10 border-gray-300 focus:ring-gray-500 focus:border-gray-500 rounded-md sm:hidden"
              placeholder="Search"
              // onChange={handleSearch}
            />
            <input
              type="search"
              name="search_students"
              id="search_students"
              className="hidden w-full pl-10 border-gray-300 focus:ring-gray-500 focus:border-gray-500 rounded-md sm:block sm:text-sm"
              placeholder="Search students"
              // onChange={handleSearch}
            />
          </div>
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-gray-900 rounded-md bg-gray-900 hover:bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 hover:text-gray-900 ml-2"
            onClick={()=>setOpen(true)}
          >
           Add Discount
          </button>
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
                Add Discount
              </h6>
                        </div>
          </div>
        </DialogTitle>
        <DialogContent className='my-auto h-auto'>
        <form
            onSubmit={handleSubmit}
            className='mx-3 mb-3'>
        <div className='my-2'>
              <label htmlFor="student_id">
                Select Student
              </label>
              <SingleAutoComplete
              value={value}
              data={data}
              setValue={setValue}
              classStyles="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
              />
            </div>
            <div className='my-2'>
              <label htmlFor="fee">
                Enter School Fee For Student
              </label>
              <input 
              onChange={handleChange}
                id="fee"
                name="fee"
                type="number"
                autoComplete="fee"
                required
                className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Enter Outstanding Debt"
              />
            </div>
            <div>
            <button
              type="submit"
              className="relative flex justify-center w-full py-2 text-sm font-medium text-white border border-transparent rounded-md cursor-pointer group bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Add Discount
            </button>
              </div>
        </form>
</DialogContent>
</Dialog>
          {/* <SlideOver title="Add Students" Component={Component} open={open} setOpen={setOpen} /> */}
        </div>
      </div>
      </div>
      <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    School Fee Discount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Added By
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody
                className="bg-white divide-y divide-gray-200"
                id="PaymentHistory"
              >
                {debtors?.map((debtor) => (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      
                          <div className="text-sm font-medium text-gray-900 text-center">
                            {debtor.student.full_name}
                          </div>
                          
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-center">
                        #{debtor.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-center">
                      {debtor.creator.full_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-center">
                        {moment(debtor.date_added).format("LL")}
                      </div>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </BursarLayout>
  )
}
