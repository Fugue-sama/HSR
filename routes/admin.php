<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ElementController;
use App\Http\Controllers\LightcoreController;
use App\Http\Controllers\OrnamentsController;
use App\Http\Controllers\PathController;
use App\Http\Controllers\RelicsController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

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
Route::get('/adm/lightcores/filter', function (Request $request) {
  if (!$request->inertia()) {
      return redirect('/lightcores');
  }
  return (new LightcoreController)->filter(request: $request);
})->name('adm.lightcores.filter');

Route::get('/adm/relics/filter', function (Request $request) {
  if (!$request->inertia()) {
      return redirect('adm/relics');
  }
  return (new RelicsController)->filter(request: $request);
})->name('adm.relics.filter');

Route::get('/adm/characters/filter', function (Request $request) {
  if (!$request->inertia()) {
      return redirect('adm/characters');
  }
  return (new CharacterController)->filter(request: $request);
})->name('adm.characters.filter');


Route::middleware(['auth', 'role:admin'])->prefix('adm')->name('adm.')->group(function () {
  
  Route::get('/home', [AdminController::class, 'index'])->name('home');

  Route::resource('lightcores', LightcoreController::class)->names([
      'index' => 'lightcores', // => adm.lightcores
      'show' => 'lightcore.detail'
  ]);
  Route::resource('characters', CharacterController::class)->names([
    'index' => 'characters', // => adm.characters
  ]);
  Route::resource('relics', RelicsController::class)->names([
    'index' => 'relics', // => adm.characters -> back
  ]);
  Route::resource('ornament', OrnamentsController::class)->names([
    'index' => 'ornament', // => adm.characters -> back
  ]);
  Route::resource('elements', ElementController::class)->names([
    'index' => 'elements'
  ]);
  Route::resource('paths', PathController::class)->names([
    'index' => 'paths'
  ]);
  Route::resource('comments', PathController::class);
});

