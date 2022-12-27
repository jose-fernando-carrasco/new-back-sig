<?php

use App\Class\Ruta;
use App\Http\Controllers\LineaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('lineas',[LineaController::class,'index']);
Route::get('linea/{nro}/getLinea',[LineaController::class,'getLinea']);
Route::get('linea/{nro}/getRecorridoIda',[LineaController::class,'getRecorridoIda']);
Route::get('linea/{nro}/getRecorridoVuelta',[LineaController::class,'getRecorridoVuelta']);
Route::get('linea/{nro}/getPuntosIda',[LineaController::class,'getPuntosIda']);
Route::get('linea/{nro}/getPuntosVuelta',[LineaController::class,'getPuntosVuelta']);   
Route::get('prueba',function() {
    $ruta = new Ruta([-17.796453,	-63.155412], [-17.825665, -63.133095]);
    $ruta->dijkstra();
    Log::debug($ruta->getRutaMin());
    return response()->json($ruta->getRutaMin(), 200);
});
