<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Log;
use App\Util;
use App\Usuario;
use App\LogModulos;
use DB;
use Carbon\Carbon;
class ConsumoController extends Controller
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

   public function find($id=null, Request $request) {

        $res = DB::table('log_modulos')
            ->join('modulos', 'log_modulos.modulo', '=', 'modulos.id')
            ->select('log_modulos.*', 'modulos.nome as nome')
            ->where('log_modulos.id_usuario', $id)
            ->paginate(10);

        return response()->json($res, 201);
        //code..
    }

    public function infoSaida() {
                // config sub total
        $ontem = Carbon::yesterday()->format('Y-m-d');
        $hoje =  Carbon::now()->format('Y-m-d');
        $dthjI = date('Y-m-d')  . '00:00:00';
        $dthjF = date('Y-m-d')  . '23:59:59';

        $dtOntemI = $ontem  . '00:00:00';
        $dtOntemF = $ontem  . '23:59:59';

        $dtmesi = date('Y-m')  . '01 00:00:00';
        $dtmesf = date('Y-m-') . '31 23:59:59';

        $dtmesPasi = new Carbon('last Month');
        $dtmesPasi = $dtmesPasi->format("Y-m") . '-01 00:00:00';

        $dtmesPasf = new Carbon('last Month');
        $dtmesPasf = $dtmesPasf->format("Y-m") . '-31 23:59:59';


        //Inicio UPBUSCA
        $dadoshjUpbusca = DB::table('log_modulos')->where('modulo', 1)->where('status', 1)->whereBetween('created_at', array($dthjI, $dthjF));
        $totalHjUpbusca = $dadoshjUpbusca->count();

        $dadosOntemUpbusca = DB::table('log_modulos')->where('modulo', 1)->where('status', 1)->whereBetween('created_at', array($dtOntemI, $dtOntemF));
        $totalOntemUpbusca = $dadosOntemUpbusca->count();

        $dadosMesUpbusca = DB::table('log_modulos')->where('modulo', 1)->where('status', 1)->whereBetween('created_at', array($dtmesi, $dtmesf));
        $totalMesUpbusca = $dadosMesUpbusca->count();

        $dadosMesPassUpbusca = DB::table('log_modulos')->where('modulo', 1)->where('status', 1)->whereBetween('created_at', array($dtmesPasi, $dtmesPasf));
        $totalMesPassUpbusca = $dadosMesPassUpbusca->count();

        $dadosTotalUpbusca  = DB::table('log_modulos')->where('modulo', 1)->where('status', 1);
        $totalTotalUpbusca  = $dadosTotalUpbusca->count();
        //Fim UPBUSCA

        //Inicio BuscaRg
        $idBuscaRg = 3;
        $dadoshjBuscaRg = DB::table('log_modulos')->where('modulo', $idBuscaRg)->where('status', 1)->whereBetween('created_at', array($dthjI, $dthjF));
        $totalHjBuscaRg = $dadoshjBuscaRg->count();

        $dadosOntemBuscaRg = DB::table('log_modulos')->where('modulo', $idBuscaRg)->where('status', 1)->whereBetween('created_at', array($dtOntemI, $dtOntemF));
        $totalOntemBuscaRg = $dadosOntemBuscaRg->count();

        $dadosMesBuscaRg = DB::table('log_modulos')->where('modulo', $idBuscaRg)->where('status', 1)->whereBetween('created_at', array($dtmesi, $dtmesf));
        $totalMesBuscaRg = $dadosMesBuscaRg->count();

        $dadosMesPassBuscaRg = DB::table('log_modulos')->where('modulo', $idBuscaRg)->where('status', 1)->whereBetween('created_at', array($dtmesPasi, $dtmesPasf));
        $totalMesPassBuscaRg = $dadosMesPassBuscaRg->count();

        $dadosTotalBuscaRg  = DB::table('log_modulos')->where('modulo', $idBuscaRg)->where('status', 1);
        $totalTotalBuscaRg  = $dadosTotalBuscaRg->count();
        //Fim BuscaRg

        //Inicio BuscaPai
        $idBuscaPai = 2;
        $dadoshjBuscaPai = DB::table('log_modulos')->where('modulo', $idBuscaPai)->where('status', 1)->whereBetween('created_at', array($dthjI, $dthjF));
        $totalHjBuscaPai = $dadoshjBuscaPai->count();

        $dadosOntemBuscaPai = DB::table('log_modulos')->where('modulo', $idBuscaPai)->where('status', 1)->whereBetween('created_at', array($dtOntemI, $dtOntemF));
        $totalOntemBuscaPai = $dadosOntemBuscaPai->count();

        $dadosMesBuscaPai = DB::table('log_modulos')->where('modulo', $idBuscaPai)->where('status', 1)->whereBetween('created_at', array($dtmesi, $dtmesf));
        $totalMesBuscaPai = $dadosMesBuscaPai->count();

        $dadosMesPassBuscaPai = DB::table('log_modulos')->where('modulo', $idBuscaPai)->where('status', 1)->whereBetween('created_at', array($dtmesPasi, $dtmesPasf));
        $totalMesPassBuscaPai = $dadosMesPassBuscaPai->count();

        $dadosTotalBuscaPai  = DB::table('log_modulos')->where('modulo', $idBuscaPai)->where('status', 1);
        $totalTotalBuscaPai  = $dadosTotalBuscaPai->count();
        //Fim BuscaPai

        //Inicio subTotal
        $dadoshjSubTotal = DB::table('log_modulos')->where('status', 1)->whereBetween('created_at', array($dthjI, $dthjF));
        $totalHjSubTotal = $dadoshjSubTotal->count();

        $dadosOntemSubTotal = DB::table('log_modulos')->where('status', 1)->whereBetween('created_at', array($dtOntemI, $dtOntemF));
        $totalOntemSubTotal = $dadosOntemSubTotal->count();

        $dadosMesSubTotal = DB::table('log_modulos')->where('status', 1)->whereBetween('created_at', array($dtmesi, $dtmesf));
        $totalMesSubTotal = $dadosMesSubTotal->count();

        $dadosMesPassSubTotal = DB::table('log_modulos')->where('status', 1)->whereBetween('created_at', array($dtmesPasi, $dtmesPasf));
        $totalMesPassSubTotal = $dadosMesPassSubTotal->count();

        $dadosTotalSubTotal  = DB::table('log_modulos')->where('status', 1);
        $totalTotalSubTotal  = $dadosTotalSubTotal->count();
        //Fim subTotal


        $res = [
            'Upbusca' => [
                'hoje'  => $totalTotalUpbusca,
                'ontem' => $totalOntemUpbusca,
                'mes'   => $totalMesUpbusca,
                'mesPassado' => $totalMesPassUpbusca,
                'total' => $totalTotalUpbusca
            ],
            'BuscaRg' => [
                'hoje'  => $totalTotalBuscaRg,
                'ontem' => $totalOntemBuscaRg,
                'mes'   => $totalMesBuscaRg,
                'mesPassado' => $totalMesPassBuscaRg,
                'total' => $totalTotalBuscaRg
            ],
            'BuscaPai' => [
                'hoje'  => $totalTotalBuscaPai,
                'ontem' => $totalOntemBuscaPai,
                'mes'   => $totalMesBuscaPai,
                'mesPassado' => $totalMesPassBuscaPai,
                'total' => $totalTotalBuscaPai
            ],
            'subTotal' => [
                'hoje'  => $totalTotalSubTotal,
                'ontem' => $totalOntemSubTotal,
                'mes'   => $totalMesSubTotal,
                'mesPassado' => $totalMesPassSubTotal,
                'total' => $totalTotalSubTotal
            ]                        

        ];
        return response()->json($res, 201);
    }
}
