<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Util;

class StaticController extends Controller
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

    public function main(){
        return view('main');
    }

    public function painel(){
        if(!isset($_COOKIE['token'])) {
            return redirect('/');
        } else {
            return view('painel');
        }
    }

    public function admin(){
        if(!isset($_COOKIE['token'])) {
            return redirect('/');
        } else {
            return view('admin');
        }
    }


    public function css(Request $request, $file) {
        $file = Util::xss($file);
        $ext  = substr($file, -3);
        if($ext == 'css') {
            $local = base_path(). '/public/tpl/css/' . $file;
            $local = str_replace('/routes/', '/', $local);

            if (file_exists($local)) {
                return response(file_get_contents($local))->header('Content-Type', 'text/css');
            } else {
                return response()->json(['error'=> 'Arquivo nao encontrado.'], 401);
            }
        }
        return response()->json(['error'=> 'Arquivo nao encontrado.'], 401);
    }

    public function js(Request $request, $file) {
        $file = Util::xss($file);
        $ext  = substr($file, -2);

        if($ext == 'js') {
            $local = base_path(). '/public/tpl/js/' . $file;
            $local = str_replace('/routes/', '/', $local);

            if (file_exists($local)) {
                return response(file_get_contents($local))->header('Content-Type', 'application/javascript');
            } else {
                return response()->json(['error'=> 'Arquivo nao encontrado.'], 401);
            }
        }
        return response()->json(['error'=> 'Arquivo nao encontrado.'], 401);
    }

    public function images(Request $request, $file) {
        $file = Util::xss($file);
        $ext  = substr($file, -3);

        if($ext == 'jpg') {
            $local = base_path(). '/public/tpl/images/' . $file;
            $local = str_replace('/routes/', '/', $local);

            if (file_exists($local)) {
                return response(file_get_contents($local))->header('Content-Type', 'image/jpeg');
            } else {
               return response()->json(['error'=> 'Imagem nao encontrada.'], 401);
            }
        }
        return response()->json(['error'=> 'Imagem nao encontrada.'], 401);
    }

    public function imagesServ(Request $request, $file) {
        $file = Util::xss($file);
        $ext  = substr($file, -3);
        if($ext == 'jpg') {
            $local = base_path(). '/public/tpl/images/servicos/' . $file;
            $local = str_replace('/routes/', '/', $local);

            if (file_exists($local)) {
                return response(file_get_contents($local))->header('Content-Type', 'image/jpeg');
            } else {
                return response()->json(['error'=> 'Imagem nao encontrada'], 401);
            }
        }
        return response()->json(['error'=> 'Imagem nao encontrada'], 401);
    }

}
