<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateH02datasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('h02datas', function (Blueprint $table) {
            $table->id();
            $table->dateTime('event_datetime')->index();
            $table->string('hoc', 15);
            $table->string('id_tracker', 15)->index();
            $table->string('sep1', 5);
            $table->string('whattime', 10);
            $table->string('sep2', 5);
            $table->string('latitude', 15);
            $table->string('latmark', 5);
            $table->string('longitude', 15);
            $table->string('longmark', 5);
            $table->string('speed', 10);
            $table->string('speedlongitude', 10);
            $table->string('whatdate', 10);
            $table->string('vehicle1', 15);
            $table->string('vehicle2', 15);
            $table->string('vehicle3', 15)->nullable();
            $table->string('vehicle4', 15)->nullable();
            $table->string('vehicle5', 15)->nullable();
            $table->string('vehicle6', 15)->nullable();
            $table->string('vehicle7', 15)->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('h02datas');
    }
}
