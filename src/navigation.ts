import SchoolBirthdays from "pages/school/birthdays"
import SchoolCourses from "pages/school/courses"
import SchoolFees from "pages/school/fees"
import SMS from "pages/school/sms"
import SchoolStaffs from "pages/school/staffs"
import SchoolStudents from "pages/school/students"
import SchoolDashboard from "pages/school"
import SchoolClasses from "pages/school/classes"
import SingleClass from "pages/school/class/class"
import SingleCourse from "pages/school/course/course"
import SingleStaff from "pages/school/staff/index"
import TeacherCourses from "pages/school/staff/courses"
import EditStaff from "pages/school/staff/edit"
import SingleStudent from "pages/school/student/index"
import StudentCourses from "pages/school/student/courses"
import EditStudent from "pages/school/student/edit"
import StudentFeeHistory from "pages/school/student/history"
import StaffDashboard from "pages/staff"
import StaffCourses from "pages/staff/courses"
import StaffClass from "pages/staff/class"
import StaffCourse from "pages/staff/course"
import AuthorizedResult from "pages/result/student"
import UnAuthorizedResult from "pages/parent-result/student"
import LandingPage from "pages"
import RedirectPage from "pages/redirect"
import LoginPage from "pages/login"
import OTP from "pages/otp"
import VerifyAccount from "pages/verify/staff"
import ErrorPage from "pages/404"

export const unauthorizedUser = ({slug}) => [
      {
        href: `/${slug}/login`,
        component: LoginPage
      },
      {
        href: `/${slug}/redirect`,
        component: RedirectPage
      },
      {
        href: `/${slug}/otp`,
        component: OTP
      },
      {
        href: `/${slug}/verify/:id`,
        component: VerifyAccount
      },
      {
        href: `/`,
        component: LandingPage
      },
      {
        href: `/${slug}/parent-result/:id`,
        component: UnAuthorizedResult
      },
      {
        href: `*`,
        component: ErrorPage
      },
]
export const staffRoutes = ({slug}) => [
      {
        href: `/${slug}/staff`,
        component: StaffDashboard
      },
      {
        href: `*`,
        component: ErrorPage
      },
      {
        href: `/${slug}/staff/courses`,
        component: StaffCourses
      },
      {
        href: `/${slug}/staff/:id/course`,
        component: StaffCourse
      },
      {
        href: `/${slug}/staff/class`,
        component: StaffClass
      },
      {
        href: `/${slug}/parent-result/:id`,
        component: UnAuthorizedResult
      },
      {
        href: `/${slug}/result/:id`,
        component: AuthorizedResult
      },
      {
        href: `/`,
        component: LandingPage
      },
]
export const schoolRoutes = ({slug}) => [
      {
        href: `/`,
        component: LandingPage
      },
      {
        href: `/${slug}/parent-result/:id`,
        component: UnAuthorizedResult
      },
      {
        href: `/${slug}/result/:id`,
        component: AuthorizedResult
      },
      {
        href: `/${slug}/school`,
        component: SchoolDashboard
      },
      {
        href: `/${slug}/school/classes`,
        component: SchoolClasses
      },
      {
        href: `/${slug}/school/students`,
        component: SchoolStudents
      },
      {
        href: `/${slug}/school/staffs`,
        component: SchoolStaffs
      },
      {
        href: `/${slug}/school/courses`,
        component: SchoolCourses
      },
      {
        href: `/${slug}/school/fees`,
        component: SchoolFees
      },
      {
        href: `/${slug}/school/sms`,
        component: SMS
      },
      {
        href: `/${slug}/school/birthdays`,
        component: SchoolBirthdays
      },
      {
        href: `/${slug}/school/class/:id`,
        component: SingleClass
      },
      {
        href: `/${slug}/school/course/:id`,
        component: SingleCourse
      },
      {
        href: `/${slug}/school/staff/:id`,
        component: SingleStaff
      },
      {
        href: `/${slug}/school/staff/:id/courses`,
        component: TeacherCourses
      },
      {
        href: `/${slug}/school/staff/:id/edit`,
        component: EditStaff
      },
      {
        href: `/${slug}/school/student/:id`,
        component: SingleStudent
      },
      {
        href: `/${slug}/school/student/:id/courses`,
        component: StudentCourses
      },
      {
        href: `/${slug}/school/student/:id/edit`,
        component: EditStudent
      },
      {
        href: `/${slug}/school/student/:id/history`,
        component: StudentFeeHistory
      },
      {
        href: `*`,
        component: ErrorPage
      },
    ];