
var servicos = {
    "servico": [
        {
            "nome": "BCFone",
            "imagem": "images/servicos/BCFone.jpg",
            "titulo": "BC Fone",
            "Descricao": "...",
            "Tipo": "1"
        },
        {
            "nome": "BuscaCNH",
            "imagem": "images/servicos/BuscaCNH.jpg",
            "titulo": "Busca CNH",
            "Descricao": "...",
            "Tipo": "1"
        },
        {
            "nome": "BuscaMix",
            "imagem": "images/servicos/BuscaMix.jpg",
            "titulo": "Busca Mix",
            "Descricao": "...",
            "Tipo": "1"
        },
        {
            "nome": "BuscaVeiculo",
            "imagem": "images/servicos/BuscaVeiculo.jpg",
            "titulo": "Busca Veiculo",
            "Descricao": "...",
            "Tipo": "1"
        },
        {
            "nome": "Catta",
            "imagem": "images/servicos/Catta.jpg",
            "titulo": "Catta",
            "Descricao": "...",
            "Tipo": "1"
        },		{
            "nome": "Confirme-online",
            "imagem": "images/servicos/Confirme-online.jpg",
            "titulo": "Confirme online",
            "Descricao": "...",
            "Tipo": "1"
        },		{
            "nome": "Credd",
            "imagem": "images/servicos/Credd.jpg",
            "titulo": "Credd",
            "Descricao": "...",
            "Tipo": "1"
        },		{
            "nome": "DLocaliza",
            "imagem": "images/servicos/DLocaliza.jpg",
            "titulo": "DLocaliza",
            "Descricao": "...",
            "Tipo": "2"
        },		{
            "nome": "EquifaxCNPJ",
            "imagem": "images/servicos/EquifaxCNPJ.jpg",
            "titulo": "Equifax CNPJ",
            "Descricao": "...",
            "Tipo": "2"
        },		{
            "nome": "EquifaxCpf",
            "imagem": "images/servicos/EquifaxCpf.jpg",
            "titulo": "Equifax Cpf",
            "Descricao": "...",
            "Tipo": "2"
        },
        {
            "nome": "HisconPre",
            "imagem": "images/servicos/HisconPre.jpg",
            "titulo": "Hiscon Pre",
            "Descricao": "...",
            "Tipo": "2"
        },		{
            "nome": "InfoBusca2",
            "imagem": "images/servicos/InfoBusca2.jpg",
            "titulo": "InfoBusca 2",
            "Descricao": "...",
            "Tipo": "2"
        },		{
            "nome": "InfoConsulta",
            "imagem": "images/servicos/InfoConsulta.jpg",
            "titulo": "Info Consulta",
            "Descricao": "...",
            "Tipo": "2"
        },		{
            "nome": "LibBureauPre",
            "imagem": "images/servicos/LibBureauPre.jpg",
            "titulo": "Bureau Pre",
            "Descricao": "...",
            "Tipo": "2"
        },
        {
            "nome": "LibConcentrePre",
            "imagem": "images/servicos/LibConcentrePre.jpg",
            "titulo": "Concentre Pre",
            "Descricao": "...",
            "Tipo": "3"
        },		{
            "nome": "Localizar",
            "imagem": "images/servicos/Localizar.jpg",
            "titulo": "Localizar",
            "Descricao": "...",
            "Tipo": "3"
        },		{
            "nome": "Recupera",
            "imagem": "images/servicos/Recupera.jpg",
            "titulo": "Recupera",
            "Descricao": "...",
            "Tipo": "3"
        },		{
            "nome": "Natt",
            "imagem": "images/servicos/Natt.jpg",
            "titulo": "Natt",
            "Descricao": "...",
            "Tipo": "3"
        },		{
            "nome": "Procob",
            "imagem": "images/servicos/Procob.jpg",
            "titulo": "Procob",
            "Descricao": "...",
            "Tipo": "3"
        },		{
            "nome": "Upbusca2",
            "imagem": "images/servicos/Upbusca2.jpg",
            "titulo": "Upbusca 2",
            "Descricao": "...",
            "Tipo": "3"
        },		{
            "nome": "UpBuscaPJPro",
            "imagem": "images/servicos/UpBuscaPJPro.jpg",
            "titulo": "UpBusca PJ Pro",
            "Descricao": "...",
            "Tipo": "3"
        },		{
            "nome": "ZipOnline",
            "imagem": "images/servicos/ZipOnline.jpg",
            "titulo": "Zip Online",
            "Descricao": "...",
            "Tipo": "3"
        }
    ]
}

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

