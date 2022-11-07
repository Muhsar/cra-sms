import { getRequest } from 'api/apiCall'
import { TEACHER, TEACHERCOURSES } from 'api/apiUrl'
import { queryKeys } from 'api/queryKey'
import BursarDashboard from 'Bursar/Dashboard'
import BursarLayout from 'components/BursarLayout'
import jwtDecode from 'jwt-decode'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'

export default function Dashboard() {
    const params:{slug: any} = useParams()
  const {slug} = params
const school = slug
  const easysch_token:{school_uid: any, user_id} = jwtDecode(localStorage?.easysch_token)
  console.log(easysch_token)
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
console.log(teacher)
  return (
    <BursarLayout currentPage="Dashboard">
        <BursarDashboard teacher={teacher} />
    </BursarLayout>
  )
}
