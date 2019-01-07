<?php

namespace App\Providers;

use App\User;
use App\Online;
use App\Util;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Carbon\Carbon;
class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->app['auth']->viaRequest('api', function ($request) {

            if ($request->bearerToken()) {
                $token = Util::xss($request->bearerToken());
                $result = Online::where('token', $token)->first();

                if($result == NULL) {
                    return false;
                }
                $error = false;
                $tokenExpiration = Util::xss($result->validade);
                $token           = Util::xss($result->token);
                $ipUser          = Util::xss($result->ip);
                $navegadorUser   = Util::xss($result->navegador);
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
                    return false;
                }


                return $result;
            } else {
                //echo json_encode(['error'=> 'Acesso invalido']);
                //die;
            }
        });
    }
}
