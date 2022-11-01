import { Link, useParams, withRouter, Redirect, useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { getSchool, login } from "api/apiCall";
import { GETSCHOOL, LOGIN_URL } from "api/apiUrl";
import { ToastContext } from "App.jsx";
import jwtDecode from "jwt-decode";
import LoginDialog from "components/LoginDialog";
import { queryKeys } from "api/queryKey";


export default function Login() {
  const {showAlert} = React.useContext(ToastContext)
  const history = useHistory()
  const params: {slug: any} = useParams()
  const school = params?.slug
  const location = useLocation()
  const { data } = useQuery(
    [queryKeys.getSchool, school],
    async () => await getSchool({ url: GETSCHOOL(school) }),
    {
      retry: 2,
      enabled: !!school,
    }
  );
  // console.log(school)
  const [schoolData, setSchoolData] = React.useState(data?.data);
  React.useEffect(() => {
    setSchoolData(data?.data);
  }, [data?.data]);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const { mutate } = useMutation(login, {
    async onSuccess(data) {
      
      await showAlert({
        message: "Login Successful",
        severity: "success",
      });
      localStorage.setItem("schoolId", schoolData?.uid);
      localStorage.setItem("schoolName", schoolData?.name);
      localStorage.setItem("schoolLogo", schoolData?.logo);
      localStorage.setItem("schoolSlug", school.toLowerCase())
      const easysch_token: { groups: string[] } =
        typeof window !== "undefined" &&
        jwtDecode(localStorage?.getItem("easysch_token"));
        await setOpen(true);
        if(easysch_token){
          if (easysch_token?.groups.length === 2) {
            // TODO: Fix after BEc exam Dialog state isn't updating for some weird reason
            history.replace(`/${school}`, `/${school}`);
            // window.location.href = `/${school}/`;
            // setOpen(true);                    
            // LoginDialog({open, setOpen, school})
          }
          if (easysch_token?.groups.length === 1) {
            if (easysch_token?.groups[0] === "Teacher") {
              history.push(`/${school}/staff`, `/${school}/staff`);
            }
            if (easysch_token?.groups[0] === "Bursar") {
              history.push(`/${school}/bursar`, `/${school}/bursar`);
            }
            if (easysch_token?.groups[0] === "Secretary") {
              history.push(`/${school}/secretary`, `/${school}/secretary`);
            }
            if (easysch_token?.groups[0] === "Owner") {
              history.push(`/${school}/school`, `/${school}/school`);
            }
          }
        }
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    mutate({
      url: LOGIN_URL(schoolData?.uid),
      data: {
        username: state.email,
        password: state.password,
        school_id: schoolData?.uid
      },
    });
  };
  return (
    <>
    { 
    <>
      <LoginDialog open={open} setOpen={setOpen} school={school} />
      <div className="grid max-w-6xl max-h-screen grid-cols-1 gap-10 mx-auto sm:grid-cols-2">
        <div
          className="hidden col-span-1 sm:my-auto sm:mx-auto sm:block"
          data-aos="fade-in-up"
          data-aos-duration="800"
        >
          <img
            // src="https://res.cloudinary.com/jewbreel1/image/upload/v1625737196/jewbreel/sms/web_password_sgac11.svg"
            src={schoolData?.logo}
            alt=""
            className="transition-all transform hover:scale-105 hover:-translate-y-3 h-52 w-52"
          />
        </div>
        <div className="flex flex-col justify-center min-h-screen col-span-1 px-4 bg-gray-50 sm:py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="w-auto h-auto mx-auto sm:hidden"
              // src="https://res.cloudinary.com/jewbreel1/image/upload/v1625737196/jewbreel/sms/mobile_password_kehmcc.svg"
              src={schoolData?.logo}
              alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              {schoolData?.name}
            </h2>
            <h2 className="mt-1 text-3xl font-extrabold text-center text-gray-900">
              Sign in
            </h2>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-8 bg-gray-50 sm:rounded-lg sm:px-5">
              <form className="space-y-6" onSubmit={submitForm}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile Number Or Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      required
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="text-left">
                  <Link to={`/${school}/otp`} className="text-blue-600">
                      Verify New Account
                  </Link>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition-all transform bg-gray-600 border border-transparent rounded-md shadow-sm hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
    }
    </>
  );
}
