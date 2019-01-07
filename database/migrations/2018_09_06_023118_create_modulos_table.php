<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateModulosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modulos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome')->unique();
            $table->longText('imagem');
            $table->longText('sobre');
            $table->string('url');
            $table->integer('tipo')->index();
            $table->decimal('valor', 10, 2);
            $table->longText('credencial');
            $table->longText('payload');
            $table->longText('cookie');
            $table->longText('proxy');
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
        Schema::dropIfExists('modulos');
    }
}
