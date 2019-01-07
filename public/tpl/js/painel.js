
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



function getServCredito(servicos) {

	var servicosCredito = '';
		//console.log(servicos['servico'][i]['nome']);
	for (i=0; i < servicos.length; i++) {
		var tiposvlop = servicos[i]['tipo'];
		
		if (tiposvlop == 1) {
			var dados = servicos[i];
			var nomesv = servicos[i]['nome'];
			var imagem = servicos[i]['imagem'];
			var titulo = servicos[i]['titulo'];
			var descricao = servicos[i]['descricao'];
			servicosCredito += `<li class="top-site-outer">
				<div class="top-site-inner">
					<a href="#${nomesv}" onclick="openService('${nomesv}')" title="${descricao}">
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
			var nomesv = servicos[i]['nome'];
			var imagem = servicos[i]['imagem'];
			var titulo = servicos[i]['titulo'];
			var descricao = servicos[i]['descricao'];
			servicosCadastral += `<li class="top-site-outer">
				<div class="top-site-inner">
					<a href="#${nomesv}" onclick="openService('${nomesv}')" title="${descricao}">
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
			var nomesv = servicos[i]['nome'];
			var imagem = servicos[i]['imagem'];
			var titulo = servicos[i]['titulo'];
			var descricao = servicos[i]['descricao'];

			servicosOutros += `<li class="top-site-outer">
				<div class="top-site-inner">
					<a href="#${nomesv}" onclick="openService('${nomesv}')" title="${descricao}">
						<div class="tile" aria-hidden="true">
							<div class="screenshot active">
								<img src="images/servicos/${imagem}" title="${descricao}"/>
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
			
		</div>`
var servicosAll = getServAll();
pgServic = `
  <!-- Page Content Holder -->
  <div id="content-fluid">

		
		<div class="col-md-12 col-lg-12" style="float:none;">

			<div class="row" style="overflow:hidden; margin-top:2.8%">
				<h3 style="width: 400px; float:left">Serviço BC Fone
					<span class="badge badge-secondary">
						<span class="	glyphicon glyphicon-sort"></span>
					</span>
				</h3>
				<div class="form-check" style="width: 19%; margin-top:1.4%; margin-bottom:1%; float:right;">			
					<select class="form-control form-control-sm" onchange="openSvAll( this.value );">
			  				${servicosAll}
					</select>
				</div>
				<hr style="clear:both">				
			</div>	
		</div>		
		

			<p style="overflow:hidden; width:60%; margin-left:0;">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.  <a href="#"><strong>Abrir em nova pagina !?</strong></a></p>
			<button type="button" class="close bntclos" onclick="ClosePanel();">
            <span aria-hidden="true">×</span>
          </button>
			</div>

<div class="row">
	<div class="bkiframe"> 
 <iframe id="ifrservicos" class="col-lg-12 col-md-12 col-sm-12" src="http://localhost:3030/___%20BCFONE%20__..html" scroll="no">
 </iframe>
 </div>
</div>
`
 
pgFat = `
<div class="panel panel-default">
  <!-- Default panel contents -->
  <div class="panel-heading">

	 	<h4>Faturas</h4>
 	</div>

  <!-- Table -->
 	<table class="table table-striped">
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
    <tr>
      <th scope="row">1</th>
      <td>Contrataçao</td>
      <td>R$ 250.00</td>
      <td>30 Dias</td>
      <td>Deposito</td>
      <td>20/07/2018</td>
      <td>Pago</td>
      <td>-</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Serasa Pre</td>
      <td>R$ 200.00</td>
      <td>30 Dias</td>
      <td>Deposito</td>
      <td>20/07/2018</td>
      <td>Pago</td>
      <td>-</td>
    </tr>
  
  </tbody>
</table>		
  </div>
  
`
pgConsumo = `
<div class="panel panel-default">
  <!-- Default panel contents -->
  <div class="panel-heading">

	 	<h4>Consumo</h4>
 	</div>
 
<div class="panel-body">
 <h4 style="margin-left:0.5%;">Mensal.</h4>
  <!-- Table -->
 	<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Serviço</th>
      <th scope="col">Limite</th>
      <th scope="col">Usado</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">BC Fone</th>
      <td>1000</td>
      <td>0</td>
    </tr>
    <tr>
      <th scope="row">Busca CNH</th>
      <td>100</td>
      <td>0</td>
    </tr>

    <tr>
      <th scope="row">Busca MIX</th>
      <td>1000</td>
      <td>0</td>
    </tr>

  
  </tbody>
</table>	
 <br>	
  <h4 style="margin-left:0.5%;">Diario.</h4>
 	<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Serviço</th>
      <th scope="col">Limite</th>
      <th scope="col">Usado</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">BC Fone</th>
      <td>100</td>
      <td>0</td>
    </tr>
    <tr>
      <th scope="row">Busca CNH</th>
      <td>10</td>
      <td>0</td>
    </tr>

    <tr>
      <th scope="row">Busca MIX</th>
      <td>100</td>
      <td>0</td>
    </tr>

  
  </tbody>
</table>	
  </div>
 </div>
  
`
pgCadastro = `
<div class="panel panel-default">
  <!-- Default panel contents -->
  <div class="panel-heading">

	 	<h4>Dados cadastrais</h4>
 	</div>
 
<div class="panel-body">
 
 
 
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Usuario</label>
    <input type="email" class="form-control" id="exampleInputEmail1" value="manoel" disabled="">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Senha</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="******">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Nova senha</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Digite sua nova senha">
  </div>
  <button type="submit" class="btn btn-default">Alterar senha</button>
</form>
	 <br/>
	 <br/>
 <h4 style="margin-left:0.5%;">Logs de acesso.</h4>
  <!-- Table -->
 	<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">IP</th>
      <th scope="col">Navegador</th>
      <th scope="col">Data</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">127.0.0.1</th>
      <td>mozilla</td>
      <td>23/07/2018 13:25:00</td>
    </tr>
    <tr>
      <th scope="row">127.0.0.1</th>
      <td>mozilla</td>
      <td>23/07/2018 13:25:00</td>
    </tr>
    <tr>
      <th scope="row">127.0.0.1</th>
      <td>mozilla</td>
      <td>23/07/2018 13:25:00</td>
    </tr>

  
  </tbody>
</table>	
  </div>
 </div>
  
`

function openCadastro() {
	var box = $("#content");
	box.animate({ opacity: 0}, 200);
	
	setTimeout(function() {
		
		box.html("");
		box.html(pgCadastro);
		
		box.css('visibility', 'visible')
		.animate({ opacity: 1.0, left: '0'}, 200);
		
		
	}, 500);
	return false;
}


function openFats() {
 	var box = $("#content");
 	//box.css('opacity', '0.0');

 	box.animate({opacity: 0}, 200);	

 	setTimeout(function() {
		
 		box.html("");
 		box.html(pgFat);
		
 		box.css('visibility', 'visible')
 	  .animate({opacity: 1.0, left: '0'}, 200);

 	}, 500)
 	return false;
}

function openConsumo() {
 	var box = $("#content");
 	//box.css('opacity', '0.0');

 	box.animate({opacity: 0}, 200);	

 	setTimeout(function() {
		
 		box.html("");
 		box.html(pgConsumo);
		
 		box.css('visibility', 'visible')
 	  .animate({opacity: 1.0, left: '0'}, 200);

 	}, 500)
 	return false;
}
    
function ClosePanel() {
	var box = $("#content");
	//box.css('opacity', '0.0');

	box.animate({opacity: 0}, 200);	


	setTimeout(function() {
		
		box.html("");
		box.html(pgMain);
		$("#servCadastral .form-check").hide();
		$("#servOutros .form-check").hide();
		box.css('visibility', 'visible')
	  .animate({opacity: 1.0, left: '0'}, 200);

	}, 500)
	
}

function openService(servico) {

	var box = $("#content");
	//box.css('opacity', '0.0');

	box.animate({opacity: 0}, 200);	

	setTimeout(function() {
		
		box.html("");
		box.html(pgServic);
		
		box.css('visibility', 'visible')
	  .animate({opacity: 1.0, left: '0'}, 200);

	}, 500)
	return false;
}

function openMain() {

	var box = $("#content");
	//box.css('opacity', '0.0');

	box.animate({opacity: 0}, 200);	

	setTimeout(function() {
		
		box.html("");
		box.html(pgMain);
		$("#servCadastral .form-check").hide();
		$("#servOutros .form-check").hide();
		box.css('visibility', 'visible')
	  .animate({opacity: 1.0, left: '0'}, 200);

	}, 500)
	return false;
}

$(function(){
	
	$("#menuLinks li a").click(function() {
		$("li.active").removeClass('active');
		$(this).parent().addClass('active');
	});

	menu = $(".menu");
	menu.css('left', '-100%');
	menu.css('visibility', 'visible')
	.animate({opacity: 1.0, left: '0'}, 500);

	getConfig(function(res) {
		if (res.dados) {
			var usuario  = res.dados.usuario;
			var revenda  = res.dados.revendedor;
			var sv = Object.values(res.servicos);

			$("#ConfUsuario").text(usuario);
			$("#ConfRevenda").text(revenda);
			var credito   = getServCredito(sv);
			var cadastral = getServCadastral(sv);
			var outros = getServOutros(sv);


			box = $("#content");
			box.css('right', '-100%');
			box.css('margin-left', '24%');
			box.css('visibility', 'visible')
  			.animate({opacity: 1.0, left: '0'}, 500);

  			var pgMain2 = `
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
			
			</div>`

			box.html(pgMain2);
	
		} else {
			document.location = './Sair';
		}

	});


	$("#servCadastral .form-check").hide();
	$("#servOutros .form-check").hide();

});


