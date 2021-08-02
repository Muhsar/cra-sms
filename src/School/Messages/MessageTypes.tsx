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
  const getGroupData = () => {
    set
  }
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
    <form onSubmit={handleSubmit} className="flex flex-col justify-center max-w-3xl self-center mx-auto">
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
       <h5 className="text-gray-500 italic text-center py-4">Confirm Selection then scroll down to send</h5>
       <div className="grid grid-cols-2 gap-3">
       {
         filteredGroup?.map((data,index)=> (
       <div className="flex items-center bg-white p-3 rounded-xl shadow col-span-1" key={index}>
                <input
                onChange={()=>handleFilter(data.value)}
                  type="checkbox"
                  checked={data.checked}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  {data?.label}
                </label>
              </div>
         ))
       }
       </div>
       </>
       }
      <div className="bg-grey-lighter py-8 w-full rounded-lg">
        <div className=" w-full mx-auto">
          <div className=" bg-white p-8 shadow-md rounded-lg">
            <div className=" py-4 border-b">
            <h1 className="text-xl font-extrabold">{state.title}</h1>
            <br />
              <p>
                {state.body}
              </p>
              <div className="flex flex-row justify-end pt-6">
                <button className="text-sm text-right rounded-lg px-10 py-4 bg-gray-700 text-gray-100 hover:bg-gray-900 transform transition-all hover:scale-105"
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
