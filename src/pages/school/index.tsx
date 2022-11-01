import React from "react";
import SchoolLayout from "components/SchoolLayout";
import Dashboard from "School/Dashboard";
import { useParams } from 'react-router-dom';
// import { ToastContext } from "App.jsx";
import { useQuery } from "react-query";
import { getRequest } from "api/apiCall";
import { HOMEROOMS, STUDENTS, STUDENTSCOUNT, TEACHERS } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import jwtDecode from 'jwt-decode';


export default function SchoolDashboard() {
  const params:{slug: any} = useParams()
  const {slug: school} = params
  
  const easysch_token:{school_uid: any} = jwtDecode(localStorage?.easysch_token)
  const { data: homerooms } = useQuery(
    [queryKeys.getClasses, easysch_token?.school_uid],
    async () => await getRequest({ url: HOMEROOMS(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid
    }
  );
  const {
    data:studentList
  } = useQuery(
    [queryKeys.getStudents, easysch_token?.school_uid],
    async () => await getRequest({ url: STUDENTS(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid
    }
    )
  const {
    data:studentCount
  } = useQuery(
    [queryKeys.getStudentsCount, easysch_token?.school_uid],
    async () => await getRequest({ url: STUDENTSCOUNT(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid
    }
    )
    const [rooms, setRooms] = React.useState(homerooms?.data)
    const [students, setStudents] = React.useState(studentList?.data)
    const [count, setCount] = React.useState(studentCount?.count)
    React.useEffect(() => {
    setRooms(homerooms?.data)
    setStudents(studentList?.data)
    setCount(studentCount?.count)
    }, [homerooms?.data, studentList?.data, studentCount?.count])
    const {
      data:teacherList
    } = useQuery(
      [queryKeys.getTeachers, easysch_token?.school_uid],
      async () => await getRequest({ url: TEACHERS(easysch_token?.school_uid) }),
      {
        retry: 2,
        enabled: !!easysch_token?.school_uid
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
    // }
    React.useEffect(() => {
      const debtors = students?.filter(student => student.is_debtor)
      const paid = students?.filter(student => !student.is_debtor)
      const debtorsList = debtors && rooms?.map(room => {
        const debtorsList = debtors?.filter(debt => debt.current_class.id == room.id)
        const paidList = paid?.filter(debt => debt.current_class.id == room.id)
        const totalFee = Number(room.fee) * (Number(debtorsList?.length) + Number(paidList?.length))
        const totalDebt = sum(debtorsList?.map(debt => debt.fee_balance))
        const totalPaid = Number(totalFee) - Number(totalDebt)
        const newData = { name: room.name, fee: room.fee, debtors: debtorsList, paid: paidList, totalFee, totalDebt, totalPaid }
        return newData
      })
    debtorsList?.length && setDebtorsData(debtorsList)
  },[rooms, students])
  return(
    <SchoolLayout 
    currentPage='Dashboard'  >
      <Dashboard stats={stats} school={school} debts={debtorsData} count={count} />
      </SchoolLayout>
    ) 
}
