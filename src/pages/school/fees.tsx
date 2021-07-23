import React from "react";
import SchoolLayout from "components/SchoolLayout";
// import Table from "School/PaymentHistory/Table";
import FeeManagement from "School/FeeManagement";
// import { PaymentHistory } from "Mock/PaymentHistory";
import { SearchField } from "components/search.js";
import { PaymentHistory } from "Mock/PaymentHistory";
import { queryKeys } from "api/queryKey";
import { PAYMENTS, STUDENTS } from "api/apiUrl";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getRequest, postRequest } from "api/apiCall";
import { ToastContext } from "App.jsx";
export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};

export default function SchoolFees({ token, school }) {
  const { showAlert } = React.useContext(ToastContext);

  const { data: paymentHistory } = useQuery(
    [queryKeys.getPayments, token?.school_uid],
    async () => await getRequest({ url: PAYMENTS(token?.school_uid) }),
    {
      retry: 2,
      enabled: !!token?.school_uid,
    }
  );
  const { data: studentList } = useQuery(
    [queryKeys.getStudents, token?.school_uid],
    async () => await getRequest({ url: STUDENTS(token?.school_uid) }),
    {
      retry: 2,
      enabled: !!token?.school_uid,
    }
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const cache = useQueryClient()
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      setPaymentHistory([
        {
          id: state.student_id,
          student: {
            full_name: state.full_name,
            current_class: { name: state.current_class.name },
          },
          amount: state.amount,
          date_added: new Date(),
        },
        ...history,
      ]);
      setOpen(false);
      showAlert({
        message: data?.message,
        severity: "success",
      });
      setState({
        ...state,
        full_name: "",
        amount: 0,
        student_id: "",
      });
      cache.invalidateQueries();
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
      url: PAYMENTS(token?.school_uid),
      data: {
        student_id: state.student_id,
        amount: state.amount,
      },
    });
  };
  const [students, setStudents] = React.useState(studentList?.data);
  const [history, setPaymentHistory] = React.useState(paymentHistory?.data);
  React.useEffect(() => {
    setPaymentHistory(paymentHistory?.data);
    setStudents(studentList?.data);
  }, [paymentHistory?.data, studentList?.data]);
  const [order, setOrder] = React.useState("asc");
  const [listCount, setlistCount] = React.useState(0);
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    setList(PaymentHistory.slice(listCount, listCount + 10));
  }, [listCount]);

  const [state, setState] = React.useState({
    full_name: "",
    amount: 0,
    student_id: "",
    current_class: { name: "" },
  });

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const studentValue = students?.filter(
      (student) => student.id == e.target.value
    );
    console.log(studentValue);
    setState({
      ...state,
      [e.target.name]: e.target.value,
      current_class: { name: studentValue[0].current_class.name },
      full_name: studentValue[0].full_name,
    });
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const searchBody = "#PaymentHistory tr";
    SearchField({ value, searchBody });
  };
  const [open, setOpen] = React.useState(false);
  return (
    <SchoolLayout
      Component={
        <FeeManagement
          state={state}
          handleChange={handleChange}
          handleSelect={handleSelect}
          handleSubmit={submitForm}
          handleSearch={handleSearch}
          setState={setState}
          history={history}
          students={students}
          open={open}
          setOpen={setOpen}
        />
      }
      currentPage="Fee Management"
      slug={school}
    />
  );
}
