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
        Schema::create('points', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->uuid();
            $table->string('latitude');
            $table->string('longitude');
            $table->string('inn')->nullable();
            $table->string('client_name');
            $table->string('client_name_official')->nullable();
            $table->string('address')->nullable();
            $table->string('point_name')->nullable();
            $table->string('crm_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('points');
    }
};
