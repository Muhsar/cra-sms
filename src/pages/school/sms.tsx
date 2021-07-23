import React from "react";
import SchoolLayout from "components/SchoolLayout";
import MessageTypes from "School/Messages/MessageTypes";
import MessageComponent from "School/Messages/MessageComponent";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getRequest, postRequest } from "api/apiCall";
import { HOMEROOMS, STUDENTS } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import { ToastContext } from "App.jsx";


export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};
export default function SMS({ token, school }) {
  const { showAlert } = React.useContext(ToastContext)
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
    React.useEffect(() => {

    setRooms(homerooms?.data)
    setStudents(studentList?.data)
  },[homerooms?.data, studentList?.data ])


  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, [event.target.name]: event.target.value });
  // };
  const cache = useQueryClient()
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      });
      setOpen(false)
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
