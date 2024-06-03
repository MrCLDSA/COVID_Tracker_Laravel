<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PatientInfo extends Model
{
    protected $table = 'patient_infos';
    public $timestamps = false;

    protected $fillable = ['name', 'brgy_id', 'number', 'email', 'case_type', 'coronavirus_status'];

    public function barangay(): BelongsTo {
        return $this->belongsTo(Barangay::class, 'brgy_id');
    }
}
