

function getCookie(i){
    var n = i + "=";
    var k = document.cookie.split(';');
    for(var i=0; i<k.length; i++){
        var c = k[i];
        while(c.charAt(0) == " "){ c = c.substr(1); }
        if(c.indexOf(n) == 0){ return c.substr(n.length, c.length); }
    }
    return "";
}


function dateToBR(date) {
    if(date.indexOf(":") != -1) {
        dateok = date.split(' ');
        var data = dateok[0];
        var hora = dateok[1];
        data = data.split('-').reverse().join('/') + ' ' + hora;
        return data;
    }

    return date.split('-').reverse().join('/');
}

function dateToEN(date) {
    if(date.indexOf(":") != -1) {
        dateok = date.split(' ');
        var data = dateok[0];
        var hora = dateok[1];
        data = data.split('/').reverse().join('-') + ' ' + hora;
        return data;
    }
    return date.split('/').reverse().join('-');
}

function openMain() {

    var box = $("#content");
    //box.css('opacity', '0.0');

    box.animate({opacity: 0}, 200);

    getSystem();
    return false;
}
function addFatura() {

    var usuario  = $("#frmCriarFat #userAll option:selected").val();
    var valor    = $("#frmCriarFat #valor").val();
    var validade = $("#frmCriarFat #validade").val();
    var data_pg  = dateToEN($("#frmCriarFat #data_pg").val());
    var forma_pg = $("#frmCriarFat #forma_pg option:selected").val();
    var tipo     = $("#frmCriarFat #tipo option:selected").val();
    var status   = $("#frmCriarFat #status option:selected").val();
    var obs      = $("#frmCriarFat #obs").val();

    var data = {
        "usuario": usuario,
        "valor": valor,
        "validade": validade,
        "data_pg": data_pg,
        "forma_pg": forma_pg,
        "tipo": tipo,
        "status": status,
        "obs": obs
    };

    getDadosPost('Admin/faturas', data, function(res) {
        alert('Fatura criada com sucesso!');
        console.log(res);
    });

}
function criarFatura(id) {

    var url = `Admin/usuarios/All`;
    getDadosGet(url, function(res) {

        if (res) {
            $('#userAll').html("");

            $.each(res , function(index, val) {
                var row = `
                    <option value="${val['id']}" selected="selected">${val['usuario']}</option>
                `;
                $('#userAll').append($(row));
            });

            if(id > 0) {
                $('#userAll').val(id).change();
            } else {
                $('#userAll').append('<option value="" selected="selected">Escolha uma opcao</option>');
            }

            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);

        } else {
            // document.location = './Sair';
        }


    });

    box = $("#content");
    box.html("");
    box.css('right', '-100%');
    box.css('margin-left', '24%');
    box.css('visibility', 'visible')
        .animate({opacity: 1.0, left: '0'}, 500);

        var pgCadFat = `
			    <div id="content-fluid">
				    <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4>Criar Fatura</h4>
                                </div>
                                <div class="table-responsive">
                                     <div class="panel-body"> 
                                        <div class="col-md-10">                         
                                            <form action="javascript::void(0)" method="POST" id="frmCriarFat">
                                            <input type="hidden" name="usuario" id="usuario" value="">
                                             <div class="form-group">
                                                  <label>Usuario:</label>
                                                  <select class="form-control" id="userAll" name="userAll">
                                                  </select>
                                              </div>
                                              
                                              <div class="form-group">   
                                                                                             
                                                  <div class="col-xs-12" style="margin-top: 1%; margin-left: -1%;">                                                                                                
                                                      <div class="form-group">
                                                          <div class="col-md-4">
                                                              <label>Valor:</label>                                                    
                                                              <div class="form-group">                                                                                                           
                                                                  <div class="input-group">
                                                                      <span class="input-group-addon">R$:</span>
                                                                      <input id="valor" name="valor" class="form-control" value="0.00" style=" text-align: center" type="text">
                                                                  </div>                                                  
                                                              </div>
                                                          </div>
                                                          <div class="col-md-4">                                                                                                       
                                                              <div class="form-group">
                                                                  <label>Validade:</label>                                                    
                                                                  <div class="form-group">                                                                                                          
                                                                      <div class="input-group">

                                                                          <input id="validade" name="validade" class="form-control" value="0" style=" text-align: center" type="text">
                                                                          <span class="input-group-addon"> Dias</span>

                                                                      </div>                                                  
                                                                  </div>
                                                              </div>                                                       
                                                          </div>                                                  
                                                          <div class="col-md-4">                                                                                                       
                                                              <div class="form-group">
                                                                  <label>Data Pagamento:</label>                                                    
                                                                  <div class="form-group">                                                                                                          
                                                                      <div class="input-group">
                                                                          <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>

                                                                          <input id="data_pg" name="data_pg" class="form-control" value="" style=" text-align: center" type="text">
                                                                      </div>                                                  
                                                                  </div>
                                                              </div>                                                       
                                                          </div>                                                  
                                                      </div>
                                                  </div>
                                              </div>

                                              <div class="form-group">   
                                                                                             
                                                  <div class="col-xs-12" style="margin-top: 1%; margin-left: -1%;">                                                                                                
                                                      <div class="form-group">
                                                          <div class="col-md-4">
                                                              <label>Forma Pg:</label>
                                                              <select class="form-control" id="forma_pg" name="forma_pg">
                                                                  <option value="1">Deposito bancario</option>
                                                                  <option value="2">Transferencia</option>
                                                                  <option value="3">Boleto Bancrio</option>
                                                                  <option value="4">Bitcoin</option>
                                                                  <option value="" selected="selected">Escolha uma opcao</option>
                                                              </select>
                                                          </div>
                                                          <div class="col-md-4">                                                                                                       
                                                              <div class="form-group">
                                                                  <label>Tipo:</label>
                                                                  <select class="form-control" id="tipo" name="tipo">
                                                                      <option value="1">Contratacao</option>
                                                                      <option value="2">Renovacao</option>
                                                                      <option value="3">Extra adicional</option>
                                                                      <option value="4">Outros</option>
                                                                      <option value="5">Pre-Pago</option>
                                                                      <option value="6">Recarga Pre-Pago</option>                                                                      
                                                                  </select>
                                                             </div>                                                       
                                                          </div>                                                  
                                                          <div class="col-md-4">                                                                                                       
                                                              <div class="form-group">
                                                                  <label>Status:</label>
                                                                  <select class="form-control" id="status" name="status">
                                                                      <option value="1">Pago</option>
                                                                      <option value="2">Aguardando Pg</option>
                                                                      <option value="3">Cencelada</option>
                                                                      <option value="4">Comprovante enviado</option>
                                                                      <option value="5">Em analise</option>
                                                                  </select>
                                                              </div>                                                       
                                                          </div>                                                  
                                                      </div>
                                                  </div>
                                              </div>


                                              
                                              <div class="form-group">
                                                <label>Obs</label>
                                                <textarea class="form-control" name="obs" id="obs"></textarea>
                                              </div>

                                              <div class="form-group">
                                              
                                              <button type="button" id="editarFatura" onclick="addFatura();" class="btn btn-success">Criar Fatura</button>
                                              </div>
                                            </form>
                                        </div>
                                    </div>                                
                                </div>
                            </div>
                        </div>
			        </div>
                </div>`;

        box.css('visibility', 'visible')
            .animate({opacity: 1.0, left: '0'}, 200);
        box.html(pgCadFat);
    $("#data_pg").val(getNow());


}

function getNow() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10) { dd='0'+dd; }
    if(mm<10) { mm='0'+mm; }

    today = dd+'/'+mm+'/'+yyyy;
    return today;
}

function pesquisarUsuario() {
    var usuario    = $("#frmPesquisaUsuario #usuario").val();
    var revendedor = $("#frmPesquisaUsuario #revendedor").val();
    var email      = $("#frmPesquisaUsuario #email").val();
    var tipo       = $("#frmPesquisaUsuario #tipo").val();
    var status     = $("#frmPesquisaUsuario #status").val();

    var data = {
      "usuario": usuario,
      "revendedor": revendedor,
      "email": email,
      "tipo": tipo,
      "status": status
    };

    getDadosPost('Admin/usuarios/pesquisa', data, function(res) {

        if (res.data) {
            var usuarios = res.data;
            $('table#listUsuarios tbody').html("");

            $.each(usuarios , function(index, val) {
                var row = `<tr>
                	<td scope="row">${val['id']}</td>
                	<td>${val['usuario']}</td>
                	<td>${val['revendedor']}</td>
                	<td>${val['email']}</td>
                	<td>${dateToBR(val['inicio'])}</td>
                	<td>${dateToBR(val['fim'])}</td>
               	 	<td>R$ ${val['valor']}</td>
               	 	<td>${getTipoUser(val['tipo'])}</td>
                	<td>${getStatusUser(val['status'])}</td>
                	<td>
                	    <div class="btn-group" id="bntFathover">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" onclick="">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" style="left: -150px;" onclick="">
                                <li>
                                    <a href="#EditarUsurio" onclick="editarUsuario(${val['id_usuario']});">Perfil Usuario</a>
                                </li>
                                <li>
                                    <a href="#EditarUsurio" onclick="criarFatura(${val['id_usuario']});">Criar Fatura</a>
                                </li>
                                <li>
                                    <a href="#Deslogar" onclick="Deslogar(${val['id']});">Deslogar</a>
                                </li>
                                <!--<li>-->
                                    <!--<a href="#Bloquear" onclick="">Bloquear</a>-->
                                <!--</li>-->
                            </ul>
                	    </div>
                    </td>
                	</tr>`;
                $('table#listUsuarios').append($(row));
            });

            var paginacao = '';
            var i;

            paginacao += `
                <ul class="pagination" role="navigation">
                      <li class="page-item disabled" aria-disabled="true" aria-label="pagination.previous">
                          <span class="page-link" aria-hidden="true">&lsaquo;</span>
                        </li>`;

            for (i = 1; i < res.last_page + 1; i++) {
              //paginacao += `<li class="page-item active" aria-current="page">
                paginacao += `
                    <li class="page-item" id="liPgFat_${i}">
                      <span class="page-link">
                              <a class="page-link" href="javascript:void(0)" onclick="listarUserCadPaginac(${i});">
                                  ${i}
                                </a>
                            </span>
                        </li>`;              
            } 
            //paginacaoFatCad
            paginacao += `
                  <li class="page-item">
                          <a class="page-link" href="javascript:void(0)" onclick="listarUserCadPaginac(${res.last_page});">&rsaquo;</a>
                        </li>
                    </ul>`;

            $('#paginacaoPesUser').html(paginacao);
            $('#liPgFat_1').addClass('active');
            $('#liPgFat_1').addClass('disabled');
            $('#liPgFat_1 a').removeAttr("href");



            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);

        } else {
            // document.location = './Sair';
        }


        //console.log(res);
    });

    //alert('pesquisar usuario');
}


