<?php

namespace App\Http\Controllers;

use App\Models\PatientInfo;
use Illuminate\Http\Request;

class PatientInfoController extends Controller
{
    public function index(Request $request){
        $patient_data = PatientInfo::with('barangay.city')->get();

        return response()->json(['data' => $patient_data]);
    }

    public function store(Request $request){
        $request->validate(['name' => 'required',
                            'brgy_id' => 'required|exists:barangays,id',
                            'number' => 'required',
                            'case_type' => 'required',
                            'coronavirus_status'=>'required']);

        $request_data = $request->all();
        $name = $request_data['name'];
        $brgy_id = $request_data['brgy_id'];
        $number = $request_data['number'];
        $email = $request_data['email'];
        $case_type = $request_data['case_type'];
        $coronavirus_status = $request_data['coronavirus_status'];
        $existingData = PatientInfo::where('name', $name)->first();

        if ($existingData){
            return response()->json(['status'=>'patientexists']);
        }
        else {
            PatientInfo::create(['name' => $name, 
                                 'brgy_id'=> $brgy_id, 
                                 'number'=>$number, 
                                 'email'=>$email, 
                                 'case_type'=>$case_type,
                                 'coronavirus_status'=>$coronavirus_status]);
            return response()->json(['status'=>'patientcreated']);
        }
        
    }

    public function update (Request $request){
        $request->validate(['id'=>'required',
                            'name' => 'required',
                            'brgy_id' => 'required|exists:barangays,id',
                            'number' => 'required',
                            'case_type' => 'required',
                            'coronavirus_status'=>'required']);
        $request_data = $request->all();
        $name = $request_data['name'];
        $id_ref = $request_data['id'];
        $brgy_id = $request_data['brgy_id'];
        $number = $request_data['number'];
        $email = $request_data['email'];
        $case_type = $request_data['case_type'];
        $coronavirus_status = $request_data['coronavirus_status'];

        PatientInfo::where('id', $id_ref)->update(['name' => $name, 
                                                    'brgy_id'=> $brgy_id, 
                                                    'number'=>$number, 
                                                    'email'=>$email, 
                                                    'case_type'=>$case_type,
                                                    'coronavirus_status'=>$coronavirus_status]);
        return response()->json(['status'=>"patientupdated"]);
    }

    public function  awareness_report(Request $request){
        $request->validate(['id'=>'required']);
        $request_data = $request->all();
        $id_ref = $request_data['id'];

        $puidata = PatientInfo::with('barangay')->where('brgy_id', $id_ref)
        ->where('case_type', 'PUI')->count();

        $pumdata = PatientInfo::with('barangay')->where('brgy_id', $id_ref)
        ->where('case_type', 'PUM')->count();
        
        $positivedata = PatientInfo::with('barangay')->where('brgy_id', $id_ref)
        ->where('case_type', 'POSITIVE')->count();

        $negativedata = PatientInfo::with('barangay')->where('brgy_id', $id_ref)
        ->where('case_type', 'NEGATIVE')->count();

        return response()->json(['pui'=>$puidata, 'pum'=>$pumdata, 'positivedata'=>$positivedata, 'negativedata'=>$negativedata]);
    }

    public function covidreport(Request $request){
        $request->validate(['id'=>'required']);
        $request_data = $request->all();
        $id_ref = $request_data['id'];

        $coviddata = PatientInfo::with('barangay')->where('brgy_id', $id_ref)
        ->where('coronavirus_status', 'NONE')->count();

        $activedata = PatientInfo::with('barangay')->where('brgy_id', $id_ref)
        ->where('coronavirus_status', 'ACTIVE')->count();
        
        $recovereddata = PatientInfo::with('barangay')->where('brgy_id', $id_ref)
        ->where('coronavirus_status', 'RECOVERED')->count();

        $deathdata = PatientInfo::with('barangay')->where('brgy_id', $id_ref)
        ->where('coronavirus_status', 'DEATH')->count();

        return response()->json(['coviddata'=>$coviddata, 'active'=>$activedata, 'recovered'=>$recovereddata, 'death'=>$deathdata]);
    } 
}
