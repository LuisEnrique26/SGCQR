<?php

use App\Http\Controllers\Reception\receptionController;
use Illuminate\Support\Facades\Route;


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('/reception')->group(function() {

    Route::post('/receiveData', [receptionController::class, 'receiveData']);
    Route::get('/exportData', [receptionController::class, 'exportData']);

});