function listarPesUserPaginac(pg){
    var usuario    = $("#frmPesquisaUsuario #usuario").val();
    var revendedor = $("#frmPesquisaUsuario #revendedor").val();
    var email      = $("#frmPesquisaUsuario #email").val();
    var tipo       = $("#frmPesquisaUsuario #tipo").val();
    var status     = $("#frmPesquisaUsuario #status").val();

    var data = {
      "usuario": usuario,
      "revendedor": revendedor,
      "email": email,
      "tipo": tipo,
      "status": status
    };

    getDadosPost('Admin/usuarios/pesquisa?page='+pg, data, function(res) {
        console.log(res);
        $('#listUsuarios tbody').html("");
        if (res.data) {
            $("#totalFatCad").html(res.total);
            var usuarios = res.data;
            $.each(usuarios , function(index, val) {
                var row = `<tr>
                  <td scope="row">${val['id']}</td>
                  <td>${val['usuario']}</td>
                  <td>${val['revendedor']}</td>
                  <td>${val['email']}</td>
                  <td>${dateToBR(val['inicio'])}</td>
                  <td>${dateToBR(val['fim'])}</td>
                  <td>R$ ${val['valor']}</td>
                  <td>${getTipoUser(val['tipo'])}</td>
                  <td>${getStatusUser(val['status'])}</td>
                  <td>
                      <div class="btn-group" id="bntFathover">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" onclick="">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" style="left: -150px;" onclick="">
                                <li>
                                    <a href="#EditarUsurio" onclick="editarUsuario(${val['id']});">Perfil Usuario</a>
                                </li>
                                <li>
                                    <a href="#EditarUsurio" onclick="criarFatura(${val['id']});">Criar Fatura</a>
                                </li>
                                <li>
                                    <a href="#Deslogar" onclick="Deslogar(${val['id']});">Deslogar</a>
                                </li>
                                <!--<li>-->
                                    <!--<a href="#Bloquear" onclick="">Bloquear</a>-->
                                <!--</li>-->
                                <li>
                                    <a href="#Bloquear" onclick="deletarUsuario(${val['id']});">Deletar</a>
                                </li>
                            </ul>
                      </div>
                    </td>
                  </tr>`;
                $('table#listUsuarios').append($(row));
            });
            var paginacao = '';
            var i;

            paginacao += `
                  <ul class="pagination" role="navigation">
                    <li class="page-item" onclick="listarFaturas(1);">
                      <span class="page-link" aria-hidden="true">&lsaquo;</span>
                    </li>`;

            for (i = 1; i < res.last_page + 1; i++) {
                //paginacao += `<li class="page-item active" aria-current="page">
                paginacao += `<li class="page-item" id="liPgFat_${i}">
                                <span class="page-link">
                                    <a class="page-link" href="javascript:void(0)" onclick="listarPesUserPaginac(${i});">
                                      ${i}
                                    </a>
                                </span>
                              </li>`;              
            } 
            //paginacaoFatCad
           paginacao += `
                    <li class="page-item">
                    <a class="page-link" href="javascript:void(0)" onclick="listarPesUserPaginac(${res.last_page});">&rsaquo;</a>
                    </li>
                  </ul>`;

            $('#paginacaoPesUser').html(paginacao);
            $('#liPgFat_'+pg).addClass('active');
            $('#liPgFat_'+pg).addClass('disabled');
            $('#liPgFat_'+pg+' a').removeAttr("href");
            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);

        } else {
            // document.location = './Sair';
        }


        console.log(res);
    });
}


function editarFat(id) {

    box = $("#content");
    box.css('right', '-100%');
    box.css('margin-left', '24%');
    box.css('visibility', 'visible')
        .animate({opacity: 1.0, left: '0'}, 500);

    getDadosGet('Admin/faturas/' + id, function(res) {

        var pgCadUsuario = `
			    <div id="content-fluid">
				    <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4>Fatura #${id}</h4>
                                </div>
                                <div class="table-responsive">
                                     <div class="panel-body"> 
                                        <div class="col-md-10">                         
                                            <form action="javascript::void(0)" method="POST" id="frmEditFat">

                                              
                                              <div class="form-group">   
                                                                                             
                                                  <div class="col-xs-12" style="margin-top: 1%; margin-left: -1%;">                                                                                                
                                                      <div class="form-group">
                                                          <div class="col-md-4">
                                                              <label>Valor:</label>                                                    
                                                              <div class="form-group">                                                                                                           
                                                                  <div class="input-group">
                                                                      <span class="input-group-addon">R$:</span>
                                                                      <input id="valor" name="valor" class="form-control" value="0.00" style=" text-align: center" type="text">
                                                                  </div>                                                  
                                                              </div>
                                                          </div>
                                                          <div class="col-md-4">                                                                                                       
                                                              <div class="form-group">
                                                                  <label>Validade:</label>                                                    
                                                                  <div class="form-group">                                                                                                          
                                                                      <div class="input-group">

                                                                          <input id="validade" name="validade" class="form-control" value="0" style=" text-align: center" type="text">
                                                                          <span class="input-group-addon"> Dias</span>

                                                                      </div>                                                  
                                                                  </div>
                                                              </div>                                                       
                                                          </div>                                                  
                                                          <div class="col-md-4">                                                                                                       
                                                              <div class="form-group">
                                                                  <label>Data Pagamento:</label>                                                    
                                                                  <div class="form-group">                                                                                                          
                                                                      <div class="input-group">
                                                                          <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>

                                                                          <input id="data_pg" name="data_pg" class="form-control" value="" style=" text-align: center" type="text">
                                                                      </div>                                                  
                                                                  </div>
                                                              </div>                                                       
                                                          </div>                                                  
                                                      </div>
                                                  </div>
                                              </div>

                                              <div class="form-group">   
                                                                                             
                                                  <div class="col-xs-12" style="margin-top: 1%; margin-left: -1%;">                                                                                                
                                                      <div class="form-group">
                                                          <div class="col-md-4">
                                                              <label>Forma Pg:</label>
                                                              <select class="form-control" id="forma_pg" name="forma_pg">
                                                                  <option value="1">Deposito bancario</option>
                                                                  <option value="2">Transferencia</option>
                                                                  <option value="3">Boleto Bancrio</option>
                                                                  <option value="4">Bitcoin</option>
                                                                  <option value="" selected="selected">Escolha uma opcao</option>
                                                              </select>
                                                          </div>
                                                          <div class="col-md-4">                                                                                                       
                                                              <div class="form-group">
                                                                  <label>Tipo:</label>
                                                                  <select class="form-control" id="tipo" name="tipo">
                                                                      <option value="1">Contratacao</option>
                                                                      <option value="2">Renovacao</option>
                                                                      <option value="3">Extra adicional</option>
                                                                      <option value="4">Outros</option>
                                                                      <option value="5">Pre-Pago</option>
                                                                      <option value="6">Recarga Pre-Pago</option>
                                                                  </select>
                                                             </div>                                                       
                                                          </div>                                                  
                                                          <div class="col-md-4">                                                                                                       
                                                              <div class="form-group">
                                                                  <label>Status:</label>
                                                                  <select class="form-control" id="status" name="status">
                                                                      <option value="1">Pago</option>
                                                                      <option value="2">Aguardando Pg</option>
                                                                      <option value="3">Cencelada</option>
                                                                      <option value="4">Comprovante enviado</option>
                                                                      <option value="5">Em analise</option>
                                                                  </select>
                                                              </div>                                                       
                                                          </div>                                                  
                                                      </div>
                                                  </div>
                                              </div>


                                              
                                              <div class="form-group">
                                                <label>Obs</label>
                                                <textarea class="form-control" name="obs" id="obs"></textarea>
                                              </div>

                                              <div class="form-group">
                                              
                                              <button type="button" id="editarFatura" onclick="editFat(${id});" class="btn btn-success">Editar Fatura</button>
                                              <button type="button" id="verCompFat" onclick="verComprovante(${id});" class="btn btn-success">Ver comprovante</button>
                                              </div>
                                            </form>
                                        </div>
                                    </div>                                
                                </div>
                            </div>
                        </div>
			        </div>
                </div>`;

        box.css('visibility', 'visible')
            .animate({opacity: 1.0, left: '0'}, 200);
        box.html(pgCadUsuario + layComprovante());
        $("#frmEditFat #valor").val(res.valor);
        $("#frmEditFat #validade").val(res.validade);
        $("#frmEditFat #data_pg").val(dateToBR(res.data_pagamento));
        $("#frmEditFat #forma_pg").val(res.forma_pg).change();
        $("#frmEditFat #tipo").val(res.tipo).change();
        $("#frmEditFat #status").val(res.status).change();
        $("#frmEditFat #obs").val(res.obs);

    });

}


function cadastrarUsuario() {
    box = $("#content");
    box.css('right', '-100%');
    box.css('margin-left', '24%');
    box.css('visibility', 'visible')
        .animate({opacity: 1.0, left: '0'}, 500);

    var pgCadUsuario = `
			    <div id="content-fluid">
				    <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4>Cadastrar usuario</h4>
                                </div>
                                <div class="table-responsive">
                                     <div class="panel-body"> 
                                        <div class="col-md-12">                         
                                            <form action="javascript::void(0)" method="POST" id="frmCadUsuario">

                                              <div class="form-group" style="overflow:hidden; margin-botton:10px;">   
                                                <div class="col-md-6">  
                                                  <label>Usuario</label>
                                                  <input type="text" class="form-control input-sm" id="usuario" name="usuario" value="">
                                                </div>
                                                 <div class="col-md-6">  
                                                  <label>Revendedor</label>
                                                  <input type="text" class="form-control input-sm" id="revendedor" name="revendedor" value="">
                                                </div>
                                              </div>

                                              <div class="form-group" style="overflow:hidden; margin-botton:10px;">   
                                                  <div class="col-md-6">
                                                    <label>E-mail</label>
                                                    <input type="text" class="form-control input-sm" id="email" name="email" value="">
                                                  </div>
                                                  <div class="col-md-6">  
                                                    <label>Senha</label>
                                                    <input type="text" class="form-control input-sm" id="senha" name="senha" value="">
                                                  </div>

                                              </div>


                                              <div class="form-group">
                                                <div class="col-xs-12" style="margin-top: 1%; margin-left: -1%;">     
                                                 <div class="col-md-4">  
                                                    <label>Tipo:</label>
                                                    <select class="form-control input-sm" id="tipo" name="tipo">
                                                        <option value="1">Usuario</option>
                                                        <option value="2">Usuario Pre-Pago</option>
                                                        <option value="3">Revendedor</option>
                                                        <option value="8">Admin</option>
                                                        <option value="" selected="selected">Escolha uma opcao</option>
                                                    </select>
                                                  </div>

                                                  <div class="col-md-4">  
                                                    <label>Status:</label>
                                                    <select class="form-control input-sm" id="status" name="status">
                                                        <option value="1">Ativo</option>
                                                        <option value="4">Aguardando pagamento</option>
                                                        <option value="2">Desativado</option>
                                                        <option value="3">Bloqueado</option>
                                                        <option value="5">Vencido</option>
                                                        <option value="" selected="selected">Escolha uma opcao</option>
                                                    </select>
                                                 </div>

                                                 <div class="col-md-4" style="margin-top:25px;">  
                                                   <span class="input-group-addon input-sm">
                                                      <input type="radio" aria-label="xx" value="M" name="tipoLimite" id="tipoLimite"  checked="">
                                                      Limite Mensal
                                                   </span>  
                                                   <span class="input-group-addon input-sm">
                                                      <input type="radio" aria-label="xx" value="D" name="tipoLimite" id="tipoLimite">
                                                      Limite Diario
                                                   </span>  

                                              </div>
                                              </div>
                                              


                                              </div>

                                              <div class="form-group">   
                                                                                             
                                                  <div class="col-xs-12" style="margin-top: 1%; margin-left: -1%;">                                                                                                
                                                      <div class="form-group">
                                                          <div class="col-md-4">
                                                              <label>Valor:</label>                                                    
                                                              <div class="form-group">                                                                                                           
                                                                  <div class="input-group input-sm">
                                                                      <span class="input-group-addon">R$:</span>
                                                                      <input id="valor" name="valor" class="form-control" value="0.00" style=" text-align: center" type="text">
                                                                  </div>                                                  
                                                              </div>
                                                          </div>
                                                          <div class="col-md-4">                                                                                                       
                                                              <div class="form-group">
                                                                  <label>Data inicio:</label>                                                    
                                                                  <div class="form-group">                                                                                                          
                                                                      <div class="input-group input-sm">
                                                                          <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>

                                                                          <input id="inicio" name="inicio" class="form-control" value="00/00/2018" style=" text-align: center" type="text">
                                                                      </div>                                                  
                                                                  </div>
                                                              </div>                                                       
                                                          </div>                                                  
                                                          <div class="col-md-4">                                                                                                       
                                                              <div class="form-group">
                                                                  <label>Data fim:</label>                                                    
                                                                  <div class="form-group">                                                                                                          
                                                                      <div class="input-group input-sm">
                                                                          <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>

                                                                          <input id="fim" name="fim" class="form-control" value="00/00/2018" style=" text-align: center" type="text">
                                                                      </div>                                                  
                                                                  </div>
                                                              </div>                                                       
                                                          </div>                                                  
                                                      </div>
                                                  </div>
                                              </div>

                                              <div class="form-group" id="layServicos">
                                                    
                                               
                                              </div>
    
                                              <div class="form-group">
                                              <button type="button" id="cadUsuario" onclick="cadastraUsuario();" class="btn btn-success">Cadastrar</button>
                                              </div>
                                            </form>
                                        </div>
                                    </div>                                
                                </div>
                            </div>
                        </div>
			        </div>
                </div>`;

    var url = `Admin/modulos/layout`;

    getDadosGet(url, function(res) {

        if (res) {
            $('#layServicos').html("<label>Servicos:</label>");
            var servicos = res;

            $.each(servicos , function(index, val) {
                var row = `                
                        <div class="row" style="margin-top:1%;" id="sv_cad_user_${val['servico']}">

<div class="col-md-6" style="margin:0.5%">
                      
                      <div class="input-group">
                        <span class="input-group-addon" style="font-size:12px;"><strong>${val['servico']}:</strong></span>
                        <span class="input-group-addon" style="width:20%" id="boxLimitServ_${val['servico']}">
                          <input id="limite[${val['servico']}]" name="limite[${val['servico']}]" class="form-control input-sm" value="10" style=" text-align: center; float:left; width:50%" type="text">
                        
                          <input id="usado[${val['servico']}]" name="usado[${val['servico']}]" class="form-control input-sm" value="0" style=" text-align: center; width:50%" type="text">
                
                        </span>

                        <span class="input-group-addon" style="font-size:11px">
                          <input name="tipoServ[${val['servico']}]" value="1" id="tipoServ[${val['servico']}]" checked="" onclick="alteraTipoSv('${val['servico']}', false)" type="radio">
                          Pontos - 
                          <input name="tipoServ[${val['servico']}]" value="2" id="tipoServ[${val['servico']}]" onclick="alteraTipoSv('${val['servico']}', true)" type="radio">
                          Valor
                        </span>
                        <span class="input-group-addon" style="width:20%">
                                                  <select class="form-control input-sm" id="statusServ[${val['servico']}]" name="statusServ[${val['servico']}]">
                                                      <option value="1" selected="">On</option>
                                                      <option value="2">Off</option>
                                                  </select>
                        </span>
                      </div>
                    </div>
                            
                        </div>
                `;

                $('#layServicos').append($(row));
            });

            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);

        } else {

            // document.location = './Sair';
        }


    });

    box.html(pgCadUsuario);

}

