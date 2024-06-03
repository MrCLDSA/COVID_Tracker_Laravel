<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Barangay;
use App\Models\City;

class BarangayController extends Controller
{
    public function index(Request $request){
        $barangay_data = Barangay::with('city')->get();

        return response()->json(['data' => $barangay_data]);
    }

    public function dropdown(Request $request){
        $request->validate(
            ['id'=>'required']
        );

        $request_data = $request->all();
        $id_ref = $request_data['id'];

        $barangay_data = Barangay::with('city')->where('city_id', $id_ref)->get();

        return response()->json(['data' => $barangay_data]);
    }

    public function store(Request $request){

        $request->validate(
            ['name'=>'required',
             'city_id'=>'required|exists:cities,id']
        );

        $request_data = $request->all();
        $name = $request_data['name'];
        $city_id = $request_data['city_id'];
        $existingData = Barangay::where('name', $name)->first();

        if ($existingData){
            return response()->json(['status'=>"barangayexists"]);
        }
        else {
            Barangay::create(['name'=>$name, 'city_id'=> $city_id]);
            return response()->json(['status'=>"barangaycreated"]);
        }


        
    }

    public function update(Request $request) {
        $request->validate(
            ['name'=>'required',
             'id'=>'required',
             'city_id'=>'required|exists:cities,id']
        );

        $request_data = $request->all();
        $name = $request_data['name'];
        $id_ref = $request_data['id'];
        $city_id_ref = $request_data['city_id'];

       
        Barangay::where('id', $id_ref)->update(['name'=> $name, 'city_id'=>$city_id_ref]);
        return response()->json(['status'=>"barangayupdated"]);
    }

    public function delete(Request $request){
        $request->validate(['id' => 'required']);
        $request_data = $request->all();
        $id_ref = $request_data['id'];
        Barangay::find($id_ref)->delete();
        return response()->json(['status'=>"deletionsuccessful"]);
    }
}
