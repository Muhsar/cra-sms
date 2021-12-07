import {Link, useParams} from "react-router-dom";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { getRequest, login, postRequest, getSchool } from "api/apiCall";
import { CHANGE_PASSWORD, GETSCHOOL } from "api/apiUrl";
import { ToastContext } from "App.jsx"
import jwt_decode from 'jwt-decode';
import { queryKeys } from "api/queryKey";
export const getServerSideProps = (context: { query: { staff: any, school: any } }) => {
  const { staff, school } = context.query;

  return { props: { staff, school } };
};

export default function ChangePassword() {
  const params:{ slug:any, id:any} = useParams()
  const { slug, id} = params
  const staff = id
  console.log(staff)
  const school = slug
  const { data } = useQuery(
    [queryKeys.getSchool, school],
    async () => await getSchool({ url: GETSCHOOL(school) }),
    {
      retry: 2,
      enabled: !!school,
    }
  );
  const [schoolData, setSchoolData] = React.useState(data?.data);
   React.useEffect(() => {
    setSchoolData(data?.data);
  }, [data?.data]);
  const staffData: {uid: string, full_name: string} = typeof window !== "undefined" && jwt_decode(staff)
  
  const [state, setState] = React.useState<{
    confirm_password: string;
    password: string;
  }>({
    confirm_password: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const {showAlert}  = React.useContext(ToastContext)
  const { mutate } = useMutation(postRequest, {
   onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      });
      window.location.href = `/${school}/login`
    }
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    mutate({
      url: CHANGE_PASSWORD(schoolData?.uid, staffData?.uid),
      data: {
        confirm_password: state.confirm_password,
        password: state.password,
      },
    });
  };
  return (
    <div className="grid max-w-6xl max-h-screen grid-cols-1 gap-10 mx-auto sm:grid-cols-2">
      <div className="hidden col-span-1 sm:my-auto sm:mx-auto sm:block" data-aos="fade-in-up" data-aos-duration="800">
        <img src="https://res.cloudinary.com/jewbreel1/image/upload/v1625737196/jewbreel/sms/otp_mqfisv.svg" alt="" className="transition-all transform hover:scale-105 hover:-translate-y-3" />
      </div>
    <div className="flex flex-col justify-center min-h-screen col-span-1 px-4 bg-gray-50 sm:py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="w-auto h-auto mx-auto sm:hidden"
          src="https://res.cloudinary.com/jewbreel1/image/upload/v1625737196/jewbreel/sms/otp_mqfisv.svg"
            alt="Workflow"
            data-aos="fade-in-up" data-aos-duration="800"
        />
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">{staffData?.full_name}</h2>
        <h2 className="mt-6 text-xl font-extrabold text-center text-gray-900">Please Change Your Password</h2>
        {/* <h2 className="mt-1 text-xl text-center text-gray-900">Or <span className="text-sm text-blue-600"><Link to={`/${slug}/login`}>Sign In To Your Account</Link></span></h2> */}
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-gray-50 sm:rounded-lg sm:px-5">
          <form className="space-y-6" onSubmit={submitForm}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Enter New Password
              </label>
              <div className="mt-1">
                <input
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                    autoComplete="password"
                    placeholder="***********"
                  required
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="mt-1">
                <input
                  onChange={handleChange}
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                    autoComplete="confirm_password"
                    placeholder="***********"
                  required
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition-all transform bg-gray-600 border border-transparent rounded-md shadow-sm hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Change
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
    </div>
  )
}
