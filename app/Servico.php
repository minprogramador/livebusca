<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

use App\Util;
use App\Usuario;
use App\Modulos;
class Servico extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_usuario', 'servico', 'tipo', 'valor', 'limite', 'usado', 'status'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'id', 'id_usuario', 'created_at', 'updated_at'
    ];

    public static function verificaLimit($modulo, $idUser) {
        if($idUser < 1) { return false; }
        $servico = $modulo;

        $Servico = Servico::where('id_usuario', $idUser)
            ->where('servico', $servico)
            ->where('status', 1)
            ->first();

        $Servico = json_decode($Servico, true);
        $Usuario = Usuario::where('id', $idUser)->first();

        if($Usuario->tipo === 2){
            $Usuario = json_decode($Usuario, true);
            
            // pre pago!
            $valorConsulta     = $Servico['valor'];
            $valorConsultaLimp = floatval(str_replace(",",".",$valorConsulta));

            $saldoUsuario     = $Usuario['valor'];
            $saldoUsuarioLimp = floatval(str_replace(",",".",$saldoUsuario));

            if($valorConsultaLimp > $saldoUsuarioLimp) {
                return 'Saldo insuficiente, entre em contato para recarregar seu cadastro.';
            }else{
                return array('status'=> true, 'tipo' => $Usuario->tipo);
            }
        } else {
            if($Servico['usado'] >= $Servico['limite']) {
                return 'Seus pontos acabaram, em caso de duvidas entre em contato';
            } else {
                return array('status'=> true, 'tipo' => $Usuario->tipo);
            }
        }
    }
}

