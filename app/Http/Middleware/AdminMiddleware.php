<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use App\Util;
use App\Online;
use App\Usuario;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        //Checka se o tipo do usuario é 8 = admin.
        if($request->user() == false) {
            return response()->json(['error'=> 'Acesso invalido'], 401);
        }

        $id  = Util::xss($request->user()->id_usuario);
        $res   = Usuario::find($id);

        $tipo  = Util::xss($res->tipo);
        $token = Util::xss($request->user()->token);

        if($tipo != 8) {
            $deletedRows = Online::where('token', $token)->delete();
            return response()->json(['error'=> 'Token expirado'], 401);
        }

        return $next($request);
    }
}
