<?php

namespace App\Http\Controllers;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{   
    // Gets all data rows from the City Table and returns it back to the AJAX.
    public function index(Request $request){
        $city_data = City::get();
        return response()->json(['city_data' => $city_data]);
    }

    // Grabs all cities and their connected barangays.
    public function barangayindex(Request $request){
        $city_data = City::with('barangay')->get();
        return response()->json(['city_data' => $city_data]);
    }

    // Handles the insertion of new cities into the table.
    public function store(Request $request){
        // Assigning the values from the AJAX request to a variable.

        $request->validate(['name' => 'required']);

        $request_data = $request->all();
        $name = $request_data['name'];
        $existingData = City::where('name', $name)->first();

        if ($existingData){
            return response()->json(['status'=>"cityexists"]);
        }
        else {
            City::create(['name' => $name]);
            return response()->json(['status'=>"citycreated"]);
        }

        
        
    }

    public function update(Request $request){

        $request->validate(['name' => 'required', 'id' => 'required']);
        $request_data = $request->all();
        $name = $request_data['name'];
        $id_ref = $request_data['id'];
        $existingData = City::where('name', $name)->first();
        if ($existingData){
            return response()->json(['status'=>"cityexists"]);
        }
        else {
            City::where('id', $id_ref)->update(['name'=> $name]);
            return response()->json(['status'=>"cityupdated"]);
        }

    }

    public function delete(Request $request){
        $request->validate(['id' => 'required']);
        $request_data = $request->all();
        $id_ref = $request_data['id'];
        City::find($id_ref)->delete();
        return response()->json(['status'=>"deletionsuccessful"]);
    }
}
