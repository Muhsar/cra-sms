/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { useQuery } from "react-query";
import { getSchool } from "api/apiCall";
import { GRADE, VIEW_RESULT } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import { images } from "components/images";
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Helmet } from 'react-helmet';

export const getServerSideProps = (context: { query: { student: any, school: any } }) => {
  const { student, school } = context.query;

  return { props: { student, school } };
};

export default function StudentResult() {
  const params:{ id: any, slug: any } = useParams()
  const { id: student, slug: school } = params
  const {schoolLogo: logo} = localStorage
  const easysch_token:{school_uid: any} = jwtDecode(localStorage?.easysch_token)
  const {
    data:resultData
  } = useQuery(
    [queryKeys.getResults, student, school],
    async () => await getSchool({ url: VIEW_RESULT(school, student) }),
    {
      retry: 2,
      enabled: !!(school&&student)
    }
    )
  const [result, setStudents] = React.useState(resultData?.data)
   React.useEffect(() => {
    setStudents(resultData?.data);
  }, [resultData?.data]);
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />
      </Helmet>
      <div className="px-5 py-5 result-parent-div">
  <div className="">
    <div className="">
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <div style={{width: 1004}}>
                <img src={logo} alt="" className="object-center w-48 h-48 mx-auto d-block" />
              </div>
              <h3 id="current-term-header">THIRD TERM STUDENT'S PERFORMANCE REPORT</h3>
              <div className="flex flex-row justify-between w-full max-w-5xl mb-3 bd-highlight" style={{width: 1004}}>
                <div className="p-2 bd-highlight" style={{width: 804}}>
                  <div>
                    NAME: <span id="student-name-underline">{result?.student.full_name}</span>
                    GENDER: <span id="student-gender-underline">{result?.student.gender}</span>
                  </div>
                  <div>
                    CLASS: <span className="student-basic-data">{result?.student.current_class.name}</span>
                    SESSION: <span className="student-basic-data">2020/2021</span>
                  </div>
                  <div className="performance-summary-table">
                    <table className="table table-bordered">
                      <thead className="thead-light">
                        <tr>
                          <th colSpan={5} id="perfomance-summary">PERFORMANCE SUMMARY</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Total Obtained:</td>
                          <td className="bolded-text">{result?.total_obtained}</td>
                          <td>PERCENTAGE</td>
                          <td className="bolded-text">{result?.percentage}%</td>
                          <td rowSpan={2} id="overall-remark">
                          {result?.overall_remark}
                          </td>
                        </tr>
                        <tr>
                          <td>Total Obtainable:</td>
                          <td className="bolded-text">{result?.total_obtainable}</td>
                          <td>GRADE</td>
                          <td className="bolded-text">{result?.grade}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="p-2 bd-highlight" style={{width: 200}}>
                  <img src={result?.student.image} alt="" className="object-contain w-48 h-48 mt-5" />
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
          <div className="" style={{width: 1004}}>
            <table className="table table-bordered" style={{width: 1004}}>
              <thead className="thead-light">
                <tr>
                <th scope="col">SUBJECTS</th>
                        <th scope="col">FIRST CA</th>
                        <th scope="col">SECOND CA</th>
                        <th scope="col">EXAM</th>
                        <th scope="col">TOTAL</th>
                        {/* <th scope="col">FIRST TERM</th>
                        <th scope="col">SECOND TERM</th> */}
                        <th scope="col">AVERAGE</th>
                        <th scope="col">GRADE</th>
                        <th scope="col">REMARKS</th>
                </tr>
              </thead>
              <tbody>
              {
                        result?.results.map((result, index) => (
                      <tr key={index}>
                        <td>{result.subject}</td>
                        <td>{result.t_first_ca}</td>
                        <td>{result.t_second_ca}</td>
                        <td>{result.third_exam}</td>
                        <td>{Number(result.t_first_ca)+Number(result.t_second_ca)+Number(result.third_exam)}</td>
                        {/* <td>{result.total_first}</td>
                        <td>{result.total_second}</td> */}
                        <td>{result.current_session_average}</td>
                        <td>{result.grade}</td>
                        <td>{result.remark}</td>
                      </tr>
                        ))
                      }
              </tbody>
            </table>
          </div>
          <div>
          </div>
          <div className="teacher-remark-section" style={{width: 1004}}>
            Teacher's Remark
            <div className="teacher-remark" style={{width: 1004}}>
              A splendid result. Increase your academic tempo. The sky is the beginning.
            </div>
          </div>
        </div>
        Principal's Remark
        <div className="teacher-remark" style={{width: 1004}}>
          An excellent performance. keep it up.
        </div>
        <div className="resumption-section" style={{width: 1004}}>
          Next Term Begins: <span className="resumption-date">Tue, 04-May-2021</span>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  );
}
