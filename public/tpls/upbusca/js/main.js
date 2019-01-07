
function mascaraMutuario(o,f)
{
    v_obj = o
    v_fun = f
    setTimeout('execmascara()',1)
}
 
function execmascara()
{
    v_obj.value = v_fun(v_obj.value)
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


 
function cpfCnpj(v)
{
	v=v.replace(/\D/g,"")

	if (v.length <= 14)
	{
		v = v.replace(/(\d{3})(\d)/,"$1.$2")
		v = v.replace(/(\d{3})(\d)/,"$1.$2")
		 v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2")

	}
	else
	{
		v = v.replace(/^(\d{2})(\d)/,"$1.$2")
 		v = v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
		v = v.replace(/\.(\d{3})(\d)/,".$1/$2")

		v=v.replace(/(\d{4})(\d)/,"$1-$2")
	}

	return v
}

function maisdados(pagina)
{
	var pag_atual   = parseInt(pagina);
	$("#PesquisaResult").hide();
	$('.load').jmspinner('large');
	
	var doc			= $('#doc').val();
	var data_res	= $("#result tbody");
	var data_pag	= $("#paginacao");
	var nome		= $('#n_nome').val();
	var cep			= $('#n_cep').val();
	var cidade		= $('#n_cidade').val();
	var uf			= $('#n_uf').val();
	var endereco 	= $('#end_logradouro').val();
	var end_numero	= $('#end_numero').val();
	var end_cep		= $('#end_cep').val();
	var end_cidade	= $('#end_cidade').val();
	var end_uf		= $('#end_uf').val();
	var telefone	= $('#n_tel').val();
	var email		= $('#fr_email').val();
	var paginas 	= parseInt($('#paginas').val());

    var token = getCookie('token');

	dados = {
		'doc': 			doc,
		'nome': 		nome,
		'cep':			cep,
		'cidade': 		cidade,
		'uf': 			uf,
		'endereco': 	endereco,
		'end_numero': 	end_numero,
		'end_cep': 		end_cep,
		'end_cidade': 	end_cidade,
		'end_uf': 		end_uf,
		'telefone': 	telefone,
		'email': 		email,
		'pagina':		pagina
	}
	
	data_res.html(" ");

	$.ajax({
		type: 'POST',
		url: 'Servico/Upbusca',
		data: {'dados':dados},
	    headers: {"Authorization": "Bearer " + token},
		dataType: 'json',
		success: function(data)
		{
			var result = data['resultado'];

			var html = "";
			
			$("#PesquisaResult").show();

			if(result === null)
			{
				$('.pagnatin').hide();
				html += '<tr>';
				html += '<td colspan="5" align="center">Nada encontrado.</td>';
				html += '</tr>';
			}
			else
			{
				for (i = 0; i < result.length; i++)
				{
					doc = cpfCnpj(result[i]['doc']);
					html += '<tr>';
					html += '<td><a href="/Servicos/Upbusca?doc='+ result[i]['id'] +'">' + result[i]['doc'] + '</a></td>';
					html += '<td>' + result[i]['nome'] + '</td>';					
					html += '<td>' + result[i]['idade'] + '</td>';
					html += '<td>' + result[i]['cidade'] + '</td>';
					html += '<td>' + result[i]['uf'] + '</td>';
					html += '</tr>';
				}

				html_pg = '';
				var anterior =  pagina - 1;

				if(pagina === 1)
				{
					html_pg += '<li class="disabled"><a href="javascript:void(0)"><span class="glyphicon glyphicon-chevron-left"></span></a></li>';					
				}
				else
				{
					html_pg += '<li><a href="javascript:void(0)" onclick="javascript:maisdados('+ anterior +')"><span class="glyphicon glyphicon-chevron-left"></span></a></li>';
				}

				if(paginas === 1)
				{
					$('.pagnatin').hide();
				}
				else
				{
					for (i = 1; i <= paginas; i++)
					{
						if(i === pag_atual)
						{
							html_pg += '<li class="active"><a href="javascript:void(0)">'+ i +'</a></li>';							
						}
						else
						{
							html_pg += '<li><a href="javascript:void(0)" onclick="javascript:maisdados('+i+')" class="maisdados" id="'+i+'">'+ i +'</a></li>';														
						}
					}
					var proxima = pag_atual + 1;

					if(pagina === paginas)
					{
						html_pg += '<li class="disabled"><a href="javascript:void(0)"><span class="glyphicon glyphicon-chevron-right"></span></a></li>';					
					}
					else
					{
						html_pg += '<li><a href="javascript:void(0)" onclick="javascript:maisdados('+ proxima +')"><span class="glyphicon glyphicon-chevron-right"></span></a></li>';
					}

					$('.pagnatin').show();
				}

			}
			$('.load').jmspinner(false);
			data_res.html(html);
			data_pag.html(html_pg);
		}
	});	
}

$(document).ready(function()
{
	$(".bntmenu").click(function(){
		$("#consultardados")[0].reset();
		$("#PesquisaResult").hide();
	});

	$("#bntpai").click(function(){
		var doc			= $('#doc').val();
		var data_res	= $("#resultpPlus");
		data_res.html("Aguarde...");
	    var token = getCookie('token');

		dados = {
			'doc':   	doc,
			'consulta':	'pai'
		}

		$.ajax({
			type: 'POST',
			url: 'Servico/Upbusca',
			data: {'dados':dados},
			dataType: 'html',
		    headers: {"Authorization": "Bearer " + token},
			success: function(data)
			{
				data_res.html(data);
			}
		});
	});

	$("#bntrg").click(function(){
		var doc			= $('#doc').val();
		var data_res	= $("#resultrPlus");
		data_res.html("");
		data_res.html("Aguarde...");

		dados = {
			'doc':   	doc,
			'consulta':	'rg'
		}
	    var token = getCookie('token');

		$.ajax({
			type: 'POST',
			url: 'Servico/Upbusca',
			data: {'dados':dados},
			dataType: 'html',
			headers: {"Authorization": "Bearer " + token},
			success: function(data)
			{
				data_res.html(data);
			}
		});
	});	

	$("#bntcnh").click(function(){
		var doc			= $('#doc').val();
		var data_res	= $("#resultcPlus");
		data_res.html("");
		data_res.html("Aguarde...");

		dados = {
			'doc':   	doc,
			'consulta':	'cnh'
		}
	    var token = getCookie('token');

		$.ajax({
			type: 'POST',
			url: 'Servico/Upbusca',
			data: {'dados':dados},
		    headers: {"Authorization": "Bearer " + token},
			dataType: 'html',
			success: function(data)
			{
				data_res.html(data);
			}
		});
	});	

	$("#bntcredito").click(function(){
		var doc			= $('#doc').val();
		var data_res	= $("#resultsPlus");
		var data_resok	= $("#resultcredito");
		data_resok.html("");
		data_res.html("");
		data_res.html("Aguarde...");

		dados = {
			'doc':   	doc,
			'consulta':	'credito'
		}

	    var token = getCookie('token');

		$.ajax({
			type: 'POST',
			url: 'Servico/Upbusca',
			data: {'dados':dados},
		    headers: {"Authorization": "Bearer " + token},
			dataType: 'html',
			success: function(data)
			{
				data_res.html("");
				data_resok.html(data);
				$('#resultcredito').show();
			}
		});
	});	

	$(".pesquisar").click(function()
	{
		var pag_atual   = 1;
		//maisdados(pag_atual);
		$('#paginas').val("");
		$("#PesquisaResult").hide();
		$('.load').jmspinner('large');
		var doc			= $('#doc').val();
		var data_res	= $("#result tbody");
		var data_pag	= $("#paginacao");
		var nome		= $('#n_nome').val();
		var cep			= $('#n_cep').val();
		var cidade		= $('#n_cidade').val();
		var uf			= $('#n_uf').val();
		var endereco 	= $('#end_logradouro').val();
		var end_numero	= $('#end_numero').val();
		var end_cep		= $('#end_cep').val();
		var end_cidade	= $('#end_cidade').val();
		var end_uf		= $('#end_uf').val();
		var telefone	= $('#n_tel').val();
		var email		= $('#fr_email').val();

		dados = {
			'doc': 			doc,
			'nome': 		nome,
			'cep':			cep,
			'cidade': 		cidade,
			'uf': 			uf,
			'endereco': 	endereco,
			'end_numero': 	end_numero,
			'end_cep': 		end_cep,
			'end_cidade': 	end_cidade,
			'end_uf': 		end_uf,
			'telefone': 	telefone,
			'email': 		email
		}
		
		if(doc.length > 10){
			location.href = "Servico/Upbusca?doc=" + doc.replace(/\.|\-/g, '');
			return false;
		}

		data_res.html("");
    	var token = getCookie('token');

		$.ajax({
			type: 'POST',
			url: 'Servico/Upbusca',
			data: {'dados':dados},
    		headers: {"Authorization": "Bearer " + token},
			dataType: 'json',
			success: function(data)
			{
				$('.load').jmspinner(false);
				$("#PesquisaResult").show();
				var result = data['resultado'];
				
				$('#paginas').val(data['paginas']);
				
				var html = "";

				if(result === null)
				{
					$('.pagnatin').hide();
					html += '<tr>';
					html += '<td colspan="5" align="center">Nada encontrado.</td>';
					html += '</tr>';
				}
				else
				{
					for (i = 0; i < result.length; i++)
					{
						doc = cpfCnpj(result[i]['doc']);
						html += '<tr>';
						html += '<td><a href="/Servicos/Upbusca?doc='+ result[i]['id'] +'">' + result[i]['doc'] + '</a></td>';
						html += '<td>' + result[i]['nome'] + '</td>';
						html += '<td>' + result[i]['idade'] + '</td>';
						html += '<td>' + result[i]['cidade'] + '</td>';
						html += '<td>' + result[i]['uf'] + '</td>';
						html += '</tr>';
					}
					
					html_pg = '';
					html_pg += '<li class="disabled"><a href="#"><span class="glyphicon glyphicon-chevron-left"></span></a></li>';

					if(parseInt(data['paginas']) === 1)
					{
						$('.pagnatin').hide();
					}
					else
					{
						$('.pagnatin').show();
							
						data['paginas'] =  data['paginas'] + 1;

						for (i = 1; i < data['paginas']; i++)
						{
							if(i == pag_atual)
							{
								html_pg += '<li class="active"><a href="javascript:void(0)">'+ i +'</a></li>';							
							}
							else
							{
								html_pg += '<li><a href="javascript:void(0)" onclick="javascript:maisdados('+i+')" class="maisdados" id="'+i+'">'+ i +'</a></li>';														
							}
						}
						var proxima = pag_atual + 1;
						html_pg += '<li><a href="javascript:void(0)" onclick="javascript:maisdados('+ proxima +')"><span class="glyphicon glyphicon-chevron-right"></span></a></li>';
					}						
				}

				data_res.html(html);
				data_pag.html(html_pg);
			}
		});		
	});


	$("#nova_consulta").click(function(){
		location.href = "Servico/Upbusca";
	});

	$("#n_tel").click(function(){
		jQuery("#n_tel").mask("(99) 9999-9999?9");
	});

});