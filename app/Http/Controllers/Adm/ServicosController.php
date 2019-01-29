<?php

namespace App\Http\Controllers\Adm;
use App\Modulos;
use Illuminate\Http\Request;
use App\Util;
use App\Servico;
use DB;
use App\Usuario;

class ServicosController extends Controller
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

    public function find($id) {
        $ver = DB::table('servicos')->find($id);
        return response()->json($ver, 201);
    }

    public function findUser($id, Request $request) {
        $id = Util::xss($id);
        $res = Servico::where('id_usuario', $id)
            ->get();

        return response()->json($res, 201);

    }

    public function alterar(Request $request) {

        $id  = Util::xss($request->get('id'));
        
        $tiposv = Util::xss($request->get('tipoLimite'));
        if($tiposv == 'M'){
            $User = Usuario::find($id);
            $User->tipo_limite = 1;
            $up = $User->update();
        }else{
            $User = Usuario::find($id);
            $User->tipo_limite = 2;
            $User->update();            
        }

        $res = Modulos::where('status', '1')->get();
        $res = json_decode($res, true);

        $dados = [];
        foreach($res as $re) {
            $servico = $re['nome'];
            $limite  = Util::xss($request->get('limite')[$servico]);
            $tipo    = Util::xss($request->get('tipoServ')[$servico]);
            $status  = Util::xss($request->get('status')[$servico]);
            
            if($tipo == 2){
                $valor  = $limite;
                $limite = 0;
                $usado  = 0;

            }else{
                $valor = '0.00';
                $usado   = Util::xss($request->get('usado')[$servico]);
            }

            $dados[] = ['servico'=> $servico, 'limite'=> $limite, 'usado'=>$usado];

            DB::table('servicos')
                ->where('id_usuario', $id)
                ->where('servico', $servico)
                ->update(['valor'=> $valor, 'limite' => $limite, 'usado'=> $usado, 'status'=> $status]);
        }

        $res = ['error'=> false,'msg' => 'Serviços alterados com sucesso!'];
        return response()->json($res, 201);
    }


}