function removSvCad(sv) {
  $("#statusServ"+sv).val('2');
  sv = '#sv_cad_user_'+sv;
  $(sv).hide();
}

function cadastraUsuario() {
    $("#frmCadUsuario #inicio").val(dateToEN($("#frmCadUsuario #inicio").val()));
    $("#frmCadUsuario #fim").val(dateToEN($("#frmCadUsuario #fim").val()));
    var data = $("#frmCadUsuario").serialize();

    getDadosPost('Admin/usuarios', data, function(res) {
        if(res === 'error') {
            alert('Preencha todos os campos');
        } else {
            alert('Cadastro realizado com sucesso!');
        }

        console.log(res);

    });

}

function Deslogar(id) {
    var url = `Admin/usuarios/${id}/deslogar`;

    getDadosGet(url, function(res) {

        alert('Usuario deslogado com sucesso!');
        console.log(res);

    });
}


function openUserAcessos(id) {
    var url = `Admin/usuarios/${id}/acessos`;

    getDadosGet(url, function(res) {

        if (res) {
            $('#editUsuarioAcessos tbody').html("");
            var faturas = res.logs;
            $.each(faturas , function(index, val) {
                var row = `
                <tr>
                	<td scope="row">${val['ip']}</td>
                	<td scope="row">${val['referer']}</td>
                	<td scope="row">${val['navegador']}</td>
                	<td scope="row">${dateToBR(val['created_at'])}</td>
                </tr>
                `;
                $('#editUsuarioAcessos tbody').append($(row));
            });
            console.log(res);
            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);

        } else {
            // document.location = './Sair';
        }


    });
}

function openUserConsumo(id) {
    var url = `Admin/usuarios/${id}/consumo`;

    getDadosGet(url, function(res) {

        if (res) {
            $('#resLogConsumo tbody').html("");
            var consumo = res.data;
            $.each(consumo , function(index, val) {
                var row = `
                <tr>
                  <td scope="row">${val['id']}</td>
                  <td scope="row">${val['nome']}</td>
                  <td scope="row" title="${val['acao']}">${doTruncarStr(val['acao'], 30)}</td>
                  <td scope="row" title="${val['doc']}">${doTruncarStr(val['doc'],15)}</td>
                  <td scope="row" title="${val['payload']}">${doTruncarStr(val['payload'],20)}</td>
                  <td scope="row">${val['ip']}</td>
                  <td scope="row" title="${val['navegador']}">${doTruncarStr(val['navegador'], 30)}</td>
                  <td scope="row">${dateToBR(val['created_at'])}</td>
                  <td scope="row">${val['status']}</td>
                  <td scope="row">-</td>
                </tr>
                `;
                $('#resLogConsumo tbody').append($(row));
            });
            console.log(res);
            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);

        } else {
            // document.location = './Sair';
        }


    });
}


function openUserFaturas(id) {
    var url = `Admin/usuarios/${id}/faturas`;

    getDadosGet(url, function(res) {

        if (res) {
            $('#editUsuarioFaturas tbody').html("");
            var faturas = res.faturas;
            $.each(faturas , function(index, val) {
                var row = `
                <tr>
                	<td scope="row">${val['id']}</td>
                	<td scope="row">${gerarTipo(val['tipo'])}</td>
                	<td scope="row">R$: ${val['valor']}</td>
                	<td scope="row">${val['validade']} Dias</td>
                	<td scope="row">${val['forma_pg']}</td>
                	<td scope="row">${dateToBR(val['data_pagamento'])}</td>
                	<td scope="row">${gerarStatusFat(val['status'])}</td>
                  <td>
                      <div class="btn-group" id="bntFathover">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" onclick="">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" style="left: -150px;" onclick="">
                                <li>
                                    <a href="#EditarUsurio" onclick="editarFat(${val['id']});">Editar</a>
                                </li>
                                <li>
                                    <a href="#ComprovantePg" onclick="verComprovante(${val['id']});">Ver Comprovante</a>
                                </li>
                                <li>
                                    <a href="#EditarUsurio" onclick="confirmarPg(${val['id']});">Ativar fat/Pag ok</a>
                                </li>
                                <li>
                                    <a href="#DeletarFat" onclick="deletarFat(${val['id']});">Deletar</a>
                                </li>
                            </ul>
                      </div>
                  </td>
                </tr>
                `;
                $('#editUsuarioFaturas tbody').append($(row));
            });
            console.log(res);
            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);

        } else {
            // document.location = './Sair';
        }


    });
}

function alteraTipoSv(servico, status){
  if(status){
    console.log('222');


    $("#boxLimitServ_"+servico).html(`<input id="limite[${servico}]" name="limite[${servico}]" class="form-control input-sm" value="0.00" style=" text-align: center; float:left; width:100%" type="text">`);

  }else{
    $("#boxLimitServ_"+servico).html(`
        <input id="limite[${servico}]" name="limite[${servico}]" class="form-control input-sm" value="0" style=" text-align: center; float:left; width:50%" type="text">
        <input id="usado[${servico}]" name="usado[${servico}]" class="form-control input-sm" value="0" style=" text-align: center; width:50%" type="text">
      `);

  }
}

function openUserServicos(id) {
    var url = `Admin/usuarios/${id}/servicos`;
    $('#editUsuarioServicos #id').val(id);

    getDadosGet(url, function(res) {

        if (res) {
            $('#editUsuarioServicos svUser').html("");
            var servicos = res;
            $.each(servicos , function(index, val) {
              if(val['limite'] > 0){
                tipochecked1 = 'checked=""';
                tipochecked2 = '';
                limite = val['limite'];
                limitecss = 'width:50%';
                usado = `
                          <input id="usado[${val['servico']}]" name="usado[${val['servico']}]" class="form-control input-sm" value="${val['usado']}" style=" text-align: center; width:50%" type="text">
                `;
              }else{
                tipochecked1 = '';
                tipochecked2 = 'checked=""';
                limite = val['valor'];
                limitecss = 'width:100%';
                usado = `
                          <input id="usado[${val['servico']}]" name="usado[${val['servico']}]" class="form-control input-sm" value="${val['usado']}" style=" text-align: center; display:none" type="text">
                `;
              }

              if(val['status'] === 1) {
                selectStatuson = 'selected=""';
                selectStatusoff = '';
              } else {
                selectStatusoff = 'selected=""';
                selectStatuson = '';
              }

              var row = `
                    <div class="col-md-6" style="margin:0.5%">
                      
                      <div class="input-group">
                        <span class="input-group-addon" style="font-size:12px;"><strong>${val['servico']}:</strong></span>
                        <span class="input-group-addon" style="width:20%" id="boxLimitServ_${val['servico']}">
                          <input id="limite[${val['servico']}]" name="limite[${val['servico']}]" class="form-control input-sm" value="${limite}" style=" text-align: center; float:left; ${limitecss}" type="text">
                        ${usado}
                        </span>

                        <span class="input-group-addon" style="font-size:11px">
                          <input name="tipoServ[${val['servico']}]" value="1" id="tipoServ[${val['servico']}]" ${tipochecked1} type="radio" onclick="alteraTipoSv('${val['servico']}', false)">
                          Pontos - 
                          <input name="tipoServ[${val['servico']}]" value="2" id="tipoServ[${val['servico']}]" ${tipochecked2} type="radio" onclick="alteraTipoSv('${val['servico']}', true)">
                          Valor
                        </span>
                        <span class="input-group-addon" style="width:20%">
                                                  <select class="form-control input-sm" id="status[${val['servico']}]" name="status[${val['servico']}]">
                                                      <option value="1" ${selectStatuson}>On</option>
                                                      <option value="2" ${selectStatusoff}>Off</option>
                                                  </select>

                         <!-- <a href="javascript:void(0)" onclick="removSvCad('${val['servico']}');">
                            <span class="glyphicon glyphicon-remove"></span>
                          </a>-->
                        </span>
                      </div>



                     <!-- <div class="input-group">
                        <span class="input-group-addon">${val['servico']}:</span>
                        <span class="input-group-addon" style="width:30%">
                          <input id="limite[${val['servico']}]" name="limite[${val['servico']}]" class="form-control" value="${val['limite']}" type="text" style=" text-align: center; float:left;>
                        </span>
                        
                        <span class="input-group-addon" style="display:block; float:left;">
                          <input type="radio" class="input-sm" name="tipoServ[${val['servico']}]" value="1" id="tipoServ" checked="">
                          Pontos - 
                            <input type="radio" class="input-sm" name="tipoServ[${val['servico']}]" value="2" id="tipoServ">
                            <input type="hidden" name="statusServ[${val['servico']}]" value="1" id="statusServ${val['servico']}">
                            Valor
                          </span>
                          <span class="input-group-addon">
                                                  <select class="form-control input-sm" id="status" name="status">
                                                      <option selected="" value="">Escolha uma opcao</option>
                                                      <option value="1">Ativo</option>
                                                      <option value="4">Aguardando pagamento</option>
                                                      <option value="2">Desativado</option>
                                                      <option value="3">Bloqueado</option>
                                                      <option value="5">Vencido</option>
                                                  </select>
                          </span>
                      </div>  
                    -->

                    </div>
                `;
                $('#editUsuarioServicos #svUser').append($(row));
            });

            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);

        } else {
            // document.location = './Sair';
        }


    });
}


function openUsuario(id) {
    getDadosGet('Admin/usuarios/' + id, function(res) {

        $("#editUsuario #id").val(res.id);
        $("#editUsuario #usuario").val(res.usuario);
        $("#editUsuario #revendedor").val(res.revendedor);
        $("#editUsuario #email").val(res.email);
        $("#editUsuario #valor").val(res.valor);
        $("#editUsuario #inicio").val(dateToBR(res.inicio));
        $("#editUsuario #fim").val(dateToBR(res.fim));
        $("#editUsuario #status option[value='" + res.status + "']").attr("selected","selected");
        $("#editUsuario #tipo option[value='" + res.tipo + "']").attr("selected","selected");
        if(res.tipo_limite != 2){
          document.querySelector('input[name=tipoLimite][value=D]').checked = false;
          document.querySelector('input[name=tipoLimite][value=M]').checked = true;
        }else{
          document.querySelector('input[name=tipoLimite][value=D]').checked = true;
          document.querySelector('input[name=tipoLimite][value=M]').checked = false;
        }

    });
}

