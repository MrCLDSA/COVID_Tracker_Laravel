<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patient_infos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('brgy_id');
            $table->foreign('brgy_id')->references('id')->on('barangays')->onDelete('cascade');
            $table->string('number');
            $table->string('email');
            $table->string('case_type');
            $table->string('coronavirus_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient_infos');
    }
};
