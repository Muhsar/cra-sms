import SchoolBirthdays from "./pages/school/birthdays"
import SchoolCourses from "./pages/school/courses"
import SchoolFees from "./pages/school/fees"
import SMS from "./pages/school/sms"
import SchoolStaffs from "./pages/school/staffs"
import SchoolStudents from "./pages/school/students"
import SchoolDashboard from "./pages/school"
import SchoolClasses from "./pages/school/classes"
import SingleClass from "./pages/school/class/class"
import SingleCourse from "./pages/school/course/course"
import SingleStaff from "./pages/school/staff/index"
import TeacherCourses from "./pages/school/staff/courses"
import EditStaff from "./pages/school/staff/edit"
import SingleStudent from "./pages/school/student/index"
import StudentCourses from "./pages/school/student/courses"
import EditStudent from "./pages/school/student/edit"
import StudentFeeHistory from "./pages/school/student/history"
import StaffDashboard from "./pages/staff"
import StaffCourses from "./pages/staff/courses"
import StaffClass from "./pages/staff/class"
import StaffCourse from "./pages/staff/course"
import AuthorizedResult from "./pages/result/student"
import UnAuthorizedResult from "./pages/parent-result/student"
import LandingPage from "./pages"
import RedirectPage from "./pages/redirect"
import LoginPage from "./pages/login"
import OTP from "./pages/otp"
import VerifyAccount from "./pages/verify/staff"
import ErrorPage from "./pages/404"
import Roles from "config/Roles"

// export const unauthorizedUser = [
//       {
//         path: `/:slug/login`,
//         component: LoginPage
//       },
//       {
//         path: `/:slug/otp`,
//         component: OTP
//       },
//       {
//         path: `/:slug/verify/:id`,
//         component: VerifyAccount
//       },
//       {
//         path: `/`,
//         component: LandingPage
//       },
//       {
//         path: `/:slug/parent-result/:id`,
//         component: UnAuthorizedResult
//       },
// ]
// export const staffRoutes = [
//       {
//         path: `/:slug/staff`,
//         component: StaffDashboard
//       },
//       {
//         path: `/:slug/staff/courses`,
//         component: StaffCourses
//       },
//       {
//         path: `/:slug/staff/:id/course`,
//         component: StaffCourse
//       },
//       {
//         path: `/:slug/staff/class`,
//         component: StaffClass
//       },
//       {
//         path: `/:slug/parent-result/:id`,
//         component: UnAuthorizedResult
//       },
//       {
//         path: `/:slug/result/:id`,
//         component: AuthorizedResult
//       },
//       {
//         path: `/`,
//         component: LandingPage
//       },
// ]
// export const schoolRoutes = [
//       {
//         path: `/`,
//         component: LandingPage
//       },
//       {
//         path: `/:slug/parent-result/:id`,
//         component: UnAuthorizedResult
//       },
//       {
//         path: `/:slug/result/:id`,
//         component: AuthorizedResult
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school`,
//         component: SchoolDashboard
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/classes`,
//         component: SchoolClasses
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/students`,
//         component: SchoolStudents
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/staffs`,
//         component: SchoolStaffs
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/courses`,
//         component: SchoolCourses
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/fees`,
//         component: SchoolFees
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/sms`,
//         component: SMS
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/birthdays`,
//         component: SchoolBirthdays
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/class/:id`,
//         component: SingleClass
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/course/:id`,
//         component: SingleCourse
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/staff/:id`,
//         component: SingleStaff
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/staff/:id/courses`,
//         component: TeacherCourses
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/staff/:id/edit`,
//         component: EditStaff
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/student/:id`,
//         component: SingleStudent
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/student/:id/courses`,
//         component: StudentCourses
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/student/:id/edit`,
//         component: EditStudent
//       },
//       {
  // permission: [ Roles.Owner, ...Roles.Both ],
//         path: `/:slug/school/student/:id/history`,
//         component: StudentFeeHistory
//       },
//     ];
    export const joinedRoutes = [
      {
        path: `/:slug/login`,
        component: LoginPage
      },
      {
        path: `/:slug/otp`,
        component: OTP
      },
      {
        path: `/:slug/verify/:id`,
        component: VerifyAccount
      },
      {
        path: `/`,
        component: LandingPage
      },
      {
        path: `/:slug/parent-result/:id`,
        component: UnAuthorizedResult
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school`,
        component: SchoolDashboard
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/classes`,
        component: SchoolClasses
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/students`,
        component: SchoolStudents
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/staffs`,
        component: SchoolStaffs
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/courses`,
        component: SchoolCourses
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/fees`,
        component: SchoolFees
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/sms`,
        component: SMS
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/birthdays`,
        component: SchoolBirthdays
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/class/:id`,
        component: SingleClass
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/course/:id`,
        component: SingleCourse
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/staff/:id`,
        component: SingleStaff
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/staff/:id/courses`,
        component: TeacherCourses
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/staff/:id/edit`,
        component: EditStaff
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/student/:id`,
        component: SingleStudent
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/student/:id/courses`,
        component: StudentCourses
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/student/:id/edit`,
        component: EditStudent
      },
      {
        permission: [ Roles.Owner, ...Roles.Both ],
        path: `/:slug/school/student/:id/history`,
        component: StudentFeeHistory
      },
      {
        permission: [ Roles.Teacher, ...Roles.Both ],
        path: `/:slug/staff`,
        component: StaffDashboard
      },
      {
        permission: [ Roles.Teacher, ...Roles.Both ],
        path: `/:slug/staff/courses`,
        component: StaffCourses
      },
      {
        permission: [ Roles.Teacher, ...Roles.Both ],
        path: `/:slug/staff/:id/course`,
        component: StaffCourse
      },
      {
        permission: [ Roles.Teacher, ...Roles.Both ],
        path: `/:slug/staff/class`,
        component: StaffClass
      },
      {
        path: `/:slug/parent-result/:id`,
        component: UnAuthorizedResult
      },
      {
        permission: [ Roles.Teacher, Roles.Owner, ...Roles.Both ],
        path: `/:slug/result/:id`,
        component: AuthorizedResult
      },
      {
        path: `/`,
        component: LandingPage
      },
    ]