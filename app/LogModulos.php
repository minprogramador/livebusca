<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogModulos extends Model
{
    //use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_usuario', 'ip', 'navegador', 'referer', 'modulo', 'acao', 'doc', 'payload', 'status'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
