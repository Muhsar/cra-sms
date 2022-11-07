import React from "react";
import { useQuery } from "react-query";
import { getRequest } from "api/apiCall";
import { STUDENTPAYMENT } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import ProfilePage from "ProfilePage";
import FeeHistory from "School/Student/FeeHistory";
import SchoolLayout from "components/SchoolLayout";

import { ToastContext } from "App.jsx";
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
export const getServerSideProps = (context: {
  query: { student: any; school: any };
}) => {
  const { student, school } = context.query;

  return { props: { student, school } };
};

export default function StudentFeeHistory() {
  const params:{id: any} = useParams()
  const {id: student} = params
  const { schoolSlug: school } = localStorage
  const easysch_token:{school_uid: any} = jwtDecode(localStorage?.easysch_token)
  const { data: paymentHistory } = useQuery(
    [queryKeys.getStudentPayment, easysch_token?.school_uid],
    async () =>
      await getRequest({ url: STUDENTPAYMENT(easysch_token?.school_uid, student) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid,
    }
  );
  const [history, setHistory] = React.useState(paymentHistory?.data);
    React.useEffect(() => {

    setHistory(paymentHistory?.data);
  }, [paymentHistory?.data]);

  return (
    <>
      <SchoolLayout
        currentPage="Students"
      >
        <ProfilePage
          Component={<FeeHistory history={history} />}
          user="student"
          userId={student}
          page="Fee History"
          school={school}
        />
        </SchoolLayout>
    </>
  );
}