function editarUsuario(id) {
    box = $("#content");
    box.css('right', '-100%');
    box.css('margin-left', '24%');
    box.css('visibility', 'visible')
        .animate({opacity: 1.0, left: '0'}, 500);

    var pgEditUser = `
        <div id="content-fluid">
		    <div class="row">
                <div class="col-md-12">

                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4>Editar Usuario</h4>
                        </div>
                        <div class="table-responsive">
                            <div class="panel-body">                          
                                
                                 <ul class="nav nav-tabs">
                                     <li class="active"><a data-toggle="tab" href="#cadastro">Cadastro</a></li>
                                     <li><a data-toggle="tab" href="#servicos">Servicos</a></li>
                                      <li><a data-toggle="tab" href="#Faturas">Faturas</a></li>
                                     <li><a data-toggle="tab" href="#logConsumo">Logs consumo</a></li>
                                     <li><a data-toggle="tab" href="#logAcesso">Logs acesso</a></li>
                                  </ul>
                        
                                      
                                  <div class="tab-content">
                                    <div class="tab-pane active" id="cadastro">
                                        <hr>
                                          <form class="form" action="##" method="post" id="editUsuario">
                                              <div class="form-group">
                                                  
                                                  <div class="col-xs-6">
                                                      <label><h4>Usuario</h4></label>
                                                      <input type="text" class="form-control" name="usuario" id="usuario" disabled="">
                                                      <input type="hidden" class="form-control" name="id" id="id" value="">
                                                  </div>
                                              </div>
                                              <div class="form-group">
                                                  
                                                  <div class="col-xs-6">
                                                    <label for="last_name"><h4>Revendedor</h4></label>
                                                      <input type="text" class="form-control" name="revendedor" id="revendedor" disabled="">
                                                  </div>
                                              </div>
                                  
                                              <div class="form-group">
                                                  
                                                  <div class="col-xs-6">
                                                      <label for="phone"><h4>Email</h4></label>
                                                      <input type="text" class="form-control" name="email" id="email">
                                                  </div>
                                              </div>
                                  
                                              <div class="form-group">
                                                  <div class="col-xs-6">
                                                     <label><h4>Nova senha</h4></label>
                                                      <input type="text" class="form-control" name="senha" id="senha" placeholder="Digite a nova senha">
                                                  </div>
                                              </div>

                                              <div class="form-group">
                                                  
                                                  <div class="col-xs-6">
                                                      <label><h4>Tipo</h4></label>
                                                      <select class="form-control" id="tipo" name="tipo">
                                                        <option value="1">Usuario</option>
                                                        <option value="2">Pre-Pago</option>
                                                        <option value="3">Revendedor</option>
                                                        <option value="8">Admin</option>
                                                      </select>
                                                  </div>
                                              </div>
                                  
                                              <div class="form-group">
                                                  <div class="col-xs-6">
                                                     <label><h4>Status</h4></label>
                                                     <select class="form-control" id="status" name="status">
                                                        <option value="1">Ativo</option>
                                                        <option value="4">Aguardando pagamento</option>
                                                        <option value="2">Desativado</option>
                                                        <option value="3">Bloqueado</option>
                                                        <option value="5">Vencido</option>
                                                     </select>
                                                  </div>
                                              </div>

                                              
                                              <div class="form-group">   
                                                                                             
                                                  <div class="col-xs-12" style="margin-top: 1%; margin-left: -1%;">                                                                                                
                                                      <div class="form-group">
                                                          <div class="col-md-4">
                                                              <label>Valor:</label>                                                    
                                                              <div class="form-group">                                                                                                           
                                                                  <div class="input-group">
                                                                      <span class="input-group-addon">R$:</span>
                                                                      <input id="valor" name="valor" class="form-control" type="text" style=" text-align: center">
                                                                  </div>                                                  
                                                              </div>
                                                          </div>
                                                          <div class="col-md-4">                                                                                                       
                                                              <div class="form-group">
                                                                  <label>Data inicio:</label>                                                    
                                                                  <div class="form-group">                                                                                                          
                                                                      <div class="input-group">
                                                                          <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>

                                                                          <input id="inicio" name="inicio" class="form-control" type="text" style=" text-align: center">
                                                                      </div>                                                  
                                                                  </div>
                                                              </div>                                                       
                                                          </div>                                                  
                                                          <div class="col-md-4">                                                                                                       
                                                              <div class="form-group">
                                                                  <label>Data fim:</label>                                                    
                                                                  <div class="form-group">                                                                                                          
                                                                      <div class="input-group">
                                                                          <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>

                                                                          <input id="fim" name="fim" class="form-control" type="text" style=" text-align: center">
                                                                      </div>                                                  
                                                                  </div>
                                                              </div>                                                       
                                                          </div>                                                  
                                                      </div>
                                                  </div>
                                              </div>
                                              

                                              <div class="form-group">
                                                   <div class="col-xs-12">
                                                        <br>
                                                        <button class="btn btn-success" type="button" onclick="editUsuario();"><i class="glyphicon glyphicon-ok-sign"></i> Editar usuario</button>
                                                        <button class="btn " type="button"><i class="glyphicon glyphicon-repeat"></i> Voltar</button>
                                                    </div>
                                              </div>
                                        </form>
                                      
                                      <hr>
                                      
                                     </div><!--/tab-pane-->
                                     <div class="tab-pane" id="logAcesso">
                                       
                                       <h2></h2>
                                       
                                       <hr>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                Logs de acesso
                                            </div>
                                            <table class="table table-hover" id="editUsuarioAcessos">
                                                    <thead>
                                                        <tr>
                                                            <th>IP</th>
                                                            <th>Referer</th>
                                                            <th>Navegador</th>
                                                            <th>Horario</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody> 
                                            </table>
                                        </div>                        
                                       
                                     </div><!--/tab-pane-->


                                    <div class="tab-pane" id="logConsumo">
                                      <h2></h2>
                                        <div class="row" style="display:none" id="frmPessUserConsumo">
                                      <span style="margin-left:20px;"><strong>#Pesquisar:</strong></span>
                                      <hr>

                                          <div class="col-md-2"></div>
                                          <div class="col-md-4">
                                              <div class="form-group">
                                                    <label for="last_name">Servico:</label>
                                                    <select class="form-control input-sm" name="servico" id="servico">
                                                      <option value="">BuscaPai</option>
                                                      <option value="">BuscaRg</option>
                                                    </select>
                                              </div>
                                              <div class="form-group">
                                                    <label for="last_name">Doc:</label>
                                                      <input type="text" class="form-control input-sm" name="doc" id="doc">
                                              </div>
                                              <div class="form-group">
                                                    <label for="last_name">IP:</label>
                                                      <input type="text" class="form-control input-sm" name="ip" id="ip">
                                              </div>
                                              <div class="form-group">
                                                    <label for="last_name">Data inicio:</label>
                                                      <input type="text" class="form-control input-sm" name="datai" id="datai" placeholder="00/00/0000">
                                              </div>

                                          </div>
                                          
                                          <div class="col-md-4">
                                              <div class="form-group">
                                                    <label for="last_name">Acao:</label>
                                                    <select class="form-control input-sm" id="acao" name="acao">
                                                      <option value="1">Consultar</option>
                                                      <option value="2">Abrir</option>
                                                      <option value="3">Pesquisa</option>
                                                      <option value="4">Reportar</option>
                                                      <option value="5">POST</option>
                                                      <option value="6">GET</option>
                                                      <option value="" selected="">Escolha uma opcao</option>
                                                    </select>
                                              </div>
                                              <div class="form-group">
                                                    <label for="last_name">Payload:</label>
                                                      <input type="text" class="form-control input-sm" name="payload" id="payload">
                                              </div>
                                              <div class="form-group">
                                                    <label for="last_name">Status:</label>
                                                    <select class="form-control input-sm" name="status" id="status">
                                                      <option value="1">Sucesso</option>
                                                      <option value="2">Erro</option>
                                                      <option value="3">Invalido</option>
                                                      <option value="4">Pendente</option>
                                                      <option value="" selected="">Escolha uma opcao</option>
                                                    </select>
                                              </div>
                                              <div class="form-group">
                                                    <label for="last_name">Data fim:</label>
                                                      <input type="text" class="form-control input-sm" name="dataf" id="dataf" placeholder="00/00/0000">
                                              </div>
                                          </div>

                                          <div class="col-md-12">
                                            <center>
                                              <button type="button" class="btn btn-success">Pesquisar</button>
                                            </center>
                                          </div>

                                        </div>
                                       
                                       <hr>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                Logs de consumo servicos
                                                <button type="button" class="btn btn-default btn-sm" aria-label="Left Align" style="margin-left:15px;" onclick="openPesConsuUsuario();">
                                                  <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                                  Pesquisar
                                                </button>                                                
                                            </div>
                                            <table class="table table-hover" id="resLogConsumo" style="font-size:12px">
                                                    <thead>
                                                        <tr>
                                                            <th>#ID</th>
                                                            <th>Servico</th>
                                                            <th>Acao</th>
                                                            <th>Doc</th>
                                                            <th>Payload</th>
                                                            <th>IP</th>
                                                            <th>Navegador</th>
                                                            <th>Data</th>
                                                            <th>Status</th>
                                                            <th>Opcoes</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>BuscaPai</td>
                                                            <td>Consulta</td>
                                                            <td>doc=11111111111</td>
                                                            <td>127.0.0.1</td>
                                                            <td>Mozilla</td>
                                                            <td>07/09/2018 19:14:00</td>
                                                            <td>Ok</td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Upbusca</td>
                                                            <td>ConsultaNome</td>
                                                            <td>nome=manoel da silva</td>
                                                            <td>127.0.0.1</td>
                                                            <td>Mozilla</td>
                                                            <td>07/09/2018 19:14:00</td>
                                                            <td>Error</td>
                                                            <td>-</td>
                                                        </tr>
                                                    </tbody> 
                                            </table>
                                        </div>                        
                                       
                                     </div><!--/tab-pane-->

                                     <div class="tab-pane" id="Faturas">
                                       
                                       <h2></h2>
                                       
                                       <hr>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                Faturas
                                            </div>
                                            <table class="table table-hover" id="editUsuarioFaturas">
                                                    <thead>
                                                        <tr>
                                                            <th>#id</th>
                                                            <th>Tipo</th>
                                                            <th>Valor</th>
                                                            <th>Validade</th>
                                                            <th>Forma Pg</th>
                                                            <th>Data Pg</th>
                                                            <th>Status</th>
                                                            <th>Opcoes</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody> 
                                            </table>
                                        </div>                        
                                       
                                     </div><!--/tab-pane-->

                                     
                                     <div class="tab-pane" id="servicos">
                                            
                                        
                                          <hr>
                                          <form class="form" action="#" method="post" id="editUsuarioServicos">
                                          <input type="hidden" name="id" id="id" value="">
                                          <div class="col-xs-12">
                                               <div class="col-md-5" style="display:block; margin:0.5%; margin-left:-1%">  
                                                   <span class="input-group-addon input-sm">
                                                      <input type="radio" aria-label="xx" value="M" name="tipoLimite" id="tipoLimite">
                                                      Limite Mensal
                                                   </span>  
                                                   <span class="input-group-addon input-sm">
                                                      <input type="radio" aria-label="xx" value="D" name="tipoLimite" id="tipoLimite">
                                                      Limite Diario
                                                   </span>  
                                              </div>             
                                          </div>                             
                                          <div id="svUser"></div>
                                              <div class="form-group">
                                                   <div class="col-xs-12">
                                                        <br>
                                                        <button class="btn btn-success" type="button" onclick="editServicos();"><i class="glyphicon glyphicon-ok-sign"></i> Salvar</button>
                                                        <button class="btn " type="button"><i class="glyphicon glyphicon-repeat"></i> Voltar</button>
                                                    </div>
                                              </div>
                                            
                                            
                                         </form>
 
                                      </div>                                  
                                  </div>
                              </div>                          
                          </div><!--/tab-pane-->
                      </div>
                  </div>
              </div>
          </div>
    `;

    box.html(pgEditUser);
    openUsuario(id);
    openUserServicos(id);
    openUserFaturas(id);
    openUserAcessos(id);
    openUserConsumo(id);

    box.css('visibility', 'visible')
        .animate({opacity: 1.0, left: '0'}, 200);

}

