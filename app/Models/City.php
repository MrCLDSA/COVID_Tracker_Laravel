<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class City extends Model
{
    protected $table = "cities";
    public $timestamps = false;

    protected $fillable = ['name'];

    public function barangay(): HasMany {
        return $this->hasMany(Barangay::class);
    }

}
