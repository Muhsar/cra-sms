import { Link, useHistory, useParams } from 'react-router-dom';
import React from "react";
import { useMutation, useQuery } from "react-query";
import { postOtp, getSchool } from 'api/apiCall';
import { GETSCHOOL, VERIFY_OTP } from "api/apiUrl";
import { ToastContext } from "App.jsx"
import jwt from "jsonwebtoken"
import { queryKeys } from "api/queryKey";
import jwt_decode from 'jwt-decode';

export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};

export default function OTP() {
  const {slug} = useParams()
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
      // console.log(easysch_token, jwt_decode(easysch_token))
      if(easysch_token){
      window.location = `/${school}/verify/${easysch_token}`
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
    <div className="max-h-screen grid sm:grid-cols-2 grid-cols-1 gap-10 max-w-6xl mx-auto">
      <div className="col-span-1 sm:my-auto sm:mx-auto sm:block hidden" data-aos="fade-in-up" data-aos-duration="800">
        <img src="https://res.cloudinary.com/jewbreel1/image/upload/v1625737196/jewbreel/sms/otp_mqfisv.svg" alt="" className="transition-all transform hover:scale-105 hover:-translate-y-3" />
      </div>
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:py-12 sm:px-6 lg:px-8 px-4 col-span-1">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-auto w-auto sm:hidden"
          src="https://res.cloudinary.com/jewbreel1/image/upload/v1625737196/jewbreel/sms/otp_mqfisv.svg"
            alt="Workflow"
            data-aos="fade-in-up" data-aos-duration="800"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify Your Account</h2>
        <h2 className="mt-1 text-center text-xl text-gray-900">Or <span className="text-sm text-blue-600"><Link to={`/${school}/login`}>Sign In To Your Account</Link></span></h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-50 py-8 px-4 sm:rounded-lg sm:px-5">
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border hover:scale-105 transition-all transform border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
