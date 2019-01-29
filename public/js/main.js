var keyCap = '6Ldz7oYUAAAAACDvUt-S_bT3cjIOgOxl2ar2fvd-';
var pgSobre = `
						<div id="logo"></div>
						<h3 class="font-weight-bold text-dark"> Live Busca, seu sistema completo ! </h3>        
					<p class="font-weight-light"> Somos uma empresa de Tecnologia da Informação genuinamente brasileira fornecedora de ferramentas para localização de pessoas e empresas para uso legal em todo o território nacional. <a  onclick="pgFaleconoaco();" href="javascript::void(0)">Fale conosco</a>. </p>			
`;
var pgEsqSenha = `<div class="form-group">
					<h4 class="text-justify">
						Recuperar senha
						<hr/>  
					 </h4>
				 </div>	

				 <form action="?" method="POST" id="frmRecSenha">
					<div class="form-group">					
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>        
							</span>
							<input type="text" class="form-control input" placeholder="Digite seu usuario" name="recUsuario" id="recUsuario">
						</div>
					</div>

					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-share"></i>        
							</span>
							<input type="text" class="form-control input" placeholder="Digite seu revendedor" name="recRevendedor" id="recRevendedor">
						</div>
					</div>
          
          <div class="form-group">
            <div class="alert fade in" id="alertt">
              <a href="#" class="close" data-dismiss="alert">&times;</a>
              <div id="message-alert">
        
              </div>
            </div>
          </div>
          
          <div class="form-group bntesq">
						<a href="javascript::void(0)" onclick="pgLogin()" class="btn btn-link" id="voltarpg">Voltar</a>            
					</div>

					<div class="form-group bntok">    
				<button id="submit" name="submit" class="g-recaptcha btn btn-primary">Recuperar senha</button>
					</div>
</form>`;
		
var pglogin = `<div class="form-group">
					<h4 class="text-justify">
						Faça seu login
						<hr/>  
					 </h4>
				 </div>	

				 <form action="?" method="POST" id="frm">
					<div class="form-group">					
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>        
							</span>
							<input type="text" class="form-control input" placeholder="Digite seu usuario" name="usuario" id="usuario">
						</div>
					</div>

					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-share"></i>        
							</span>
							<input type="text" class="form-control input" placeholder="Digite seu revendedor" name="revendedor" id="revendedor">
						</div>
					</div>

					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-lock"></i>        
							</span>
							<input type="password" class="form-control input" placeholder="Digite sua senha" id="senha" name="senha">
						</div>
					</div>
          
          <div class="form-group">
            <div class="alert fade in" id="alertt">
              <a href="#" class="close" data-dismiss="alert">&times;</a>
              <div id="message-alert">
        
              </div>
            </div>
          </div>
          
          <div class="form-group bntesq">
						<a class="btn btn-link" id="esqceusenha" onclick="pgEsqsenha();" href="javascript::void(0)">Esqueceu sua senha?</a>            
					</div>

					<div class="form-group bntok">

						<button name="submit" id="submit" class="g-recaptcha btn btn-primary" disabled="disabled">Entrar</button>
					</div>
				</form>`;

var pgContato = `<div class="form-group">
					<h4 class="text-justify">
						Fale conosco
						<hr/>  
					 </h4>
				 </div>	

				 <form action="?" method="POST" id="frmContato">
					<div class="form-group">					
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>        
							</span>
							<input type="text" class="form-control input" placeholder="Digite seu nome completo" name="conNome" id="conNome">
						</div>
					</div>

					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-envelope"></i>        
							</span>
							<input type="text" class="form-control input" placeholder="Digite seu e-mail" name="conEmail" id="conEmail">
						</div>
					</div>

					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-flash"></i>        
							</span>
							<input type="text" class="form-control input" placeholder="Digite seu assunto" name="conAssunto" id="conAssunto">
						</div>
					</div>
          
					<div class="form-group">
							<textarea class="form-control input" name="ConMensagen" id="conMensagem" rows="4" cols="50"></textarea>
					</div>
          
          <div class="form-group">
            <div class="alert fade in" id="alertt">
              <a href="#" class="close" data-dismiss="alert">&times;</a>
              <div id="message-alert">
        
              </div>
            </div>
          </div>
          
          <div class="form-group bntesq">
						<a href="javascript::void(0)" onclick="pgLogin()" class="btn btn-link" id="voltarpg">Voltar</a>           
					</div>

					<div class="form-group bntok">

						<button name="submit" id="submit" class="g-recaptcha btn btn-primary">Enviar</button>
					</div>
				</form>`;
        


