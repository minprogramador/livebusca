<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use App\Util;
use App\Online;

class TokenExpirationMiddleware
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
        //checagem de seguranca...
        $error = false;
        $tokenExpiration = Util::xss($request->user()->validade);
        $token           = Util::xss($request->user()->token());
        $ipUser          = Util::xss($request->user()->ip);
        $navegadorUser   = Util::xss($request->user()->navegador);
        $ip              = Util::xss($request->getClientIp());
        $navegador       = Util::xss($request->header('User-Agent'));

        if($ip != $ipUser) {
            $error = true;
        }

        if($navegador != $navegadorUser) {
            $error = true;
        }

        if(( new Carbon($tokenExpiration))->lessThan(new Carbon())) {
            $error = true;
        }

        if($error) {
            $deletedRows = Online::where('token', $token)->delete();
            return response()->json(['error'=> 'Token expirado'], 401);
        }

        return $next($request);
    }
}
