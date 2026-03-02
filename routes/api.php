<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BandController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Registra automaticamente as rotas GET, POST para a API de Bandas
Route::apiResource('bands', BandController::class);