function openPesConsuUsuario(){
  if ($('#frmPessUserConsumo').is(':hidden')) {
    $('#frmPessUserConsumo').show();
  } else {
    $('#frmPessUserConsumo').hide();
  }  
}
function pesquisarUsuarios() {
    box = $("#content");
    box.css('right', '-100%');
    box.css('margin-left', '24%');
    box.css('visibility', 'visible')
        .animate({opacity: 1.0, left: '0'}, 500);

    var pgPesUsuarios = `
			    <div id="content-fluid">
				    <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4>Pesquisar usuario</h4>
                                </div>
                                <div class="table-responsive">
                                     <div class="panel-body">                          
                                        <form action="javascript::void(0)" method="POST" id="frmPesquisaUsuario">
                                          <div class="form-group">
                                            <label for="exampleInputEmail1">Usuario</label>
                                            <input type="text" class="form-control" id="usuario" name="usuario" value="">
                                          </div>
                                          <div class="form-group">
                                            <label for="exampleInputEmail1">Revendedor</label>
                                            <input type="text" class="form-control" id="revendedor" name="revendedor" value="">
                                          </div>

                                          <div class="form-group">
                                            <label for="exampleInputEmail1">E-mail</label>
                                            <input type="text" class="form-control" id="email" name="email" value="">
                                          </div>

                                              <div class="form-group">
                                                  <label for="sel1">Tipo:</label>
                                                  <select class="form-control" id="tipo" name="tipo">
                                                      <option selected="" value="">Escolha uma opcao</option>
                                                      <option value="1">Usuario</option>
                                                      <option value="2">Pre-Pago</option>
                                                      <option value="3">Revendedor</option>
                                                      <option value="8">Admin</option>
                                                  </select>
                                              </div>
                                              <div class="form-group">
                                                  <label for="sel1">Status:</label>
                                                  <select class="form-control" id="status" name="status">
                                                      <option selected="" value="">Escolha uma opcao</option>
                                                      <option value="1">Ativo</option>
                                                      <option value="4">Aguardando pagamento</option>
                                                      <option value="2">Desativado</option>
                                                      <option value="3">Bloqueado</option>
                                                      <option value="5">Vencido</option>
                                                  </select>
                                              </div>
                                          <button type="submit" id="AltSenha" onclick="pesquisarUsuario()" class="btn btn-default">Pesquisar</button>
                                        </form>
                                    </div>                                
                                </div>
                            </div>                            
                        </div>
			        </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4>Usuarios cadastrados</h4>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped table-responsive" id="listUsuarios">
                                        <thead>
                                            <tr>
                                                <th scope="col">#ID</th>
                                                <th scope="col">Usuario</th>
                                                <th scope="col">Revendedor</th>
                                                <th scope="col">Email</th> 
                                                <th scope="col">Inicio</th>
                                                <th scope="col">Fim</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Tipo</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Opcoes</th>
                                            </tr>
                                        </thead>
                                        <tbody>  
                                        </tbody>
                                    </table>
                                    <div id="paginacaoPesUser" style="float:right; overflow:hidden"></div>

                                    </div>	
                                </div>			        
        </div>`;


        box.html(pgPesUsuarios);
            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);



}

function listarOnline() {
    box = $("#content");
    box.css('right', '-100%');
    box.css('margin-left', '24%');
    box.css('visibility', 'visible')
        .animate({opacity: 1.0, left: '0'}, 500);

    var pgListOnline = `
			    <div id="content-fluid">
				    <div class="row">
                        <div class="col-md-12">                          
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4>Usuarios online</h4>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped table-responsive" id="listOnline">
                                        <thead>
                                            <tr>
                                                <th scope="col">#ID</th>
                                                <th scope="col">Usuario</th>
                                                <th scope="col">Inicio</th> 
                                                <th scope="col">Fim</th> 
                                                <th scope="col">IP</th>
                                                <th scope="col">Navegador</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Opcoes</th>
                                            </tr>
                                        </thead>
                                        <tbody>  
                                        </tbody>
                                    </table>
                                    </div>	
                                </div>
                            </div>
                        </div>
			        </div>
                </div>`;

    getDadosGet('Admin/online', function(res) {
        box.html(pgListOnline);

        if (res.data) {
            var online = res.data;
            $.each(online , function(index, val) {
                var row = `<tr>
                	<td scope="row">${val['id']}</td>
                	<td>${val['usuario']}</td>
                	<td>${dateToBR(val['created_at'])}</td>
                	<td>${dateToBR(val['validade'])}</td>
                	<td>${(val['ip'])}</td>
                	<td title="${val['navegador']}">${doTruncarStr(val['navegador'], 20)}</td>
                	<td>${val['status']}</td>
                	<td>
                	    <div class="btn-group" id="bntFathover">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" onclick="">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" style="left: -150px;" onclick="">
                                <li>
                                    <a href="#Deslogar" onclick="Deslogar(${val['id_usuario']});">Deslogar</a>
                                </li>
                                <li>
                                    <a href="#EditarUsurio" onclick="editarUsuario(${val['id_usuario']});">Perfil Usuario</a>
                                </li>
                                <!--<li>-->
                                    <!--<a href="#Bloquear" onclick="">Bloquear</a>-->
                                <!--</li>-->
                            </ul>
                	    </div>
                    </td>
                	</tr>`;
                $('table#listOnline').append($(row));
            });

            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);

        } else {
            // document.location = './Sair';
        }


        console.log(res);
    });
}


function listarUsuarios() {
    box = $("#content");
    box.css('right', '-100%');
    box.css('margin-left', '24%');
    box.css('visibility', 'visible')
        .animate({opacity: 1.0, left: '0'}, 500);

    var pgListUsuarios = `
			    <div id="content-fluid">
				    <div class="row">
                        <div class="col-md-12">                          
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4>Usuarios cadastrados</h4>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped table-responsive" id="listUsuarios">
                                        <thead>
                                            <tr>
                                                <th scope="col">#ID</th>
                                                <th scope="col">Usuario</th>
                                                <th scope="col">Revendedor</th>
                                                <th scope="col">Email</th> 
                                                <th scope="col">Inicio</th>
                                                <th scope="col">Fim</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Tipo</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Opcoes</th>
                                            </tr>
                                        </thead>
                                        <tbody>  
                                        </tbody>
                                    </table>
                                    <div id="paginacaoPesUser" style="float:right; overflow:hidden"></div>
                                    </div>	
                                </div>
                            </div>
                        </div>
			        </div>
                </div>`;

    getDadosGet('Admin/usuarios', function(res) {
        box.html(pgListUsuarios);

        if (res.data) {
            var usuarios = res.data;
            $.each(usuarios , function(index, val) {
                var row = `<tr>
                	<td scope="row">${val['id']}</td>
                	<td>${val['usuario']}</td>
                	<td>${val['revendedor']}</td>
                	<td>${val['email']}</td>
                	<td>${dateToBR(val['inicio'])}</td>
                	<td>${dateToBR(val['fim'])}</td>
               	 	<td>R$ ${val['valor']}</td>
               	 	<td>${getTipoUser(val['tipo'])}</td>
                	<td>${getStatusUser(val['status'])}</td>
                	<td>
                	    <div class="btn-group" id="bntFathover">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" onclick="">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" style="left: -150px;" onclick="">
                                <li>
                                    <a href="#EditarUsurio" onclick="editarUsuario(${val['id']});">Perfil Usuario</a>
                                </li>
                                <li>
                                    <a href="#EditarUsurio" onclick="criarFatura(${val['id']});">Criar Fatura</a>
                                </li>
                                <li>
                                    <a href="#Deslogar" onclick="Deslogar(${val['id']});">Deslogar</a>
                                </li>
                                <!--<li>-->
                                    <!--<a href="#Bloquear" onclick="">Bloquear</a>-->
                                <!--</li>-->
                                <li>
                                    <a href="#Bloquear" onclick="deletarUsuario(${val['id']});">Deletar</a>
                                </li>
                            </ul>
                	    </div>
                    </td>
                	</tr>`;
                $('table#listUsuarios').append($(row));
            });

            var paginacao = '';
            var i;

            paginacao += `
                <ul class="pagination" role="navigation">
                      <li class="page-item disabled" aria-disabled="true" aria-label="pagination.previous">
                          <span class="page-link" aria-hidden="true">&lsaquo;</span>
                        </li>`;

            for (i = 1; i < res.last_page + 1; i++) {
              //paginacao += `<li class="page-item active" aria-current="page">
                paginacao += `
                    <li class="page-item" id="liPgFat_${i}">
                      <span class="page-link">
                              <a class="page-link" href="javascript:void(0)" onclick="listarUserCadPaginac(${i});">
                                  ${i}
                                </a>
                            </span>
                        </li>`;              
            } 
            //paginacaoFatCad
            paginacao += `
                  <li class="page-item">
                          <a class="page-link" href="javascript:void(0)" onclick="listarUserCadPaginac(${res.last_page});">&rsaquo;</a>
                        </li>
                    </ul>`;

            $('#paginacaoPesUser').html(paginacao);
            $('#liPgFat_1').addClass('active');
            $('#liPgFat_1').addClass('disabled');
            $('#liPgFat_1 a').removeAttr("href");


            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);

        } else {
           // document.location = './Sair';
        }


        console.log(res);
    });
}


function listarUserCadPaginac(pg){
    getDadosGet('Admin/usuarios?page='+pg, function(res) {
        console.log(res);
        $('#listUsuarios tbody').html("");
        if (res.data) {
            $("#totalFatCad").html(res.total);
            var usuarios = res.data;
            $.each(usuarios , function(index, val) {
                var row = `<tr>
                  <td scope="row">${val['id']}</td>
                  <td>${val['usuario']}</td>
                  <td>${val['revendedor']}</td>
                  <td>${val['email']}</td>
                  <td>${dateToBR(val['inicio'])}</td>
                  <td>${dateToBR(val['fim'])}</td>
                  <td>R$ ${val['valor']}</td>
                  <td>${getTipoUser(val['tipo'])}</td>
                  <td>${getStatusUser(val['status'])}</td>
                  <td>
                      <div class="btn-group" id="bntFathover">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" onclick="">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" style="left: -150px;" onclick="">
                                <li>
                                    <a href="#EditarUsurio" onclick="editarUsuario(${val['id']});">Perfil Usuario</a>
                                </li>
                                <li>
                                    <a href="#EditarUsurio" onclick="criarFatura(${val['id']});">Criar Fatura</a>
                                </li>
                                <li>
                                    <a href="#Deslogar" onclick="Deslogar(${val['id']});">Deslogar</a>
                                </li>
                                <!--<li>-->
                                    <!--<a href="#Bloquear" onclick="">Bloquear</a>-->
                                <!--</li>-->
                                <li>
                                    <a href="#Bloquear" onclick="deletarUsuario(${val['id']});">Deletar</a>
                                </li>
                            </ul>
                      </div>
                    </td>
                  </tr>`;
                $('table#listUsuarios').append($(row));
            });
            var paginacao = '';
            var i;

            paginacao += `
                  <ul class="pagination" role="navigation">
                    <li class="page-item" onclick="listarFaturas(1);">
                      <span class="page-link" aria-hidden="true">&lsaquo;</span>
                    </li>`;

            for (i = 1; i < res.last_page + 1; i++) {
                //paginacao += `<li class="page-item active" aria-current="page">
                paginacao += `<li class="page-item" id="liPgFat_${i}">
                                <span class="page-link">
                                    <a class="page-link" href="javascript:void(0)" onclick="listarUserCadPaginac(${i});">
                                      ${i}
                                    </a>
                                </span>
                              </li>`;              
            } 
            //paginacaoFatCad
           paginacao += `
                    <li class="page-item">
                    <a class="page-link" href="javascript:void(0)" onclick="listarUserCadPaginac(${res.last_page});">&rsaquo;</a>
                    </li>
                  </ul>`;

            $('#paginacaoPesUser').html(paginacao);
            $('#liPgFat_'+pg).addClass('active');
            $('#liPgFat_'+pg).addClass('disabled');
            $('#liPgFat_'+pg+' a').removeAttr("href");
            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);

        } else {
            // document.location = './Sair';
        }


        console.log(res);
    });
}


