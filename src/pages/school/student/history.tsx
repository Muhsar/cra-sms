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
import jwt_decode from 'jwt-decode';
export const getServerSideProps = (context: {
  query: { student: any; school: any };
}) => {
  const { student, school } = context.query;

  return { props: { student, school } };
};

export default function StudentFeeHistory() {
  const {id: student, slug: school} = useParams()
  const token = jwt_decode(localStorage?.token)
  const { data: paymentHistory } = useQuery(
    [queryKeys.getStudentPayment, token?.school_uid],
    async () =>
      await getRequest({ url: STUDENTPAYMENT(token?.school_uid, student) }),
    {
      retry: 2,
      enabled: !!token?.school_uid,
    }
  );
  const [history, setHistory] = React.useState(paymentHistory?.data);
    React.useEffect(() => {

    setHistory(paymentHistory?.data);
  }, [paymentHistory?.data]);

  return (
    <>
      <SchoolLayout
        Component={
          <ProfilePage
            Component={<FeeHistory history={history} />}
            user="student"
            userId={student}
            page="Fee History"
            school={school}
          />
        }
        currentPage="Students"
        slug={school}
      />
    </>
  );
}
