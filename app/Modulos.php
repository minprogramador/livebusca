<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modulos extends Model
{
    //use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome', 'imagem', 'sobre', 'url', 'tipo', 'valor', 'credencial', 'payload', 'cookie', 'proxy', 'status'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
