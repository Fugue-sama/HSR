<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Render form
Route::controller(AuthController::class)->group(function() {
  Route::get('/login', 'showFormLogin')->name('login');
  Route::post('/login', 'login');

  Route::get('register', 'showformRegister')->name('register');
  Route::post('/register', 'register');

  Route::get('/logout', 'logout');

  Route::get('/forgot-password', 'showForgotPassword')->name('forgot.password');
  Route::post('/forgot-password', 'sendResetOTP')->name('forgot.password.send');
  Route::post('/reset-password', 'resetPassword')->name('password.reset');

  Route::get('/verify-email', 'verifyEmail')->name('verify.email');
  Route::post('send-verification', 'sendVerification')->middleware('web');

 
});


// Google Auth Routes
Route::prefix('auth')->name('auth.')->controller(GoogleController::class)->group(function () {
  Route::get('login/google', 'redirectToGoogle')->name('login.google');
  Route::get('google/callback', 'handleGoogleCallback')->name('google.callback');
});



