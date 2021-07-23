/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { useQuery } from "react-query";
import { getRequest } from "api/apiCall";
import { GRADE, RESULTS } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import { images } from "components/images";
const results = [
  {subject: "Mathematics",first_ca: 20,second_ca: 20,exam: 60,total: 100,first_term: 100,second_term: 100, average: 100, remark: "Excellent",grade: "A"},
  {subject: "Mathematics",first_ca: 20,second_ca: 20,exam: 60,total: 100,first_term: 100,second_term: 100, average: 100, remark: "Excellent",grade: "A"},
  {subject: "Mathematics",first_ca: 20,second_ca: 20,exam: 60,total: 100,first_term: 100,second_term: 100, average: 100, remark: "Excellent",grade: "A"},
  {subject: "Mathematics",first_ca: 20,second_ca: 20,exam: 60,total: 100,first_term: 100,second_term: 100, average: 100, remark: "Excellent",grade: "A"},
  {subject: "Mathematics",first_ca: 20,second_ca: 20,exam: 60,total: 100,first_term: 100,second_term: 100, average: 100, remark: "Excellent",grade: "A"},
  {subject: "Mathematics",first_ca: 20,second_ca: 20,exam: 60,total: 100,first_term: 100,second_term: 100, average: 100, remark: "Excellent",grade: "A"},
  {subject: "Mathematics",first_ca: 20,second_ca: 20,exam: 60,total: 100,first_term: 100,second_term: 100, average: 100, remark: "Excellent",grade: "A"},
  {subject: "Mathematics",first_ca: 20,second_ca: 20,exam: 60,total: 100,first_term: 100,second_term: 100, average: 100, remark: "Excellent",grade: "A"},
  {subject: "Mathematics",first_ca: 20,second_ca: 20,exam: 60,total: 100,first_term: 100,second_term: 100, average: 100, remark: "Excellent",grade: "A"},
  {subject: "Mathematics",first_ca: 20,second_ca: 20,exam: 60,total: 100,first_term: 100,second_term: 100, average: 100, remark: "Excellent",grade: "A"},
  {subject: "Mathematics",first_ca: 20,second_ca: 20,exam: 60,total: 100,first_term: 100,second_term: 100, average: 100, remark: "Excellent",grade: "A"},
  // More people...
];

export const getServerSideProps = (context: { query: { student: any, school: any } }) => {
  const { student, school } = context.query;

  return { props: { student, school } };
};

export default function StudentResult({student, school, logo, token}) {
  const {
    data:resultData
  } = useQuery(
    [queryKeys.getResults, student, token?.school_uid],
    async () => await getRequest({ url: RESULTS(token?.school_uid, student) }),
    {
      retry: 2,
      enabled: !!(token?.school_uid&&student)
    }
    )
  const [result, setStudents] = React.useState(resultData?.data)
   React.useEffect(() => {
    setStudents(resultData?.data);
  }, [resultData?.data]);
  return (
    <>
      <header>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />
      </header>
      {/* <div className="h-screen overflow-visible bg-gray-100 max-w-5xl my-8 mx-auto">
                    <div className="w-full">
                      <img src={logo} className="d-block mx-auto h-48 w-48 my-2 object-center" alt=""="" />
                    </div>
                    <h3 id="current-term-header" className="font-extrabold text-center text-xl">
                      THIRD TERM STUDENT'S PERFORMANCE REPORT
                    </h3>
                    <div className="text-lg font-bold d-flex justify-content-between bd-highlight mb-3 max-w-5xl">
                      <div className="text-lg font-bold p-2 bd-highlight flex-grow">
                        <div>
                          NAME:{" "}
                          <span className="text-lg font-bold student-name-underline">
                            {result?.student.full_name}
                          </span>
                          GENDER:{" "}
                          <span className="text-lg font-bold student-gender-underline capitalize">{result?.student.gender}</span>
                        </div>
                        <div>
                          CLASS:{" "}
                          <span className="text-lg font-bold student-basic-data">{result?.student.current_class.name}</span>
                          SESSION:{" "}
                          <span className="text-lg font-bold student-basic-data">2020/2021</span>
                        </div>
                        <div className="text-lg font-bold performance-summary-table">
                          <table className="text-lg font-bold table table-bordered">
                            <thead className="text-lg font-bold thead-light">
                              <tr>
                                <th colSpan={5} className="text-lg font-bold perfomance-summary">
                                  PERFORMANCE SUMMARY
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Total Obtained:</td>
                                <td className="text-lg font-bold bolded-text">{result?.total_obtained}</td>
                                <td>PERCENTAGE</td>
                                <td className="text-lg font-bold bolded-text">{result?.percentage}%</td>
                                <td rowSpan={2} className="text-lg font-bold overall-remark">
                                  {result?.overall_remark}
                                </td>
                              </tr>
                              <tr>
                                <td>Total Obtainable:</td>
                                <td className="text-lg font-bold bolded-text">{result?.total_obtainable}</td>
                                <td>GRADE</td>
                                <td className="text-lg font-bold bolded-text">{result?.grade}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="p-2 mt-5">
                        <img
                          src={result?.student.image}
                          className="img-thumbnail h-48 w-48 object-center object-cover"
                          alt=""=""
                        />
                      </div>
                    </div>
                <div className="text-lg font-bold container">
                  <table className="text-lg font-bold table table-bordered">
                    <thead className="text-lg font-bold thead-light">
                      <tr>
                        <th scope="col">SUBJECTS</th>
                        <th scope="col">FIRST CA</th>
                        <th scope="col">SECOND CA</th>
                        <th scope="col">EXAM</th>
                        <th scope="col">TOTAL</th>
                        <th scope="col">FIRST TERM</th>
                        <th scope="col">SECOND TERM</th>
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
                        <td>{result.total_first}</td>
                        <td>{result.total_second}</td>
                        <td>{result.session_average}</td>
                        <td>{result.grade}</td>
                        <td>{result.remark}</td>
                      </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                <div></div>
                <div className="text-lg font-bold teacher-remark-section max-w-5xl">
                  Teacher's Remark
                  <div className="text-lg font-bold teacher-remark w-full">
                  {result?.teacher_remark}
                  </div>
                </div>
              Principal's Remark
              <div className="text-lg font-bold teacher-remark">
                {result?.principal_remark}
              </div>
              <div className="text-lg font-bold resumption-section max-w-5xl">
                Next Term Begins:{" "}
                <span className="font-bold border-b border-gray-700 text-base">{result?.next_term_begin_date}</span>
              </div>
      </div> */}
      <div className="result-parent-div px-5 py-5">
  <div className="">
    <div className="">
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <div style={{width: 1004}}>
                <img src={logo} alt="" className="h-48 w-48 object-center d-block mx-auto" />
              </div>
              <h3 id="current-term-header">THIRD TERM STUDENT'S PERFORMANCE REPORT</h3>
              <div className="flex justify-between flex-row w-full bd-highlight mb-3 max-w-5xl" style={{width: 1004}}>
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
                  <img src={result?.student.image} alt="" className="h-48 w-full object-center mt-5" />
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
                        <th scope="col">FIRST TERM</th>
                        <th scope="col">SECOND TERM</th>
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
                        <td>{result.total_first}</td>
                        <td>{result.total_second}</td>
                        <td>{result.session_average}</td>
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
