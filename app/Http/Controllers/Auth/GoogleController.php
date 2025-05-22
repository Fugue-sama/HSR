<?php

namespace App\Http\Controllers\Auth;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{


    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver(driver: 'google')->stateless()->user();

            $user = User::where('google_id', $googleUser->getId())->first();
            if (!$user) {
                session([
                    'email' => $googleUser->getEmail(),
                    'sendSuccess' => 'Hãy hoàn tất đăng ký để tiếp tục.',
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                ]);
                return redirect('/register');
            }
            Auth::login($user, true);

            return redirect('/characters');
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Có lỗi xảy ra khi đăng nhập bằng Google.');
        }
    }
}
