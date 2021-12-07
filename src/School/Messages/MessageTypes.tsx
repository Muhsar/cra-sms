/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
// import { TextareaAutosize } from "@material-ui/core";
import MessageComponent from "./MessageComponent";

export default function MessageTypes({
  handleSelect,
  rooms,
  students,
  state,
  student,
  group,
  setState,
  // selected,
  // setSelected,
  handleSubmit,
  // open,
  // setOpen,
}) {
  // const getGroupData = () => {
  //   set
  // }
  const [roomOptions, setRoomOptions] = React.useState([]);
  const [studentsOption, setStudentOption] = React.useState([]);
  const [filteredGroup, setFilteredGroup] = React.useState([])
  React.useEffect(() => {
    setRoomOptions(
      rooms?.map((room) => {
        const val = { label: room.name, value: room.id };
        return val;
      })
    );
    setStudentOption(
      students?.map((student) => {
        const val = { label: student.full_name, value: student.id };
        return val;
      })
    );
  }, [rooms, students]);
  React.useEffect(()=>{
    setFilteredGroup(
      group?.map(val=>{
        const newGroup = {value: val.id, label: val.full_name,checked: true}
        return newGroup
      })
    )
  },[group])
  const [groupCount, setGroupCount] = React.useState({
    count: filteredGroup && filteredGroup?.length > 0 ? filteredGroup?.length - 1 : 0,
    initial: filteredGroup && filteredGroup[0]?.label,
    filtered: filteredGroup && filteredGroup
  })
  React.useEffect(()=>{
    const filtered = filteredGroup?.filter(data=> data.checked)
    setState({
      ...state,
      student_ids: filtered?.map(data=>{
        const ids = data.value
        return ids
      })
    })
  },[filteredGroup])
  const handleFilter = (id) => {
    setFilteredGroup(
      filteredGroup?.map(
        val=>{
          const newGroup = val.value?.toString() === id?.toString() ? {value: val.value, label: val.label,checked: !val.checked} : {value: val.value, label: val.label,checked: val.checked}
        return newGroup
        }
      )
    )
  }
    React.useEffect(()=>{
    const filtered = filteredGroup && filteredGroup?.filter(data=> data.checked)
  setGroupCount({
    count: filtered && filtered?.length > 0 ? filtered && filtered?.length - 1 : 0,
    initial: filtered && filtered[0]?.label,
    filtered: filtered && filtered
  })
    },[filteredGroup])
    console.log(state.student_ids)
  return (
    <form onSubmit={handleSubmit} className="flex flex-col self-center justify-center max-w-3xl mx-auto">
      <MessageComponent
        roomOptions={roomOptions}
        studentsOption={studentsOption}
        handleSelect={handleSelect}
        state={state}
        setState={setState}
       />
       {
         filteredGroup &&
         <>
       <h5 className="py-4 italic text-center text-gray-500">Confirm Selection then scroll down to send</h5>
       <div className="grid grid-cols-2 gap-3">
       {
         filteredGroup?.map((data,index)=> (
       <div className="flex items-center col-span-1 p-3 bg-white shadow rounded-xl" key={index}>
                <input
                onChange={()=>handleFilter(data.value)}
                  type="checkbox"
                  checked={data.checked}
                  className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                />
                <label className="block ml-2 text-sm text-gray-900">
                  {data?.label}
                </label>
              </div>
         ))
       }
       </div>
       </>
       }
      <div className="w-full py-8 rounded-lg bg-grey-lighter">
        <div className="w-full mx-auto ">
          <div className="p-8 bg-white rounded-lg shadow-md ">
            <div className="py-4 border-b ">
            <h1 className="text-xl font-extrabold">{state.title}</h1>
            <br />
              <p>
                {state.body}
              </p>
              <div className="flex flex-row justify-end pt-6">
                <button className="px-10 py-4 text-sm text-right text-gray-100 transition-all transform bg-gray-700 rounded-lg hover:bg-gray-900 hover:scale-105"
                type="submit"
                disabled={groupCount.filtered && groupCount.filtered.length===0}
                >
                Send To {" "}
              {
                state.steps.recipient==="Single" && student &&
                  <>{student?.full_name}</>
              }
              {
                state.steps.recipient==="Group" && groupCount &&
                  <>{groupCount.initial} and {groupCount.count} others</>
              }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
