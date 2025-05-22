<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\EmailVerification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
class AuthController extends Controller
{

    public function showformRegister()
    {
        $email = session()->pull('email', '');
        $sendSuccess = session()->pull('sendSuccess', '');
        $googleId = session()->pull('google_id', '');
        $warn = session()->pull('warn');
        $avatar = session()->pull('avatar');

        return Inertia::render('AuthForm', [
            'mode' => 'register',
            'email' => $email,
            'sendSuccess' => $sendSuccess,
            'googleId' => $googleId,
            'warn'=> $warn,
            'avatar'=>$avatar
        ]);
    }

    public function showFormLogin () {
        $error = session()->pull('error');
        return inertia('AuthForm', ['mode'=> 'login', 'googleRedirectUrl' => route('auth.login.google'), 'error'=>$error]);
    }

    public function login (Request $request)  {
        $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
        ]);
        $login = $request->input('login');

        $field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'name';

        if (Auth::attempt([$field => $login, 'password' => $request->password])) {
            $role = Auth::user()->role;
            // neu la admin: redirect -> adminController
            if(str_starts_with($role, 'admin')) {
                return redirect()->route('adm.characters');
            } 

            return redirect()->back();
        }
      session(['error'=> 'Tài khoản không tồn tại hoặc tài khoản hoặc mật khẩu không đúng ']);
      return redirect()->route('login');
    }

    public function register (Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            session(['warn'=>$validator->errors()->all()]);
            session(['email'=>$request->email]);
            return back()->withErrors($validator)->withInput();
        }
        $google_id = $request->input('googleId', null);
        $avatar = $request->input('avatar', null);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'google_id' => $google_id,
            'avatar' => $avatar
        ]);

        auth()->login($user, true);
        return redirect('/characters');
    }

    public function showForgotPassword()
    {
        $email = session()->pull('email');
        return inertia('AuthForm', ['mode'=> 'forgot']);
    }
    
    public function sendResetOTP(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $user = User::where('email', $request->email)->first();
    
        if (!$user) {
            return back()->with('error', 'Email không tồn tại trong hệ thống.');
        }
    
        $otp = rand(100000, 999999);
        Cache::put('otp_' . $request->email, $otp, now()->addMinutes(10));
    
        Mail::send('emails.otp', ['email' => $request->email, 'otp' => $otp], function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Mã OTP khôi phục mật khẩu');
        });
    
        session(['email' => $request->email]);
        return back()->with('sendSuccess', 'Đã gửi OTP đến email của bạn.');
    }
    
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);
    
        $cachedOtp = Cache::get('otp_' . $request->email);
    
        if (!$cachedOtp || $cachedOtp != $request->otp) {
            return back()->with('error', 'Mã OTP không đúng hoặc đã hết hạn.');
        }
    
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return back()->with('error', 'Email không tồn tại.');
        }
    
        $user->update(['password' => Hash::make($request->password)]);
        Cache::forget('otp_' . $request->email);
    
        return redirect()->route('login')->with('success', 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.');
    }
    
    public function sendVerification(Request $request)
    {
          // Kiểm tra xem email đã tồn tại chưa
        if (User::where('email', $request->email)->exists()) {
            return redirect('login');
        }

        $request->validate(['email' => 'required|email']);

        $token = Str::random(64);
        DB::table('email_verifications')->updateOrInsert(
            ['email' => $request->email],
            ['token' => $token, 'created_at' => now()]
        );

        if (!$request->email) {
            // Nếu không có email, trả về lỗi hoặc thông báo
            return back()->with('error', 'Email không hợp lệ.');
        }

        // Gửi email xác minh
        Mail::to($request->email)->send(new EmailVerification($token));

        // Sử dụng with() để truyền dữ liệu cho request tiếp theo
        return back()->with('sendSuccess', 'Đã gửi email xác minh. Vui lòng kiểm tra hộp thư.');
    }

    public function verifyEmail(Request $request)
    {
        $token = $request->query('token');
        $record = DB::table('email_verifications')->where('token', $token)->first();

        if (!$record) {
            return redirect('/register')->with('error', 'Token không hợp lệ hoặc đã hết hạn.');
        }
        session(['email' => $record->email]);
        session(['sendSuccess' => 'Xác minh thành công']);


        return redirect('/register');
    }

    public function logout(Request $request)
    {
        Auth::logout();
    
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    
        return redirect('/');
    }

    public function block(Request $request, $userId)
    {
        // Tìm user cần block
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'User không tồn tại'], 404);
        }

        // Ví dụ set cờ block, tùy bạn định nghĩa trong model
        $user->is_blocked = 1;
        $user->save();

        return response()->json(['message' => 'User đã bị block thành công'], 200);
    }
}

