import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { getSchool, login } from "api/apiCall";
import { GETSCHOOL, LOGIN_URL } from "api/apiUrl";
import { ToastContext } from "App.jsx";
import jwt_decode from "jwt-decode";
import LoginDialog from "components/LoginDialog";
import { queryKeys } from "api/queryKey";

export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};

export default function Login({ school, logged_in, redirectTo, token }) {
  const history = useHistory()
  const { showAlert } = React.useContext(ToastContext);
  // if (logged_in&& token && token !== undefined && token?.groups.length==1 && token?.groups[0]=="School Owner") {
  //   history.replace(`/${school}/${redirectTo}`, `/${school}/school`)
  // }
  // if (logged_in&& token && token !== undefined && token?.groups.length==1 && token?.groups[0]=="Teacher") {
  //   history.replace(`/${school}/${redirectTo}`, `/${school}/staff`)
  // }
  // if (logged_in && token && token !== undefined && token?.groups.length==2) {
  //   history.replace(`/${school}/${redirectTo}`, `/${school}/school`)
  // }
  // console.log(logged_in)
      // logged_in && history.replace(`/${school}/${redirectTo}`, `/${school}/${redirectTo}`)
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
    onSuccess() {
      showAlert({
        message: "Login Successful",
        severity: "success",
      });
      localStorage.setItem("schoolId", schoolData?.uid);
      localStorage.setItem("schoolName", schoolData?.name);
      localStorage.setItem("schoolLogo", schoolData?.logo);
      localStorage.setItem("schoolSlug", school.toLowerCase())
      const token: { groups: string[] } =
        typeof window !== "undefined" &&
        jwt_decode(localStorage?.getItem("token"));
      if (token?.groups.length === 2) {
        setOpen(true);
        // LoginDialog({open, setOpen})
      }
      if (token?.groups.length === 1) {
        if (token?.groups[0] === "Teacher") {
          history.replace(`/${school}/staff/`, `/${school}/staff/`);
        }
        if (token?.groups[0] === "School Owner") {
          history.replace(`/${school}/school/`, `/${school}/school/`);
        }
      }
      // history.replace("/school/", "/school/");
    },
    onError(error: any) {
      error?.response?.data?.message.map((errormsg: any) =>
        showAlert({
          message: errormsg,
          severity: "error",
        })
      );
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    mutate({
      url: LOGIN_URL,
      data: {
        email: state.email,
        password: state.password,
      },
    });
  };
  return (
    <>
      <LoginDialog open={open} setOpen={setOpen} school={school} />
      <div className="max-h-screen grid sm:grid-cols-2 grid-cols-1 gap-10 max-w-6xl mx-auto">
        <div
          className="col-span-1 sm:my-auto sm:mx-auto sm:block hidden"
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
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:py-12 sm:px-6 lg:px-8 px-4 col-span-1">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-auto w-auto sm:hidden"
              // src="https://res.cloudinary.com/jewbreel1/image/upload/v1625737196/jewbreel/sms/mobile_password_kehmcc.svg"
              src={schoolData?.logo}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {schoolData?.name}
            </h2>
            <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
              Sign in
            </h2>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-gray-50 py-8 px-4 sm:rounded-lg sm:px-5">
              <form className="space-y-6" onSubmit={submitForm}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
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
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="text-left">
                  <Link to={`/${school}/otp`}>
                    <a href="#" className="text-blue-600">
                      Verify New Account
                    </a>
                  </Link>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border hover:scale-105 transition-all transform border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
  );
}
