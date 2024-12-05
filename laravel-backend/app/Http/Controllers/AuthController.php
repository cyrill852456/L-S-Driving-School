<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
        public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        Auth::login($user);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role, // 'admin' or 'student'
            ],
            'token' => $token
        ]);
    }

        public function logout(Request $request)
        {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            
            if ($request->user()) {
                $request->user()->tokens()->delete();
            }
    
            return response()->json(['message' => 'Logged out successfully']);
        }


        public function getAdmin()
        {
            $user = Auth::user();
            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ]
            ]);
        }

        public function getProfile()
        {
            $user = Auth::user();
            if ($user->role === 'student') {
                return response()->json([
                    'role' => $user->role,
                    'name' => $user->name,       
                ]);
            }
            return response()->json([
                'message' => 'Role not permitted',
            ], 403);
        }
    
}
