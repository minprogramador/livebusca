
// function loadUser() {
// 	var template = $('#template').html();
// 	Mustache.parse(template);   // optional, speeds up future uses
// 	var rendered = Mustache.render(template, {name: "Luke"});
// 	$('#target').html(rendered);
// }
var demo1Call = 0;
var demo2Call = 0;
var demo3Call = 0;
var $key = '6Ldz7oYUAAAAACDvUt-S_bT3cjIOgOxl2ar2fvd-';
var hash = false; 


function loadcaptcha() {

	$('#demo-form1').validator().on('submit', function (e) {
    
    	if (e.isDefaultPrevented()) {
        	// handle the invalid form...
            console.log("validation failed");
        } else {
        	// everything looks good!
            demo1Call = 1;
            $(document).find('#recaptcha1').remove();
            console.log($(document).find('#recaptcha1'))
            $('#demo-form1').append("<div id='recaptcha1' ></div>");
			
			e.preventDefault();
            console.log("validation success");
            if (typeof widgetId1 != 'undefined')
            	grecaptcha.reset(widgetId1);
            
            if (demo1Call == 1)
            {
            	widgetId1 = grecaptcha.render('recaptcha1', {
                	'sitekey': $key,
                    'callback': login,
                    'size': "invisible"
                });
            }

            grecaptcha.reset(widgetId1);
			
			grecaptcha.execute(widgetId1);
            console.log('show');
        }
    });


	$('#frmRecSenha').validator().on('submit', function (e) {
    
    	if (e.isDefaultPrevented()) {
        	// handle the invalid form...
            console.log("validation failed");
        } else {
        	// everything looks good!
            demo2Call = 1;
            $(document).find('#recaptchaRecSenha').remove();
            console.log($(document).find('#recaptchaRecSenha'))
            $('#frmRecSenha').append("<div id='recaptchaRecSenha' ></div>");
			
			e.preventDefault();
            console.log("validation success");
            if (typeof widgetId2 != 'undefined')
            	grecaptcha.reset(widgetId2);
            
            if (demo2Call == 1)
            {
            	widgetId2 = grecaptcha.render('recaptchaRecSenha', {
                	'sitekey': $key,
                    'callback': recSenha,
                    'size': "invisible"
                });
            }

            grecaptcha.reset(widgetId2);
			
			grecaptcha.execute(widgetId2);
            console.log('show');
        }
    });

	$('#frmContato').validator().on('submit', function (e) {
    
    	if (e.isDefaultPrevented()) {
        	// handle the invalid form...
            console.log("validation failed");
        } else {
        	// everything looks good!
            demo3Call = 1;
            $(document).find('#recaptchaContato').remove();
            console.log($(document).find('#recaptchaContato'))
            $('#frmContato').append("<div id='recaptchaContato'></div>");
			
			e.preventDefault();
            console.log("validation success");
            if (typeof widgetId3 != 'undefined')
            	grecaptcha.reset(widgetId3);
            
            if (demo3Call == 1)
            {
            	widgetId3 = grecaptcha.render('recaptchaContato', {
                	'sitekey': $key,
                    'callback': contato,
                    'size': "invisible"
                });
            }

            grecaptcha.reset(widgetId3);
			
			grecaptcha.execute(widgetId3);
            console.log('show');
        }
    });

}

function login(token) {

    var usuario      = $("#usuario").val();
    var revendedor = $("#revendedor").val();
    var senha            = $("#senha").val();

    var payload = {
        usuario: usuario,
        revendedor: revendedor,
        senha: senha,
        token: token
    }
  
    console.log('132..');
    
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

            
                $('#alertt').show();
                $('#alertt').addClass('alert-danger');
                $('#message-alert').html('<strong>Ops!</strong> ' + msg);           

            }
        }

    })
    .fail(function() {

        $('#alertt').show();
        $('#alertt').addClass('alert-warning');
        $('#message-alert').html('<strong>Ops!</strong> Sistema indisponivel, tente novamente em breve.');    
        console.log('error ao buscar dados, demorou mais de 8s.....');

    });
  
    console.log('executando ajax...');  







}

