<?php

namespace App\Http\Controllers;

use App\Contato;
use DB;
use App\Util;
class ContatoController extends Controller
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

    public  function list() {

        $res = DB::table('contatos')
            ->join('usuarios', 'contatos.id_usuario', '=', 'usuarios.id')
            ->select('contatos.*', 'usuarios.usuario as usuario')
            ->paginate(10);

        return response()->json($res, 201);

    }

    public function find($id) {
        $id = Util::xss($id);
        $ver = DB::table('contatos')->find($id);
        return response()->json($ver, 201);
    }

    //
}
