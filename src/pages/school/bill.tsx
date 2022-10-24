/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getRequest } from "api/apiCall";
import { HOMEROOMS } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import SchoolLayout from "components/SchoolLayout";
import jwtDecode from "jwt-decode";
import React from "react";
import { useQuery } from "react-query";
import AddBill from "School/Bill/AddBill";
import { TfiPencilAlt, TfiTrash } from "react-icons/tfi";
import { TbCurrencyNaira } from "react-icons/tb"

export default function Bill() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    fee: null,
    class_id: null,
    other_fees: [],
    name: "",
    unit: "",
    price: "",
    edit: false,
    id: ""
  });
  const easysch_token: { school_uid: any } = jwtDecode(
    localStorage?.easysch_token
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const { data: homerooms } = useQuery(
    [queryKeys.getClasses, easysch_token?.school_uid],
    async () => await getRequest({ url: HOMEROOMS(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid,
    }
  );
  const [rooms, setRooms] = React.useState(homerooms?.data);
  React.useEffect(() => {
    setRooms(homerooms?.data);
  }, [homerooms?.data]);
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      class_id: e.target.value,
    });
  };
  React.useEffect(() => {
    if (state.class_id) {
      setState({
        ...state,
        fee: rooms?.filter(
          (room: { id: { toString: () => any; }; }) => room.id?.toString() === state.class_id.toString()
        )[0].fee,
      });
    }
  }, [state.class_id]);
  console.log(state);
  const AddToBill =()=>{
    setState({
        ...state,
        other_fees: [
            ...state.other_fees,
            {
                name: state.name,
                unit: state.unit,
                price: state.price,
                id: Math.random()
            }
        ]
    })
  }
  React.useEffect(()=>{
    setState({
        ...state,
        name: "",
        unit: "",
        price: "",
        id: "",
        edit: false
    })
  },[state.other_fees])

  const EditBill=(id: any)=>{
    const filteredBill = state?.other_fees.filter(fee=>fee.id===id)[0]
    setState({
        ...state,
        name: filteredBill.name,
        price: filteredBill.price,
        unit: filteredBill.unit,
        id: filteredBill.id,
        edit: true
    })
  }
  const DeleteBill=(id: any)=>{
    setState({
        ...state,
        other_fees: state.other_fees.filter(fee=>fee.id!==id)
    })
  }
  const UpdateBill =(id: any)=> {
    console.log(id)
    setState({
        ...state,
        other_fees: state.other_fees.map(fee=>{
            return {
                name: fee.id===id ? state.name : fee.name,
                unit: fee.id===id ? state.unit : fee.unit,
                id: fee.id===id ? state.id : fee.id,
                price: fee.id===id ? state.price : fee.price
            }
        }),
        edit: false,
    })
  }
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
        <div className="mb-2">
          {state?.other_fees.map((fee, i) => (
            <div key={i} className="grid grid-cols-6 gap-4">
                <div className="col-span-2">{fee.name}</div>
                <div className="">{fee.unit}</div>
                <div className="flex items-center">
                    <TbCurrencyNaira className="w-4 h-4" />
                    <div className="">
                    {fee.price}
                    </div>
                    </div>
                <div className="flex items-center">
                    <TbCurrencyNaira className="w-4 h-4" />
                    <div className="">
                    {Number(fee.price) * Number(fee.unit)}
                    </div>
                    </div>
                <div className="flex items-center justify-between">
                    <TfiPencilAlt onClick={()=>EditBill(fee.id)} className="w-4 h-4 text-indigo-700 cursor-pointer" />
                    <TfiTrash onClick={()=>DeleteBill(fee.id)} className="w-4 h-4 text-red-700 cursor-pointer" />
                </div>
            </div>
          ))}
        </div>
        <hr />
        <div className="mt-2"></div>
        <div className="font-medium text-lg mb-2">Add Other Fees</div>
        {[
          { label: "Name", id: "name", value: state.name, type: "text" },
          { label: "Unit", id: "unit", value: state.unit, type: "number" },
          { label: "Price Per Unit", id: "price", value: state.price, type: "number" },
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
        <div className="flex justify-end">
        {
            !state.edit ?
            <div className="bg-gray-900 text-white p-2 rounded-lg text-sm cursor-pointer" onClick={AddToBill}>Add {state.name} to Bill</div>
            :
            <div className="bg-gray-900 text-white p-2 rounded-lg text-sm cursor-pointer" onClick={()=>UpdateBill(state.id)}>Update {state.name} data</div>
        }
            </div>
            <hr  className="my-2" />
        <div></div>
        <div className="flex justify-end">
        <div className="bg-gray-900 text-white py-2 px-4 rounded-lg text-sm cursor-pointer" onClick={AddToBill}>Save</div>
            </div>
      </AddBill>
      <hr className="w-full my-2" />
      <div className="pt-5"></div>
      <div className="flex flex-wrap pt-5 -m-2">
        {
            ["","",""].map((bill, i)=>(
                <div className="p-2 sm:w-full lg:w-1/3 md:w-1/2 w-full">
                    <div className="flex items-center h-full p-4 transform bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:scale-105 hover:bg-gray-900 hover:text-white text-gray-900 transition-all duration-500">
                        <div className="flex-shrink-0 rounded-full mr-4 bg-gray-900 p-3"></div>
                        <div className="flex-grow">
                            <div className="font-medium title-font">Basic 3</div>
                            {
                              [
                                { name: "School Fee", unit: 1, price: 50000 },
                                { name: "Uniform", unit: 2, price: 4500 },
                                { name: "Mathematics Textbook", unit: 1, price: 3000 },
                                { name: "English Textbook", unit: 1, price: 3000 },
                                { name: "Note Book", unit: 25, price: 200 },
                              ].map((pay, i)=>(
                                <div className="grid grid-cols-4 gap-4" key={i}>
                    <p className="py-1 text-sm font-medium truncate font-dosis">
                      {pay.name}
                    </p>
                    <div className="py-1 text-sm font-medium truncate font-dosis flex items-center">
                      <div className="">{pay?.unit}</div>
                    </div>
                    <div className="py-1 text-sm font-medium truncate font-dosis flex items-center">
                      <TbCurrencyNaira className="w-4 h-4" />
                      <div className="">{pay?.price}</div>
                    </div>
                    <div className="py-1 text-sm font-medium truncate font-dosis flex items-center">
                      <TbCurrencyNaira className="w-4 h-4" />
                      <div className="">
                        {Number(pay.unit) * Number(pay.price)}
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
                    <div className="">{500000.00}</div>
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
