<?php

use App\Http\Controllers\LineaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () { return view('welcome'); });
Route::get('/dashboard', function () { return view('importar'); })->middleware(['auth'])->name('dashboard');
require __DIR__.'/auth.php';

/* Saber que user esta autenicado */
Route::get('auth/user', function() {
	if(auth()->check()) return response()->json(['authUser' => auth()->user()]);
	return null;
});

Route::post('import',[LineaController::class,'import'])->name('import');
Route::post('import/recorrido',[LineaController::class,'recorrido'])->name('import.recorrido');
Route::post('import/puntos',[LineaController::class,'puntos'])->name('import.puntos');
