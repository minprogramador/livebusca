<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->increments('id');
            $table->string('usuario', '100');
            $table->string('revendedor', '100');
            $table->string('senha');
            $table->string('email', '255');
            $table->date('inicio')->index();
            $table->date('fim')->index();
            $table->decimal('valor', 10, 2)->index();
            $table->integer('tipo');
            $table->integer('tipo_limite');
            $table->integer('status');

            $table->index([DB::raw('revendedor(100)')]);
            $table->index('status');
            $table->index('tipo');
            $table->unique([DB::raw('email(191)')]);
            $table->unique([DB::raw('usuario(100)')]);

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
        Schema::dropIfExists('usuarios');
    }
}
