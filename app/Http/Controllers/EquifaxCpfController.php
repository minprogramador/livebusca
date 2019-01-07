<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Modulos;
use App\Util;
class EquifaxCpfController extends Controller
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


    public function main(Request $request) {
        $nome = 'EquifaxCpf';
        $ver = Modulos::where('nome', $nome)->first();
//        $res = [
//            'nome'   => $ver['nome'],
//            'imagem' => $ver['imagem'],
//            'sobre'  => $ver['sobre'],
//            'tipo'   => $ver['tipo'],
//            'status' => $ver['status']
//        ];
        $payload = $ver['payload'];
        $payload = str_replace('&doc=', '', $payload);

        $url = $ver['url'] . $payload;
        echo $url;
//        $dados = Util::curl($url, null, null, null);
//        echo $dados;
        dd('');
        return response()->json($res, 201);
    }

    //
}
