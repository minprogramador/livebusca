<?php

namespace App\Http\Controllers\Adm;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Usuario;
use DB;
use App\Util;
use Carbon\Carbon;
use App\Online;
use App\Fatura;
use App\ConfirmaPagamento;

class FaturaController extends Controller
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

    public function listar(Request $request) {

        $query = DB::table('faturas')
            ->join('usuarios', 'faturas.id_usuario', '=', 'usuarios.id')
            ->select('faturas.*', 'usuarios.usuario as usuario')
            ->paginate(10);

        return $query;
        //return DB::table('faturas')->paginate(10);
        //return Usuario::paginate(10);
    }

    public function find($id) {
        $ver = DB::table('faturas')->find($id);
        return response()->json($ver, 201);
    }

    public function findUser($id=null, Request $request) {
        if($id != null) {
            $usuario = $id;
        } else {
            $usuario = Util::xss($request->user()->id_usuario);
        }
        $ver = Fatura::where('id_usuario', $usuario)->get();
        $ver = ['faturas'=> $ver];
        return response()->json($ver, 201);
    }

    public  function findComprovante($id=null, Request $request) {
        if($id != null) {
            $id = Util::xss($id);
            $ver = ConfirmaPagamento::where('id_fat', $id)->get();

        } else {
            $ver = ConfirmaPagamento::find();
        }
        $ver = ['comprovante'=> $ver];
        return response()->json($ver, 201);

    }

    public function infoEntrada() {
        //hoje conta bancaria
        $ontem = Carbon::yesterday()->format('Y-m-d');        
        $hoje =  Carbon::now()->format('Y-m-d');
        $dtmesi = date('Y-m')  . '01';
        $dtmesf = date('Y-m-') . '31';

        $dtmesPasi = new Carbon('last Month');
        $dtmesPasi = $dtmesPasi->format("Y-m") . '-01';

        $dtmesPasf = new Carbon('last Month');
        $dtmesPasf = $dtmesPasf->format("Y-m") . '-31';

        // config conta bancaria id = 1
        $dadoshjContBan = DB::table('faturas')
                        ->where('forma_pg', 1)
                        ->where('status', 1)                        
                        ->where('data_pagamento', $hoje);
        $conthjContBan   = $dadoshjContBan->count();
        $valorhjContBan = $dadoshjContBan->sum('valor'); 
        $hjContBan      = $valorhjContBan;


        $dadosOntemConBan = DB::table('faturas')
                        ->where('forma_pg', 1)
                        ->where('status', 1)                        
                        ->where('data_pagamento', $ontem);
        $contOntemConBan   = $dadosOntemConBan->count();
        $valorOntemContBan = $dadosOntemConBan->sum('valor'); 
        $ontemContBan      = $valorOntemContBan;

        $mesContBan = DB::table('faturas')
                        ->where('forma_pg', 1)
                        ->where('status', 1)                        
                        ->whereBetween('data_pagamento', array($dtmesi, $dtmesf));
        $contmesContBan   = $mesContBan->count();
        $valormesContBan = $mesContBan->sum('valor'); 
        $mesContBan      = $valormesContBan;


        $dadosmesPassContBan = DB::table('faturas')
                        ->where('forma_pg', 1)
                        ->where('status', 1)                        
                        ->whereBetween('data_pagamento', array($dtmesPasi, $dtmesPasf));
        $contmesPassContBan   = $dadosmesPassContBan->count();
        $valormesPassContBan = $dadosmesPassContBan->sum('valor'); 
        $mesPassContBan      = $valormesPassContBan;


        $dadostotalContBan = DB::table('faturas')
                        ->where('forma_pg', 1)
                        ->where('status', 1);
        $conttotalContBan = $dadostotalContBan->count();
        $valortotalContBan = $dadostotalContBan->sum('valor'); 
        $totalContBan      = $valortotalContBan;
        //fim config conta bancaria id = 1



        // config conta bancaria id = 2
        $dadoshjDepBan = DB::table('faturas')
                        ->where('forma_pg', 2)
                        ->where('status', 1)                        
                        ->where('data_pagamento', $hoje);
        $conthjDepBan   = $dadoshjDepBan->count();
        $valorhjDepBan = $dadoshjDepBan->sum('valor'); 
        $hjDepBan      = $valorhjDepBan;


        $dadosOntemDepBan = DB::table('faturas')
                        ->where('forma_pg', 2)
                        ->where('status', 1)                        
                        ->where('data_pagamento', $ontem);
        $contOntemDepBan   = $dadosOntemDepBan->count();
        $valorOntemDepBan = $dadosOntemDepBan->sum('valor'); 
        $ontemDepBan      = $valorOntemDepBan;

        $mesDepBan = DB::table('faturas')
                        ->where('forma_pg', 2)
                        ->where('status', 1)                        
                        ->whereBetween('data_pagamento', array($dtmesi, $dtmesf));
        $contmesDepBan   = $mesDepBan->count();
        $valormesDepBan = $mesDepBan->sum('valor'); 
        $mesDepBan      = $valormesDepBan;


        $dadosmesPassDepBan = DB::table('faturas')
                        ->where('forma_pg', 2)
                        ->where('status', 1)                        
                        ->whereBetween('data_pagamento', array($dtmesPasi, $dtmesPasf));
        $contmesPassDepBan   = $dadosmesPassDepBan->count();
        $valormesPassDepBan = $dadosmesPassDepBan->sum('valor'); 
        $mesPassDepBan      = $valormesPassDepBan;


        $dadostotalDepBan = DB::table('faturas')
                        ->where('forma_pg', 2)
                        ->where('status', 1);
        $conttotalDepBan = $dadostotalDepBan->count();
        $valortotalDepBan = $dadostotalDepBan->sum('valor'); 
        $totalDepBan      = $valortotalDepBan;
        //fim config conta bancaria id = 2








        // config sub total
        $dadoshjSubTotal = DB::table('faturas')
                        ->where('status', 1)                        
                        ->where('data_pagamento', $hoje);
        $conthjSubTotal   = $dadoshjSubTotal->count();
        $valorhjSubTotal = $dadoshjSubTotal->sum('valor'); 
        $hjSubTotal      = $valorhjSubTotal;


        $dadosOntemSubTotal = DB::table('faturas')
                        ->where('status', 1)                        
                        ->where('data_pagamento', $ontem);
        $contOntemSubTotal   = $dadosOntemSubTotal->count();
        $valorOntemSubTotal = $dadosOntemSubTotal->sum('valor'); 
        $ontemSubTotal      = $valorOntemSubTotal;

        $mesSubTotal = DB::table('faturas')
                        ->where('status', 1)                        
                        ->whereBetween('data_pagamento', array($dtmesi, $dtmesf));
        $contmesSubTotal   = $mesSubTotal->count();
        $valormesSubTotal = $mesSubTotal->sum('valor'); 
        $mesSubTotal      = $valormesSubTotal;


        $dadosmesPassSubTotal = DB::table('faturas')
                        ->where('status', 1)                        
                        ->whereBetween('data_pagamento', array($dtmesPasi, $dtmesPasf));
        $contmesPassSubTotal   = $dadosmesPassSubTotal->count();
        $valormesPassSubTotal = $dadosmesPassSubTotal->sum('valor'); 
        $mesPassSubTotal      = $valormesPassSubTotal;


        $dadostotalSubTotal = DB::table('faturas')
                        ->where('status', 1);
        $conttotalSubTotal = $dadostotalSubTotal->count();
        $valortotalSubTotal = $dadostotalSubTotal->sum('valor'); 
        $totalSubTotal      = $valortotalSubTotal;
        //fim config sub total


        $ver = [
            'conta_bancaria' => [
                'hoje'  => [
                    'total' => $conthjContBan,
                    'valor' => $hjContBan
                ],
                'ontem' => [
                    'total' => $contOntemConBan,
                    'valor' => $ontemContBan
                ],
                'mes'   => [
                    'total' => $contmesContBan,
                   'valor' => $mesContBan
                ],
                'mesPassado' => [
                    'total' => $contmesPassContBan,
                    'valor' => $mesPassContBan
                ],
                'total'   => [
                    'total' => $conttotalContBan,
                    'valor' => $totalContBan
                ]
            ],
            'deposito_bancario' => [
                'hoje'  => [
                    'total' => $conthjDepBan,
                    'valor' => $hjDepBan
                ],
                'ontem' => [
                    'total' => $contOntemDepBan,
                    'valor' => $ontemDepBan
                ],
                'mes'   => [
                    'total' => $contmesDepBan,
                   'valor' => $mesDepBan
                ],
                'mesPassado' => [
                    'total' => $contmesPassDepBan,
                    'valor' => $mesPassDepBan
                ],
                'total'   => [
                    'total' => $conttotalDepBan,
                    'valor' => $totalDepBan
                ]
            ],
            'sub_total' => [
                'hoje'  => [
                    'total' => $conthjSubTotal,
                    'valor' => $hjSubTotal
                ],
                'ontem' => [
                    'total' => $contOntemSubTotal,
                    'valor' => $ontemSubTotal
                ],
                'mes'   => [
                    'total' => $contmesSubTotal,
                   'valor' => $mesSubTotal
                ],
                'mesPassado' => [
                    'total' => $contmesPassSubTotal,
                    'valor' => $mesPassSubTotal
                ],
                'total'   => [
                    'total' => $conttotalSubTotal,
                    'valor' => $totalSubTotal
                ]
            ],
        ];
        // $ver = DB::table('faturas')
        // ->whereBetween('data_pagamento', array($inicio, $fim))->first();
        // $ver = DB::table('faturas')
        //             ->where('forma_pg', 1)->sum('valor');
        return response()->json($ver, 201);
    }

    public function confirmar($id, Request $request) {
        $id = Util::xss($id);
        $fat = Fatura::find($id);
        if($fat) {
            $idUser = $fat->id_usuario;
            $User   = Usuario::find($idUser);
            $User->inicio = date("Y-m-d");
            $User->fim    = date('Y-m-d', strtotime($User->fim. ' + ' .$fat->validade. ' days'));
            $User->status = 1;
   
            if($fat->tipo == 6){
                $User->valor  = $User->valor + $fat->valor;                 
            }else{
                $User->valor  = $fat->valor;                
            }
            //extra adicional e outros, nao modifica o user, so a fat.
            if($fat->tipo == 1 OR $fat->tipo == 2 OR $fat->tipo == 5 OR $fat->tipo == 6){
                $User->update();
            }

            $fat->data_pagamento = date("Y-m-d");
            $fat->status = 1;
            $model = $fat->update();
            if($model){
                $model = ['error'=> false, 'msg'=> 'Fatura ativada com sucesso'];
            } else{
                $model = ['error' => true, 'msg' => 'Erro ao ativar a fatura'];
            }
        } else {
            $model = ['error' => true, 'msg' => 'Fatura nao encontrada'];
        }
        return response()->json($model, 201);

    }

    public function salvar(Request $request) {

        $this->validate($request, [
            'usuario'   => 'required|min:1',
            'tipo'      => 'required|min:1',
            'valor'     => 'required',
            'validade'  => 'required',
            'forma_pg'  => 'required',
            'data_pg'   => 'required|date|date_format:Y-m-d',
            'status'    => 'required|max:1'
        ]);

        $usuario    = Util::xss($request->input('usuario'));
        $tipo       = Util::xss($request->input('tipo'));
        $valor      = Util::xss($request->input('valor'));
        $validade   = Util::xss($request->input('validade'));
        $forma_pg   = Util::xss($request->input('forma_pg'));
        $data_pg    = Util::xss($request->input('data_pg'));
        $status     = Util::xss($request->input('status'));
        $obs        = Util::xss($request->input('obs'));

        $data = array(
            'id_usuario' => $usuario,
            'tipo'       => $tipo,
            'valor'      => $valor,
            'validade'   => $validade,
            'forma_pg'   => $forma_pg,
            'data_pagamento' => $data_pg,
            'obs'        => $obs,
            'status'     => $status
        );

        $model = Fatura::create($data);

        if($model != true) {
            $model = ['error'=>true, 'msg'=> 'erro ao criar a fatura.'];
        }

        return response()->json($model, 201);
    }

    public function alterar($id, Request $request) {
        $frmValidar = [
            'valor'    => 'required|max:100',
            'validade' => 'required|max:10',
            'data_pg'  => 'required|date|date_format:Y-m-d',
            'forma_pg' => 'required|max:10',
            'tipo'     => 'required|max:10',
            'obs'      => 'required|max:254',
            'status'     => 'required|max:1'
        ];

        $id        = Util::xss($id);
        $valor     = Util::xss($request->input('valor'));
        $validade  = Util::xss($request->input('validade'));
        $data_pg   = Util::xss($request->input('data_pg'));
        $forma_pg  = Util::xss($request->input('forma_pg'));
        $tipo      = Util::xss($request->input('tipo'));
        $obs       = Util::xss($request->input('obs'));
        $status    = Util::xss($request->input('status'));

        $Fat = Fatura::find($id);
        $Fat->valor    = $valor;
        $Fat->validade = $validade;
        $Fat->data_pagamento = $data_pg;
        $Fat->forma_pg = $forma_pg;
        $Fat->tipo     = $tipo;
        $Fat->obs      = $obs;
        $Fat->status   = $status;

        if($Fat->update()) {
            $res = ['error'=>false, 'msg'=>'Fatura alterada com sucesso!'];
        } else {
            $res = $Fat;
        }

        return response()->json($res, 201);
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
        $User->status     = $status;


        $User->update();

        return response()->json($User, 201);
    }

    public function delete($id) {
        $id = Util::xss($id);

        if(Fatura::destroy($id)) {
            $res = ['error' => false, 'msg'=> 'usuario removido com sucesso'];
        } else {
            $res = ['error'=> true, 'msg'=> 'erro ao remover o usuario.'];
        }

        return response()->json($res, 201);
    }

}