function getConfig(callback) {

    var token = getCookie('token');

    $.ajax({
        method : "GET",
        url : "Painel/Config",
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

function getConsumo(callback) {

    var token = getCookie('token');

    $.ajax({
        method : "GET",
        url : "Painel/Consumo",
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

function getServico(servico, callback) {

    var token = getCookie('token');

    $.ajax({
        method : "GET",
        url : "Servico/" + servico,
        timeout: 8000,
        headers: {"Authorization": "Bearer " + token}
    }).done(function(res) {
        callback(res);
    }).fail(function() {
        callback('error');
    });
}


function altSenhafunc(senha, nsenha, callback) {

    var token = getCookie('token');

    $.ajax({
        method : "POST",
        url : "Painel/Cadastro",
        data: {senha: senha, nsenha: nsenha},
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

function getLogs(callback) {

    var token = getCookie('token');

    $.ajax({
        method : "GET",
        url : "Painel/Logs",
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


function getFaturas(callback) {

    var token = getCookie('token');

    $.ajax({
        method : "GET",
        url : "Painel/Faturas",
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

function getFormaPg(id=null, idfat=null, callback) {

    var token = getCookie('token');
    var url = 'Painel/FormaPagamento';

    if(id) {
        url = 'Painel/FormaPagamento/' + id + '/' + idfat;
    }
    $.ajax({
        method : "GET",
        url : url,
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


function getServAll() {
    var servicosAll = '';
    for (i=0; i < servicos['servico'].length; i++) {

        var tiposvlop = servicos['servico'][i]['tipo'];

        var dados = servicos['servico'][i];
        var nomesv = servicos['servico'][i]['nome'];
        var imagem = servicos['servico'][i]['imagem'];
        var titulo = servicos['servico'][i]['titulo'];
        var descricao = servicos['servico'][i]['descricao'];
        servicosAll += `<option value="${nomesv}">${titulo}</option>`;
    }
    return servicosAll;
}

function openSvAll(obj) {
    alert('mostrar tela para consultar dados do servico ' + obj);
}

function encodeImagetoBase64(element) {
    var file   = element.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        $("#comprovante").val(reader.result);
    }

    reader.readAsDataURL(file);
}


function getServCredito(servicos) {
    //console.log(servicos);
    var servicosCredito = '';
    //console.log(servicos['servico'][i]['nome']);
    for (i=0; i < servicos.length; i++) {
        var tiposvlop = servicos[i]['tipo'];

        if (tiposvlop == 1) {
            var dados = servicos[i];
            var nomesv = servicos[i]['servico'];
            var imagem = nomesv + '.jpg';
            var titulo = servicos[i]['servico'];

            servicosCredito += `<li class="top-site-outer">
				<div class="top-site-inner">
					<a href="#${nomesv}" onclick="openService('${nomesv}')" title="${titulo}">
						<div class="tile" aria-hidden="true">
							<div class="screenshot active">
								<img src="images/servicos/${imagem}"/>
							</div>
						</div>
						<div class="title">
							<span dir="auto">${titulo}</span>
						</div>
					</a>
				</div>
			</li>`;
        }
    }
    return servicosCredito;
}

//var servicosCredito = getServCredito(servicos);

function getServCadastral(servicos) {
    var servicosCadastral = '';
    for (i=0; i < servicos.length; i++) {

        var tiposvlop = servicos[i]['tipo'];

        if (tiposvlop == 2) {
            var dados = servicos[i];
            var nomesv = servicos[i]['servico'];
            var imagem = nomesv + '.jpg';
            var titulo = servicos[i]['servico'];
            servicosCadastral += `<li class="top-site-outer">
				<div class="top-site-inner">
					<a href="#${nomesv}" onclick="openService('${nomesv}')" title="${titulo}">
						<div class="tile" aria-hidden="true">
							<div class="screenshot active">
								<img src="images/servicos/${imagem}"/>
							</div>
						</div>
						<div class="title">
							<span dir="auto">${titulo}</span>
						</div>
					</a>
				</div>
			</li>`;
        }
    }
    return servicosCadastral;
}

//var servicosCadastral = getServCadastral(servicos);

function getServOutros(servicos) {
    var servicosOutros = '';
    for (i=0; i < servicos.length; i++) {

        var tiposvlop = servicos[i]['tipo'];

        if (tiposvlop == 3) {
            var dados = servicos[i];
            var nomesv = servicos[i]['servico'];
            var imagem = nomesv + '.jpg';
            var titulo = servicos[i]['servico'];

            servicosOutros += `<li class="top-site-outer">
				<div class="top-site-inner">
					<a href="#${nomesv}" onclick="openService('${nomesv}')" title="${titulo}">
						<div class="tile" aria-hidden="true">
							<div class="screenshot active">
								<img src="images/servicos/${imagem}" title="${titulo}"/>
							</div>
						</div>
						<div class="title">
							<span dir="auto">${titulo}</span>
						</div>
					</a>
				</div>
			</li>`;
        }
    }
    return servicosOutros;
}

function getFormasPg(servicos) {
    var formasPg = '';
    servicos = servicos.dados;
    for (i=0; i < servicos.length; i++) {

        var dados = servicos[i];
        var idd    = servicos[i]['id'];
        var nomesv = servicos[i]['gateway'];
        var imagem = servicos[i]['imagem'];
        var titulo = servicos[i]['nome'];

        formasPg += `<li class="top-site-outer">
				<div class="top-site-inner">
					<a href="#${nomesv}" onclick="openDadosBancarios('${idd}')" title="${titulo}">
						<div class="tile" aria-hidden="true">
							<div class="screenshot active">
								<img src="${imagem}" title="${titulo}"/>
							</div>
						</div>
						<div class="title">
							<span dir="auto">${titulo}</span>
						</div>
					</a>
				</div>
			</li>`;
    }
    return formasPg;
}

function openDadosBancarios(id) {
    $("#DadosBancarios").modal();
    $("#idBanco").val(id);
    var idfat = $("#idFatAtiv").val();

    getFormaPg(id, idfat, function(res) {
        if(res.dados) {
            $("#labelDadosBancarios").html('' + res.gateway);
            $("#bodyDadosBancarios").html("");
            $("#bodyDadosBancarios").append('<pre>' + res.dados + '</pre>');
        }
    });
}

//var servicosOutros = getServOutros();

function filtroServicos(tipo) {
    var servCredito   = $("#servCredito");
    var servCadastral = $("#servCadastral");
    var servOutros    = $("#servOutros");

    if (tipo === 'Credito') {
        servCredito.show();
        servCadastral.hide();
        servOutros.hide();

    } else if (tipo === 'Dados') {
        servCredito.hide();
        servCadastral.show();
        $("#servCadastral .form-check").show();
        servOutros.hide();

    } else if (tipo === 'Outros') {

        servCredito.hide();
        servCadastral.hide();
        servOutros.show();
        $("#servOutros .form-check").show();

    } else {

        servCredito.show();
        servCadastral.show();
        $("#servCadastral .form-check").hide();
        servOutros.show();
        $("#servOutros .form-check").hide();

    }



    console.log(tipo);
}

pgMain = `
  <!-- Page Content Holder -->
  <div id="content-fluid">

		<div class="col-md-12 col-lg-12" style="float:none;">

			<div id="servCredito">
				<div class="row" style="overflow:hidden; margin-top:2.8%">
					<h3 style="width: 400px; float:left">Consulta ao credito
						<span class="badge badge-secondary">
							<span class="	glyphicon glyphicon-sort"></span>
						</span>
					</h3>
					<div class="form-check" style="width: 19%; margin-top:1.4%; margin-bottom:1%; float:right;">			
						<select class="form-control form-control-sm" onchange="filtroServicos( this.value );">
			  		<option value="Todos">Ver Todos</option>
			  		<option value="Credito">Consulta ao Credito</option>
			  		<option value="Dados">Consulta Dados cadastrais</option>
			  		<option value="Outros">Outros</option>
						</select>
					</div>
					<hr style="clear:both">				
				</div>	
			
			<ul class="top-sites-list">
			
			
			
			</ul>
			</div>








			<div id="servCadastral">
				<div class="row" style="overflow:hidden; margin-top:2.8%">
					<h3 style="width: 400px; float:left">Consultar dados cadastrais
						<span class="badge badge-secondary">
							<span class="	glyphicon glyphicon-sort"></span>
						</span>
					</h3>
					<div class="form-check" style="width: 19%; margin-top:1.4%; margin-bottom:1%; float:right;">			
						<select class="form-control form-control-sm" onchange="filtroServicos( this.value );">
			  		<option value="Todos">Ver Todos</option>
			  		<option value="Credito">Consulta ao Credito</option>
			  		<option value="Dados">Consulta Dados cadastrais</option>
			  		<option value="Outros">Outros</option>
						</select>
					</div>
					<hr style="clear:both">				
				</div>	
			
			<ul class="top-sites-list">
			
			
			
			</ul>
			</div>








			<div id="servOutros">
				<div class="row" style="overflow:hidden; margin-top:2.8%">
					<h3 style="width: 400px; float:left">Outras consultas
						<span class="badge badge-secondary">
							<span class="	glyphicon glyphicon-sort"></span>
						</span>
					</h3>
					<div class="form-check" style="width: 19%; margin-top:1.4%; margin-bottom:1%; float:right;">			
						<select class="form-control form-control-sm" onchange="filtroServicos( this.value );">
			  		<option value="Todos">Ver Todos</option>
			  		<option value="Credito">Consulta ao Credito</option>
			  		<option value="Dados">Consulta Dados cadastrais</option>
			  		<option value="Outros">Outros</option>
						</select>
					</div>
					<hr style="clear:both">				
				</div>	
			
			<ul class="top-sites-list">
			
			
			
			</ul>
			</div>
			
		</div>`;

var servicosAll = getServAll();

pgConsumo = `
<div class="panel panel-default">
  <!-- Default panel contents -->
  <div class="panel-heading">

	 	<h4>Consumo</h4>
 	</div>
 
<div class="panel-body">
 <h4 style="margin-left:0.5%;" id="tilCon">Mensal.</h4>
  <!-- Table -->
 	<table class="table table-striped" id="resConsumo">
  <thead>
    <tr>
      <th scope="col">Serviço</th>
      <th scope="col">Limite</th>
      <th scope="col">Usado</th> 
    </tr>
  </thead>
  <tbody>
  
  </tbody>
</table>	
  </div>
 </div>
  
`;

function altSenha() {
    var senha  = $("input#senha").val();
    var nsenha = $("input#novasenha").val();

    if(senha.length > 3) {
        if(nsenha.length > 3) {

            altSenhafunc(senha, nsenha, function(res) {
                if(res.msg) {
                    alert(res.msg);
                }
                console.log(res);
            });


        }
    }

}
function openCadastro() {
    var box = $("#content");
    box.animate({ opacity: 0}, 200);

    var pgCadastro = `
	<div class="panel panel-default">
	  <!-- Default panel contents -->
	  <div class="panel-heading">
	
			<h4>Dados cadastrais</h4>
		</div>
 
		<div class="panel-body">
		 
		 
		 
		<form action="javascript::void(0)" method="POST">
		  <div class="form-group">
			<label for="exampleInputEmail1">Usuario</label>
			<input type="text" class="form-control" id="usuario" name="usuario" value="" disabled="">
		  </div>
		  <div class="form-group">
			<label for="exampleInputEmail1">E-mail</label>
			<input type="text" class="form-control" id="email" name="email" value="" disabled="">
		  </div>
		  <div class="form-group">
			<label for="exampleInputPassword1">Senha</label>
			<input type="password" class="form-control" id="senha" name="senha" placeholder="******">
		  </div>
		  <div class="form-group">
			<label for="exampleInputPassword1">Nova senha</label>
			<input type="password" class="form-control" id="novasenha" name="novasenha" placeholder="Digite sua nova senha">
		  </div>
		  <button type="submit" id="AltSenha" onclick="altSenha()" class="btn btn-default">Alterar senha</button>
		</form>
			 <br/>
			 <br/>
		 <h4 style="margin-left:0.5%;">Logs de acesso.</h4>
		  <!-- Table -->
			<table class="table table-striped" id="logs">
		  <thead>
			<tr>
			  <th scope="col">IP</th>
			  <th scope="col">Navegador</th>
			  <th scope="col">Data</th> 
			</tr>
		  </thead>
		  <tbody>
		  </tbody>
		</table>	
		  </div>
		 </div>
		  
	`;

    getLogs(function(res) {

        box.html("");
        box.html(pgCadastro);

        if (res.logs) {
            var logs = res.logs;
            $.each(logs , function(index, val) {
                var row = `<tr>
                	<td scope="row">${val['ip']}</td>
                	<td>${val['navegador']}</td>
               	 	<td>${dateToBR(val['created_at'])}</td>
                	</tr>`;
                $('table#logs').append($(row));
            });
            $("input#usuario").val(res.dados.usuario);
            $("input#email").val(res.dados.email);
            box.css('visibility', 'visible')
                .animate({ opacity: 1.0, left: '0'}, 200);

        } else {
            document.location = './Sair';
        }


    });

    return false;
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

function openFats() {
    var box = $("#content");
    //box.css('opacity', '0.0');

    // box.animate({opacity: 0}, 200);
    getFormaPg(null, null, function(res) {
        var formasPg = getFormasPg(res);

        var pgFat    = `

<input type="hidden" name="idFatAtiv" id="idFatAtiv" value=""/>
<div class="modal fade" id="DadosBancarios" tabindex="-1" role="dialog" aria-labelledby="DadosBancarios" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="labelDadosBancarios">Conta bancaria</h4>
        <input type="hidden" name="idBanco" id="idBanco" value=""/>
      </div>
      <div class="modal-body" id="bodyDadosBancarios">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-primary" onclick="informarPg();">Informar Pagamento</button>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="InformarPag" tabindex="-1" role="dialog" aria-labelledby="InformarPag" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Informar Pagamento</h4>
      </div>
      <div class="modal-body" id="bodyInfPag">
                <form name="frmPg" id="frmPg">
                	
					<div class="form-group">
						<label>Banco:</label> 
						<input type="text" class="form-control" id="valBanco" name="valBanco">
						<input type="hidden" name="valFat" id="valFat" value="">
					</div>					

					<div class="form-group">
						<label>Valor pago:</label> 
						<input type="text" class="form-control" id="valPago" name="valPago">
					</div>					
					<div class="form-group">
						<label>N doc:</label> 
						<input type="text" class="form-control" id="nDoc" name="nDoc">
					</div>					
					<div class="form-group">
						<label>N controle:</label> 
						<input type="text" class="form-control" id="nControle" name="nControle">
					</div>					
					<div class="form-group">
						<label>Data pagamento:</label> 
						<input type="text" class="form-control" id="dataPg" name="dataPg">
					</div>					
					<div class="form-group">
						<label>Obs:</label> 
						<textarea class="form-control" id="obs" name="obs"></textarea>
					</div>					
					<div class="form-group">
						<label>Anexa comprovante:</label> 
						<input type="hidden" name="comprovante" id="comprovante">
	                    <input type="file" name="image" onchange="encodeImagetoBase64(this)">
					</div>					
                </form>
      </div>
      <div class="modal-footer">
        <button type="button" onclick="enviarComprovante();" class="btn btn-primary">Enviar</button>
      </div>
    </div>
  </div>
</div>


<div class="panel panel-default">
  <!-- Default panel contents -->
  <div class="panel-heading">

	 	<h4>Faturas</h4>
 	</div>
	<div class="table-responsive">
		<table class="table table-striped table-responsive" id="faturas">
		  <thead>
			<tr>
			  <th scope="col">#ID</th>
			  <th scope="col">Tipo</th>
			  <th scope="col">Valor</th>
			  <th scope="col">Validade</th> 
			  <th scope="col">Forma pagamento</th>
			  <th scope="col">Data Pagamento</th>
			  <th scope="col">Status</th>
			  <th scope="col">Opcoes</th>
			</tr>
		  </thead>
		  <tbody>  
		  </tbody>
		</table>
	</div>
	
	
  </div>
  
  

			<div id="boxFormaPg">
				<div class="row" style="overflow:hidden; margin-top:2.8%">
					<h3 style="width: 400px; float:left">Formas de pagamento
						<span class="badge badge-secondary">
							<span class="	glyphicon glyphicon-sort"></span>
						</span>
					</h3>
					<hr style="clear:both">				
				</div>	
			
			<ul class="top-sites-list">
			
			${formasPg}
			</ul>
			</div>

  
		`;

        getFaturas(function(res) {

            box.html("");
            box.html(pgFat);


            if (res.faturas) {
                var faturas = res.faturas;
                $.each(faturas , function(index, val) {
                    var row = `<tr>
                	<td scope="row">${val['id']}</td>
                	<td>${gerarTipo(val['tipo'])}</td>
               	 	<td>R$ ${val['valor']}</td>
                	<td>${val['validade']} Dias</td>
                	<td>${gerarFormaPg(val['forma_pg'])}</td>
                	<td>${dateToBR(val['data_pagamento'])}</td>
                	<td>${gerarStatusFat(val['status'])}</td>
                	<td>${gerarOpcoes(val['status'], val['id'])}</td>
                	</tr>`;
                    $('table#faturas').append($(row));
                });

                box.css('visibility', 'visible')
                    .animate({opacity: 1.0, left: '0'}, 200);

            } else {
                document.location = './Sair';
            }


        });

    });



   //         box.show();
   return false;
}

function enviarComprovante() {

    var banco 		= $("#idBanco").val();
    var fatura 		= $("#valFat").val();
    var valor 		= $("#valPago").val();
    var nDoc 	    = $("#nDoc").val();
    var nControle   = $("#nControle").val();
    var dataPg 		= dateToEN($("#dataPg").val());
    var obs         = $("#obs").val();
    var comprovante = $("#comprovante").val();

    sendComprovant(banco, fatura, valor, nDoc, nControle, dataPg, obs, comprovante, function(res) {

        if (res.error === false) {
            $("#frmPg")[0].reset();
            $("#InformarPag").modal('toggle');

            alert(res.msg);
            openFats();
        } else {
            alert('Ocorreu um erro ao enviar o comprovante, tente novamente mais tarde.');
        }

    });
    window.location.reload();
    return false;
}

function enviarContato() {

    var nome 		= $("#conNome").val();
    var email 		= $("#conEmail").val();
    var assunto 	= $("#conAssunto").val();
    var mensagem 	= $("#conMensagem").val();

    sendContato(nome, email, assunto, mensagem, function(res) {
        alert(res.msg);

        if (res.error === false) {
            $("#frm")[0].reset();

        } else {
            alert('Ocorreu um erro ao enviar o comprovante, tente novamente mais tarde.');
        }
        $("#Contato").modal('toggle');

    });

    return false;
}


function sendContato(nome, email, assunto, mensagem, callback) {

    var token = getCookie('token');

    $.ajax({
        method : "POST",
        url : "Painel/Contato",
        data: {
            "nome":  nome,
            "email": email,
            "assunto": assunto,
            "mensagem":  mensagem
        },
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

function sendComprovant(banco, fatura, valor, nDoc, nControle, dataPg, obs, comprovante, callback) {

    var token = getCookie('token');

    $.ajax({
        method : "POST",
        url : "Painel/InformarPagamento",
        data: {
            "banco":  banco,
            "fatura": fatura,
            "valor":  valor,
            "n_doc":  nDoc,
            "data":   dataPg,
            "obs":    obs,
            "n_controle": nControle,
            "comprovante": comprovante
        },
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

function informarPg(id=null) {
    //abrir form para confirmar pagamento com upload.
    if(id === null) {
        id = $("#idFatAtiv").val();
        $("#DadosBancarios").modal('toggle');
    }
    $("#InformarPag").modal();

    $("#valFat").val(id);
}

function Pagar(id, banco) {
    $("#boxFormaPg").show();
    $("#idFatAtiv").val(id);

}

function gerarOpcoes(opcoes, id) {

    if (opcoes === 1) {
        opcoes = `-`;
    } else if (opcoes === 2) {
        opcoes = `<div class="btn-group" id="bntFathover"><button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" onclick="openOpcoes()"><span class="caret"></span></button><ul class="dropdown-menu" role="menu" style="left: -150px;" onclick="openOpcoes();"><li><a href="#InformarPagamento" onclick="Pagar(${id});">Pagar</a></li><li><a href="#InformarPagamento" onclick="informarPg(${id});">Informar Pagamento</a></li></ul></div>`;
    } else if (opcoes === 3) {
        opcoes = `-`;
    } else if (opcoes === 4) {
        opcoes = `-`;
    } else {
        opcoes = '-'
    }
    return opcoes;
}

function gerarTipo(tipo) {
    if (tipo === 1) {
        tipo = 'Contratação';
    } else if (tipo === 2) {
        tipo = 'Renovação';
    } else if (tipo === 3) {
        tipo = 'Adicional';
    } else if (tipo === 4) {
        tipo = 'Outros';
    } else if (tipo === 5) {
        tipo = 'Pre-Pago';
    } else if (tipo === 6) {
        tipo = 'Recarga Pre-Pago';
    } else {
        tipo = '-'
    }
    return tipo;
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
    if (pg === 1) {
        pg = 'Deposito bancário';
    } else if (tipo === 2) {
        pg = 'Transferência bancária';
    } else if (tipo === 3) {
        pg = 'Boleto bancário';
    } else if (tipo === 4) {
        pg = 'Bitcoin';
    } else {
        pg = '-'
    }
    return pg;
}

function openConsumo() {
    var box = $("#content");
    //box.css('opacity', '0.0');

    box.animate({opacity: 0}, 200);
    getConsumo(function(res) {
        box.html("");
        box.html(pgConsumo);

        if (res.mensal) {
            $("#tilCon").html("Mensal");
            var sv = res.mensal;
            $.each(sv , function(index, val) {
                if(val['valor'] != 0.00){
                var row = `<tr>
                    <td scope="row">${val['servico']}</td>
                    <td colspan="2"><span class="label label-danger">Pre-Pago R$: ${val['valor']} a unidade</span></td>
                    </tr>`;

                }else{
                var row = `<tr>
                    <td scope="row">${val['servico']}</td>
                    <td>${val['limite']}</td>
                    <td>${val['usado']}</td>
                    </tr>`;
                }
                $('table#resConsumo').append($(row));
            });

        }else if(res.diario){
            $("#tilCon").html("Diario");
            var sv = res.diario;
            $.each(sv , function(index, val) {
                if(val['valor'] != 0.00){
                var row = `<tr>
                    <td scope="row">${val['servico']}</td>
                    <td colspan="2"><span class="label label-danger">Pre-Pago R$: ${val['valor']} a unidade</span></td>
                    </tr>`;

                }else{
                var row = `<tr>
                    <td scope="row">${val['servico']}</td>
                    <td>${val['limite']}</td>
                    <td>${val['usado']}</td>
                    </tr>`;
                }
                $('table#resConsumo').append($(row));
            });


        } else {
            document.location = './Sair';
        }

            box.css('visibility', 'visible')
                .animate({ opacity: 1.0, left: '0'}, 200);

    });

    return false;
}

function ClosePanel() {
    var box = $("#content");
    //box.css('opacity', '0.0');

    box.animate({opacity: 0}, 200);


    getSystem();
}

function openContato() {
    var box = $("#Contato");
    //box.css('opacity', '0.0');

    box.animate({opacity: 0}, 200);

    setTimeout(function() {
        box.modal();
        box.css('visibility', 'visible')
            .animate({opacity: 1.0, left: '0'}, 200);

    }, 500)
    return false;

}

function openService(servico) {

    var box = $("#content");
    //box.css('opacity', '0.0');

    box.animate({opacity: 0}, 200);
    getServico(servico, function(res) {
        var result = res['body'];
        var nome = res['servico'];
        var sobre = res['sobre'];

        res = `
<div id="content-fluid">
    <div class="col-md-12 col-lg-12" style="">
	    <div class="row" style="overflow:hidden; margin-top:2.8%">
		    <h3 style="width: 400px; float:left; margin-top:20px">Serviço ${nome}
			    <span class="badge badge-secondary">
				    <span class="	glyphicon glyphicon-sort"></span>
				</span>
			</h3>
			<div class="form-check" style="width: 19%; margin-top:1.4%; margin-bottom:1%; float:right;">			
				<select class="form-control form-control-sm" onchange="openSvAll( this.value );">
			    ${servicosAll}
				</select>
			</div>
				
			<hr style="clear:both; margin-top: 2%; margin-bottom: 2%;">				
		</div>	
	<p style="overflow:hidden; width:60%; margin-left:1.5%; margin-bottom: 1.5%;">
	    ${sobre}
	</p>
	<button type="button" class="close bntclos" onclick="ClosePanel();">
        <span aria-hidden="true">×</span>
    </button>

	<div class="row">
	    <div class="blockServico" style="border: 1px solid #cecece; display: block; margin-left:1.5%; overflow: scroll"> 
		${result}
	 </div>
		
	</div>		
</div>

	`;

        box.html("");
        box.html(res);

        box.css('visibility', 'visible')
            .animate({opacity: 1.0, left: '0'}, 200);

    });
    return false;
}

function openMain() {

    var box = $("#content");
    //box.css('opacity', '0.0');

    box.animate({opacity: 0}, 200);

    getSystem();
    return false;
}

function openOpcoes() {
    $(".dropdown-menu").toggleClass("show","hide");
}

function getSystem() {
    getConfig(function(res) {
        if (res.dados) {
            var usuario  = res.dados.usuario;
            var revenda  = res.dados.revendedor;
            var sv = Object.values(res.servicos);
            var valor = res.dados.valor;
            var tipopl = res.dados.tipo;

            if(tipopl === 1){
                tipo = 'Mensal';
                $("#valorPlano").text('Valor Pago > R$: ' + valor);                
            }else if(tipopl === 2){
                tipo = 'Pre-Pago';
                $("#valorPlano").text('Saldo > R$: ' + valor);                
            } else{
                $("#boxTipPlan").hide();
                tipo = '-'
            }
            $("#ConfUsuario").text(usuario);
            $("#ConfRevenda").text(revenda);
            $("#tipoPlano").text(tipo);

            box = $("#content");
            box.css('right', '-100%');
            box.css('margin-left', '24%');
            box.css('visibility', 'visible')
                .animate({opacity: 1.0, left: '0'}, 500);

            if(sv.length === 0) {
                openFats();
                var pgMain2 = ` <div id="content-fluid">
					<div class="col-md-12 col-lg-12" style="float:none;">
						<div id="servCredito">
							<div class="row" style="overflow:hidden; margin-top:2.8%">
								<h3 style="width: 400px; float:left">Nenhum Servico encontrado.
								</h3>
						</div>	
					</div>

		
    
			    </div>`;
            } else {

                var credito = getServCredito(sv);
                var cadastral = getServCadastral(sv);
                var outros = getServOutros(sv);

                var pgMain2 = `
 				 <!-- Page Content Holder -->
				  <div id="content-fluid">
					<div class="col-md-12 col-lg-12">
						<div id="servCredito" style="display:none">
							<div class="row" style="overflow:hidden; margin-top:2.8%">
								<h3 style="width: 400px; float:left">Consulta ao credito
									<span class="badge badge-secondary">
										<span class="	glyphicon glyphicon-sort"></span>
									</span>
								</h3>
								<div class="form-check" style="width: 19%; margin-top:1.4%; margin-bottom:1%; float:right;">			
									<select class="form-control form-control-sm" onchange="filtroServicos( this.value );">
			  							<option value="Todos">Ver Todos</option>
			  							<option value="Credito">Consulta ao Credito</option>
			  							<option value="Dados">Consulta Dados cadastrais</option>
								  		<option value="Outros">Outros</option>
									</select>
								</div>
							<hr style="clear:both">				
						</div>	
						<ul class="top-sites-list">
							${credito}			
						</ul>
					</div>

					<div id="servCadastral">
						<div class="row" style="overflow:hidden; margin-top:2.8%">
							<h3 style="width: 400px; float:left">Consultar dados cadastrais
								<span class="badge badge-secondary">
									<span class="	glyphicon glyphicon-sort"></span>
								</span>
							</h3>
							<div class="form-check" style="width: 19%; margin-top:1.4%; margin-bottom:1%; float:right;">			
								<select class="form-control form-control-sm" onchange="filtroServicos( this.value );">
							  		<option value="Todos">Ver Todos</option>
							  		<option value="Credito">Consulta ao Credito</option>
			  						<option value="Dados">Consulta Dados cadastrais</option>
			  						<option value="Outros">Outros</option>
								</select>
							</div>
							<hr style="clear:both">				
						</div>	
			
						<ul class="top-sites-list">
							${cadastral}
						</ul>
					</div>

    			<div id="servOutros">
				<div class="row" style="overflow:hidden; margin-top:2.8%">
					<h3 style="width: 400px; float:left">Outras consultas
						<span class="badge badge-secondary">
							<span class="	glyphicon glyphicon-sort"></span>
						</span>
					</h3>
					<div class="form-check" style="width: 19%; margin-top:1.4%; margin-bottom:1%; float:right;">			
						<select class="form-control form-control-sm" onchange="filtroServicos( this.value );">
			  		<option value="Todos">Ver Todos</option>
			  		<option value="Credito">Consulta ao Credito</option> 
			  		<option value="Dados">Consulta Dados cadastrais</option>
			  		<option value="Outros">Outros</option>
						</select>
					</div>
					<hr style="clear:both">				
				</div>	
			
			<ul class="top-sites-list">
			
			${outros}
			
			</ul>
			</div>
			
			    </div>`;
            }

            box.html(pgMain2);
                if(credito.length  < 1){
                    $("#servCredito").hide();
                }

                if(cadastral.length < 1){
                    $("#servCadastral").hide();
                }

                if(outros.length < 1){
                    $("#servOutros").hide();
                }

            $("#servCadastral .form-check").hide();
            $("#servOutros .form-check").hide();
        } else {
            //document.location = './Sair';
        }

    });

}

$(function(){


    menu = $(".menu");
    menu.css('left', '-100%');
    menu.css('visibility', 'visible')
        .animate({opacity: 1.0, left: '0'}, 500);

    getSystem();


});


