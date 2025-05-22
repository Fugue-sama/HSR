<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ReportController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/reports/unread', [ReportController::class, 'unreadReports']);

});
Route::post('/reports', [ReportController::class, 'store'])->name('reports.store');
Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
Route::delete('/reports/{id}', [ReportController::class, 'destroy'])->name('reports.destroy');

Route::post('/users/{userId}/block', [AuthController::class, 'block'])->name('users.block');
Route::post('/reports/{id}/mark-read', [ReportController::class, 'markAsRead']);

