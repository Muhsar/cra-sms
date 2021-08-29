import React from 'react'
import { useQuery } from 'react-query'
import { getRequest } from 'api/apiCall'
import { TEACHER, TEACHERCOURSES } from 'api/apiUrl'
import { queryKeys } from 'api/queryKey'
import Dashboard from 'Staff/Dashboard'
import StaffLayout from 'components/StaffLayout'
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';



export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};


export default function dashboard() {
  const {slug} = useParams()
const school = slug
  const easysch_token = jwt_decode(localStorage?.easysch_token)
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
  const {
    data:courseList
  } = useQuery(
    [queryKeys.getCourses, easysch_token?.user_id, easysch_token?.school_uid],
    async () => await getRequest({ url: `${TEACHERCOURSES(easysch_token?.school_uid, easysch_token?.user_id)}` }),
    {
      retry: 2,
      enabled: !!(easysch_token?.school_uid&&easysch_token?.user_id)
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
  