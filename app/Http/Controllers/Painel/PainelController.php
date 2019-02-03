<?php

namespace App\Http\Controllers\Painel;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Usuario;
use App\Servico;
use App\Online;
use App\Util;
use App\Contato;
use Carbon\Carbon;
use DB;
class PainelController extends Controller
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


   public function test(Request $request) {

        $id      = $request->user()->id_usuario;
        $Usuario = new Usuario;
        $res     = $Usuario->find($id);

        if($res) {
            $Servico = new Servico();
            $servicos = $Servico->where('id_usuario', $id)->get();
            //retornar lista de servicos
            //dados do usuario
            // dados do plano.

            return array(
                "perfil" => $res,
                "servicos" => $servicos
            );
        } else {
            return array(
                'error' => true,
                'msg' => 'Erro interno, aguarde alguns instantes e tente novamente.'
            );
        }
        //code..
    }

    public function config(Request $request) {

        $id      = $request->user()->id_usuario;
        $Usuario = new Usuario;
        $res     = $Usuario->find($id);

        if($res) {
            $Servico = new Servico();
            $servicos = DB::table('servicos')->where('id_usuario', $id)->where('status', 1)->get();

            //retornar lista de servicos
            //dados do usuario
            // dados do plano.
            $servicos = json_decode($servicos, true);
            $listServ = [];

            //verifica e zera pontos.    
            if($res->tipo_limite == 2) {

                foreach($servicos as $servs){
                    $dataver = $servs['updated_at'];
                    $dataver = explode(' ', $dataver);
                    $dataver = $dataver[0];
                    $difdate = Util::countData($dataver);

                    if($difdate != 0){
                        //zera os ponto diario
                        if($servs['limite'] > 0){
                            Servico::where('id_usuario', $id)
                                ->where('limite', '>', 0)
                                ->update(['usado' => 0]);
                        }
                    }
                }
            }else{

                foreach($servicos as $servs){
                    $dataver = $servs['updated_at'];
                    $dataver = explode(' ', $dataver);
                    $dataver = $dataver[0];
                    $difdate = Util::countData($dataver);

                    if($difdate > 30){
                        //zera os ponto diario
                        if($servs['limite'] > 0){
                            Servico::where('id_usuario', $id)
                                ->where('limite', '>', 0)
                                ->update(['usado' => 0]);
                        }
                    }
                }
            }
            //fim verifica e zera pontos.    

            foreach($servicos as $servs){
                if($servs['limite'] > 0) {
                    $listServ[] = [
                        'servico' => $servs['servico'],
                        'tipo' => $servs['tipo'],
                        'limite' => $servs['limite'],
                        'usado'  => $servs['usado'],
                        'status' => $servs['status']

                    ];                    
                } else {
                    $listServ[] = [
                        'servico' => $servs['servico'],
                        'tipo' => $servs['tipo'],
                        'valor' => $servs['valor'],
                        'pre' => true,
                        'status' => $servs['status']
                    ];
                }
            }

            return array(
                "dados" => $res,
                "servicos" => $listServ
            );
        } else {
            return array(
                'error' => true,
                'msg' => 'Erro interno, aguarde alguns instantes e tente novamente.'
            );
        }
        //code..
    }

    public function Consumo(Request $request) {

        $id      = Util::xss($request->user()->id_usuario);
        $Usuario = new Usuario;
        $res     = $Usuario->find($id);

        if($res) {
            $servicos = Servico::where('id_usuario', $id)->where('status', 1)
            ->get();

        } else {
            return false;
        }


        if($res->tipo_limite == 2) {
            $resConsumo = [
                "diario" => $servicos
            ];
        }else{
            $resConsumo = [
                "mensal" => $servicos
            ];
        }

        return $resConsumo;
    }

    public function editarCad(Request $request) {
        $senha  = Util::xss($request->input('senha'));
        $nsenha = Util::xss($request->input('nsenha'));
        $id      = Util::xss($request->user()->id_usuario);

        if($senha != $nsenha) {
            if(strlen($nsenha) > 3 && strlen($nsenha) < 254) {
                $User = Usuario::find($id);
                if (Hash::check($senha, $User->senha)) {
                    $User->senha = $senha = Hash::make($nsenha);
                    if($User->update()) {
                        return response()->json(['msg'=> 'Senha alterada com sucesso!'], 201);
                    } else {
                        return response()->json(['msg'=> 'Erro ao atualizar a nova senha!'], 201);
                    }
                } else {
                    return response()->json(['msg'=> 'Senha invalida!'], 201);
                }
            } else {
                return response()->json(['msg'=> 'Nova senha invalida'], 201);
            }
        } else {
            return response()->json(['msg'=> 'Nova senha deve ser diferente da antiga.'], 201);
        }
    }

    public function sair(Request $request) {

        $token = Util::xss($request->bearerToken());

        if($token) {
            Online::where('token', $token)->delete();
        }

        if (isset($_SERVER['HTTP_COOKIE'])) {
            $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
            foreach($cookies as $cookie) {
                $parts = explode('=', $cookie);
                $name = trim($parts[0]);
                setcookie(Util::xss($name), '', time()-1000);
                setcookie(Util::xss($name), '', time()-1000, '/');
            }
        }

        return redirect('/');
    }

    public function contato(Request $request) {

        $frmValidar = [
            'nome'     => 'required|min:3|max:200',
            'email'    => 'required|email|max:255',
            'assunto'  => 'required|min:3|max:255',
            'mensagem' => 'required|min:3|max:10000',
        ];

        $token    = Util::xss($request->input('token'));

        $valCap = Util::validate_rechapcha($token);
        
        if($valCap !== true){
            $res = array(
                'error' => true,
                'msg' => 'Erro ao resolver o captcha...'
            );
            return response()->json($res, 201);
            die;
        }
        

        $this->validate($request, $frmValidar);
        if($request->user() == NULL) {
            $id = 0;
        } else {
            $id = Util::xss($request->user()->id_usuario);
        }

        $nome     = Util::xss($request->input('nome'));
        $email    = Util::xss($request->input('email'));
        $assunto  = Util::xss($request->input('assunto'));
        $mensagem = Util::xss($request->input('mensagem'));
        $ip        = Util::xss($request->getClientIp());
        $navegador = Util::xss($request->header('User-Agent'));
        $referer   = Util::xss($request->header('referer'));

        $Con = new Contato();
        $Con->id_usuario = $id;
        $Con->ip = $ip;
        $Con->navegador = $navegador;
        $Con->referer = $referer;
        $Con->nome = $nome;
        $Con->email = $email;
        $Con->titulo = $assunto;
        $Con->mensagem = $mensagem;
        $Con->status = 1;

        if($Con->save()) {
            return response()->json(['error'=>false, 'msg'=> 'Mensagem enviada com sucesso'], 201);
        } else {
            return response()->json(['error'=> true, 'msg'=> 'Ocorreu um erro ao enviar a mensagem'], 201);

        }
    }

    public function recSenha(Request $request) {
        $frmValidar = [
            'usuario'    => 'required|min:2|max:200',
            'revendedor' => 'required|min:2|max:255',
        ];

        $this->validate($request, $frmValidar);

        $usuario    = Util::xss($request->input('usuario'));
        $revendedor = Util::xss($request->input('revendedor'));
        $ver = Usuario::where('usuario', $usuario)
            ->where('revendedor', $revendedor)
            ->first();

        if($ver != NULL) {
            $email = $ver->email;
            $nsenha = md5(time(). rand(11111,99999) . $email);
            $nsenha = substr($nsenha, 0, rand(4, 7));
            $ver->senha      = Hash::make($nsenha);
            $ver->data_token = date("Y-m-d H:i:s");

            if($ver->save()) {
                $de       = null;
                $para     = $email;
                $assunto  = "Recuperar senha de acesso";
                $mensagem = "Foi gerada uma nova senha de acesso\nNova senha: {$nsenha}";

                $envia = Util::sendMail($de, $para, $assunto, $mensagem);
                if(@$envia->id) {
                    return response()->json(['error'=> false, 'msg'=> 'foi enviado um email com instrucoes.'], 201);
                } else {
                    return response()->json(['error'=> true, 'msg'=> 'Erro ao enviar mensagem'], 201);
                }
            } else {
                return response()->json(['error'=> true, 'msg'=> 'Erro ao realizar operacao.'], 201);
            }
        } else{
            return response()->json(['error'=> true, 'msg'=> 'Usuario ou revendedor invalidos.'], 201);
        }
    }
}
