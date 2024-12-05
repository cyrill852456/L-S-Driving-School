<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Enrollment;
use App\Models\Courses;
use App\Models\BookingEnrollment;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\EnrollmentCredentialsMail;
class AdminController extends Controller
{

    public function getAllUsers(){
        $listofUsers = User::where('role', 'student')->get();
        return response()->json([
            'users' => $listofUsers  
        ]);
    }

    ////// Get Online Request Form ///////////
    public function getOnlineEnrollRequest(){
        $onlineRequestEnrollment = Enrollment::with(['course' => function($query){
            $query->select('id', 'title', 'category');
        }])->get();
        return response()->json([
            'enrollmentRequest' => $onlineRequestEnrollment
        ]);
    }


    public function generateUserCrendetials($id){
        try{
            // first find the specifict user who submit the form
            $enrollment = Enrollment::findOrFail($id);
            // automatic mo create ug random password ma change man sad nila
            $password = Str::random(16);

              // Create or update user
              $user = User::updateOrCreate(
                ['email' => $enrollment->email],
                [
                    'name' => $enrollment->firstname . ' ' . $enrollment->lastname,
                    'password' => Hash::make($password),
                    'role' => 'student',

                ]
            );

            /// Update the Online Enrollment Status to Approve
            $enrollment->update(['status' => 'approved']);

            Mail::to($enrollment->email)->send(new EnrollmentCredentialsMail([
                'name' => $user->name,
                'email' => $user->email,
                'password' => $password
            ]));

            return response()->json([
                'message' => 'Credentials generated and sent successfully'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to generate credentials',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    ////////// Get Booking Request Form   //////////////////
    public function getBookingEnrollRequest(){
        $BookingRequest = BookingEnrollment::with(['course' => function($query) {
            $query->select('id', 'title');
        }])->get();
        return response()->json([
            'bookingRequest' => $BookingRequest
        ]);
    }

    public function approveBookingEnrollment(Request $request, $id)
    {
        $bookingEnrollment = BookingEnrollment::findOrFail($id);
        $bookingEnrollment->approveBooking();

        return response()->json([
            'message' => 'Booking enrollment approved successfully',
        ]);
    }

    public function rejectBookingEnrollment(Request $request, $id)
    {
        $bookingEnrollment = BookingEnrollment::findOrFail($id);
        $bookingEnrollment->rejectBooking();

        return response()->json([
            'message' => 'Booking enrollment rejected successfully',
        ]);
    }
    ///////////////////////////////////////////////////////////////////




    /// Courses Section
    public function getAllCourse(){
        $listofCourses = Courses::all();
        return response()->json([
            'courses' => $listofCourses
        ]);
    }

    // Create Course
    public function createCourse(Request $request){
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'session' => 'required|numeric',
            'duration' => 'required'
        ]);

        $course = Courses::create($request->all());
        return response()->json([
            'message' => 'Course created successfully',
            'course' => $course
        ], 201);
    }

    /// Update Course
    public function updateCourse(Request $request, $id){
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'session' => 'required|numeric',
            'duration' => 'required'
        ]);

        $course = Courses::find($id);
        if(!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        $course->update($request->all());
        return response()->json([
            'message' => 'Course updated successfully',
            'course' => $course
        ]);
    }

    /// Delete Course
    public function deleteCourse($id){
        $course = Courses::find($id);
        if(!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        $course->delete();
        return response()->json([
            'message' => 'Course deleted successfully'
        ]);
    }


}
