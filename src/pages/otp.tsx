import { Link, useHistory, useParams } from 'react-router-dom';
import React from "react";
import { useMutation, useQuery } from "react-query";
import { postOtp, getSchool } from 'api/apiCall';
import { GETSCHOOL, VERIFY_OTP } from "api/apiUrl";
import { ToastContext } from "App.jsx"
import jwt from "jsonwebtoken"
import { queryKeys } from "api/queryKey";
import jwtDecode from 'jwt-decode';

export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};

export default function OTP() {
  const params: {slug: any} = useParams()
  const slug = params.slug
  const school = slug
  const history = useHistory()
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
  
  const [state, setState] = React.useState<{
    phone_number: string;
    otp: string;
  }>({
    phone_number: "",
    otp: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const {showAlert} = React.useContext(ToastContext)
  const { mutate } = useMutation(postOtp, {
    onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      });
      const payload = {full_name: data?.data?.full_name,
        uid: data?.data?.uid,
        image: data?.data?.image}
    const easysch_token =  jwt.sign(
        payload,
        "verify"
      )
      if(easysch_token){
      window.location.href = `/${school}/verify/${easysch_token}`
      } 
    },
    
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    mutate({
      url: VERIFY_OTP(schoolData?.uid),
      data: {
        phone_number: state.phone_number,
        otp: state.otp,
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
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Verify Your Account</h2>
        <h2 className="mt-1 text-xl text-center text-gray-900">Or <span className="text-sm text-blue-600"><Link to={`/${school}/login`}>Sign In To Your Account</Link></span></h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-gray-50 sm:rounded-lg sm:px-5">
            <form className="space-y-6" onSubmit={submitForm}>
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Enter Phone Number
              </label>
              <div className="mt-1">
                <input
                  onChange={handleChange}
                  id="phone_number"
                  name="phone_number"
                  type="telephone"
                    autoComplete="phone_number"
                    placeholder="Enter Phone Number"
                  required
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <div className="mt-1">
                <input
                  onChange={handleChange}
                  id="otp"
                  name="otp"
                  type="text"
                    autoComplete="otp"
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
                Verify
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
    </div>
  )
}
