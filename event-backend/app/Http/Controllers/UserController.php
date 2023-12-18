<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class UserController extends Controller
{
    //register routes
    function register(Request $req)
    
    {
        $user= new User;
        $user->name=$req->input('name');
        $user->email=$req->input('email');
        $user->password=Hash::make($req->input('password'));
        $user->save();

        return $user;
    }
    //login routes
    function login(Request $req)
    {
        $user= User::where('email',$req->email)->first();
        if(!$user || !Hash::check($req->password,$user->password))
        {
            return "Username or password is not matched";
        }
        return $user;
    }

    //google login routes
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            $user = User::firstOrCreate(
                ['email' => $googleUser->email],
                ['name' => $googleUser->name, 'password' => Hash::make(Str::random(24))]
            );
            // Optionally create a token and send it to the frontend
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error processing Google login'], 500);
        }
    }

}