function openMensagem(id) {
    var url = `Admin/mensagens/${id}`;
    getDadosGet(url, function(res) {

    var res = `    
                <div class="modal fade" id="MensagemRec" tabindex="-1" role="dialog" aria-labelledby="MensagemRec" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Mensagem recebida</h4>
                      </div>
                      <div class="modal-body" id="bodyInfPag">
                        <div class="form-group" style="overflow:hidden; margin-botton:10px;">
                          <div class="col-md-6">
                              <div class="form-group input-group-sm">
                                <label>Nome:</label> 
                                <input class="form-control" id="nome" name="nome" value="${res.nome}" type="text">
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="form-group input-group-sm">
                                <label>Usuario:</label> 
                                <input class="form-control" id="usuario" name="usuario" value="${res.id_usuario}" type="text">
                              </div>
                          </div>
                        </div>

                        <div class="form-group" style="overflow:hidden; margin-botton:10px;">
                          <div class="col-md-6">
                              <div class="form-group input-group-sm">
                                <label>IP:</label> 
                                <input class="form-control" id="ip" name="ip" value="${res.ip}" type="text">
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="form-group input-group-sm">
                                <label>Navegador:</label> 
                                <input class="form-control" id="navegador" name="navegador" value="${res.navegador}" type="text">
                              </div>
                          </div>
                        </div>

                        <div class="form-group" style="overflow:hidden; margin-botton:10px;">
                          <div class="col-md-6">
                              <div class="form-group input-group-sm">
                                <label>Referer:</label> 
                                <input class="form-control" id="referer" name="referer" value="${res.referer}" type="text">
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="form-group input-group-sm">
                                <label>Email:</label> 
                                <input class="form-control" id="email" name="email" value="${res.email}" type="text">
                              </div>
                          </div>
                        </div>

                        <div class="form-group" style="overflow:hidden; margin-botton:10px;">
                          <div class="col-md-6">
                              <div class="form-group input-group-sm">
                                <label>Titulo:</label> 
                                <input class="form-control" id="titulo" name="titulo" value="${res.titulo}" type="text">
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="form-group input-group-sm">
                                <label>Data:</label> 
                                <input class="form-control" id="data" name="data" value="${res.data}" type="text">
                              </div>
                          </div>
                        </div>

                        <div class="form-group" style="overflow:hidden; margin-botton:10px;">
                          <div class="col-md-12">
                              <div class="form-group input-group-sm">
                                <label>Mensagem:</label> 
                                <textarea class="form-control" style="height:100px" rows="10" cols="30">${res.mensagem}</textarea>
                              </div>
                          </div>
                        </div>


                      </div>
                      <div class="modal-footer">
                        <button type="button" onclick="closePanel('MensagemRec');" class="btn btn-primary">Fechar</button>
                      </div>
                    </div>
                  </div>
                </div>
                `;

        $("body").append(res);
        $("#MensagemRec").modal('toggle');

        // $("#frmEditFat #valor").val(res.valor);
        // $("#frmEditFat #validade").val(res.validade);
        // $("#frmEditFat #data_pg").val(dateToBR(res.data_pagamento));
        // $("#frmEditFat #forma_pg").val(res.forma_pg).change();
        // $("#frmEditFat #tipo").val(res.tipo).change();
        // $("#frmEditFat #status").val(res.status).change();
        // $("#frmEditFat #obs").val(res.obs);

      console.log(res);

    });






}

function listarMensagens() {
    box = $("#content");
    box.css('right', '-100%');
    box.css('margin-left', '24%');
    box.css('visibility', 'visible')
        .animate({opacity: 1.0, left: '0'}, 500);

    var pgListMensagens = `
			    <div id="content-fluid">
				    <div class="row">
                        <div class="col-md-12">                          
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4>Mensagens recebidas</h4>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped table-responsive" id="listMensagens">
                                        <thead>
                                            <tr>
                                                <th scope="col">#ID</th>
                                                <th scope="col">Usuario</th>
                                                <th scope="col">IP</th>
                                                <th scope="col">Navegador</th>
                                                <th scope="col">Referer</th> 
                                                <th scope="col">Nome</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Titulo</th>
                                                <th scope="col">Mensagem</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Opcoes</th>
                                            </tr>
                                        </thead>
                                        <tbody>  
                                        </tbody>
                                    </table>
                                    </div>	
                                </div>
                            </div>
                        </div>
			        </div>
                </div>`;

    getDadosGet('Admin/mensagens', function(res) {
        box.html(pgListMensagens);

        if (res.data) {
            var mensagens = res.data;
            $.each(mensagens , function(index, val) {

                var row = `<tr>
                	<td scope="row">${val['id']}</td>
                	<td>${val['usuario']}</td>
                	<td>${(val['ip'])}</td>
                	<td title="${val['navegador']}">${doTruncarStr(val['navegador'], 15)}</td>
                	<td title="${val['referer']}">${doTruncarStr(val['referer'], 15)}</td>
                	<td>${val['nome']}</td>
                	<td>${val['email']}</td>
                	<td title="${val['titulo']}">${doTruncarStr(val['titulo'], 15)}</td>
                	<td title="${val['mensagem']}">${doTruncarStr(val['mensagem'], 15)}</td>
               	 	<td>${(val['status'])}</td>
                	<td>
                	    <div class="btn-group" id="bntFathover">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" onclick="">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" style="left: -150px;" onclick="">
                                <li>
                                    <a href="#EditarUsurio" onclick="openMensagem(${val['id']});">Abrir Mensagem</a>
                                </li>
                                <li>
                                    <a href="#EditarUsurio" onclick="editarUsuario(${val['id_usuario']});">Editar Usuario</a>
                                </li>
                                <li>
                                    <a href="#Bloquear" onclick="deletarMensagem(${val['id']});">Deletar Mensagem</a>
                                </li>
                            </ul>
                	    </div>
                    </td>
                	</tr>`;
                $('table#listMensagens').append($(row));
            });

            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);

        } else {
            // document.location = './Sair';
        }

    });

}

function listarFaturas() {
    box = $("#content");
    box.css('right', '-100%');
    box.css('margin-left', '24%');
    box.css('visibility', 'visible')
        .animate({opacity: 1.0, left: '0'}, 500);

    var pgListUsuarios = `
			    <div id="content-fluid">
				    <div class="row">
                        <div class="col-md-12">                          
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4>Faturas cadastrados</h4>
                                    <div>
                                      <span>Total: <span id="totalFatCad"></span></span>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped table-responsive" id="listUsuarios">
                                        <thead>
                                            <tr>
                                                <th scope="col">#ID</th>
                                                <th scope="col">Usuario</th>
                                                <th scope="col">Tipo</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Validade</th> 
                                                <th scope="col">Forma Pag</th>
                                                <th scope="col">Data Pg</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Opcoes</th>
                                            </tr>
                                        </thead>
                                        <tbody>  
                                        </tbody>
                                    </table>
                                    <div id="paginacaoFatCad" style="float:right; overflow:hidden"></div>
                                    </div>	
                                </div>
                            </div>
                        </div>
			        </div>
                </div>`;

    getDadosGet('Admin/faturas', function(res) {
        console.log(res);
        box.html(pgListUsuarios + layComprovante());

        if (res.data) {
            $("#totalFatCad").html(res.total);
            var usuarios = res.data;
            $.each(usuarios , function(index, val) {
                var row = `<tr>
                	<td scope="row">${val['id']}</td>
                	<td>${val['usuario']}</td>
                	<td>${gerarTipo(val['tipo'])}</td>
                	<td>R$: ${val['valor']}</td>
                	<td>${val['validade']} Dias</td>
                	<td>${gerarFormaPg(val['forma_pg'])}</td>
               	 	<td>${dateToBR(val['data_pagamento'])}</td>
               	 	<td>${gerarStatusFat(val['status'])}</td>
                	<td>
                	    <div class="btn-group" id="bntFathover">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" onclick="">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" style="left: -150px;" onclick="">
                                <li>
                                    <a href="#EditarUsurio" onclick="editarFat(${val['id']});">Editar</a>
                                </li>
                                <li>
                                    <a href="#ComprovantePg" onclick="verComprovante(${val['id']});">Ver Comprovante</a>
                                </li>
                                <li>
                                    <a href="#EditarUsurio" onclick="editarUsuario(${val['id_usuario']});">Editar Usuario</a>
                                </li>
                                <li>
                                    <a href="#EditarUsurio" onclick="confirmarPg(${val['id']});">Ativar fat/Pag ok</a>
                                </li>
                                <li>
                                    <a href="#DeletarFat" onclick="deletarFat(${val['id']});">Deletar</a>
                                </li>
                            </ul>
                	    </div>
                    </td>
                	</tr>`;
                $('table#listUsuarios').append($(row));
            });
            var paginacao = '';
            var i;

            paginacao += `
                  <ul class="pagination" role="navigation">
                    <li class="page-item disabled" aria-disabled="true" aria-label="pagination.previous">
                      <span class="page-link" aria-hidden="true">&lsaquo;</span>
                    </li>`;

            for (i = 1; i < res.last_page + 1; i++) {
                //paginacao += `<li class="page-item active" aria-current="page">
                paginacao += `<li class="page-item" id="liPgFat_${i}">
                                <span class="page-link">
                                    <a class="page-link" href="javascript:void(0)" onclick="listarFaturasPag(${i});">
                                      ${i}
                                    </a>
                                </span>
                              </li>`;              
            } 
            //paginacaoFatCad
           paginacao += `
                    <li class="page-item">
                    <a class="page-link" href="javascript:void(0)" onclick="listarFaturasPag(${res.last_page});">&rsaquo;</a>
                    </li>
                  </ul>`;

            $('#paginacaoFatCad').html(paginacao);
            $('#liPgFat_1').addClass('active');
            $('#liPgFat_1').addClass('disabled');
            $('#liPgFat_1 a').removeAttr("href");
            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);

        } else {
            // document.location = './Sair';
        }


        console.log(res);
    });


}

function listarFaturasPag(pg){

    getDadosGet('Admin/faturas?page='+pg, function(res) {
        console.log(res);
        $('#listUsuarios tbody').html("");
        if (res.data) {
            $("#totalFatCad").html(res.total);
            var usuarios = res.data;
            $.each(usuarios , function(index, val) {
                var row = `<tr>
                  <td scope="row">${val['id']}</td>
                  <td>${val['usuario']}</td>
                  <td>${val['revendedor']}</td>
                  <td>${val['email']}</td>
                  <td>${dateToBR(val['inicio'])}</td>
                  <td>${dateToBR(val['fim'])}</td>
                  <td>R$ ${val['valor']}</td>
                  <td>${getTipoUser(val['tipo'])}</td>
                  <td>${getStatusUser(val['status'])}</td>
                  <td>
                      <div class="btn-group" id="bntFathover">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" onclick="">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" style="left: -150px;" onclick="">
                                <li>
                                    <a href="#EditarUsurio" onclick="editarUsuario(${val['id_usuario']});">Perfil Usuario</a>
                                </li>
                                <li>
                                    <a href="#EditarUsurio" onclick="criarFatura(${val['id_usuario']});">Criar Fatura</a>
                                </li>
                                <li>
                                    <a href="#Deslogar" onclick="Deslogar(${val['id']});">Deslogar</a>
                                </li>
                                <!--<li>-->
                                    <!--<a href="#Bloquear" onclick="">Bloquear</a>-->
                                <!--</li>-->
                            </ul>
                      </div>
                    </td>
                  </tr>`;
                $('table#listUsuarios').append($(row));
            });
            var paginacao = '';
            var i;

            paginacao += `
                  <ul class="pagination" role="navigation">
                    <li class="page-item" onclick="listarFaturas(1);">
                      <span class="page-link" aria-hidden="true">&lsaquo;</span>
                    </li>`;

            for (i = 1; i < res.last_page + 1; i++) {
                //paginacao += `<li class="page-item active" aria-current="page">
                paginacao += `<li class="page-item" id="liPgFat_${i}">
                                <span class="page-link">
                                    <a class="page-link" href="javascript:void(0)" onclick="listarFaturasPag(${i});">
                                      ${i}
                                    </a>
                                </span>
                              </li>`;              
            } 
            //paginacaoFatCad
           paginacao += `
                    <li class="page-item">
                    <a class="page-link" href="javascript:void(0)" onclick="listarFaturasPag(${res.last_page});">&rsaquo;</a>
                    </li>
                  </ul>`;

            $('#paginacaoFatCad').html(paginacao);
            $('#liPgFat_'+pg).addClass('active');
            $('#liPgFat_'+pg).addClass('disabled');
            $('#liPgFat_'+pg+' a').removeAttr("href");
            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 200);

        } else {
            // document.location = './Sair';
        }


        console.log(res);
    });
}


