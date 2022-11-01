import React from 'react'
import { useQuery } from 'react-query'
import { getRequest } from 'api/apiCall'
import { TEACHER, TEACHERCOURSES, HOMEROOMS, STUDENTS, TEACHERS, STUDENTSCOUNT } from 'api/apiUrl'
import { queryKeys } from 'api/queryKey'
// import Dashboard from 'Staff/Dashboard'
import SecretaryLayout from 'components/SecretaryLayout'
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Header from '../../Staff/Dashboard/Header';
import Greeting from '../../School/Dashboard/Greeting';
import StatsCards from '../../School/Dashboard/StatsCards';
import DebtorsCards from '../../School/Dashboard/DebtorsCards';
import BirthdayCard from '../../School/Dashboard/BirthdayCard';

export default function dashboard() {
const params:{slug: any} = useParams()
  const {slug} = params
const school = slug
  const easysch_token:{school_uid: any, user_id: any} = jwtDecode(localStorage?.easysch_token)
  const {
    data:teacherList
  } = useQuery(
    [queryKeys.getTeacher, easysch_token?.user_id, easysch_token?.school_uid],
    async () => await getRequest({ url: `${TEACHER(easysch_token?.school_uid, easysch_token?.user_id)}` }),
    {
      retry: 2,
      enabled: !!(easysch_token?.school_uid && easysch_token?.user_id)
    }
    )
  const [teacher, setTeacher] = React.useState(teacherList?.data)
  React.useEffect(() => {
    setTeacher(teacherList?.data)
  }, [teacherList?.data])
  const Dashboard = ({teacher, stats, school, debts, count}) => {
    return (
<>
<Header teacher={teacher} />
{/* <Greeting /> */}
    <StatsCards stats={stats} school={school} count={count} />
    <DebtorsCards debts={debts} />
    <BirthdayCard />
</>
    )
  }
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
    const [count, setCount] = React.useState(studentCount?.data)
    React.useEffect(() => {
    setRooms(homerooms?.data)
    setStudents(studentList?.data)
    setCount(studentCount?.data)
    }, [homerooms?.data, studentList?.data, studentCount?.data])
    const {
      data:teachersList
    } = useQuery(
      [queryKeys.getTeachers, easysch_token?.school_uid],
      async () => await getRequest({ url: TEACHERS(easysch_token?.school_uid) }),
      {
        retry: 2,
        enabled: !!easysch_token?.school_uid
      }
      )
      const [teachers, setTeachers] = React.useState(teachersList?.data)
      React.useEffect(() => {
      setTeachers(teachersList?.data)
    },[teachersList?.data ])
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
  return (
    <>
      <SecretaryLayout Component={<Dashboard
        teacher={teacher}
        stats={stats} school={school} debts={debtorsData} count={count}
      />} currentPage='Dashboard' />
</>
  )
}
  