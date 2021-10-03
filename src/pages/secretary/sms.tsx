import React from "react";
import SecretaryLayout from "components/SecretaryLayout";
import MessageTypes from "School/Messages/MessageTypes";
import MessageComponent from "School/Messages/MessageComponent";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getRequest, postRequest } from "api/apiCall";
import { HOMEROOMS, STUDENTS, STUDENT,CLASSSTUDENTS, SENDMESSAGE } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import { ToastContext } from "App.jsx";
import useState from 'react';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import query from "api/useQuery"

// const query = (key, param, url, enabled) => {
//   const {data} = useQuery(
//     [key, param],
//     async () => await getRequest({ url }),
//     {
//       retry: 2,
//       enabled: !!enabled
//     }
//     )
//     return data
// }

export default function SMS() {
  const [state, setState] = React.useState({
    body: "",
    title: "",
    student_ids: [],
    kind: "students",
    steps: {
      recipient: null,
      group: null,
    },
    student: null,
    group: []
  })
  const easysch_token = jwt_decode(localStorage?.easysch_token)
  const {slug} = useParams()
  const school = slug
  const [selected, setSelected] = React.useState([])
  const homerooms = query(queryKeys.getClasses, easysch_token?.school_uid, HOMEROOMS(easysch_token?.school_uid), easysch_token?.school_uid)
  const studentList = query(queryKeys.getStudents, easysch_token?.school_uid, STUDENTS(easysch_token?.school_uid), easysch_token?.school_uid)
  const [rooms, setRooms] = React.useState(homerooms?.data)
  const [students, setStudents] = React.useState(studentList?.data)
  const studentData = query(queryKeys.getStudent, easysch_token?.school_uid, STUDENT(easysch_token?.school_uid, state.student), (easysch_token?.school_uid&&state.student))
  const groupData = query(queryKeys.getClassStudents, easysch_token?.school_uid, CLASSSTUDENTS(easysch_token?.school_uid, state.steps.group!=="all" && state.steps.group!=="debtors" &&state.steps.group), (easysch_token?.school_uid&&state.steps.group!=="all" && state.steps.group!=="debtors" &&state.steps.group))
  const [student, setStudent] = React.useState(studentData?.data)
  const [groups, setGroups] = React.useState()
  const [group, setGroup] = React.useState()
    React.useEffect(() => {
    setRooms(homerooms?.data)
    setStudents(studentList?.data)
  },[homerooms?.data, studentList?.data ])
    React.useEffect(() => {
    setStudent(studentData?.data)
    setGroups(groupData?.data)
  },[studentData?.data, groupData?.data])
    React.useEffect(() => {
    setGroup(state.steps.group && state.steps.group==="all" ? students : state.steps.group==="debtors" ? students?.filter(student=>student.is_debtor) : groups)
  },[students, groups,state.steps.group])
const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setState({ ...state, [event.target.name]: event.target.value })
}
console.log(groups)
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, [event.target.name]: event.target.value });
  // };
  const cache = useQueryClient()
  const {showAlert} = React.useContext(ToastContext)
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      });
      setOpen(false)
      cache.invalidateQueries()
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    const {
        kind,
        title,
        body,
        student_ids: ids
      } = state
    mutate({
      url: SENDMESSAGE(easysch_token?.school_uid),
      data: {
        kind,
        title,
        body,
        ids
      },
    });
  };
  const [open, setOpen] = React.useState(false)
  return <SecretaryLayout
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
        state={state}
        student={student}
        group={group}
        setState={setState}
      />
    }
    currentPage="Messages"
    slug={school}
  />;
}