function gerarTipo(tipo) {
    if (tipo === 1) {
        tipo = 'Contratação';
    } else if (tipo === 2) {
        tipo = 'Renovação';
    } else if (tipo === 3) {
        tipo = 'Adicional';
    } else if (tipo === 4) {
        tipo = 'Carga Pre-Pago';
    } else {
        tipo = '-'
    }
    return tipo;
}

function getTipoUser(tipo) {
    if(tipo === 1) {
        tipo = 'Usuario';
    } else if(tipo === 2) {
        tipo = 'Pre-Pago';
    } else if(tipo === 3) {
        tipo = 'Revendedor';
    } else if(tipo === 8) {
        tipo = 'Admin';
    }
    return tipo;
}

function getStatusUser(status) {
    if(status === 1) {
        status = 'Ativo';
    } else if(status === 2) {
        status  = 'Desativado';
    } else if(status === 3) {
        status = 'Bloqueado';
    } else if(status === 4) {
        status = 'Aguardando pg';
    } else if(status === 5) {
        status = 'Vencido';
    }
    return status;
}

function getDadosPost(url, data, callback) {

    var token = getCookie('token');

    $.ajax({
        method : "POST",
        url : url,
        data: data,
        timeout: 8000,
        headers: {"Authorization": "Bearer " + token}
    })
    .done(function(res) {
        callback(res);
    })
    .fail(function() {
        callback('error');
    });
}

function getDadosPut(url, data, callback) {

    var token = getCookie('token');

    $.ajax({
        method : "PUT",
        url : url,
        data: data,
        timeout: 8000,
        headers: {"Authorization": "Bearer " + token}
    })
    .done(function(res) {
        callback(res);
    })
    .fail(function(res) {
        callback({"error":true, "res":res.responseJSON});
    });
}


function getDadosGet(url, callback) {

    var token = getCookie('token');

    $.ajax({
        method : "GET",
        url : url,
        timeout: 8000,
        headers: {"Authorization": "Bearer " + token}
    })
    .done(function(res) {
        callback(res);
    })
    .fail(function(res) {
        callback(res);
    });
}

function deletarFat(id) {
    var token = getCookie('token');
    var url = 'Admin/faturas/' +id;
    $.ajax({
        method : "DELETE",
        url : url,
        timeout: 8000,
        headers: {"Authorization": "Bearer " + token}
    })
    .done(function(res) {
            alert('Fatura deletada com sucesso!');
            console.log(res);
    })
    .fail(function(res) {
        alert('Erro ao deletar a fatura' + id);
    });

}


function editServicos() {
    var id     = $("#editUsuarioServicos #id").val();
    var data   = $("#editUsuarioServicos").serialize();
    getDadosPut('Admin/usuarios/' + id + '/servicos', data, function(res) {
        if(res.msg){
            alert(res.msg);
        }

    });

}

function deletarUsuario(id) {

    getDadosGet('Admin/usuarios/' + id + '/delete', function(res) {
        if(res.msg){
            alert(res.msg);
        }

    });
}

function closePanel(id) {
    $("#" + id).modal('toggle');
}

function confirmarPg(id=null) {
    if(id === null) {
        var idfat = $("#frmPgAdm #id").val();
    } else {
        var idfat = id;
    }

    getDadosGet('Admin/faturas/' + idfat + '/confirmar', function(res) {

        if(res.msg){
            alert(res.msg);
        }

    });
}

function verComprovante(id) {
    getDadosGet('Admin/faturas/' + id + '/comprovante', function(res) {
        console.log(res);
        var idfat  = res.comprovante[0].id_fat;
        var banco  = res.comprovante[0].id_banco;
        var valor  = res.comprovante[0].valor;
        var n_doc  = res.comprovante[0].n_doc;
        var n_controle  = res.comprovante[0].n_controle;
        var data_pg     = dateToBR(res.comprovante[0].data_pg);
        var obs         = res.comprovante[0].obs;
        var comprovante = res.comprovante[0].comprovante;
        var status = res.comprovante[0].status;
        var data   = dateToBR(res.comprovante[0].created_at);

        $("#frmPgAdm #id").val(idfat);
        $("#frmPgAdm #banco").html(banco);
        $("#frmPgAdm #valor").html(valor);
        $("#frmPgAdm #n_doc").html(n_doc);
        $("#frmPgAdm #n_controle").html(n_controle);
        $("#frmPgAdm #data_pg").html(data_pg);
        $("#frmPgAdm #data").html(data);
        $("#frmPgAdm #obs").val(obs);
        $("#frmPgAdm #anexo").attr('src', comprovante);

        $("#ComprovantePg").modal('toggle');

    });
}

function editFat(id) {
    var valor    = $("#frmEditFat #valor").val();
    var validade = $("#frmEditFat #validade").val();
    var data_pg  = $("#frmEditFat #data_pg").val();
    var forma_pg = $("#frmEditFat #forma_pg option:selected").val();
    var valor    = $("#frmEditFat #valor").val();
    var tipo     = $("#frmEditFat #tipo option:selected").val();
    var status   = $("#frmEditFat #status option:selected").val();
    var obs      = $("#frmEditFat #obs").val();

    var data = {
        "valor": valor,
        "validade": validade,
        "data_pg": dateToEN(data_pg),
        "forma_pg": forma_pg,
        "valor": valor,
        "tipo": tipo,
        "obs": obs,
        "status": status
    };

    getDadosPut('Admin/faturas/' + id, data, function(res) {

        if(res.msg){
            alert(res.msg);
        } else {
            alert('Ocorreu um erro ao editar a fatura');
        }
        listarFaturas();

    });

}

function editUsuario(id) {
    var id       = $("#editUsuario #id").val();
    var email    = $("#editUsuario #email").val();
    var nsenha   = $("#editUsuario #senha").val();
    var tipo     = $("#editUsuario #tipo option:selected").val();
    var status   = $("#editUsuario #status option:selected").val();
    var valor    = $("#editUsuario #valor").val();
    var inicio   = dateToEN($("#editUsuario #inicio").val());
    var fim      = dateToEN($("#editUsuario #fim").val());

    var data = {
        "id": id,
        "email": email,
        "nsenha": nsenha,
        "tipo": tipo,
        "status": status,
        "valor": valor,
        "inicio": inicio,
        "fim": fim
    };

    getDadosPut('Admin/usuarios/' + id, data, function(res) {
        if(res.error) {
            if(res.res.email) {
                alert(res.res.email);
            } else {
                alert(res.res);
            }
        } else {
            alert('Usuario alterado com sucesso!');
            console.log(res);
        }
        // if (res.data) {
        //     //var usuarios = res.data;
        //
        //     box.css('visibility', 'visible')
        //         .animate({opacity: 1.0, left: '0'}, 200);
        //
        // } else {
        //     // document.location = './Sair';
        // }


        //console.log(res);
    });

    //alert('pesquisar usuario');
}

function doTruncarStr(str, size){
    if (str==undefined || str=='undefined' || str =='' || size==undefined || size=='undefined' || size ==''){
        return str;
    }

    var shortText = str;
    if(str.length >= size+3){
        shortText = str.substring(0, size).concat('...');
    }
    return shortText;
}

function gerarStatusFat(status) {
    if (status === 1) {
        status = 'Pago';
    } else if (status === 2) {
        status = 'Aguardando Pagamento';
    } else if (status === 3) {
        status = 'Cancelada';
    } else if (status === 4) {
        status = 'Comprovante enviado';
    } else if (status === 5) {
        status = 'Em análise';
    } else {
        status = '-'
    }
    return status;
}

function gerarFormaPg(pg) {
    if (pg === 0) {
        pg = 'Deposito bancário';
    }else if (pg === 1) {
        pg = 'Deposito bancário';
    } else if (pg === 2) {
        pg = 'Transferência bancária';
    } else if (pg === 3) {
        pg = 'Boleto bancário';
    } else if (pg === 4) {
        pg = 'Bitcoin';
    } else {
        pg = '-'
    }
    return pg;
}


