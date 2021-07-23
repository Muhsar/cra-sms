import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "styles/globals.css";
import "aos/dist/aos.css";
import { QueryClient, QueryClientProvider } from "react-query";
import useToast from "components/Alerts";
import "tailwindcss/tailwind.css";
import jwt_decode from "jwt-decode";
import { schoolRoutes, unauthorizedUser, staffRoutes } from './navigation';

const queryClient = new QueryClient();
export const ToastContext = React.createContext();

function App() {
  const [token, setToken] = React.useState();
  const [slug, setSlug] = React.useState();
  const localToken =
    typeof window !== "undefined" && localStorage?.getItem("token");
  const localSlug =
    typeof window !== "undefined" && localStorage?.getItem("schoolSlug");
  React.useEffect(() => {
    typeof window !== "undefined" &&
      localToken &&
      localToken !== "undefined" &&
      setToken(jwt_decode(localToken));
    typeof window !== "undefined" &&
      localSlug &&
      localSlug !== "undefined" &&
      setSlug(localSlug);
  }, [localToken, localSlug]);
  const { showAlert, Toast } = useToast();
  React.useEffect(() => {
    // navigator?.serviceWorker
    //   ?.register("/sw.js")
    //   .then((reg) => console.log("service worker registered", reg))
    //   .catch((err) => console.log("service worker not registered", err));
  }, []);
  const queryClientRef = React.useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const localLogo =
    typeof window !== "undefined" && localStorage?.getItem("schoolLogo");
  const [logo, setLogo] = React.useState("");
  React.useEffect(() => {
    typeof window !== "undefined" &&
      localLogo &&
      localLogo !== "undefined" &&
      setLogo(localLogo);
  }, [localLogo]);
  const schoolPages = () => {
    return (
    <>
    {
      schoolRoutes({slug}).map((route, index)=>(
        <Route key={index} path={route.href} component={route.component} />
      ))
    }
    </>
    );
  };
  const staffPages = () => {
    return (
    <>
    {
      staffRoutes({slug}).map((route, index)=>(
        <Route key={index} path={route.href} component={route.component} />
      ))
    }
    </>
    );
  };
  const authRoutes = () => {
    return (
    <>
    {
      unauthorizedUser({slug}).map((route, index)=>(
        <Route key={index} path={route.href} component={route.component} />
      ))
    }
    </>
    );
  };
  const jointRoutes = () => {
    return (
    <>
    {
      schoolRoutes({slug}).map((route, index)=>(
        <Route key={index} path={route.href} component={route.component} />
      ))
    }
    {
      staffRoutes({slug}).map((route, index)=>(
        <Route key={index} path={route.href} component={route.component} />
      ))
    }
    </>
    );
  };
  const LoggedInAsTeacher = token && token!=='undefined' && token?.groups.length===1 && token?.groups[0]==="Teacher" && staffPages
  const LoggedInAsSchool = token && token!=='undefined' && token?.groups.length===1 && token?.groups[0]==="School Owner" && schoolPages
  const LoggedInAsBoth = token && token!=='undefined' && token?.groups.length===2 && jointRoutes
  const CheckRole = token && token!=='undefined' && token?.groups.length===1 && token?.groups[0]==="Teacher" ? LoggedInAsTeacher : LoggedInAsSchool
  const LoggedInUser = token && token!=='undefined' && token?.groups.length===2 ? LoggedInAsBoth : CheckRole
  const ComponentToRender = token && token!=='undefined' ? LoggedInUser : authRoutes
  return (
    <>
      <ToastContext.Provider value={{ showAlert }}>
        <QueryClientProvider client={queryClient}>
          <Toast />
          <Router>
            <Switch>
            <ComponentToRender />
            </Switch>
          </Router>
        </QueryClientProvider>
      </ToastContext.Provider>
    </>
  );
}

export default App;
