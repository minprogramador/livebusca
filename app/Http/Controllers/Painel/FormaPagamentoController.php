<?php

namespace App\Http\Controllers\Painel;
use App\Http\Controllers\Controller;

use App\Usuario;
use Illuminate\Http\Request;
use App\Util;
use App\Fatura;
use App\FormaPagamento;
use App\ConfirmaPagamento;

class FormaPagamentoController extends Controller
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

    public function find($id, $idfat, Request $request) {
        $id       = Util::xss($id);
        $idfat    = Util::xss($idfat);
        $FormaPg  = new FormaPagamento();
        $frmPg    = $FormaPg->find($id);

        if($frmPg) {
            $fat = new Fatura();
            $fatura = $fat->find($idfat);
            if($fatura) {
                if($request->user()->id_usuario == $fatura->id_usuario) {
                    $valor             = 'R$: ' . $fatura->valor;
                    $validade          = $fatura->validade . ' Dias';
                    $dados             = str_replace('#valor#', $valor , $frmPg['dados']);
                    $dados             = str_replace('#validade#', $validade , $dados);
                    $dados             = str_replace('#ID#', $idfat , $dados);
                    $frmPg['dados']    = $dados;
                } else {
                    return response()->json(['error'=>true, 'msg'=>'Acesso invalido.'], 201);
                }
            }
        }

        return response()->json($frmPg, 201);
    }

   public function listar(Request $request) {
        $status   = 1;
        $FormaPg  = new FormaPagamento();
        $frmPg  = $FormaPg->where('status', $status)->get();

        $logs = [
            'dados' => $frmPg
        ];
        return response()->json($logs, 201);

        //code..
    }

    public function confirmar($id, Request $request) {

        $save = [
            'error'=>false,
            'msg' => 'Fatura ativada com sucesso!'
        ];

        return response()->json($save, 201);

    }

    public function informarPg(Request $request) {
        $check = [
            'banco'       => 'required|min:1|max:100',
            'fatura'      => 'required|min:1|max:11',
            'valor'       => 'required|min:3|max:255',
            'data'        => 'required|date|date_format:Y-m-d H:i:s',
            'comprovante' => 'required',
            'obs'         => ''
        ];

        $n_doc  = Util::xss($request->input('n_doc'));
        $n_cont = Util::xss($request->input('n_doc'));

        if(strlen($n_doc) > 0) {
            $check['n_doc'] = 'required|min:1|max:11';
        }

        if(strlen($n_cont) > 0) {
            $check['n_controle'] = 'required|min:1|max:11';
        }

        $comprovante = Util::xss($request->input('comprovante'));

        if(stristr($comprovante, '/jpeg;base64,')) {
            $tipo_comprovante = 'jpeg';
        }elseif(stristr($comprovante, '/png;base64,')) {
            $tipo_comprovante = 'png';
        } else {
            $tipo_comprovante = 'null';
        }

        $comprovantever = str_replace('data:image/jpeg;base64,', '', $comprovante);
        $comprovantever = str_replace('data:image/png;base64,', '', $comprovantever);

        if(Util::is_base64($comprovantever) != true) {
            $msg = [
                'error' => true,
                'msg' => 'imagem invalida!!!'
            ];
            return response()->json($msg, 201);
        }

        $this->validate($request, $check);
        $banco   = Util::xss($request->input('banco'));
        $fatura  = Util::xss($request->input('fatura'));
        $valor   = Util::xss($request->input('valor'));
        $data    = Util::xss($request->input('data'));
        $obs     = Util::xss($request->input('obs'));
        $usuario = Util::xss($request->user()->id_usuario);

        $confirmPg = new ConfirmaPagamento();
        $confirmPg->id_usuario  = $usuario;
        $confirmPg->id_banco    = $banco;
        $confirmPg->id_fat      = $fatura;
        $confirmPg->valor       = $valor;
        $confirmPg->n_doc       = $n_doc;
        $confirmPg->data_pg     = $data;
        $confirmPg->n_controle  = $n_cont;
        $confirmPg->obs         = $obs;
        $confirmPg->comprovante = $comprovante;
        $confirmPg->tipo_comprovante = $tipo_comprovante;
        $confirmPg->status      = 1;
        $save = $confirmPg->save();

        if($save) {

            $Fat = Fatura::find($fatura);
            if($Fat) {
                $Fat->status = 4;
                $Fat->update();
            }

            $save = [
                'error'=>false,
                'msg' => 'Comprovante enviado com sucesso!'
            ];
        }

        return response()->json($save, 201);

    }

}