function YourOnSubmitFn(token) {

	var usuario 	 = $("#usuario").val();
	var revendedor = $("#revendedor").val();
	var senha			 = $("#senha").val();

	var payload = {
		usuario: usuario,
		revendedor: revendedor,
		senha: senha,
		token: token
	}
  
	$.ajax({
		method : "POST",
		url : "./auth",
		data : payload,
		timeout: 8000,
	})
	.done(function(res) {
		//console.log(res);
		//console.log(res.token);
		//console.log(res.msg);
		//console.log(res.error);

		if (res.error == true) {
			
			if (res.msg) {
    			var msg = res.msg;
    		} else {
    			var msg = 'Usuario ou senha invalidos';
    		}

			grecaptcha.reset();
        
			$('#alertt').show();
			$('#alertt').addClass('alert-danger');
			$('#message-alert').html('<strong>Ops!</strong> ' + msg);			
		
		} else {

			if (res.token) {
				console.log('usuario ok, redirecionar para painel.');
				$('#alertt').removeClass("alert-danger");
				$('#alertt').show();
				$('#alertt').addClass('alert alert-success');
				$('#message-alert').html('Aguarde, redirecionando...');
				document.cookie = 'token=' + res.token;
				document.location = './Painel';
			} else {
   
				if (res.msg) {
	    			var msg = res.msg;
	    		} else {
	    			var msg = 'Usuario ou senha invalidos';
	    		}

				grecaptcha.reset();
	        
				$('#alertt').show();
				$('#alertt').addClass('alert-danger');
				$('#message-alert').html('<strong>Ops!</strong> ' + msg);			

			}
		}

	})
	.fail(function() {
		grecaptcha.render('submit', {
			'sitekey' :  keyCap,
			'callback' : YourOnSubmitFn
		});

		$('#alertt').show();
		$('#alertt').addClass('alert-warning');
		$('#message-alert').html('<strong>Ops!</strong> Sistema indisponivel, tente novamente em breve.');    
		console.log('error ao buscar dados, demorou mais de 8s.....');

	});
  
	console.log('executando ajax...');  
}

function esqueceuSenha(token) {

    var usuario 	 = $("#recUsuario").val();
    var revendedor = $("#recRevendedor").val();

    var payload = {
        usuario: usuario,
        revendedor: revendedor,
        token: token
    }

    $.ajax({
        method : "POST",
        url : "./recSenha",
        data : payload,
        timeout: 8000,
    })
        .done(function(res) {
            //console.log(res);
            //console.log(res.token);
            //console.log(res.msg);
            //console.log(res.error);

            if (res.error == true) {

                if (res.msg) {
                    var msg = res.msg;
                } else {
                    var msg = 'Usuario ou senha invalidos';
                }

                grecaptcha.reset();

                $('#alertt').show();
                $('#alertt').addClass('alert-danger');
                $('#message-alert').html('<strong>Ops!</strong> ' + msg);

            } else {

                if (res.token) {
//                    console.log('usuario ok, redirecionar para painel.');
                    $('#alertt').removeClass("alert-danger");
                    $('#alertt').show();
                    $('#alertt').addClass('alert alert-success');
                    $('#message-alert').html('Foi enviado um e-mail para voce.');
                } else {

                    if (res.msg) {
                        var msg = res.msg;
                    } else {
                        var msg = 'Usuario ou senha invalidos';
                    }

                    grecaptcha.reset();

                    $('#alertt').show();
                    $('#alertt').addClass('alert-success');
                    $('#message-alert').html(msg);

                }
            }

        })
        .fail(function() {
            grecaptcha.render('submit', {
                'sitekey' :  keyCap,
                'callback' : esqueceuSenha
            });

            $('#alertt').show();
            $('#alertt').addClass('alert-warning');
            $('#message-alert').html('<strong>Ops!</strong> Sistema indisponivel, tente novamente em breve.');
            console.log('error ao buscar dados, demorou mais de 8s.....');

        });

    console.log('executando ajax...');
}


