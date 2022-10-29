/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getRequest, postRequest } from "api/apiCall";
import { ADDBILL, GETBILL, HOMEROOMS } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import SchoolLayout from "components/SchoolLayout";
import jwtDecode from "jwt-decode";
import React from "react";
import { useMutation, useQuery } from "react-query";
import AddBill from "School/Bill/AddBill";
import { TfiPencilAlt, TfiTrash } from "react-icons/tfi";
import { TbCurrencyNaira } from "react-icons/tb"
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { ToastContext } from "App";
import sum from "components/sum";

export default function Bill() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    class_id: null,
    bills: [],
    name: "",
    kind: "old_and_new_student",
    unit: "1",
    amount: "",
    is_compulsory: false,
    edit: false,
    id: "",
    fee: "",
    display_name: "",
  });
  const easysch_token: { school_uid: any } = jwtDecode(
    localStorage?.easysch_token
  );
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "display_name"){
      setState({...state, display_name: e.target.value, name: e.target.value.toLowerCase().replace(" ", "_") });
    }
    else{
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };
  const { data: homerooms } = useQuery(
    [queryKeys.getClasses, easysch_token?.school_uid],
    async () => await getRequest({ url: HOMEROOMS(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid,
    }
  );
  const { data: billdata } = useQuery(
    [queryKeys.getBills, easysch_token?.school_uid],
    async () => await getRequest({ url: GETBILL(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid,
    }
  );
  const [bills, setBills] = React.useState(billdata?.data);
  const [rooms, setRooms] = React.useState(homerooms?.data);
  React.useEffect(() => {
    setRooms(homerooms?.data);
    setBills(billdata?.data)
  }, [homerooms?.data, billdata?.data]);
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const AddToBill =()=>{
    setState({
        ...state,
        bills: [
            ...state.bills,
            {
                name: state.display_name.toLowerCase().replace(" ", "_"),
                display_name: state.display_name,
                unit: state.unit,
                amount: Number(state.amount),
                is_compulsory: state.is_compulsory,
                id: Math.random(),
                kind: state.kind,
            }
        ]
    })
  }
  React.useEffect(()=>{
    setState({
        ...state,
        name: "",
        display_name: "",
        unit: "1",
        amount: "",
        id: "",
        edit: false,
        is_compulsory: false
    })
  },[state.bills])

  const EditBill=(id: any)=>{
    const filteredBill = state?.bills.filter(fee=>fee.id===id)[0]
    setState({
        ...state,
        name: filteredBill.name,
        display_name: filteredBill.display_name,
        amount: filteredBill.amount,
        is_compulsory: filteredBill.is_compulsory,
        unit: filteredBill.unit,
        id: filteredBill.id,
        edit: true,
        kind: filteredBill.kind,
    })
  }
  const DeleteBill=(id: any)=>{
    setState({
        ...state,
        bills: state.bills.filter(fee=>fee.id!==id)
    })
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(state)
    mutate({
      url: ADDBILL(easysch_token?.school_uid, state.class_id),
      data: {
        bills: [
          {display_name: "School Fee", unit: 1, amount: state.fee, kind: "old_and_new_student", is_compulsory: true, name: "school_fee"},
          ...state.bills,
        ]
      }
    })

  }
  const UpdateBill =(id: any)=> {
    console.log(id)
    setState({
        ...state,
        bills: state.bills.map(fee=>{
            return {
                name: fee.id===id ? state.display_name.toLowerCase().replace(" ", "_") : fee.name,
                display_name: fee.id===id ? state.display_name : fee.display_name,
                unit: fee.id===id ? state.unit : fee.unit,
                is_compulsory: fee.id===id ? state.is_compulsory : fee.is_compulsory,
                id: fee.id===id ? state.id : fee.id,
                amount: Number(fee.id===id ? state.amount : fee.amount),
                kind:fee.id===id? state.kind : fee.kind,
            }
        }),
        edit: false,
    })
  }
  const IsCompulsory = [
    {
    is_compulsory: true,
    title: "Compulsory",
    info: "Move debt to next term or session"
  },
    {
    is_compulsory: false,
    title: "Not Compulsory",
    info: "Debt won't be moved to the next term or succession"
  },
  ]
  const plans = [
    { name: 'Hobby', ram: '8GB', cpus: '4 CPUs', disk: '160 GB SSD disk', price: '$40' },
    { name: 'Startup', ram: '12GB', cpus: '6 CPUs', disk: '256 GB SSD disk', price: '$80' },
    { name: 'Business', ram: '16GB', cpus: '8 CPUs', disk: '512 GB SSD disk', price: '$160' },
    { name: 'Enterprise', ram: '32GB', cpus: '12 CPUs', disk: '1024 GB SSD disk', price: '$240' },
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const [selected, setSelected] = React.useState(IsCompulsory[1])
  React.useEffect(()=>{
    setState({
      ...state,
      is_compulsory: selected.is_compulsory,
    })
  },[selected])
  const [allBills, setAllBills] = React.useState(
    rooms?.map(room=>{
      return {
        class_name: room.name,
        bills: bills?.filter(bill=>bill.school_class.name===room.name).map(bill=>{ return {name: bill.display_name, amount: bill.amount, unit: bill.unit} }),
        total: sum(bills?.filter(bill=>bill.school_class.name===room.name)?.map(bill=>Number(bill.amount)*Number(bill.unit)))
      }
    })
  )
  React.useEffect(()=>{
    setAllBills(
      rooms?.map(room=>{
        return {
          class_name: room.name,
          bills: bills?.filter(bill=>bill.school_class.name===room.name).map(bill=>{ return {name: bill.display_name, amount: bill.amount, unit: bill.unit} }),
          total: sum(bills?.filter(bill=>bill.school_class.name===room.name)?.map(bill=>Number(bill.amount)*Number(bill.unit)))
        }
      })
    )
  },[rooms, bills])
  console.log(allBills)
  return (
    <SchoolLayout currentPage="Bill">
      <AddBill open={open} setOpen={setOpen}>
        
        <div className="mb-2">
          <label
            htmlFor="class_id"
            className="block text-sm font-medium text-gray-700"
          >
            Select Class
          </label>
          <div className="mt-1">
            <select
              required
              onChange={handleSelect}
              name="class_id"
              id="class_id"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            >
              <option value="">Please Select Class</option>
              {rooms?.map((room: { id: string | number | readonly string[]; name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; }, i: React.Key) => (
                <option value={room.id} key={i}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-2">
          {state?.bills.map((fee, i) => (
            <div key={i} className="grid grid-cols-6 gap-4">
                <div className="col-span-2">{fee.display_name}</div>
                <div className="">{fee.unit}</div>
                <div className="flex items-center">
                    <TbCurrencyNaira className="w-4 h-4" />
                    <div className="">
                    {fee.amount}
                    </div>
                    </div>
                <div className="flex items-center">
                    <TbCurrencyNaira className="w-4 h-4" />
                    <div className="">
                    {Number(fee.amount) * Number(fee.unit)}
                    </div>
                    </div>
                <div className="flex items-center justify-between">
                    <TfiPencilAlt onClick={()=>EditBill(fee.id)} className="w-4 h-4 text-indigo-700 cursor-pointer" />
                    <TfiTrash onClick={()=>DeleteBill(fee.id)} className="w-4 h-4 text-red-700 cursor-pointer" />
                </div>
            </div>
          ))}
        </div>
        
        <div className="mb-2">
          <label
            htmlFor="fee"
            className="block text-sm font-medium text-gray-700"
          >
            School Fee
          </label>
          <div className="mt-1">
            <input
              required
              onChange={handleChange}
              type="text"
              name="fee"
              id="fee"
              value={state.fee}
              autoComplete="fee"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
        </div>
        <hr />
        <div className="mt-2"></div>
        <div className="font-medium text-lg mb-2">Add Other Fees</div>
        <div className="mt-1 mb-2">
        <label
            htmlFor="kind"
            className="block text-sm font-medium text-gray-700"
          >
            Select Bill Type <span className="text-gray-400 text-sm ml-2">(Either Old or New Student)</span>
          </label>
              <select
                required
                id="kind"
                name="kind"
                onChange={handleSelect}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              >
                <option value="">Please Select Bill Type</option>
                {/* <option value="old_student">Old Student Bill</option> */}
                <option value="new_student">New Student Bill</option>
                <option value="old_and_new_student">Old And New Student Bill</option>
              </select>
            </div>
        {[
          { label: "Name", id: "display_name", value: state.display_name, type: "text" },
          { label: "Unit", id: "unit", value: state.unit, type: "number" },
          { label: "Price Per Unit", id: "amount", value: state.amount, type: "number" },
        ].map((inp, i) => (
          <div className="mb-2" key={i}>
            <label
              htmlFor={inp.id}
              className="block text-sm font-medium text-gray-700"
            >
              {inp.label}
            </label>
            <div className="mt-1">
              <input
                required
                onChange={handleChange}
                type={inp.type}
                name={inp.id}
                id={inp.id}
                value={inp.value}
                autoComplete={inp.id}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            </div>
          </div>
        ))}
        
        <div className="my-2">
        <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
      <div className="space-y-4">
        {IsCompulsory.map((plan) => (
          <RadioGroup.Option
            key={plan.title}
            value={plan}
            className={({ active }) =>
              classNames(
                selected?.title===plan.title && active ? 'ring-1 ring-offset-2 ring-gray-500 bg-gray-900 text-white' : ' text-gray-900',
                'relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none'
              )
            }
          >
            {({ checked }) => (
              <>
                <div className="flex items-center">
                  <div className="text-sm">
                    <RadioGroup.Label as="p" className="font-medium">
                      {plan.title}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="div" className="">
                      <div className="">{plan.info}</div>
                      {/* <p className="sm:inline">
                        {plan.ram} / {plan.cpus}
                      </p>{' '}
                      <span className="hidden sm:inline sm:mx-1" aria-hidden="true">
                        &middot;
                      </span>{' '}
                      <p className="sm:inline">{plan.disk}</p> */}
                    </RadioGroup.Description>
                  </div>
                </div>
                {/* <RadioGroup.Description as="div" className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
                  <div className="font-medium text-gray-900">{plan.price}</div>
                  <div className="ml-1 text-gray-500 sm:ml-0">/mo</div>
                </RadioGroup.Description> */}
                <div
                  className={classNames(
                    checked ? plan?.is_compulsory ? 'border-red-500 bg-red-700 text-white' : "border-green-500 bg-green-700 text-white" : 'border-transparent',
                    'absolute -inset-px rounded-lg border-2 pointer-events-none'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
        </div>
        <div className="flex justify-end">
        {
            !state.edit ?
            <div className="bg-gray-900 text-white p-2 rounded-lg text-sm cursor-pointer" onClick={AddToBill}>Add {state.display_name} to Bill</div>
            :
            <div className="bg-gray-900 text-white p-2 rounded-lg text-sm cursor-pointer" onClick={()=>UpdateBill(state.id)}>Update {state.display_name} data</div>
        }
            </div>
            <hr  className="my-2" />
        <div></div>
        <div className="flex justify-end">
        <div className="bg-gray-900 text-white py-2 px-4 rounded-lg text-sm cursor-pointer" onClick={handleSubmit}>Save</div>
            </div>
      </AddBill>
      <hr className="w-full my-2" />
      <div className="pt-5"></div>
      <div className="flex flex-wrap pt-5 -m-2">
        {
            allBills?.map((bill, i)=>(
                <div className="p-2 sm:w-full lg:w-1/3 md:w-1/2 w-full">
                    <div className="flex items-center h-full p-4 transform bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:scale-105 hover:bg-gray-900 hover:text-white text-gray-900 transition-all duration-500">
                        <div className="flex-shrink-0 rounded-full mr-4 bg-gray-900 p-3"></div>
                        <div className="flex-grow">
                            <div className="font-medium title-font">{bill.class_name}</div>
                            {
                              bill.bills?.map((pay, i)=>(
                                <div className="grid grid-cols-4 gap-4" key={i}>
                    <p className="py-1 text-sm font-medium font-dosis">
                      {pay.name}
                    </p>
                    <div className="py-1 text-sm font-medium truncate font-dosis flex items-center">
                      <div className="">{pay?.unit}</div>
                    </div>
                    <div className="py-1 text-sm font-medium truncate font-dosis flex items-center">
                      <TbCurrencyNaira className="w-4 h-4" />
                      <div className="">{pay?.amount}</div>
                    </div>
                    <div className="py-1 text-sm font-medium truncate font-dosis flex items-center">
                      <TbCurrencyNaira className="w-4 h-4" />
                      <div className="">
                        {Number(pay.unit) * Number(pay.amount)}
                      </div>
                    </div>
                  </div>
                              ))
                            }
                            <div className="grid grid-cols-4 gap-4">
                  <p className="py-1 text-sm font-medium truncate font-dosis col-span-3">
                    Total
                  </p>
                  <div className="py-1 text-sm font-medium truncate font-dosis flex items-center">
                    <TbCurrencyNaira className="w-4 h-4" />
                    <div className="">{bill.total}</div>
                  </div>
                </div>
                        </div>
                    </div>
                </div>
            ))
        }
      </div>
    </SchoolLayout>
  );
}
