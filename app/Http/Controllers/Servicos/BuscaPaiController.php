<?php

namespace App\Http\Controllers\Servicos;
use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Request;
use App\Modulos;
use App\Util;
use App\Servico;
use App\LogModulos;
use App\Usuario;

class BuscaPaiController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function logar($payload, $url) {
//        return $cookie;
    }

    public function verifLimPre($idUser, $Usuario, $modulo) {
        $ver     = Modulos::where('nome', $modulo)
                ->first();

        $servico = $modulo;
        $Servico = Servico::where('id_usuario', $idUser)
            ->where('servico', $servico)
            ->where('status', 1)
            ->first();

        $Servico = json_decode($Servico, true);
        
        $prePago = true;
            //coleta info user.

            // pre pago!
        $valorConsulta     = $Servico['valor'];
        $valorConsultaLimp = floatval(str_replace(",",".",$valorConsulta));

        $saldoUsuario = $Usuario['valor'];
        $saldoUsuarioLimp = floatval(str_replace(",",".",$saldoUsuario));

        if($valorConsultaLimp > $saldoUsuarioLimp) {
            return true;
        }else{
            return false;
        }

    }

    public function verifLimPontos($idUser, $Usuario, $modulo) {

        $ver     = Modulos::where('nome', $modulo)
                ->first();

        $servico = $modulo;
        $Servico = Servico::where('id_usuario', $idUser)
            ->where('servico', $servico)
            ->where('status', 1)
            ->first();

        $Servico = json_decode($Servico, true);
        $prePago = false;

        if($Servico['usado'] >= $Servico['limite']) {
            return true;
        }else{
            return false;
        }
    }

    public function main(Request $request) {

        $idUser  = Util::xss($request->user()->id_usuario);

        $modulo  = 'BuscaPai';
        $ver     = Modulos::where('nome', $modulo)
                ->first();

        $Usuario = Usuario::where('id', $idUser)->first();
        $Usuario = json_decode($Usuario, true);
        if($Usuario['tipo'] == 2){
            //pre pago
            if($this->verifLimPre($idUser, $Usuario, $modulo)) {
                            $result = [
                "servico" => $ver['nome'],
                "sobre"   => $ver['sobre'],
                "body"    => "<br/> Saldo insuficiente, realize uma recarga para continuar usando.<br/><br/>",
                "resultado" => "dados",
                "status"  => 2
            ];

            return response($result, 200);   
            }
        } else {
            //pontos
            if($this->verifLimPontos($idUser, $Usuario, $modulo)){
                if($this->verifLimPre($idUser, $Usuario, $modulo)) {
                                $result = [
                    "servico" => $ver['nome'],
                    "sobre"   => $ver['sobre'],
                    "body"    => "<br/> Saldo insuficiente, realize uma recarga para continuar usando.<br/><br/>",
                    "resultado" => "dados",
                    "status"  => 2
                ];

                return response($result, 200);   
                }
            }
        }

        $url =  base_path(). '/public/tpls/BuscaPai/main.html';
        $res = file_get_contents($url);

        $result = [
            "servico" => $ver['nome'],
            "sobre"   => $ver['sobre'],
            "body"    => $res,
            "status"  => $ver['status']
        ];

        return response($result, 200);
    }

    public function consultar(Request $request) {

        $idUser  = Util::xss($request->user()->id_usuario);

        $modulo  = 'BuscaPai';
        $ver     = Modulos::where('nome', $modulo)
                ->first();

        $Usuario = Usuario::where('id', $idUser)->first();
        $Usuario = json_decode($Usuario, true);
        if($Usuario['tipo'] == 2){
            //pre pago
            if($this->verifLimPre($idUser, $Usuario, $modulo)) {
                            $result = [
                "servico" => $ver['nome'],
                "sobre"   => $ver['sobre'],
                "body"    => "<br/> Saldo insuficiente, realize uma recarga para continuar usando.<br/><br/>",
                "resultado" => "dados",
                "status"  => 2
            ];

            return response($result, 200);   
            }
            $prePago = true;
        } else {

            //pontos
            if($this->verifLimPontos($idUser, $Usuario, $modulo)){
                if($this->verifLimPre($idUser, $Usuario, $modulo)) {
                                $result = [
                    "servico" => $ver['nome'],
                    "sobre"   => $ver['sobre'],
                    "body"    => "<br/> Saldo insuficiente, realize uma recarga para continuar usando.<br/><br/>",
                    "resultado" => "dados",
                    "status"  => 2
                ];

                return response($result, 200);   
                }
                $prePago = true;
            }else{
                $prePago = false;
            }
        }


        $doc = Util::xss($request->input('doc'));
        $url = 'http://191.96.28.230/instint/api_pai.php?cpf=' . $doc;
        $res = Util::curl($url, null, null, false);

        if(!stristr($res, '<dados>')) {
            $res = Util::curl($url, null, null, false);
        }

        $res = json_decode(json_encode((array)simplexml_load_string($res)),true);
        //salva log de uso.
        $LogModulo = new LogModulos;            
        $LogModulo->id_usuario = $idUser;
        $LogModulo->ip         = Util::xss($request->getClientIp());
        $LogModulo->navegador  = Util::xss($request->header('User-Agent'));
        $LogModulo->referer    = Util::xss($request->header('referer'));
        $LogModulo->modulo     = '2';
        $LogModulo->acao       = 'consultar';
        $LogModulo->doc        = $doc;
        $LogModulo->payload    = '';
        if(isset($res['pai'])) {
            $LogModulo->status  = '1';

            $servico = $modulo;
            $Servico = Servico::where('id_usuario', $idUser)
                ->where('servico', $servico)
                ->where('status', 1)
                ->first();


            if($prePago == true){
                $valorConsulta     = $Servico['valor'];

                $User        = Usuario::find($idUser);
                $User->valor = $User->valor - $valorConsulta;
                $User->update();
            } else {

                $Servico->usado = $Servico->usado + 1;
                $Servico->update();
            }

            $nome = $res['nome'];            
            $nasc = $res['nascimento'];
            if(stristr($nasc, '-')) {
                $nasc = Util::conData($nasc);
            }
            $mae  = $res['mae'];
            $pai  = $res['pai'];
            $res = '<div class="result" style="margin-left:-90px;">
                <h2 style="text-align:left; margin-left:8px;">Resultado.</h2>
                <p><strong>Nome:</strong>&nbsp;'.$nome.'</p>
                <p><strong>Data nascimento:</strong>&nbsp;'.$nasc.'</p>
                <p><strong>Nome da mae:</strong>&nbsp;'.$mae.'</p>
                <p><strong>Nome do Pai:</strong>&nbsp;&nbsp;'.$pai.'</p>
            </div>
            <h2><a href="javascript::void(0)" onclick="consultaBuscaPai();">Nova consulta</a></h2>';

        } else {
            $LogModulo->status  = '2';

            $res = '<br><br><br><br><center><h2>Nada encontrado.</h2><br><br><h3><a href="javascript::void(0)" onclick="consultaBuscaPai();">Nova consulta</a></h3></center>';
        }

        $LogModulo->save();

        $result = [
                "servico" => $ver['nome'],
                "sobre"   => $ver['sobre'],
                "body"    => $res,
                "resultado" => "dados",
                "status"  => $ver['status']
        ];

        return response($result, 200);
    }
}
