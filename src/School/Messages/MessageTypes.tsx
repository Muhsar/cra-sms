import { ChatAlt2Icon, MoonIcon, OfficeBuildingIcon, PlusIcon, UsersIcon } from '@heroicons/react/outline'
import { MoneyOutlined, LocalHospitalOutlined, AttachMoneyOutlined } from '@material-ui/icons'
import React from 'react'
import MessageComponent from './MessageComponent'
import { ReligionSelect, DebtorsSelect, ClassSelect, StudentsSelect } from './FormComponents';

export default function MessageTypes({handleSelect, rooms, students, selected, setSelected, handleSubmit, open, setOpen}) {
  const types = [
    {icon: MoonIcon,typeId:"religion", type: "Eid Mubarak", description: "send an Eid message to all your muslim parents", Component: ReligionSelect({handleSelect, religion: "Islam"})},
    {icon: LocalHospitalOutlined,typeId:"religion", type: "Easter", description: "send an easter message to all your christian parents", Component: ReligionSelect({handleSelect, religion: "Christianity"})},
    {icon: AttachMoneyOutlined,typeId:"reminder", type: "School Fees Reminder", description: "send a reminder message to the parents of debtors", Component: DebtorsSelect({handleSelect})},
    {icon: OfficeBuildingIcon,typeId:"class", type: "Class Message", description: "send a  message to the parents of a specific class", Component: ClassSelect({handleSelect, rooms})},
    {icon: UsersIcon,typeId:"parent", type: "Select Parents", description: "send a  message to a list of selected parents", Component: StudentsSelect({handleSelect, students, selected, setSelected})},
    // {icon: ChatAlt2Icon,typeId:"custom", type: "Customized Message", description: "send a customized message"},
  ]
  return (
    <div className="grid grid-cols-1 gap-4 justify-items-center items-center">

    <div className="col-span-full w-full">
      {
        types.map(type => (
        <MessageComponent type={type} open={open} setOpen={setOpen} />
        ))
      }
      {/* <select className="sm:hidden">
        {
          types.map(type => (
            <option>{type.type}</option>
          ))
        }
      </select> */}
              </div>
              </div>
  )
}
