import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getRequest, patchRequest } from 'api/apiCall';
import { STUDENT, HOMEROOMS } from 'api/apiUrl';
import { queryKeys } from 'api/queryKey';
import ProfilePage from 'ProfilePage';
import Edit from 'School/Student/Edit';
import SecretaryLayout from 'components/SecretaryLayout';
import { ToastContext } from 'App.jsx';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export const getServerSideProps = (context: { query: { student: any, school: any } }) => {
  const { student, school } = context.query;

  return { props: { student, school } };
};

export default function EditStudent() {
  const params:{id: any, slug: any} = useParams()
  const {id: student, slug: school} = params
  const easysch_token:{school_uid: any} = jwt_decode(localStorage?.easysch_token)
  const {
    data:wardList
  } = useQuery(
    [queryKeys.getStudent, easysch_token?.school_uid],
    async () => await getRequest({ url: STUDENT(easysch_token?.school_uid, student) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid
    }
    )
  const {
    data:homerooms
  } = useQuery(
    [queryKeys.getClasses, easysch_token?.school_uid],
    async () => await getRequest({ url: HOMEROOMS(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid
    }
    )
  const [ward, setward] = React.useState(wardList?.data)
  const [rooms, setRooms] = React.useState(homerooms?.data)
    React.useEffect(() => {

    setward(wardList?.data)
    setState({first_name: ward?.first_name,
      last_name: ward?.last_name,
      religion: ward?.religion,
      middle_name: ward?.middle_name,
      guardian_full_name: ward?.guardian_full_name,
      guardian_full_name2: ward?.guardian_full_name2,
      phone_number: ward?.phone_number,
      phone_number2: ward?.phone_number2,
      address: ward?.address,
      state_of_origin: ward?.state_of_origin,
      date_of_birth: ward?.date_of_birth,
      email: ward?.email,
      outstanding_debt: ward?.outstanding_debt,
      class_id: ward?.current_class.id,
      gender: ward?.gender,
      image: ward?.image
    })
    setRooms(homerooms?.data)
  }, [wardList?.data, ward, homerooms?.data])
  const [state, setState] = React.useState({
    first_name: ward?.first_name,
        last_name: ward?.last_name,
        religion: ward?.religion,
        middle_name: ward?.middle_name,
        guardian_full_name: ward?.guardian_full_name,
        guardian_full_name2: ward?.guardian_full_name2,
        phone_number: ward?.phone_number,
        phone_number2: ward?.phone_number2,
        address: ward?.address,
        state_of_origin: ward?.state_of_origin,
        date_of_birth: ward?.date_of_birth,
        email: ward?.email,
        outstanding_debt: ward?.outstanding_debt,
        class_id: ward?.current_class.id,
    gender: ward?.gender,
        image: ward?.image
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
  const {showAlert}  = React.useContext(ToastContext)
  const { mutate } = useMutation(patchRequest, {
   onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      });
      cache.invalidateQueries()
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    mutate({
      url: STUDENT(easysch_token?.school_uid, student),
      data: {
        first_name: state.first_name,
        last_name: state.last_name,
        religion: state.religion,
        middle_name: state.middle_name,
        guardian_full_name: state.guardian_full_name,
        guardian_full_name2: state.guardian_full_name2,
        phone_number: state.phone_number,
        phone_number2: state.phone_number2,
        address: state.address,
        state_of_origin: state.state_of_origin,
        date_of_birth: state.date_of_birth,
        email: state.email,
        outstanding_debt: state.outstanding_debt,
        class_id: state.class_id,
        gender: state.gender,
      },
    });
  };
  return (
    <>
      <SecretaryLayout Component={<ProfilePage Component={<Edit  handleChange={handleChange}
        handleSelect={handleSelect}
        handleSubmit={submitForm}
        state={state} rooms={rooms} />} user="student" userId={student} page="Edit" school={school} />} currentPage='Students' />
      </>
  )
}
