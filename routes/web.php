<?php
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ElementController;
use App\Http\Controllers\LightcoreController;
use App\Http\Controllers\OrnamentsController;
use App\Http\Controllers\PathController;
use App\Http\Controllers\RelicsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
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

Route::get('/', function () {
  sleep(.5);
  return Inertia::render('Home');
});

Route::get('/characters/filter', function (Request $request) {
  if (!$request->inertia()) {
      return redirect('/characters');
  }
  return (new CharacterController)->filter(request: $request);
})->name('characters.filter');
Route::resource('characters', controller: CharacterController::class)
  ->names([
    'show' => 'character.detail'
  ]);  
  Route::post('/characters/{id}/comment', [CharacterController::class, 'addComment'])->middleware('auth')->name('characters.comment');


  Route::get('/lightcores/filter', function (Request $request) {
    if (!$request->inertia()) {
        return redirect('/lightcores');
    }
    return (new LightcoreController)->filter(request: $request);
  })->name('lightcores.filter');
  
  Route::resource('lightcores', controller: LightcoreController::class)
    ->names([
      'show' => 'lightcore.detail',
    ]
  );
  

  Route::resource('comments', CommentController::class);

Route::get('/elements', [ElementController::class, 'index']);


Route::get('/paths', [PathController::class, 'index']);


Route::get('/relics/filter', function (Request $request) {
  if (!$request->inertia()) {
      return redirect('/relics');
  }
  return (new RelicsController)->filter(request: $request);
})->name('relics.filter');

Route::resource('relics', RelicsController::class)
->names([
  'show' => 'relic.detail',
]);
Route::resource('ornaments', OrnamentsController::class)
->names([
  'show' => 'ornament.detail',
]);

Route::middleware(['auth'])->get('/profile', function () {
  return Inertia::render('Profile');
});

