<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BookingEnrollmentController;
use App\Http\Controllers\TDCOnlineController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//// Authentication /////
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('/logout', [AuthController::class, 'logout']);
});
/////////////////////////

//// Get list of Courses /////
Route::get('/list-course', [CourseController::class, 'getAllCourses']);
Route::get('/get-courses', [AdminController::class, 'getAllCourse']);
Route::get('/get-tdc', [CourseController::class, 'getTDCCourse']);
Route::get('/get-pdc', [CourseController::class, 'getPDCourse']);
Route::get('/get-mdc', [CourseController::class, 'getMDCCourse']);
/////////////////////////////


//////////Online Enrollment ////////////
Route::post('/enrollment',[EnrollmentController::class, 'store']);
Route::post('/validator-enrollment',[EnrollmentController::class, 'validateEnrollments']);
//////////////////////////////////////

//////// Booking Enrollment //////////////////
Route::post('/booking-enrollment', [BookingEnrollmentController::class, 'store']);
Route::post('/validator-book-enrollment',[BookingEnrollmentController::class, 'validateEnrollments']);
////////////////////////////////////////////



Route::middleware(['auth:sanctum','role:student'])->group(function(){
    Route::get('/get-auth-user', [AuthController::class, 'getProfile']);
    Route::post('/start-lecture', [TDCOnlineController::class, 'startExam']);
});


Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // Get all 
    Route::get('/getAdmin', [AuthController::class, 'getAdmin']);
    Route::get('/get-users',[AdminController::class, 'getAllUsers'] );

    //courses api routes
    Route::get('/get-course', [AdminController::class, 'getAllCourse']);
    Route::post('/create-course', [AdminController::class, 'createCourse']);
    Route::put('/update-course/{id}', [AdminController::class, 'updateCourse']);
    Route::delete('/delete-course/{id}', [AdminController::class, 'deleteCourse']);
    
    //Online Enrollment Request
    Route::get('/online-enrollment-request', [AdminController::class, 'getOnlineEnrollRequest']);
    Route::get('/booking-request', [AdminController::class,'getBookingEnrollRequest']);

    Route::post('/booking-enrollment/{id}/approve', [AdminController::class, 'approveBookingEnrollment']);
    Route::post('/booking-enrollment/{id}/reject', [AdminController::class, 'rejectBookingEnrollment']);

    Route::post('/create-user-credentials/{id}',[AdminController::class, 'generateUserCrendetials']);
});