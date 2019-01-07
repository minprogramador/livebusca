<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ConfirmaPagamento extends Model
{
    //use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_usuario', 'id_banco', 'id_fat', 'valor', 'n_doc', 'data_pg', 'n_controle', 'obs', 'comprovante', 'tipo_comprovante', 'status'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
