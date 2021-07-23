import React from 'react'
import { useQuery } from 'react-query'
import { getRequest } from 'api/apiCall'
import { TEACHER, TEACHERCOURSES } from 'api/apiUrl'
import { queryKeys } from 'api/queryKey'
import Dashboard from 'Staff/Dashboard'
import StaffLayout from 'components/StaffLayout'

import { ToastContext } from 'App.jsx'


export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};


export default function dashboard({ token, school }) {
  const { showAlert } = React.useContext(ToastContext)
  // const [token, setToken] = React.useState<any>()
  // const localToken = typeof window !== "undefined" && localStorage?.getItem("token")
  // React.useEffect(() => {
  //   setToken(jwt_decode(localToken))
  // },[localToken])
  const {
    data:teacherList
  } = useQuery(
    [queryKeys.getTeacher, token?.teacher_id, token?.school_uid],
    async () => await getRequest({ url: `${TEACHER(token?.school_uid, token?.teacher_id)}` }),
    {
      retry: 2,
      enabled: !!(token?.school_uid && token?.teacher_id)
    }
    )
  const [teacher, setTeacher] = React.useState(teacherList?.data)
  React.useEffect(() => {
    setTeacher(teacherList?.data)
  }, [teacherList?.data])
  const {
    data:courseList
  } = useQuery(
    [queryKeys.getCourses, token?.teacher_id, token?.school_uid],
    async () => await getRequest({ url: `${TEACHERCOURSES(token?.school_uid, token?.teacher_id)}` }),
    {
      retry: 2,
      enabled: !!(token?.school_uid&&token?.teacher_id)
    }
    )
  const [allCourses, setAllCourses] = React.useState(courseList?.data)
    React.useEffect(() => {
    setAllCourses(courseList?.data)
  },[courseList?.data])
  return (
    <>
      <StaffLayout Component={<Dashboard
        teacher={teacher}
        courses={allCourses}
        school={school}
      />} currentPage='Dashboard' slug={school} />
</>
  )
}
  