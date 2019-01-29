<?php

namespace App\Http\Controllers\Servicos;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Modulos;
use App\Util;
use App\Servico;
use App\LogModulos;
use App\Usuario;

class BuscaRgController extends Controller
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


    public function load(Request $request) {


        $idUser  = Util::xss($request->user()->id_usuario);

        $modulo  = 'BuscaRg';
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



        $url = 'http://191.101.18.200/checkRg/api.php?captcha=true';
        $res = Util::curl($url, null, null, false);

        if(!stristr($res, 'captcha')) {
            $res = Util::curl($url, null, null, false);
        }

        if(!stristr($res, 'captcha')) {
            $result = ['error'=> true, 'msg'=> 'Sistema indisponivel no momento.'];
            return response($result, 200);
        }
        
        $res = json_decode(json_encode((array)simplexml_load_string($res)),true);

        if(isset($res['captcha'])) {
            $captcha = $res['captcha'];
            $cookie  = $res['cookie'];
            $token   = $res['token'];

            $res = '
                <input type="text" name="cpf" id="cpf" class="incpf" placeholder="Digite o CPF" />
                <br />
                <img src="'.$captcha.'" title="Digite o captrcha"  width="240" height="120" />
                <input type="text" name="captcha" id="captcha" placeholder="Confirme o captcha" class="incpf" />
                <input type="hidden" name="auth1" id="auth1" value="'.$token.'">
                <input type="hidden" name="auth2" id="auth2" value="'.$cookie.'">
                <br />
                <input type="button" onclick="consultaBuscaRg(this);" value="Buscar" class="bnt" id="bntBuscaRg" />
                <input type="button" onclick="BuscaRg(this);" value="Nova imagem" class="bnt" id="bntBuscaRg" />
            ';

        } else {
            $res = '
                <input type="text" name="cpf" id="cpf" class="incpf" placeholder="Digite o CPF" />
                <br />
                <h2>Sistema indisponivel no momento...<h2>
                <br />
                <input type="button" onclick="BuscaRg(this);" value="Buscar" class="bnt" id="bntBuscaRg" />
            ';
        }

        $result = [
                "servico" => $ver['nome'],
                "sobre"   => $ver['sobre'],
                "body"    => $res,
                "resultado" => "dados",
                "status"  => $ver['status']
        ];

        return response($result, 200);



    }

    public function main(Request $request) {

        $idUser  = Util::xss($request->user()->id_usuario);

        $modulo  = 'BuscaRg';
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




        $url =  base_path(). '/public/tpls/BuscaRg/main.html';
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

        $modulo  = 'BuscaRg';
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

        $servico = 'BuscaRg';
        $Servico = Servico::where('id_usuario', $idUser)
            ->where('servico', $servico)
            ->where('status', 1)
            ->first();

        if($Servico->usado >= $Servico->limite) {
            $result = [
                "servico" => $ver['nome'],
                "sobre"   => $ver['sobre'],
                "body"    => "<br/> Seu limite acabou, para adquirir mais entre em contato<br/><br/>",
                "resultado" => "dados",
                "status"  => 2
            ];

            return response($result, 200);
        }



        $doc     = Util::xss($request->input('doc'));
        $doc = str_replace(array('-', '.', ' '), '', $doc);
        $captcha = Util::xss($request->input('captcha'));
        $auth1   = Util::xss($request->input('auth1'));
        $auth2   = Util::xss($request->input('auth2'));

        $post    = "cpf={$doc}&captcha={$captcha}&cookie={$auth2}&token={$auth1}";
        $url = 'http://191.101.18.200/checkRg/api.php';
        $res = Util::curl($url, null, $post, false);

        $LogModulo = new LogModulos;            
        $LogModulo->id_usuario = $idUser;
        $LogModulo->ip         = Util::xss($request->getClientIp());
        $LogModulo->navegador  = Util::xss($request->header('User-Agent'));
        $LogModulo->referer    = Util::xss($request->header('referer'));
        $LogModulo->modulo     = '3';
        $LogModulo->acao       = 'consultar';
        $LogModulo->doc        = $doc;
        $LogModulo->payload    = '';

        if(stristr($res, 'aptcha invalido')) {
            $LogModulo->status  = '2';                
            $LogModulo->save();

            $res = [
                'error'=> true,
                'msg'=> 'captcha invalido!'
            ];

            return response($res, 200);
        }
        elseif(stristr($res, 'a existe uma inscric')) {
            $LogModulo->status  = '2';                
            $LogModulo->save();

            $res = [
                'error'=> true,
                'msg'=> 'Ja existe uma inscricao para o cpf!'
            ];

            return response($res, 200);            
        }elseif(stristr($res, 'Erro no processamento')){
            $LogModulo->status  = '2';                
            $LogModulo->save();

            $res = [
                'error'=> true,
                'msg'=> 'Erro no processamento, tente novamente em breve.'
            ];

            return response($res, 200);            
        }elseif(stristr($res, 'Ocorreu um erro')) {
            $LogModulo->status  = '2';                
            $LogModulo->save();

            $res = [
                'error'=> true,
                'msg'=> 'Erro no processamento, tente novamente em breve.'
            ];

            return response($res, 200);                        
        }
        else{
            try {
                $Servico->usado = $Servico->usado + 1;
                $Servico->update();
                $LogModulo->status  = '1';                
                $LogModulo->save();

                $xml  = simplexml_load_string($res);
                $json = json_encode(array('dados'=>$xml));                
            } catch(Exception $e) {
                $json = $e;
                $LogModulo->status  = '2';                
                $LogModulo->save();
            }

            return response($json, 200);
            // echo $res;
            // die;
        }

    }




    public function open(Request $request, $doc)
    {




        $idUser  = Util::xss($request->user()->id_usuario);

        $modulo  = 'BuscaRg';
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


        $doc = Util::xss($doc);
        $cookie = $this->logar($ver['payload'], $ver['url']);

        $url = $ver['url'] . '/Dados/' . $doc;
        $res = Util::curl($url, $cookie, null, null, false);
        $res = str_replace('/css/', 'tpls/upbusca/css/', $res);
        $res = str_replace('/js/', 'tpls/upbusca/js/', $res);
        $res = str_replace('"images/', '"tpls/upbusca/images/', $res);
        $res = str_replace('"/images/', '"tpls/upbusca/images/', $res);
        $res = str_replace('http://www.upbusca.com', '', $res);
        $rem = Util::corta($res, '<div class="left-side sticky-left-side">', '<div class="main-content">');
        $res = str_replace($rem, '</div>', $res);
        $res = str_replace("<link href=\"tpls/upbusca/css/bootstrap.min.css\" rel='stylesheet' type='text/css' />
    ", '', $res);
        $res = str_replace('tpls/upbusca/css/bootstrap-theme.css', '', $res);
        $res = str_replace('tpls/upbusca/css/style.css', 'tpls/upbusca/css/styleint.css', $res);
        //$res = str_replace('');
        //apos validar a consulta, salvar log no bd e count do user.

        if(stristr($res,'Dados cadastrais')) {
            $Servico['usado'] = $Servico['usado'] + 1;
            $Servico->update();
        }
        $result = [
            "servico" => $ver['nome'],
            "sobre" => $ver['sobre'],
            "body" => $res,
            "resultado" => "final",
            "status" => $ver['status']
        ];

        return response($result, 200);

    }
}