function enviaContato(token) {

    var nome     = $("#conNome").val();
    var email    = $("#conEmail").val();
    var assunto  = $("#conAssunto").val();
    var mensagem = $("#conMensagem").val();


    var payload = {
        nome: nome,
        email: email,
        assunto: assunto,
		mensagem: mensagem,
        token: token
    }

    $.ajax({
        method : "POST",
        url : "./Contato",
        data : payload,
        timeout: 8000,
    })
        .done(function(res) {
            //console.log(res);
            //console.log(res.token);
            //console.log(res.msg);
            //console.log(res.error);

            if (res.error == true) {

                if (res.msg) {
                    var msg = res.msg;
                } else {
                    var msg = 'Ocorreu um erro ao enviar a mensagem';
                }

                grecaptcha.reset();

                alert(msg);
                $("#frmContato")[0].reset();
                setInterval(function() {
                    pgLogin();
                }, 800);

            } else {

                if (res.msg) {
                    var msg = res.msg;
                } else {
                    var msg = 'Ocorreu um erro ao enviar a mensagem';
                }

                grecaptcha.reset();

                alert(msg);
                $("#frmContato")[0].reset();
                setInterval(function() {
                    pgLogin();
                }, 800);

            }

        })
        .fail(function() {
            grecaptcha.render('submit', {
                'sitekey' :  keyCap,
                'callback' : enviaContato
            });
        });

}


function pgFaleconoaco() {
	var box = $("#boxmain");

  box.css('opacity', '0.0');
	box.css('visibility', 'hidden');
	box.css('left', '25%');
			
	box.html(pgContato);
	
	grecaptcha.render('submit', {
			    'sitekey' : keyCap,
			    'callback' : enviaContato
	});

	box.css('visibility', 'visible')
  .animate({opacity: 1.0, left: '0%'}, 500);
	   
	return false; 
}



function pgEsqsenha() {
	
	var box = $("#boxmain");
	console.log('animate');

  box.css('opacity', '0.0');
	box.css('visibility', 'hidden');
	box.css('left', '25%');
	box.html(pgEsqSenha);
			
	grecaptcha.render('submit', {
		'sitekey' : keyCap,
		'callback' : esqueceuSenha
	});
  
	box.css('visibility', 'visible')
  .animate({opacity: 1.0, left: '0%'}, 500);
	   
	return false;
}

function pgLogin() {
	var box = $("#boxmain");
  box.css('opacity', '0.0');
	box.css('visibility', 'hidden');
	box.css('left', '25%');
  box.html(pglogin);

	box.css('visibility', 'visible')
  .animate({opacity: 1.0, left: '0%'}, 500);

	setInterval(function() {
		grecaptcha.render('submit', {
			'sitekey' : keyCap,
			'callback' : YourOnSubmitFn
		});

	}, 800);

	return false;
}

function pgLeft() {
	var boxleft = $("#boxleft");	
	boxleft.html(pgSobre)
	boxleft
		.css('visibility', 'visible')
    .animate({opacity: 1.0, left: '0%'}, 500);
		return false;
}

$(function(){
	
	pgLeft();
 	pgLogin();
	$('.grecaptcha-badge').appendTo("body");
});


