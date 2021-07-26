import React from "react";
import SchoolLayout from "components/SchoolLayout";
import MessageTypes from "School/Messages/MessageTypes";
import MessageComponent from "School/Messages/MessageComponent";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getRequest, postRequest } from "api/apiCall";
import { HOMEROOMS, STUDENTS } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import { ToastContext } from "App.jsx";
import useState from 'react';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};
export default function SMS() {
  const token = jwt_decode(localStorage?.token)
  const {slug} = useParams()
  const school = slug
  const [selected, setSelected] = React.useState([])
  const {
    data:homerooms
  } = useQuery(
    [queryKeys.getClasses, token?.school_uid],
    async () => await getRequest({ url: HOMEROOMS(token?.school_uid) }),
    {
      retry: 2,
      enabled: !!token?.school_uid
    }
    )
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
  const [state, setState] = React.useState({
    message: "",
    ids: []
  })
    React.useEffect(() => {

    setRooms(homerooms?.data)
    setStudents(studentList?.data)
  },[homerooms?.data, studentList?.data ])
const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setState({ ...state, [event.target.name]: event.target.value })
}

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, [event.target.name]: event.target.value });
  // };
  const cache = useQueryClient()
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      setOpen(false)
      cache.invalidateQueries()
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    mutate({
      url: STUDENTS(token?.school_uid),
      data: {
      },
    });
  };
  const [open, setOpen] = React.useState(false)
  return <SchoolLayout
    Component={
      <MessageTypes
        handleSelect={handleSelect}
        rooms={rooms}
        students={students}
        selected={selected}
        setSelected={setSelected}
        handleSubmit={submitForm}
        open={open}
        setOpen={setOpen}
      />
    }
    currentPage="Messages"
    slug={school}
  />;
}
