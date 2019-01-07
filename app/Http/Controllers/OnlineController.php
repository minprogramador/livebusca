<?php

namespace App\Http\Controllers;

use DB;

class OnlineController extends Controller
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

    public function list() {
        $res = DB::table('onlines')
            ->join('usuarios', 'onlines.id_usuario', '=', 'usuarios.id')
            ->select('onlines.*', 'usuarios.usuario as usuario')
            ->paginate(10);

        return response()->json($res, 201);
    }

    //
}
