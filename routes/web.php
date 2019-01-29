<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
use Illuminate\Http\Request;
use App\Servico;

//area publica
$router->get('/',         'StaticController@main');
$router->get('Painel',    'StaticController@painel');
$router->post('auth',     'UsuarioController@login');

$router->get('auth', function(){
	return redirect('/');
});

$router->group(['namespace' => 'Painel'], function($group) use ($router){
	$router->get('Sair',      'PainelController@sair');
	$router->post('Contato',  'PainelController@contato');
	$router->post('recSenha', 'PainelController@recSenha');
});

//rotas arquivos estaticos.
$router->get('css/{file}', 'StaticController@css');
$router->get('js/{file}',  'StaticController@js');
$router->get('images/{file}', 'StaticController@images');
$router->get('images/servicos/{file}', 'StaticController@imagesServ');

//rotas painel do usuario
$router->group(['prefix'=>'Painel'], function($router) {

    $router->group(['middleware' => 'auth'], function () use ($router) {
        $router->group(['namespace' => 'Painel'], function($group) use ($router){

        //$router->get('test',          'PainelController@test');
        $router->get('Config',        'PainelController@config');
        $router->get('Consumo',       'PainelController@consumo');
        $router->get('Faturas/{id}',  'PainelController@findFatura');
        $router->get('Contato',       'PainelController@contato');
        $router->post('Cadastro',     'PainelController@editarCad');
        $router->post('Contato',      'PainelController@contato');

        $router->get('Logs',              'LogController@find');

        $router->post('InformarPagamento','FormaPagamentoController@informarPg');
        $router->get('FormaPagamento',    'FormaPagamentoController@listar');
        $router->get('Faturas',           'FaturaController@findUser');
        $router->get('FormaPagamento/{id}/{idfat}','FormaPagamentoController@find');

        //rotas dos servicos...
	});

    });

});

$router->group(['prefix'=>'Servico'], function($router) {


    $router->group(['middleware' => 'auth'], function () use ($router) {

        $router->group(['namespace' => 'Servicos'], function($group) use ($router){

            $router->get('Upbusca',       'UpbuscaController@main');
            $router->get('Upbusca/{doc}', 'UpbuscaController@open');
            $router->post('Upbusca',      'UpbuscaController@consultar');

            $router->get('BuscaPai',  'BuscaPaiController@main');
            $router->post('BuscaPai', 'BuscaPaiController@consultar');

            $router->get('BuscaRg',      'BuscaRgController@main');
            $router->get('BuscaRg/load', 'BuscaRgController@load');
            $router->post('BuscaRg',     'BuscaRgController@consoltar');

            $router->get('Original', 'OriginalController@main');
    

        //novos dia 05/11/2018 ~ 20:15
        //$router->get('Original', ['namespace' => 'Servicos'],'OriginalController@main');

        // $router->get('ZipOn', 'ZipOnController@main');

        // $router->get('BuscaGold', 'BuscaGoldController@main');

        // $router->get('CredScoreCpf', 'CredScoreCpfController@main');

        // $router->get('CredScoreCnpj', 'CredScoreCnpjController@main');

        // $router->get('BuscaCar', 'BuscaCarController@main');

        // $router->get('BuscaCnh', 'BuscaCnhController@main');




        });        

        //rotas dos servicos...
    });


});

//rotas admin
$router->group(['prefix'=>'Admin'], function($router) {
    $router->get('/', 'StaticController@admin');

    $router->group(['namespace' => 'Adm', 'middleware' => ['auth', 'admin']], function () use ($router) {

        $router->get('inicial',                 'AdminController@inicial');

        $router->get('usuarios',                'UsuarioController@listar');
        $router->get('usuarios/All',            'UsuarioController@listarAll');
        $router->get('usuarios/{id}',           'UsuarioController@find');
        $router->get('usuarios/{id}/servicos',  'ServicosController@findUser');
        $router->get('usuarios/{id}/faturas',   'FaturaController@findUser');
        $router->get('usuarios/{id}/acessos',   'LogController@findAcessos');
        $router->get('usuarios/{id}/consumo',   'ConsumoController@find');
        $router->get('usuarios/{id}/delete',    'UsuarioController@delete');
        $router->get('usuarios/{id}/deslogar',  'AdminController@deslogar');
        $router->put('usuarios/{id}/servicos',  'ServicosController@alterar');
        $router->put('usuarios/{id}',           'UsuarioController@alterar');
        $router->post('usuarios',               'UsuarioController@salvar');
        $router->post('usuarios/pesquisa',      'UsuarioController@pesquisa');
        $router->delete('usuarios/{id}',        'UsuarioController@delete');

        $router->put('faturas/{id}',     'FaturaController@alterar');
        $router->get('faturas',          'FaturaController@listar');
        $router->get('faturas/{id}',     'FaturaController@find');
        $router->post('faturas',         'FaturaController@salvar');
        $router->get('faturas/{id}/comprovante', 'FaturaController@findComprovante');
        $router->get('faturas/{id}/confirmar',   'FaturaController@confirmar');
        $router->delete('faturas/{id}',          'FaturaController@delete');

        $router->get('modulos/layout', 'ModulosController@listServicos');
        $router->get('mensagens',      'ContatoController@list');
        $router->get('mensagens/{id}', 'ContatoController@find');
        $router->get('online',      'OnlineController@list');

        $router->get('info/entrada', 'FaturaController@infoEntrada');
        $router->get('info/saida',   'ConsumoController@infoSaida');

        
        //
//        $router->post('/servicos', function (Request $request) {
//
//            $this->validate($request, [
//                'usuario' => 'required|min:1|max:11',
//                'servico' => 'required|min:2|max:100',
//                'tipo' =>    'required|min:1|max:2',
//                'limite' =>  'required|min:1|max:6',
//                'usado' =>   'required|min:1|max:6',
//                'status' =>  'required|max:1'
//            ]);
//
//            $data = $request->all();
//            $data['id_usuario'] = $data['usuario'];
//            unset($data['usuario']);
//
//            $model = Servico::create($data);
//
//            return response()->json($model, 201);
//        });

    });

});



