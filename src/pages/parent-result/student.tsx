/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { useQuery } from "react-query";
import { getSchool } from "api/apiCall";
import { GRADE, VIEW_RESULT } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import { images } from "components/images";

export const getServerSideProps = (context: { query: { student: any, school: any } }) => {
  const { student, school } = context.query;

  return { props: { student, school } };
};

export default function StudentResult({student, school, logo, token}) {
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
      <header>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />
      </header>
      <div className="text-lg font-bold container max-w-5xl my-8">
        <div className="text-lg font-bold ">
          <div className="text-lg font-bold ">
            <div className="text-lg font-bold ">
              <div className="text-lg font-bold ">
                <div className="text-lg font-bold ">
                  <div className="text-lg font-bold ">
                    <div>
                      <img src={logo} className="text-lg font-bold d-block mx-auto img-fluid h-48 w-48 my-2" alt="" />
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
                      <div className="text-lg font-bold p-2 bd-highlight mt-5">
                        <img
                          src={result?.student.image}
                          className="text-lg font-bold d-block mx-auto img-thumbnail img-fluid h-48 w-48 object-center object-cover"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-lg font-bold container">
                  <table className="text-lg font-bold table table-bordered max-w-5xl">
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
                <div className="text-lg font-bold teacher-remark-section">
                  Teacher's Remark
                  <div className="text-lg font-bold teacher-remark">
                  {result?.teacher_remark}
                  </div>
                </div>
              </div>
              Principal's Remark
              <div className="text-lg font-bold teacher-remark">
                {result?.principal_remark}
              </div>
              <div className="text-lg font-bold resumption-section">
                Next Term Begins:{" "}
                <span className="text-lg font-bold resumption-date">{result?.next_term_begin_date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
