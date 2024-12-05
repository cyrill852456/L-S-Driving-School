<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class TDCOnlineController extends Controller
{
    public function startExam(){
        $user = Auth::user();

        if(!$user){
            return response()->json([
                'error' => 'Student is not Authenticated'
            ],401);
        }

        try{
            $user->status = 'on-going';
            $user->save();
            return response()->json([
                'message' => 'Exam started successfully',
                'redirect' => '/tdc-video'
            ], 200);
        }catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to start exam',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    // update user account
    public function updateAccount(Request $request){

        $user = Auth::user();
           // Validate the request
           $request->validate([
            'current_password' => 'required_with:new_password',
            'new_password' => 'nullable|min:8',
        ]);


             // Handle password change
            if ($request->filled('newPassword')) {
                // Verify current password
                if (!Hash::check($request->currentPassword, $user->password)) {
                    throw ValidationException::withMessages([
                        'currentPassword' => ['The current password is incorrect.'],
                    ]);
                }

                // Update password
                $user->password = Hash::make($request->newPassword);
            }

            $user->save();
    
            return response()->json([
                'message' => 'Profile updated successfully',
                'user' => $user
            ]);
    }
}
