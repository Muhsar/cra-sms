/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { useQuery } from "react-query";
import { getRequest } from "api/apiCall";
import { GRADE, RESULTS } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import { images } from "components/images";
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Helmet } from 'react-helmet';

// https://explore.skillbuilder.aws/learn

export const getServerSideProps = (context: { query: { student: any, school: any } }) => {
  const { student, school } = context.query;

  return { props: { student, school } };
};

export default function StudentResult() {
  const params:{ id: any } = useParams()
  const { id: student } = params
  const {schoolLogo: logo, schoolSlug: school} = localStorage
  const easysch_token: {school_uid: any} = jwtDecode(localStorage?.easysch_token)
  const {
    data:resultData
  } = useQuery(
    [queryKeys.getResults, student, easysch_token?.school_uid],
    async () => await getRequest({ url: RESULTS(easysch_token?.school_uid, student) }),
    {
      retry: 2,
      enabled: !!(easysch_token?.school_uid&&student)
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
      <div className="px-5 py-2 text-lg result-parent-div">
  <div className="text-lg ">
    <div className="text-lg ">
      <div className="text-lg ">
        <div className="text-lg ">
          <div className="text-lg ">
            <div className="text-lg ">                            
              <div style={{marginLeft: 45}}>
                  <img src="https://res.cloudinary.com/masterp4dev/image/upload/v1638876935/logo4-1_xoa0ru.jpg" alt="" />
                  
                </div>
              <h3 id="current-term-header">THIRD TERM STUDENT'S PERFORMANCE REPORT</h3>
              <div className="flex flex-row justify-between w-full max-w-5xl text-lg bd-highlight" style={{width: 1004}}>
                <div className="px-2 text-lg bd-highlight" style={{width: 804}}>
                  <div>
                    NAME: <span id="student-name-underline">{result?.student.full_name}</span>
                    GENDER: <span id="student-gender-underline">{result?.student.gender}</span>
                  </div>
                  <div>
                    CLASS: <span className="text-lg student-basic-data">{result?.student.current_class.name}</span>
                    SESSION: <span className="text-lg student-basic-data">{result?.session}</span>
                  </div>
                  <div className="text-lg performance-summary-table">
                    <table className="table text-lg table-bordered">
                      <thead className="text-lg thead-light">
                        <tr>
                          <th colSpan={5} id="perfomance-summary">PERFORMANCE SUMMARY</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Total Obtained:</td>
                          <td className="text-lg bolded-text">{result?.total_obtained}</td>
                          <td>PERCENTAGE</td>
                          <td className="text-lg bolded-text">{result?.percentage}%</td>
                          <td rowSpan={2} id="overall-remark">
                          {result?.overall_remark}
                          </td>
                        </tr>
                        <tr>
                          <td>Total Obtainable:</td>
                          <td className="text-lg bolded-text">{result?.total_obtainable}</td>
                          <td>GRADE</td>
                          <td className="text-lg bolded-text">{result?.grade}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="p-2 text-lg bd-highlight" style={{width: 200}}>
                  <img src={result?.student.image} alt="" className="object-cover object-center w-full h-48 mt-5 text-lg" />
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-lg " style={{width: 1004}}>
            <table className="table text-lg table-bordered" style={{width: 1004}}>
              <thead className="text-lg thead-light">
                <tr>
                  {/* <tr>
                        <th scope="col">SUBJECTS</th>
                        <th scope="col">FIRST CA</th>
                        <th scope="col">SECOND CA</th>
                        <th scope="col">EXAM</th>
                        <th scope="col">TOTAL</th>
                        {{ if $DidFirstTerm}}
                        <th scope="col">FIRST TERM</th>
                        {{ end }}
                        {{ if $DidSecondTerm}}
                        <th scope="col">SECOND TERM</th>
                        {{ end }}
                        <th scope="col">AVERAGE</th>
                        <th scope="col">GRADE</th>
                        <th scope="col">REMARKS</th>
                      </tr>
                </thead> */}
                <th scope="col">SUBJECTS</th>
                        <th scope="col">FIRST CA</th>
                        <th scope="col">SECOND CA</th>
                        <th scope="col">EXAM</th>
                        <th scope="col">TOTAL</th> 
                        {result?.did_first_term && <th scope="col">FIRST TERM</th>}    
                        {result?.did_second_term && <th scope="col">SECOND TERM</th>}                            
                        {/* <th scope="col">FIRST TERM</th>
                        <th scope="col">SECOND TERM</th> */}
                        <th scope="col">AVERAGE</th>
                        <th scope="col">GRADE</th>
                        <th scope="col">REMARKS</th>
                </tr>
              </thead>
              <tbody>
              {
                        result?.results.map((subjectResult, index) => (
                      <tr key={index}>
                        <td>{subjectResult.subject}</td>
                        <td>{subjectResult.t_first_ca}</td>
                        <td>{subjectResult.t_second_ca}</td>
                        <td>{subjectResult.third_exam}</td>
                        <td>{Number(subjectResult.t_first_ca)+Number(subjectResult.t_second_ca)+Number(subjectResult.third_exam)}</td>
                        {result?.did_first_term && <td>{subjectResult.total_first}</td>}    
                        {result?.did_second_term && <td>{subjectResult.total_second}</td>}                                                
                        <td>{subjectResult.current_session_average}</td>
                        <td>{subjectResult.grade}</td>
                        <td>{subjectResult.remark}</td>
                      </tr>
                        ))
                      }
              </tbody>
            </table>
          </div>
          <div>
          </div>
          <div className="text-lg teacher-remark-section" style={{width: 1004}}>
            Teacher's Remark
            <div className="text-lg teacher-remark" style={{width: 1004}}>
            {result?.teacher_remark}
            </div>
          </div>
        </div>
        Principal's Remark
        <div className="text-lg teacher-remark" style={{width: 1004}}>
        {result?.principal_remark}
        </div>
        <div className="text-lg resumption-section" style={{width: 1004}}>
          Next Term Begins: <span className="text-lg resumption-date">Mon, 05-SEP-2022</span>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
