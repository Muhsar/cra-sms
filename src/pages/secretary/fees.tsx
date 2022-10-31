import React from "react";
import SecretaryLayout from "components/SecretaryLayout";
// import Table from "School/PaymentHistory/Table";
import FeeManagement from "School/FeeManagement";
// import { PaymentHistory } from "Mock/PaymentHistory";
import { SearchField } from "components/search";
import { PaymentHistory } from "Mock/PaymentHistory";
import { queryKeys } from "api/queryKey";
import { GETSTUDENTBILL, PAYMENTS, STUDENTS } from "api/apiUrl";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getRequest, postRequest } from "api/apiCall";
import { ToastContext } from "App.jsx";
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};

export default function SchoolFees() {
  const easysch_token:{school_uid: any} = jwtDecode(localStorage?.easysch_token)
  const params:{slug: any} = useParams()
  const {slug} = params
const school = slug
  const { data: paymentHistory } = useQuery(
    [queryKeys.getPayments, easysch_token?.school_uid],
    async () => await getRequest({ url: PAYMENTS(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid,
    }
  );
  const { data: studentList } = useQuery(
    [queryKeys.getStudents, easysch_token?.school_uid],
    async () => await getRequest({ url: STUDENTS(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid,
    }
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const cache = useQueryClient()
  const {showAlert} = React.useContext(ToastContext)
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      });
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
      setState({
        ...state,
        full_name: "",
        amount: 0,
        student_id: "",
      });
      cache.invalidateQueries();
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    mutate({
      url: PAYMENTS(easysch_token?.school_uid),
      data: {
        student_id: state.student_id,
        payments: [
          {
            student_bill_id: state.student_bill_id,
            amount: state.amount,
            source: state.source,
          }
        ],
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
    student_bill_id: "",
    amount_left: null,
    source: null,
  });

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.name==="student_bill_id"){
      const currentBill = bill?.filter(fee=>fee.id==e.target.value)[0]
      console.log(e.target.value, currentBill);
      setState({
        ...state,
        student_bill_id: e.target.value,
        amount_left: Number(currentBill.amount * currentBill.bill.unit) - Number(currentBill.amount_paid)
      })
    }
    else{
      const studentValue = students?.filter(
        (student) => student.id == e.target.value
        );
        
        setState({
          ...state,
          [e.target.name]: e.target.value,
          current_class: { name: studentValue[0].current_class.name },
          full_name: studentValue[0].full_name,
        });
      }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const searchBody = "#PaymentHistory tr";
    // SearchField({ value, searchBody });
  };

  const { data: studentBillList } = useQuery(
    [queryKeys.getStudentBill, easysch_token?.school_uid, state?.student_id],
    async () => await getRequest({ url: GETSTUDENTBILL(easysch_token?.school_uid, state?.student_id) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid && !!state?.student_id
    }
  );
  const [bill, setBill] = React.useState(studentBillList?.data)
  React.useEffect(()=>{
    setBill(studentBillList?.data)
  },[studentBillList?.data]);
  const [open, setOpen] = React.useState(false);
  return (
    <SecretaryLayout
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
          bill={bill}
        />
      }
      currentPage="Fee Management"
      // slug={school}
    />
  );
}
