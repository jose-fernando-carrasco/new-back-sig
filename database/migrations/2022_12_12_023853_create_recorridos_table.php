<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecorridosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recorridos', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('distancia');
            $table->string('velocidad');
            $table->string('tiempo');
            $table->string('color_linea');
            $table->string('grosor');
            $table->text('descripcion');
            $table->unsignedBigInteger('linea_id');
            $table->timestamps();
            $table->foreign('linea_id')->references('id')->on('lineas')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recorridos');
    }
}
