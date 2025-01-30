import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/Pages/GuestPage/LandingPage";
import GuestLayouts from '@/components/layouts/Guestlayouts'
import Defaultlayouts from "@/components/layouts/Defaultlayouts";
import MainDashboard from "@/Pages/ClientPage/MainDashboard";
import AdminLayouts from "@/components/layouts/AdminLayouts"
import AdminDashboard from "@/Pages/Admin/adminDashboard";
import MDC from "@/Pages/GuestPage/Courses/MDC";
import PDC from "@/Pages/GuestPage/Courses/PDC";
import TDC from "@/Pages/GuestPage/Courses/TDC";
import Courses from "@/Pages/Admin/Courses";
import Users from "@/Pages/Admin/Users";
import OnlineEnrollment from "@/Pages/Admin/OnlineEnrollment";
import BookingEnrollment from "@/Pages/Admin/BookingEnrollment";
import ChatBotPage from '@/Pages/ClientPage/ChatBotPage'
import Login from '@/components/modal/Login'
import VideoTutorial from "@/Pages/ClientPage/TDC/SessionsOne/VideoSection";
import PowerPointSection from "@/Pages/ClientPage/TDC/SessionsOne/PowerPointSection";
import QuizSection from '@/Pages/ClientPage/TDC/SessionsOne/QuizSection';
import TDCEnrollment from '@/Pages/ClientPage/Enrollments/TDCEnrollments'
import TDCBooking from '@/Pages/ClientPage/Enrollments/TDCBookingEnrollments'
import PDCBooking from '@/Pages/ClientPage/Enrollments/PDCEnrollments';
import MDCBooking from '@/Pages/ClientPage/Enrollments/MDCEnrollments';
import UserSetting from "@/Pages/ClientPage/UserSetting";
import UploadVideo from "@/Pages/Admin/UploadVideo";
import VideoSection from "@/Pages/ClientPage/TDC/SessionsTwo/VideoSectionSessionTwo";
import PowerPointSession2 from "@/Pages/ClientPage/TDC/SessionsTwo/PowerPointSessionTwo";
import Session2QuizSection from '@/Pages/ClientPage/TDC/SessionsTwo/Session2QuizSection';
import Finalization from '@/Pages/ClientPage/Finalization';
const router = createBrowserRouter([
   
    {
        path: '/',
        element:    <GuestLayouts />,    
        children: [
            {
                path: '',
                element: <LandingPage />
            },
            {
                path: '/course-mdc',
                element: <MDC />
            },
            {
                path: '/course-pdc',
                element: <PDC />
            },
            {
                path: '/course-tdc',
                element: <TDC />
            },
            {
                path: '/tdc-enrollment-proccess',
                element: <TDCEnrollment />
            },
            {
                path: '/tdc-booking-enrollment-proccess',
                element: <TDCBooking />
            },
            {
                path: '/pdc-booking-enrollment-proccess',
                element: <PDCBooking />
            },
            {
                path: '/mdc-booking-enrollment-proccess',
                element: <MDCBooking />
            },
        
          
        ]
    },

    /// Login 
    {
        path: '/login-credentials',
        element: <Login />
    },

    // Default Layouts for users
    {
        path: '/authstudent',
        element:     <Defaultlayouts />,
        children:[
            {
                path: '',
                element: <MainDashboard />
            },
            {
                path: 'user-setting',
                element: <UserSetting />
            },
            /// Session 1
            {
                path: 'tdc-video',
                element: <VideoTutorial />
            },
            {
                path: 'tdc-powerpoint',
                element: <PowerPointSection />
            },
            {
                path: 'tdc-examination',
                element: <QuizSection />
            },
            /// Session 2
            {
                path: 'session2-tdc-video',
                element: <VideoSection />
            },
            {
                path: 'session2-powerpoint',
                element: <PowerPointSession2 />
            },
            {
                path: 'session2-exam',
                element: <Session2QuizSection />
            },
            {
                path: 'exam-results',
                element: <Finalization />
            }
        ]
    },

    // Default Layouts for Admin
    {
        path: '/authadmin',
        element:    <AdminLayouts />,
        children: [
            {
                path: 'maindashboard',
                element: <AdminDashboard />
            },
            {
                path: 'courses',
                element: <Courses />
            },
            {
                path: 'users-account',
                element: <Users />
            },
            {
                path: 'online-enrollment-request',
                element: <OnlineEnrollment />
            },
            {
                path: 'Booking-enrollment-request',
                element: <BookingEnrollment />
            },
            {
                path: 'upload-video',
                element: <UploadVideo />
            }
        ]

    }

]);
export default router