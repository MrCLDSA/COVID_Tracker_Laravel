<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CityController;
use App\Http\Controllers\BarangayController;
use App\Http\Controllers\PatientInfoController;

Route::get('/', function () {
    return view('home');
});

Route::get('/cities', function () {
    return view('cities');
});

Route::get('/barangays', function (){
    return view('barangays');
});

Route::get('/patientinfos', function (){
    return view('/patientinfos');
});

Route::get('/awareness', function (){
    return view('/awareness');
});

Route::get('/covidreport', function (){
    return view('/covidreport');
});

Route::get('/cities/data', [CityController::class, 'index']);

Route::get('/cities/data/barangays', [CityController::class, 'barangayindex']);

Route::post('/cities/store', [CityController::class, 'store']);

Route::post('/cities/update', [CityController::class, 'update']);

Route::post('/cities/delete', [CityController::class, 'delete']);

Route::get('/barangays/data', [BarangayController::class, 'index']);

Route::post('/barangays/data/dropdown', [BarangayController::class, 'dropdown']);

Route::post('/barangays/store', [BarangayController::class, 'store']);

Route::post('/barangays/update', [BarangayController::class, 'update']);

Route::post('/barangays/delete', [BarangayController::class, 'delete']);

Route::get('/patientinfos/data', [PatientInfoController::class, 'index']);

Route::post('/patientinfos/store', [PatientInfoController::class, 'store']);

Route::post('/patientinfos/update', [PatientInfoController::class, 'update']);

Route::post('/patientinfo/awarenessreport', [PatientInfoController::class, 'awareness_report']);

Route::post('/patientinfos/covidreport', [PatientInfoController::class, 'covidreport']);
