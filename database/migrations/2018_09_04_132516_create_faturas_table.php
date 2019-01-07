<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFaturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faturas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_usuario')->index();
            $table->integer('tipo')->index();
            $table->decimal('valor', 10, 2)->index();
            $table->integer('validade')->index();
            $table->integer('forma_pg')->index();
            $table->date('data_pagamento')->index();
            $table->longText('obs');
            $table->integer('status')->index();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('faturas');
    }
}
