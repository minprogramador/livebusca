<?php

namespace App\Http\Controllers\Servicos;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Modulos;
use App\Util;
use App\Servico;
use App\LogModulos;


class UpbuscaController extends Controller
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
        $url    = $url . '/Logue-se';
        $post   = $payload;
        $res    = Util::curl($url, null, $post, true);
        $cookie = Util::getCookies($res);
        return $cookie;
    }

    public function main(Request $request) {
        $idUser  = Util::xss($request->user()->id_usuario);

        $modulo = 'Upbusca';
        $ver = Modulos::where('nome', $modulo)
            ->first();

        $servico = 'Upbusca';
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

        $cookie = $this->logar($ver['payload'], $ver['url']);
        $url = $ver['url'] . '/Painel';
        $res = Util::curl($url, $cookie, null, false);

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

        $modulo = 'Upbusca';
        $ver = Modulos::where('nome', $modulo)
            ->first();

        $servico = 'Upbusca';
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

        $LogModulo = new LogModulos;            
        $LogModulo->id_usuario = $idUser;
        $LogModulo->ip         = Util::xss($request->getClientIp());
        $LogModulo->navegador  = Util::xss($request->header('User-Agent'));
        $LogModulo->referer    = Util::xss($request->header('referer'));
        $LogModulo->modulo     = '1';
        $LogModulo->acao       = 'pesquisar';
        $LogModulo->doc        = '';
        $LogModulo->payload    = urlencode(http_build_query($request->all()));
        $LogModulo->status     = 1;
        $LogModulo->save();

        $cookie = $this->logar($ver['payload'], $ver['url']);
        $url = $ver['url'] . '/Painel';
        $res = Util::curl($url, $cookie, http_build_query($request->all()), false);
        $res = str_replace('Dados\/', 'Painel#Upbusca?doc=', $res);
        $res = json_decode($res, true);
        if($res['resultado'] =='href') {

            $doc = Util::corta($res['href'] . '#FIM', 'doc=', '#FIM');
            $url = $ver['url'] . '/Dados/' . $doc;
            $res = Util::curl($url, $cookie, null, null, false);
            $res = str_replace('/css/', 'tpls/upbusca/css/', $res);
            $res = str_replace('/js/', 'tpls/upbusca/js/', $res);
            $res = str_replace('http://www.upbusca.com', '', $res);
            $rem = Util::corta($res, '<div class="left-side sticky-left-side">', '<div class="main-content">');
            $res = str_replace($rem, '</div>', $res);
            $res = str_replace("<link href=\"tpls/upbusca/css/bootstrap.min.css\" rel='stylesheet' type='text/css' />
    ", '', $res);
            $res = str_replace('tpls/upbusca/css/bootstrap-theme.css', '', $res);
            $res = str_replace('tpls/upbusca/css/style.css', 'tpls/upbusca/css/styleint.css', $res);
            $res = str_replace('"images/', '"tpls/upbusca/images/', $res);
            $res = str_replace('"/images/', '"tpls/upbusca/images/', $res);

            $LogModulo = new LogModulos;            
            $LogModulo->id_usuario = $idUser;
            $LogModulo->ip         = Util::xss($request->getClientIp());
            $LogModulo->navegador  = Util::xss($request->header('User-Agent'));
            $LogModulo->referer    = Util::xss($request->header('referer'));
            $LogModulo->modulo     = '1';
            $LogModulo->acao       = 'consultar';
            $LogModulo->doc        = $doc;
            $LogModulo->payload    = '';

            if(stristr($res,'Dados cadastrais')) {
                $LogModulo->status     = 1;

                $Servico['usado'] = $Servico['usado'] + 1;
                $Servico->update();
            }else{
                $LogModulo->status     = 2;
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
        return response($res, 200);
    }

    public function open(Request $request, $doc)
    {
        $doc = Util::xss($doc);

        $modulo = 'Upbusca';
        $ver = Modulos::where('nome', $modulo)
            ->first();

        $servico = 'Upbusca';
        $Servico = Servico::where('servico', $servico)
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
        $LogModulo = new LogModulos;            
        $LogModulo->id_usuario = $idUser;
        $LogModulo->ip         = Util::xss($request->getClientIp());
        $LogModulo->navegador  = Util::xss($request->header('User-Agent'));
        $LogModulo->referer    = Util::xss($request->header('referer'));
        $LogModulo->modulo     = '1';
        $LogModulo->acao       = 'pesquisar';
        $LogModulo->doc        = '';
        $LogModulo->payload    = urlencode(http_build_query($request->all()));

        if(stristr($res,'Dados cadastrais')) {
            $LogModulo->status     = 1;
            $Servico['usado'] = $Servico['usado'] + 1;
            $Servico->update();
        }else{
            $LogModulo->status     = 2;
        }
        $LogModulo->save();
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