function recSenha(token) {




    var usuario      = $("#recUsuario").val();
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

         
                    $('#alertt').show();
                    $('#alertt').addClass('alert-success');
                    $('#message-alert').html(msg);

                }
            }

        })
        .fail(function() {
         
            $('#alertt').show();
            $('#alertt').addClass('alert-warning');
            $('#message-alert').html('<strong>Ops!</strong> Sistema indisponivel, tente novamente em breve.');
            console.log('error ao buscar dados, demorou mais de 8s.....');

        });

    console.log('executando ajax...');



}

function contato(token) {


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

            if (res.error == true) {

                if (res.msg) {
                    var msg = res.msg;
                } else {
                    var msg = 'Ocorreu um erro ao enviar a mensagem';
                }

                alert(msg);

            } else {

                if (res.msg) {
                    var msg = res.msg;
                } else {
                    var msg = 'Ocorreu um erro ao enviar a mensagem';
                }
                alert(msg);
                $("#frmContato")[0].reset();
            }

        })
        .fail(function() {
            alert('Ocorreu um erro ao enviar a mensagem.');

        });

}

function main() {
    setTimeout(function() {
        $.get('js/tpls/main.html', function(template) {

            var rendered = Mustache.render(template);
            $('#app').html(rendered);
            
            $.get('js/tpls/mainleft.html', function(template) {
                var titulo   = `Live Busca, seu sistema completo !`;
                var mensagem = `Somos uma empresa de Tecnologia da Informação genuinamente brasileira fornecedora de ferramentas para localização de pessoas e empresas para uso legal em todo o território nacional.`;
                var rendered = Mustache.render(template, {titulo: titulo, mensagem: mensagem});
                $('#boxleft').html(rendered);
            });

            $.get('js/tpls/login.html', function(template) {
                var rendered = Mustache.render(template);
                $('#boxmain').html(rendered);
                loadcaptcha();
            });
        });
    }, 1);
}

function notfound() {
    loading();
    setTimeout(function() {
        var template = $('#notfound').html();
        Mustache.parse(template);
        var rendered = Mustache.render(template);
        $('#boxmain').html(rendered);
    }, 188);
}

function loadFaleConosco() {
    loading();
    setTimeout(function() {

    	$.get('js/tpls/contato.html', function(template) {
    		var rendered = Mustache.render(template);
    		$('#boxmain').html(rendered);
    		loadcaptcha();
    	});
    }, 100);   
}

function loadEsqueceuSenha() {
    loading();
    setTimeout(function() {

        $.get('js/tpls/recsenha.html', function(template) {
            var rendered = Mustache.render(template);
            $('#boxmain').html(rendered);
            loadcaptcha();
        });

    }, 100);	
}

