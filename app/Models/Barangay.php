<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Barangay extends Model
{
    protected $table = "barangays";
    public $timestamps = false;

    protected $fillable = ['name', 'city_id'];

    public function city(): BelongsTo {
        return $this->belongsTo(City::class, 'city_id');
    }

    public function patientinfo(): HasMany {
        return $this->hasMany(PatientInfo::class);
    }
}
