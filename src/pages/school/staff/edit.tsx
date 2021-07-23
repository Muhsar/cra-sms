import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getRequest, patchRequest } from 'api/apiCall';
import { TEACHER, TEACHERS } from 'api/apiUrl';
import { queryKeys } from 'api/queryKey';

import ProfilePage from 'ProfilePage';
import Edit from 'School/Staff/Edit';
import Courses from 'School/Student/Courses';
import SchoolLayout from 'components/SchoolLayout';
import { ToastContext } from 'App.jsx';
export const getServerSideProps = (context: { query: { staff: any, school: any } }) => {
  const { staff, school } = context.query;

  return { props: { staff, school } };
};

export default function EditStaff({ token, staff, school }) {
  const { showAlert } = React.useContext(ToastContext)
  const {
    data:teacherList
  } = useQuery(
    [queryKeys.getTeacher, token?.school_uid],
    async () => await getRequest({ url: TEACHER(token?.school_uid, staff) }),
    {
      retry: 2,
      enabled: !!token?.school_uid
    }
    )
  const [teacher, setTeacher] = React.useState(teacherList?.data)
    React.useEffect(() => {

    setTeacher(teacherList?.data)
    setState({first_name: teacher?.user.first_name,
      last_name: teacher?.user.last_name,
      religion: teacher?.religion,
      phone_number: teacher?.user.phone_number,
      address: teacher?.address,
      date_of_birth: teacher?.date_of_birth,
      email: teacher?.user.email,
      gender: teacher?.gender,
      full_name: teacher?.user.full_name})
  }, [teacherList?.data, teacher])
  const [state, setState] = React.useState({
    first_name: teacher?.user.first_name,
        last_name: teacher?.user.last_name,
        religion: teacher?.religion,
        phone_number: teacher?.user.phone_number,
        address: teacher?.address,
        date_of_birth: teacher?.date_of_birth,
        email: teacher?.user.email,
        gender: teacher?.gender,
        full_name: teacher?.user.full_name
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const cache = useQueryClient()
  const { mutate } = useMutation(patchRequest, {
    onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      });
      cache.invalidateQueries()
    },
    onError(error: any) {
      error?.response?.data?.message.map((errormsg: any) =>
        showAlert({
          message: errormsg,
          severity: "error",
        })
      );
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    mutate({
      url: TEACHER(token?.school_uid, staff),
      data: {
        first_name: state.first_name,
        last_name: state.last_name,
        religion: state.religion,
        phone_number: state.phone_number,
        address: state.address,
        date_of_birth: state.date_of_birth,
        email: state.email,
        gender: state.gender,
      },
    });
  };
  return (
    <>
      <SchoolLayout Component={<ProfilePage Component={<Edit
        handleChange={handleChange}
        handleSelect={handleSelect}
        handleSubmit={submitForm}
        staff={state}
      />} user="staff" userId={staff} page="Edit" school={school} />} currentPage='Teachers' slug={school} />
      </>
  )
}
