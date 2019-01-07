<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLogModulosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('log_modulos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_usuario')->index();
            $table->string('ip', '100')->index();
            $table->longText('navegador');
            $table->longText('referer');
            $table->integer('modulo')->index();
            $table->string('acao')->index();
            $table->string('doc')->index();
            $table->longText('payload');
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
        Schema::dropIfExists('log_modulos');
    }
}