function loading() {
    var imgload  = 'data:image/gif;base64,R0lGODlhIAAgAPYAAP///wAAAPr6+uLi4tLS0tTU1O7u7vz8/Pb29ri4uGxsbERERE5OToiIiNbW1vT09MbGxkxMT'+
                    'AQEBB4eHuDg4Orq6p6enqampvLy8oqKihoaGjY2Nrq6ut7e3tra2np6ejw8PCgoKCwsLKioqHZ2dg4ODiIiIqqqqlZWVuzs7IaGhiAgIAwMDKys'+
                    'rBwcHMjIyBYWFgoKCiYmJoSEhMLCwj4+PhISEnR0dJKSkpCQkBgYGIyMjLa2tjAwMLy8vJSUlEJCQtjY2KSkpMDAwMrKyszMzFpaWiQkJI6Ojn5+f'+
                    'nJycoCAgAgICL6+vq6urnx8fJaWlmhoaGpqarS0tNzc3GBgYLKysrCwsHh4eM7OzoKCglhYWDIyMsTExOTk5Pj4+PDw8Obm5ioqKmJiYl5eXujo6HB'+
                    'wcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQV'+
                    'BFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAIAAgAAAH/4AAgoOEhYaHiImKi4yNjQeGCCkCjoYpBDQFKY'+
                    'MCHDMElYQeKgw1DA1BkAg5QAmhghUfKxK0Jh8VBwcOPBWFFR0PiQIJILTGGwmQALmEKUtGTgiIDxYhxrUW0ocEGyUKBogIFyLXEiEnlIcVz9GIBwQMLNc'+
                    'MRMrqHsGJBiMLGjYuC4RgeFXoAAYPLVSQ2OEDHMFBCCBkIJGBwwAD6Rwx45QggoYSAF+8cmDBAoVBAxSUu5GvUYUnE0zscEhgQbkFvRxRMEJLQc4CDMoxy'+
                    'NkIA5QaC0YMBGCgwQRjLnBkbGSACBGHyxwo2GBiA4mTDwtS4HAigQOMYQ89eGEhBy97iZg2uoOAQsYEED82xSVigcZSdSRgGAMyJC6HGi42ZEPUAUUMYyFG'+
                    'KEOAQRtTEiVoRaGCqIKCzLRA+AAgoAiSJCdyYlABg0kJKUQLdtSgo8eMAbqMwCjRwwK4d0ZqGJkytdCDBDM+WOhwQJwMY0Y8CDrgoUkBy4gEVKiQD4GQI7RKR'+
                    'CcENxQB3bwt/E1LmsYMJSbZFxJggLujQAAh+QQJCgAAACwAAAAAIAAgAAAH/4AAgoOEgwcVVFQpB4WNjo4PEEkoKEsvD4+ZjQI0RhoSEhpGEAKapgAVSxOgoBN'+
                    'JFaeFBg4EFQJBRkysoEZBsYIHDg0oDFhNREa7EiW9vwADJKsSOihOSdKgLq+CFRWMjwI8G7sTGTwoMKA2W0OlqUkDmQhCIcokFUVaDAwzBAjcUaI4yCTAyjhWK3'+
                    'JgQpAiBYJvAG4FKZWJgpJPEmAwgOBM3osnDCIoSIChYyMMBYYQCUKg1j+ThDA4MbIAhQVbMAsdGBKhBKgNJyDGQgDBAgGKD35gK0ECk7MORkIogAXgAY6lTTt6i'+
                    'CKDRDwAB5r0lMBiQwuhpxB0MUoRgAEnVZxq3syJFgDKIQQM5NQk4IAADA/q7nXLAQkUf6ceOOR7ZcGKI1GyCB6UwgKJESUfVVCQTsIRKE4dHbDSo0SNJhWjsJqAJHP'+
                    'EtmBHmJDAZUomDDhEMIGxIEGpAwWECCnQtoOSCEu+asYRRcoVvQA8SDGxIgoVQhVqmTqAgQJOsDx6gOrBY7LJISBAgRhivmOFHCFzUB2MvUiR+fQHBwIAIfkECQoAAA'+
                    'AsAAAAACAAIAAAB/+AAIKDhIUAB4aJiokHFUVdQQ+Lk4YHDksLNUYjFZSeABRPKxISJUAtkgcPGAieDwMFAwgCPkBMpBI6HwMYRBY4Jw4CixhOClsKPBUtXLilUQQn'+
                    'WyImGwovX4m0CyUlOgwJTRHOLk8XESW4LgpUiQYNOrgmOUEqR6QsEU4ZJs4SCxwQFUqRBAYuDRkMVLBghMGHLhWWxHO2ocWwQghOcIkhgQkIJ4gOKMQA4AGUe7hYAP'+
                    'FxsVAFFQt6RMgxQFEXFDbkfeigCEGFJi2GVBBoCMMVIz1CbLhBpJUhBBhCEu1ZwIkQHhSmCsJAQIiQAi09IZilrcmWEDKMQPhUSFW2QQa1VGggpUGLU7YAPEBxYmB'+
                    'QBRLpSim4y5YGil2DEFjg0m2DhbCfKnBoSqgCDiNGLNTEO+lACg8OOnEeTdoTBgNaSw86QADJEh+SKKUg4CU1oQ5RNMAACLnQgxw1lFCYBGEDKRNQYitKoQBGhCKT'+
                    'gmyBUeLj3QcUhg4ScEUKFNGKHjiJknkzAAwjoiQhQNQnSUoIKATpO8jBuCM53qsmVIBBiSM46LefIAZcoB57AxaCQXaEJUhaIAAh+QQJCgAAACwAAAAAIAAgAAA'+
                    'H/4AAgoOEhQcCB4WKi4yCBgRTTRSJjZWFDxdbG0BLBJSWlQdEDCUSEmIZFaCKCGAIgggtYqYSJVEOAhVFEEEPlgMtGRdBAghOIrS2BQQqDAtRLSmNFSobGj1JHQce'+
                    'YzC1GxYvWEemJRFTr4tFC7Q1CQAITQoLDBYePDW0EhpJqosvNZiY2mBF0IEKHSg8ENCihz5bHhhVUGCihIkoBBg1WVDKlIkZ/hQdeKHCyJImvhYN0NIjhgQYKDikW3T'+
                    'QQYWZigQ4yGGEgQIhQVLgXLUIQ5AuV3AsyXBlwCcwHQYMtXQAgoIeLkwAQeJvAI4tRloYIAqgAgkX+jZcACBgCoiXDLUyEiWQTx8MBfAshBjogywBhw/JADhAA8WEI'+
                    'wqCkA0SgYU+HUkEpeDRAAeRqY0e5GhpCgaDIYMQpDDwiaiHHQt6bIhyZSxZRge7OJlCAMNrUAdKK6pQIIxuRohAdViyQIEnS0GQJMA86MAVLqcspGyUYIEK17B9RN'+
                    'AB5MpMASlsEwJGRIClFC1ICAkp4EUDCyEFBQeFoMKDTwZUHInQ5fftQQ9YUANG/1VCAQcviFcgcP4tWGAgACH5BAkKAAAALAAAAAAgACAAAAf/gACCg4SFhoeIiQA'+
                    'YQURBD4qRhQ88UREKPBiSkgcFRjASMFFFB4OlmwgPpwc+GxKvQDwCAAgdRUGaiQcOFxZEkAcvESUSJQxdAgYJCgxRIxWJHVg9MlEQpRU/QGILFhUIQ1s6oQtWkId'+
                    'DNa89FucVHBZN0Bg/Mq8SKzPQhgdEwxIbTpwTdAqAgRxH7rl4MgBRCgsoIjToULAQAh4LSjApAUJILn4ViNAYUNFQBQsMNkTYQVHRgZKHBFR4YYUHgQEYYG4CmWD'+
                    'HEgsEEBR6uXMQghYoTGgQoYDAqQdELFjZt7ODEWKvTGRIAWCXAjEgLgyUBKHHvWJGOnSFsECCCxVcyHcScXWvRBQqgjwkqcFgitCdA6KMeyUGSS4BHXy8MFCUVoI'+
                    'qXEKASFKg4AEBOhEdMBAEQgsoP1oEmdWYEAICOaKgUGDBQc7ShYJgEfEKxgIhcQ8d6PDCS2YEFjYwuSeKAGlDHT4sQEK1kAEtg++BsHK8EIEtExSoPZRiSfRXNaZ'+
                    'UJ1Thwo1MhAS8Bs7lrA4jpBI9+Jb+BVBBQZ70sFFCQwTcpT0AkROlCFAADlEYocAJze0kgH0OmFKBAwVQ8FFpAqgC24YcdhgIACH5BAkKAAAALAAAAAAgACAAAAf/gA'+
                    'CCg4SFhoeIiYIHD1+Kj4cYL0JTFAKQmAddRj1AOQOYkA9QJhIlW0QHgweqkAeXgw8WMqZGBKoHFC9EFa2IBl1XQbACRWYgDBYVAAcESgsRM0G+hQIJWyBJHoMIDlM'+
                    'QvQApSLQSG0IYiBgNExILPtSFFAolEhIrWsuHCC0RPQq3ElVoUIoFF2UCr1jo8kARAghSNtTAQgDWoQMIMFhM9IDAFR4OGobKxOrBg40jESEIcuXECwOEDmCogCAl'+
                    'AAEQonDpkQwmswpCZjQRGWrAk3amUEAQhGAIChkfQI0kgKKevR4nBhFQEAGKvlBBolhlAoIHtwJdpI5MIQSIDhgiyT50KBTP1QMPFqJE2VGkps1BAgb4GNGiCwECF'+
                    'VCmPBAkw4IeIG4wfFS3UAoLG+xJCJFkrkAeBPwCAFNg14AvBaLA0CwhwpDKN4cwyFCGGYUfDLiAUJCgSVXWC5rAZoxkCoYDFTBrnmDkwo0VmmFEIaDoQIqGOH9rlp'+
                    'GhRZUjOiZEuJAilAAeNVhLgIHFwZAdCpJM+QpJQJMITFjrmEGzQocK6aQUhBIuaBYDCC0Q9RcADzRhhAklwACCCp4tGMsLGUShxAUdKFZIIAAh+QQJCgAAACwAAAA'+
                    'AIAAgAAAH/4AAgoOEhYaHiImKi4wCFR0pB4yTggUZChYVlIwIFhsaKBCSm4mdIiULNKMAGBQUD4wYYbCDBElGUJqCFRZSCk4pigZXWjwYgwgUBRUCggddDDAuRkT'+
                    'NiARGRwpBig8jIRISNTwIiQMqEUgDis8MLiZRRauGAg4cQdaJBk4kT8aLBwTMS/SAwgBapBIq7DaAgoGBACBOqiAkSpQfHlY9cABB16YHToDAkLABioFBA3ZEaSI'+
                    'xUYUMLsKViEJlUIoTOwi0RGTgBzgJLpR4ZFWhHKkDL6L0EIGixTFDAXcaegDhRw4eQwUJoOBjxBUCJxcJEIAgRQWEg+qpWMBlQ5QrYdEPpSiSoGPLCkh6lAinwQ'+
                    'iNfIQqjDBSg0GODhAP0EARrnGIHBUOgPFSFAACDhFGlthgIVghBFNqxGgsQQMWBzRUGMEUpAKUnxJ0KOkAdQgD0hJWLJlixESJElxUELHQo/GED7QNeXhigonMB'+
                    'RYyyCC9oAUHIy5KwAAyIi4hBEOicJkQIgKUISR0kBZhYcAUKSiMWKCQCMPwGTmmuJqxgvSGFghgQEAXBETGDgYVpFDOAzwssFduUhAwSEALpWDBFhvUoMAQaC0k'+
                    'iH1XcNCBUYoEAgAh+QQJCgAAACwAAAAAIAAgAAAH/4AAgoOEhYaHiImKi4wAB18HjZIADwQ+HZGTi0FPKFAVmotEKCEfA4QPBg+Nj5mCFRZPPBiDFS0NLaCKA'+
                    'h0+A64CKRS0ggJDDCYMCQiKBhZbLcSICE5cEhsXq4kPTTtEzIkHBQoRJASuiBgV2ooIlgTshQcCCAIH6Lv26Q4+Vl0UAkIdejAESwQgKHZ4wLfoAAYMAQEIIBJ'+
                    'lhQQJJUTk0NXInYUcPkClsNDjoskIRBgiCoJFxJEtHBAM+ODC5EUuHFQaOjBkwUUxPwxUaGDCpgQQTSI2JGBERwkQQh48uBKhhEkYChaySjEiCooMDu51QFJjAg'+
                    'wZDKZIa1SBSJcO4OB4nVCBRYUFHwUqKGV0z9CDCgVOfNgSBQeBvYUEVOigNxGCF1GOlIDBRUuHaUR2KMjwDVEKHEdsApkCjtABB1gkH1FQQGWFJzpsirBQIUUQAl'+
                    'RWCfDh8+ICHqUJVchQ9CKTDSOCXJCC4kMTDAiGVMW4wEfwQQg4MNDBRMLqJiMWwJBgIsqLBx1UbDCxYYnWQ7aiRGBAggMBmia5WDCAoICFJRYQcJ1pFRDAQRMO2KZ'+
                    'EbBf1AIUBACBQAQWNLSLAhZHA0kN3JUTAQzwCRVjAEkBwwYAFFIRoCC9XXBCSToQEAgA7AAAAAAAAAAAA';
    var html     = `
        <div class="loading">
            <img src="${imgload}" alt="Aguarde...">
            <p class="text-center">
                <strong>Aguarde...</strong>
            </p>
        </div>`;
    $('#boxmain').html(html);
}

function loadmain() {
    if (checkHash()  == undefined) {
        main();
   }else{
        checkHash();
   }
}

function checkHash() {
    if(window.location.hash != hash) { 
        hash = window.location.hash; 
        processHash(hash); 
    } t=setTimeout("checkHash()",400); 
}

function processHash(hash) {
    switch (hash) {
        case "":
            alert('index');
            break;
        case "#Login":
            main();
            break;
        case "#EsqueceuSenha":
            loadEsqueceuSenha();
            break;
        case "#FaleConosco":
            loadFaleConosco();
            break;
        default:
            notfound();
    }
}


