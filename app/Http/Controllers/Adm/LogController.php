<?php

namespace App\Http\Controllers\Adm;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Log;
use App\Util;
use App\Usuario;
use DB;

class LogController extends Controller
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

   public function findAcessos($id=null, Request $request) {
        if($id != null) {
            $id = $id;
        } else {
            $id = Util::xss($request->user()->id_usuario);
        }
        $logs = DB::table('logs')->where('id_usuario', $id)->limit(10)->orderBy('created_at', 'desc')->get();

        $user = Usuario::find($id);
        $usuario = $user->usuario;
        $email = $user->email;

        $logs = [
            'dados' => [
                'usuario' => $usuario,
                'email'   => $email
            ],
            'logs' => $logs
        ];
        return response()->json($logs, 201);

        //code..
    }

    public function find($id=null, Request $request) {
        if($id != null) {
            $id = $id;
        } else {
            $id = Util::xss($request->user()->id_usuario);
        }
        $Log   = new Log;
        $logs  = $Log->where('id_usuario', $id)->limit(10)->orderBy('created_at', 'desc')->get();

        $user = Usuario::find($id);
        $usuario = $user->usuario;
        $email = $user->email;

        $logs = [
            'dados' => [
                'usuario' => $usuario,
                'email'   => $email
            ],
            'logs' => $logs
        ];
        return response()->json($logs, 201);

    }

}
