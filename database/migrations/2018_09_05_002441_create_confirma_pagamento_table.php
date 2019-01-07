<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConfirmaPagamentoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('confirma_pagamentos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_usuario')->index();
            $table->integer('id_banco')->index();
            $table->integer('id_fat')->index();
            $table->decimal('valor', 10, 2);
            $table->string('n_doc')->index();
            $table->dateTime('data_pg')->index();
            $table->string('n_controle');
            $table->longText('obs');
            $table->longText('comprovante');
            $table->string('tipo_comprovante');
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
        Schema::dropIfExists('confirma_pagamentos');
    }
}
