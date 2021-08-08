import React from "react";
import SchoolLayout from "components/SchoolLayout";
import Dashboard from "School/Dashboard";
import { useParams } from 'react-router-dom';
// import { ToastContext } from "App.jsx";
import { useQuery } from "react-query";
import { getRequest } from "api/apiCall";
import { HOMEROOMS, STUDENTS, TEACHERS } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import jwt_decode from 'jwt-decode';


export default function SchoolDashboard() {
  const {slug} = useParams()
  const school = slug
  const token = jwt_decode(localStorage?.token)
  console.log(token)
  const { data: homerooms } = useQuery(
    [queryKeys.getClasses, token?.school_uid],
    async () => await getRequest({ url: HOMEROOMS(token?.school_uid) }),
    {
      retry: 2,
      enabled: !!token?.school_uid
    }
  );
  const {
    data:studentList
  } = useQuery(
    [queryKeys.getStudents, token?.school_uid],
    async () => await getRequest({ url: STUDENTS(token?.school_uid) }),
    {
      retry: 2,
      enabled: !!token?.school_uid
    }
    )
    const [rooms, setRooms] = React.useState(homerooms?.data)
    const [students, setStudents] = React.useState(studentList?.data)
    React.useEffect(() => {
    setRooms(homerooms?.data)
    setStudents(studentList?.data)
    }, [homerooms?.data, studentList?.data])
    const {
      data:teacherList
    } = useQuery(
      [queryKeys.getTeachers, token?.school_uid],
      async () => await getRequest({ url: TEACHERS(token?.school_uid) }),
      {
        retry: 2,
        enabled: !!token?.school_uid
      }
      )
      const [teachers, setTeachers] = React.useState(teacherList?.data)
      React.useEffect(() => {
      setTeachers(teacherList?.data)
    },[teacherList?.data ])
  const stats = {
      teachers: teachers?.length,
      students: students?.length,
      rooms: rooms?.length
  }
  function sum(input){
    if(toString.call(input)!=="[object Array]")
    return false
    let total = 0
    for (let i = 0; i<input.length;i++){
      if(isNaN(input[i])){
        continue
      }
      total += Number(input[i])
    }
    return total
  }
  const [debtorsData, setDebtorsData] = React.useState([])
  // for (let index = 0; index < rooms?.length; index++) {
    // const test = rooms[index];
    // const studentList = debtors?.filter(debt => debt.current_class.id == rooms[index]?.id)
    // console.log(rooms[index])
    // }
    React.useEffect(() => {
      const debtors = students?.filter(student => student.is_debtor)
      const paid = students?.filter(student => !student.is_debtor)
      const debtorsList = debtors && rooms?.map(room => {
        console.log(room)
        const debtorsList = debtors?.filter(debt => debt.current_class.id == room.id)
        const paidList = paid?.filter(debt => debt.current_class.id == room.id)
        const totalFee = Number(room.fee) * (Number(debtorsList?.length) + Number(paidList?.length))
        const totalDebt = sum(debtorsList?.map(debt => debt.fee_balance))
        const totalPaid = Number(totalFee) - Number(totalDebt)
        const newData = { name: room.name, fee: room.fee, debtors: debtorsList, paid: paidList, totalFee, totalDebt, totalPaid }
        return newData
      })
      // console.log(debtorsList)
    debtorsList?.length && setDebtorsData(debtorsList)
  },[rooms, students])
  // const debtorsClass = rooms
  console.log(debtorsData)
  
  return <SchoolLayout Component={<Dashboard stats={stats} school={school} debts={debtorsData} />} currentPage='Dashboard' slug={school} />;
}
