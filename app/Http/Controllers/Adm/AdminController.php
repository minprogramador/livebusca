<?php

namespace App\Http\Controllers\Adm;

use App\Contato;
use App\Fatura;
use App\Online;
use App\Usuario;
use App\Util;
use Carbon\Carbon;
use DB;

class AdminController extends Controller
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

    public function getOnlines() {

        $date = date("Y-m-d H:i:s");
        $carbon_date = Carbon::parse($date);
        $carbon_date->addHours(1);

        $query = DB::table('onlines')
            ->join('usuarios', 'onlines.id_usuario', '=', 'usuarios.id')
            ->select('onlines.*', 'usuarios.usuario as usuario')
            ->get();


        return $query;
    }

    public function getFatPendente() {

        $query = DB::table('faturas')
            ->join('usuarios', 'faturas.id_usuario', '=', 'usuarios.id')
            ->select('faturas.*', 'usuarios.usuario as usuario')
            ->where('faturas.status', '4')
            ->orWhere('faturas.status', 5)
            ->get();


        return $query;
    }

    public function deslogar($id) {
        $id = Util::xss($id);

        $Ons = json_decode(Online::where('id_usuario', $id)->get(), true);
        foreach($Ons as $On) {
            $id = $On['id'];
            Online::destroy($id);
        }
        $res = ['error'=>false, 'msg'=> 'Usuario deslogado com sucesso!'];
        return response()->json($res, 201);

    }

    public function inicial() {
        $usuarios    = Usuario::count();
        $faturas     = Fatura::count();
        $fatPendente = $this->getFatPendente();
        $mensagens   = Contato::where('status', 1)->count();
        $online      = $this->getOnlines();

        $result = [
            'count' => [
                    'usuarios' => $usuarios,
                    'faturas'  => $faturas,
                    'mensagens' => $mensagens,
                    'online'    => count($online)
            ],
            'online' => $online,
            'faturas' => $fatPendente
        ];
        return response()->json($result, 201);

    }

    //
}
