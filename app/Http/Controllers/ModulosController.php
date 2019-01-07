<?php

namespace App\Http\Controllers;
use App\Modulos;

class ModulosController extends Controller
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

    public  function listServicos() {
        $list = json_decode(Modulos::where('status', 1)->get(), true);
        $nlist = [];
        foreach($list as $l) {
            $nlist[] = [
                'servico' => $l['nome'],
                'limite'  => 0
            ];
        }
        return response()->json($nlist, 201);

    }

    //
}
