<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contato extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_usuario', 'ip', 'navegador', 'referer', 'nome', 'email', 'titulo', 'mensagem', 'status'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