function getSystem() {

    box = $("#content");
    box.css('right', '-100%');
    box.css('margin-left', '24%');
    box.css('visibility', 'visible')
        .animate({opacity: 1.0, left: '0'}, 500);

    getDadosGet('Admin/inicial', function(res) {
        if(!res.count.usuarios) {
            alert('sessao invalida!');
        }

        $("#totalFaturas").html(res.count.faturas);
        $("#totalUsuarios").html(res.count.usuarios);
        $("#totalMensagem").html(res.count.mensagens);
        $("#totalOnline").html(res.count.online);

        if (res.online) {
            var online = res.online;
            $.each(online , function(index, val) {
                var row = `<tr>
                	<td scope="row">${val['usuario']}</td>
                	<td>${val['ip']}</td>
                	<td title="${val['navegador']}">${doTruncarStr(val['navegador'], 40)}</td>
                	<td>
                	    <div class="btn-group" id="bntFathover">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" onclick="">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" style="left: -150px;" onclick="">
                           
                                <li>
                                    <a href="#EditarUsurio" onclick="editarUsuario(${val['id_usuario']});">Perfil Usuario</a>
                                </li>
                                <li>
                                    <a href="#EditarUsurio" onclick="criarFatura(${val['id_usuario']});">Criar Fatura</a>
                                </li>
                                <li>
                                    <a href="#Deslogar" onclick="Deslogar(${val['id_usuario']});">Deslogar</a>
                                </li>
                                <li>
                                    <a href="#Bloquear" onclick="">Bloquear</a>
                                </li>
                            </ul>
                	    </div>
                    </td>
                	</tr>`;
                $('table#resOnline').append($(row));
            });
        }

        if (res.faturas) {

            var faturas = res.faturas;

            $.each(faturas , function(index, val) {
                var row2 = `<tr>
                	<td scope="row">${val['usuario']}</td>
                	<td>${val['valor']}</td>
                	<td>${dateToBR(val['data_pagamento'])}</td>
                	<td>${gerarStatusFat(val['status'])}</td>
                	<td>
                	    <div class="btn-group" id="bntFathover">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" onclick="">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu" style="left: -150px;" onclick="">
                                <li>
                                    <a href="#EditarFatura" onclick="editarFat(${val['id']});">Editar Fatura</a>
                                </li>
                                <li>
                                    <a href="#EditarUsurio" onclick="verComprovante(${val['id']});">Ver comprovante</a>
                                </li>
                                <li>
                                    <a href="#EditarUsurio" onclick="confirmarPg(${val['id']});">Ativar fatura e cad</a>
                                </li>
                                <li>
                                    <a href="#EditarUsurio" onclick="editarUsuario(${val['id_usuario']});">Editar Cadastro</a>
                                </li>
                                <li>
                                    <a href="#Deslogar" onclick="Deslogar(${val['id_usuario']})">Deslogar</a>
                                </li>
                                <!--<li>-->
                                    <!--<a href="#Bloquear" onclick="">Bloquear</a>-->
                                <!--</li>-->
                            </ul>
                	    </div>
                    </td>
                	</tr>`;
                $('table#resFatPendentes').append($(row2));
            });
        }

        box.css('visibility', 'visible')
            .animate({opacity: 1.0, left: '0'}, 200);

        });

    var pgMain2 = `
 				 <!-- Page Content Holder -->
			    <div id="content-fluid">
				    <div class="row">

                        <div class="col-md-12">
                        <div class="btn-group btn-group-lg" style="display:block; padding-left: 0.5%; width: 46.5%; margin-left: auto; margin-right: auto; overflow: hidden;">
                            <button class="btn btn-primary" type="button" onclick="listarUsuarios();">
                              Usuarios<br></br> <span class="badge" id="totalUsuarios">0</span>
                            </button>
                            <button class="btn btn-primary" type="button" onclick="listarFaturas();">
                              Faturas<br></br> <span class="badge" id="totalFaturas">0</span>
                            </button>
                            <button class="btn btn-primary" type="button" onclick="listarMensagens();">
                              Mensagens<br></br> <span class="badge" id="totalMensagem">0</span>
                            </button>
                            <button class="btn btn-primary" type="button" onclick="listarOnline();">
                              Online<br></br> <span class="badge" id="totalOnline">0</span>
                            </button>
                        </div>
                            <br/>               
                            <br/>
                        </div>
				    
				    
                        <div class="col-md-6">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    Faturas pendentes
                                </div>
                                <table class="table table-hover" id="resFatPendentes">
                                        <thead>
                                            <tr>
                                                <th>Usuario</th>
                                                <th>Valor</th>
                                                <th>Data Pag</th>
                                                <th>Status</th>
                                                <th>Opcoes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody> 
                                </table>
                            </div>                        
                        </div>
                           
                        <div class="col-md-6">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    Usuarios Online
                                </div>
                                <table class="table table-hover" id="resOnline">
                                        <thead>
                                            <tr>
                                                <th>Usuario</th>
                                                <th>IP</th>
                                                <th>Navegador</th>
                                                <th>Opcoes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody> 
                                </table>
                            </div>                        
                        </div>

                        <div class="col-md-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                     Statisticas de entradas
                                </div>
                                <table class="table table-hover" id="resStatisticaEntrada">
                                        <thead>
                                            <tr>
                                                <th>Informações</th>
                                                <th>Hoje</th>
                                                <th>Ontem</th>
                                                <th>Este mês</th>
                                                <th>Mês passado</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>                                            
                                        </tbody> 
                                </table>
                            </div>                        
                        </div>

                        <div class="col-md-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                     Statisticas dos servicos
                                </div>
                                <table class="table table-hover" id="resStatisticaSaida">
                                        <thead>
                                            <tr>
                                                <th>Informações</th>
                                                <th>Hoje</th>
                                                <th>Ontem</th>
                                                <th>Este mês</th>
                                                <th>Mês passado</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody> 
                                </table>
                            </div>                        
                        </div>

                        <!--                        
                        <div class="col-md-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                     Statisticas da empresa
                                </div>
                                <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Informações</th>
                                                <th>Hoje</th>
                                                <th>Ontem</th>
                                                <th>Este mês</th>
                                                <th>Mês passado</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Renda</th>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                            </tr>
                                            <tr>
                                                <th>Fornecedor</th>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                            </tr>
                                            <tr>
                                                <th>Contratação</th>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                            </tr>
                                            <tr>
                                                <th>Renovação</th>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                            </tr>
                                            <tr>
                                                <th>Extras</th>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                            </tr>
                                            <tr>
                                                <th>Faturas</th>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                            </tr>
                                            <tr>
                                                <th>Gastos</th>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                            </tr>
                                            <tr>
                                                <th>SubTotal</th>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                                <td>R$: 0.00</td>
                                            </tr>
                                        </tbody> 
                                </table>
                            </div>                        
                        </div>
                        -->
                        
                        
                    </div>
			    </div>

                

                `;

    box.html(pgMain2 + layComprovante());

    getDadosGet('Admin/info/entrada', function(res) {
        var result = `
                <tr>
                    <th>Conta bancaria</th>
                    <td title="${res.conta_bancaria.hoje.total} Faturas">R$: ${res.conta_bancaria.hoje.valor}</td>
                    <td title="${res.conta_bancaria.ontem.total} Faturas">R$: ${res.conta_bancaria.ontem.valor}</td>
                    <td title="${res.conta_bancaria.mes.total} Faturas">R$: ${res.conta_bancaria.mes.valor}</td>
                    <td title="${res.conta_bancaria.mesPassado.total} Faturas">R$: ${res.conta_bancaria.mesPassado.valor}</td>
                    <td title="${res.conta_bancaria.total.total} Faturas">R$: ${res.conta_bancaria.total.valor}</td>
                </tr>
                <tr>
                    <th>Deposito bancario</th>
                    <td title="${res.deposito_bancario.hoje.total} Faturas">R$: ${res.deposito_bancario.hoje.valor}</td>
                    <td title="${res.deposito_bancario.ontem.total} Faturas">R$: ${res.deposito_bancario.ontem.valor}</td>
                    <td title="${res.deposito_bancario.mes.total} Faturas">R$: ${res.deposito_bancario.mes.valor}</td>
                    <td title="${res.deposito_bancario.mesPassado.total} Faturas">R$: ${res.deposito_bancario.mesPassado.valor}</td>
                    <td title="${res.deposito_bancario.total.total} Faturas">R$: ${res.deposito_bancario.total.valor}</td>
                </tr>
                <tr>
                    <th>Sub Total</th>
                    <td title="${res.sub_total.hoje.total} Faturas">R$: ${res.sub_total.hoje.valor}</td>
                    <td title="${res.sub_total.ontem.total} Faturas">R$: ${res.sub_total.ontem.valor}</td>
                    <td title="${res.sub_total.mes.total} Faturas">R$: ${res.sub_total.mes.valor}</td>
                    <td title="${res.sub_total.mesPassado.total} Faturas">R$: ${res.sub_total.mesPassado.valor}</td>
                    <td title="${res.sub_total.total.total} Faturas">R$: ${res.sub_total.total.valor}</td>
                </tr>

        `;
       $('#resStatisticaEntrada tbody').html(result);
    
    });


    getDadosGet('Admin/info/saida', function(res) {
        console.log(res);

        $.each(res , function(index, val) {
            console.log(index);
            var row = `

                    <tr>
                        <th>${index}</th>
                        <td>${val['hoje']}</td>
                        <td>${val['ontem']}</td>
                        <td>${val['mes']}</td>
                        <td>${val['mesPassado']}</td>
                        <td>${val['hoje']}</td>
                    </tr>
            `;
            $('#resStatisticaSaida tbody').append($(row));
        });


        var result = `
                <tr>
                    <th>Conta bancaria</th>
                    <td title="${res.conta_bancaria.hoje.total} Faturas">R$: ${res.conta_bancaria.hoje.valor}</td>
                    <td title="${res.conta_bancaria.ontem.total} Faturas">R$: ${res.conta_bancaria.ontem.valor}</td>
                    <td title="${res.conta_bancaria.mes.total} Faturas">R$: ${res.conta_bancaria.mes.valor}</td>
                    <td title="${res.conta_bancaria.mesPassado.total} Faturas">R$: ${res.conta_bancaria.mesPassado.valor}</td>
                    <td title="${res.conta_bancaria.total.total} Faturas">R$: ${res.conta_bancaria.total.valor}</td>
                </tr>
                <tr>
                    <th>Deposito bancario</th>
                    <td title="${res.deposito_bancario.hoje.total} Faturas">R$: ${res.deposito_bancario.hoje.valor}</td>
                    <td title="${res.deposito_bancario.ontem.total} Faturas">R$: ${res.deposito_bancario.ontem.valor}</td>
                    <td title="${res.deposito_bancario.mes.total} Faturas">R$: ${res.deposito_bancario.mes.valor}</td>
                    <td title="${res.deposito_bancario.mesPassado.total} Faturas">R$: ${res.deposito_bancario.mesPassado.valor}</td>
                    <td title="${res.deposito_bancario.total.total} Faturas">R$: ${res.deposito_bancario.total.valor}</td>
                </tr>
                <tr>
                    <th>Total</th>
                    <td title="${res.sub_total.hoje.total} Faturas">R$: ${res.sub_total.hoje.valor}</td>
                    <td title="${res.sub_total.ontem.total} Faturas">R$: ${res.sub_total.ontem.valor}</td>
                    <td title="${res.sub_total.mes.total} Faturas">R$: ${res.sub_total.mes.valor}</td>
                    <td title="${res.sub_total.mesPassado.total} Faturas">R$: ${res.sub_total.mesPassado.valor}</td>
                    <td title="${res.sub_total.total.total} Faturas">R$: ${res.sub_total.total.valor}</td>
                </tr>

        `;
       $('#resStatisticaEntrada tbody').html(result);
    
    });






    //if (res.data) {
    //     $("#totalFatCad").html(res.total);
    //         var usuarios = res.data;
    //         $.each(usuarios , function(index, val) {
    //             var row = `<tr>
    //               <td scope="row">${val['id']}</td>
    //               <td>${val['usuario']}</td>
    //               <td>${gerarTipo(val['tipo'])}</td>
    //               <td>R$: ${val['valor']}</td>
    //               <td>${val['validade']} Dias</td>
    //               <td>${gerarFormaPg(val['forma_pg'])}</td>
    //               <td>${dateToBR(val['data_pagamento'])}</td>
    //               <td>${gerarStatusFat(val['status'])}</td>
    //               <td>
    //                   <div class="btn-group" id="bntFathover">
    //                         <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" onclick="">
    //                             <span class="caret"></span>
    //                         </button>
    //                         <ul class="dropdown-menu" role="menu" style="left: -150px;" onclick="">
    //                             <li>
    //                                 <a href="#EditarUsurio" onclick="editarFat(${val['id']});">Editar</a>
    //                             </li>
    //                             <li>
    //                                 <a href="#ComprovantePg" onclick="verComprovante(${val['id']});">Ver Comprovante</a>
    //                             </li>
    //                             <li>
    //                                 <a href="#EditarUsurio" onclick="editarUsuario(${val['id_usuario']});">Editar Usuario</a>
    //                             </li>
    //                             <li>
    //                                 <a href="#EditarUsurio" onclick="confirmarPg(${val['id']});">Ativar fat/Pag ok</a>
    //                             </li>
    //                             <li>
    //                                 <a href="#DeletarFat" onclick="deletarFat(${val['id']});">Deletar</a>
    //                             </li>
    //                         </ul>
    //                   </div>
    //             </td>
    //         </tr>`;
    //     $('table#listUsuarios').append($(row));
    // });
//resStatisticaEntrada

}

function layComprovante() {
    var res = `    
                <div class="modal fade" id="ComprovantePg" tabindex="-1" role="dialog" aria-labelledby="ComprovantePg" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Comprovante de Pagamento</h4>
                      </div>
                      <div class="modal-body" id="bodyInfPag">
                                <form name="frmPgAdm" id="frmPgAdm">
                                    <input type="hidden" id="id" name="id" value="">
                                    <div class="form-group">
                                        <label>Banco:</label> 
                                        <span id="banco"></span>
                                    </div>					
                
                                    <div class="form-group">
                                        <label>Valor pago:</label> 
                                        <span id="valor"></span>
                                    </div>					
                                    <div class="form-group">
                                        <label>N doc:</label> 
                                        <span id="n_doc"></span>
                                    </div>					
                                    <div class="form-group">
                                        <label>N controle:</label> 
                                        <span id="n_controle"></span>
                                    </div>					
                                    <div class="form-group">
                                        <label>Data pagamento:</label> 
                                        <span id="data_pg"></span>
                                    </div>					
                                    <div class="form-group">
                                        <label>Data envio:</label> 
                                        <span id="data"></span>
                                    </div>					
                                    <div class="form-group">
                                        <label>Obs:</label> 
                                        <textarea class="form-control" id="obs" name="obs"></textarea>
                                    </div>					
                                    <div class="form-group">
                                        <label>Anexo:</label> 
                                        <center><img src="" id="anexo" width="60%"></center>
                                    </div>					
                                </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" onclick="confirmarPg();" class="btn btn-primary">Confirmar Pagamento</button>
                        <button type="button" onclick="pgemAnalise();" class="btn btn-primary">Em analise</button>
                        <button type="button" onclick="closePanel('ComprovantePg');" class="btn btn-primary">Fechar</button>
                      </div>
                    </div>
                  </div>
                </div>
                `;
    return res;
}

$(function(){


    menu = $(".menu");
    menu.css('left', '-100%');
    menu.css('visibility', 'visible')
        .animate({opacity: 1.0, left: '0'}, 500);

    getSystem();


});


