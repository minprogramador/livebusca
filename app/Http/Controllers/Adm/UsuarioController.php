<?php

namespace App\Http\Controllers\Adm;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Usuario;
use DB;
use App\Util;
use Carbon\Carbon;
use App\Online;
use App\Log;
use App\Modulos;
use App\Servico;
use App\Fatura;

class UsuarioController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        //
    }

    public function listar() {
        return DB::table('usuarios')->paginate(10);
        //return Usuario::paginate(10);
    }

    public function listarAll() {
        return DB::table('usuarios')->select('id', 'usuario')->get();
    }
    public function find($id) {
        $ver = DB::table('usuarios')->find($id);
        return response()->json($ver, 201);
    }

    public function salvar(Request $request) {

        $this->validate($request, [
            'usuario'    => 'required|min:3|max:100|unique:usuarios',
            'revendedor' => 'max:100',
            'senha'      => 'required|min:3|max:255',
            'email'      => 'required|email|max:255|unique:usuarios',
            'valor'      => 'required',
            'tipo'       => 'required|max:1',
            'tipoLimite' => 'required|max:5',
            'tipoServ'   => 'required',
            'statusServ' => 'required',
            'limite'     => 'required',
            'status'     => 'required|max:1'
        ]);

        $usuario    = Util::xss($request->input('usuario'));
        $revendedor = Util::xss($request->input('revendedor'));
        $senha      = Util::xss($request->input('senha'));
        $email      = Util::xss($request->input('email'));
        $inicio     = Util::xss($request->input('inicio'));
        $inicio     = Carbon::createFromFormat('Y-m-d', $inicio)->format("Y-m-d");
        $fim        = Util::xss($request->input('fim'));
        $fim        = Carbon::createFromFormat('Y-m-d', $fim)->format("Y-m-d");
        $tipo       = Util::xss($request->input('tipo'));
        $tipoLimite = Util::xss($request->input('tipoLimite'));
        $valor      = Util::xss($request->input('valor'));
        $status     = Util::xss($request->input('status'));
        $servicos   = $request->input('limite');
        $servTipo   = $request->input('tipoServ');
        $servStatus = $request->input('statusServ');

        if($tipoLimite == 'M') {
            $tipoLimite = 1;
        }else{
            $tipoLimite = 2;
        }

        $data = array(
            'usuario'    => $usuario,
            'revendedor' => $revendedor,
            'email'      => $email,
            'inicio'     => $inicio,
            'fim'        => $fim,
            'valor'      => $valor,
            'tipo'       => $tipo,
            'tipo_limite'=> $tipoLimite,
            'status'     => $status
        );

        $data['senha'] = Hash::make($senha);
        $model = Usuario::create($data);
        $id = $model->id;

        $modulos = json_decode(Modulos::where('status', 1)->get(), true);

        foreach($modulos as $mol) {
            if($servTipo[$mol['nome']] == 1){
                $limite = $servicos[$mol['nome']];
                $valor  = '0';
            }else{
                $valor  = $servicos[$mol['nome']];
                $limite = '0';
            }
            //echo  $mol['nome'] . ' = '. $servicos[$mol['nome']] . "\n\n";
            $data = [
                'id_usuario'=> $id,
                'servico' => $mol['nome'],
                'tipo'    => $mol['tipo'],
                'valor'   => $valor,
                'limite'  => $limite,
                'usado'   => 0,
                'status'  => $servStatus[$mol['nome']],
            ];

            $Servico = Servico::create($data);
        }
        $validade = Util::dataToDias($inicio, $fim);
        if($status == 4) {
            $status = 2;
        }

        $dataFat = array(
            'id_usuario' => $id,
            'tipo'       => 1,
            'valor'      => $valor,
            'validade'   => $validade,
            'forma_pg'   => 1,
            'data_pagamento' => $inicio,
            'obs'        => '',
            'status'     => $status
        );

        $resFat = Fatura::create($dataFat);

        // criar fatura de acordo com valor e status...

        if($model != true) {
            $model = ['error'=>true, 'msg'=> 'erro ao criar o usuario.'];
        }

        return response()->json($model, 201);
    }

    public function update(Request $request, $id) {

        $frmValidar = [
            'usuario'    => 'required|min:3|max:100|unique:usuarios',
            'revendedor' => 'required|min:3|max:100',
            'email'      => 'required|email|max:255|unique:usuarios',
            'inicio'     => 'required|date|date_format:Y-m-d',
            'fim'        => 'required|date|date_format:Y-m-d',
            'valor'      => 'required',
            'status'     => 'required|max:1'
        ];

        $id         = Util::xss($id);
        $usuario    = Util::xss($request->input('usuario'));
        $revendedor = Util::xss($request->input('revendedor'));
        $email      = Util::xss($request->input('email'));
        $inicio     = Util::xss($request->input('inicio'));
        $fim        = Util::xss($request->input('fim'));
        $valor      = Util::xss($request->input('valor'));
        $tipo       = Util::xss($request->input('tipo'));
        $tipoLimite = Util::xss($request->input('tipoLimite'));
        $status     = Util::xss($request->input('status'));
        $errNSenha  = false;

        if($request->input('senha')) {
            $nsenha = Util::xss($request->input('senha'));

            if(strlen($nsenha) > 3) {
                if(strlen($nsenha) < 255) {
                    $errNSenha = 'ok';
                } else {
                    $errNSenha = true;
                }
            } else {
                $errNSenha = true;
            }

            if($errNSenha == 'ok') {
                $frmValidar['senha'] = 'required|min:3|max:255';
                $senha = Hash::make($nsenha);
            }
        }

        $User = Usuario::find($id);
        if($errNSenha == 'ok') {
            if (Hash::check($nsenha, $User->senha)) {
                unset($frmValidar['senha']);
            } else {
                $User->senha = $senha;
            }
        }

        if($usuario == $User->usuario) {
            unset($frmValidar['usuario']);
        } else {
            $User->usuario    = $usuario;
        }

        if($email == $User->email) {
            unset($frmValidar['email']);
            $User->email      = $email;
        }

        $this->validate($request, $frmValidar);

        $User->revendedor = $revendedor;
        $User->inicio     = $inicio;
        $User->fim        = $fim;
        $User->valor      = $valor;
        if(strlen($tipo) > 0){
            $User->tipo       = $tipo;
        }
        if(strlen($tipoLimite) > 0){
            if($tipoLimite == 'M'){
                $tipoLimite = 1;
            } else{
                $tipoLimite = 2;
            }            
            $User->tipo_limite = $tipoLimite;
        }
        $User->status     = $status;


        $User->update();

        return response()->json($User, 201);
    }

    public function alterar($id, Request $request) {

        $frmValidar = [
            'email'      => 'required|email|max:255|unique:usuarios',
            'inicio'     => 'required|date|date_format:Y-m-d',
            'fim'        => 'required|date|date_format:Y-m-d',
            'valor'      => 'required',
            'status'     => 'required|max:1'
        ];

        $id         = Util::xss($id);
        $email      = Util::xss($request->input('email'));
        $inicio     = Util::xss($request->input('inicio'));
        $fim        = Util::xss($request->input('fim'));
        $valor      = Util::xss($request->input('valor'));
        $status     = Util::xss($request->input('status'));
        $tipo       = Util::xss($request->input('tipo'));
        $errNSenha  = false;

        if($request->input('nsenha')) {
            $nsenha = Util::xss($request->input('nsenha'));

            if(strlen($nsenha) > 3) {
                if(strlen($nsenha) < 255) {
                    $errNSenha = 'ok';
                } else {
                    $errNSenha = true;
                }
            } else {
                $errNSenha = true;
            }

            if($errNSenha == 'ok') {
                $frmValidar['nsenha'] = 'required|min:3|max:255';
                $senha = Hash::make($nsenha);
            }
        }

        $User = Usuario::find($id);
        if($errNSenha == 'ok') {
            if (Hash::check($nsenha, $User->senha)) {
                unset($frmValidar['nsenha']);
            } else {
                $User->senha = $senha;
            }
        }

        if($email == $User->email) {
            unset($frmValidar['email']);
            $User->email      = $email;
        }

        $this->validate($request, $frmValidar);

        $User->email    = $email;
        $User->inicio   = $inicio;
        $User->fim      = $fim;
        $User->valor    = $valor;
        $User->status   = $status;
        $User->tipo     = $tipo;

        $User->update();

        return response()->json($User, 201);
    }

    public function delete($id) {
        $id = Util::xss($id);

        if(Usuario::destroy($id)) {
            $res = ['error' => false, 'msg'=> 'usuario removido com sucesso'];
        } else {
            $res = ['error'=> true, 'msg'=> 'erro ao remover o usuario.'];
        }

        return response()->json($res, 201);
    }

    public function pesquisa(Request $request) {

        $usuario    = Util::xss($request->get('usuario'));
        $revendedor = Util::xss($request->get('revendedor'));
        $email      = Util::xss($request->get('email'));
        $tipo       = Util::xss($request->get('tipo'));
        $status     = Util::xss($request->get('status'));

        if(strlen($usuario) > 0) {

            $ver = DB::table('usuarios')->where('usuario', $usuario)
                ->paginate();
        } elseif(strlen($revendedor) > 0) {
            $ver = DB::table('usuarios')->where('revendedor', $revendedor)
                ->paginate();
        } elseif(strlen($email) > 0) {
            $ver = DB::table('usuarios')->where('email', $email)
                ->paginate();
        } elseif(strlen($tipo) > 0) {
            $ver = DB::table('usuarios')->where('tipo', $tipo)
                ->paginate();
        } elseif(strlen($status) > 0) {
            $ver = DB::table('usuarios')->where('status', $status)
                ->paginate();
        } else {
            $ver = [];
        }

        return response()->json($ver, 201);

    }

    public function login(Request $request) {

        $error      = false;
        $usuario    = Util::xss($request->get('usuario'));
        $revendedor = Util::xss($request->get('revendedor'));
        $senha      = Util::xss($request->get('senha'));
        $token      = Util::xss($request->get('token'));

        $data = array(
            "usuario" => $usuario,
            "revendedor" => $revendedor,
            "senha" => $senha,
            "token" => $token
        );

        $this->validate($request, [
            'usuario'    => 'required|min:3|max:100',
            'revendedor' => 'required|min:3|max:100',
            'senha'      => 'required|min:3|max:255',
            'token'      => 'required|min:3'
        ]);
		
		$valCap = Util::validate_rechapcha($data['token']);
		
		if($valCap !== true){
            $res = array(
                'error' => true,
                'msg' => 'Erro ao resolver o captcha...'
            );
	        return response()->json($res, 201);
			die;
		}
		
        $ver = Usuario::where('usuario', $usuario)
            ->where('revendedor', $revendedor)
            ->first();

        if($ver == NULL) {

            $res = array(
                'error' => true,
                'msg' => 'Usuario ou senha invalido'
            );

        } else {
            if (Hash::check($data['senha'], $ver->senha)) {
                $error = false;
            } else {
                $error = true;
            }

            $datafim = strtotime(new Carbon($ver->fim));
            $datahj = strtotime(new Carbon());
            if ($datahj > $datafim) {
                $user = Usuario::find($ver->id);
                $user['status'] = 2;
                $user->update();
                //muda status do usuario para 2 == vencido.
            }

            if ($error) {
                $res = array(
                    'error' => true,
                    'msg'   => 'Usuario ou senha invalidos'
                );
            } else {

                $token  = md5(time() . $ver->id . rand(11111, 99999));
                $val    = Carbon::parse(Carbon::now())->addHour(2);
                $Online = new Online;

                $Online->id_usuario = $ver->id;
                $Online->token      = $token;
                $Online->validade   = $val;
                $Online->ip         = Util::xss($request->getClientIp());
                $Online->navegador  = Util::xss($request->header('User-Agent'));
                $Online->status     = 1;

                //logs de acesso.
                $Log = new Log;
                $Log->id_usuario = $ver->id;
                $Log->ip         = Util::xss($request->getClientIp());
                $Log->navegador  = Util::xss($request->header('User-Agent'));
                $Log->referer    = Util::xss($request->header('referer'));
                $Log->obs        = '';
                $Log->status     = 1;

                if ($Online->save()) {
                    $Log->save();
                    $res = array(
                        'error' => false,
                        'token' => $token,
                    );
                } else {
                    $res = array(
                        'error' => true,
                        'msg'   => 'Erro interno, aguarde alguns instantes e tente novamente.'
                    );
                }
            }
        }
        return response()->json($res, 201);
    }

}
