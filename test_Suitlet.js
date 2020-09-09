/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

define(['N/ui/serverWidget', 'N/url', 'N/https', 'N/file'],

function(widget, url, https, file){

    function onRequest(context) {
    var recordCase_Id = context.request.parameters.recordCaseId;
    var diseno_Img1 = context.request.parameters.disenoImg1;
    var diseno_Img2 = context.request.parameters.disenoImg2;
    var diseno_Img3 = context.request.parameters.disenoImg3;
    var diseno_Img4 = context.request.parameters.disenoImg4;
    var fileObjImg1 = file.load({id: diseno_Img1});
    var fileObjImg2 = file.load({id: diseno_Img2});
    var fileObjImg3 = file.load({id: diseno_Img3});
    var fileObjImg4 = file.load({id: diseno_Img4});

    var formulario = widget.createForm({title: 'Imagenes y Firmas'});
    var imgs = formulario.addField({id: 'custpage_imgs', label: 'Imagenes', type: 'inlinehtml'});
    imgs.defaultValue = '<style type="text/css">'+
      '$body-bg: #000000;'+ // #eee
      '$canvas-bg: #fff;'+
      '$font1 : Arial, sans-serif;'+
      'body{'+
      	'background-color: $body-bg;'+
      	'font-family:$font1;'+
      '}'+

      'canvas {'+
        'display: block;'+
        // 'margin: 0 auto;'+
        // 'margin: 0 auto;'+ // margin: calc(50vh - 150px) auto 0;
        //'width: 50%;'+
        //'height: 250px;'+
        'background: $canvas-bg;'+
        'border-radius: 3px;'+
        'box-shadow: 0px 0px 15px 3px #ccc;'+
        'cursor:pointer;'+
      '}'+
      '</style>'+

'<img src="'+ fileObjImg1.url +'" width="300" height="300"> <img src="'+ fileObjImg2.url +'" width="300" height="300"> <img src="'+ fileObjImg3.url +'" width="300" height="300"> <img src="'+ fileObjImg4.url +'" width="300" height="300">'+

      '<br /> <br /> <canvas id="myCanvas"></canvas> <br /> <br />'+
      '<p id="limpiar"><b>Limpiar firma del cliente</b></p> <br />'+

      '<br /> <br /> <canvas id="myCanvas_2"></canvas> <br /> <br />'+
      '<p id="limpiar_2"><b>Limpiar firma del médico</b></p>'+

      '<script type="application/javascript">'+

      'var limpiar = document.getElementById("limpiar");'+
      'var canvas = document.getElementById("myCanvas");'+
      'var ctx = canvas.getContext("2d");'+
      'var cw = canvas.width = 300, cx = cw / 2;'+
      'var ch = canvas.height = 300, cy = ch / 2;'+
      'var dibujar = false;'+
      'var factorDeAlisamiento = 5;'+
      'var Trazados = [];'+
      'var puntos = [];'+
      'ctx.lineJoin = "round";'+

      'var limpiar_2 = document.getElementById("limpiar_2");'+
      'var canvas_2 = document.getElementById("myCanvas_2");'+
      'var ctx_2 = canvas_2.getContext("2d");'+
      'var cw_2 = canvas_2.width = 300, cx = cw_2 / 2;'+
      'var ch_2 = canvas_2.height = 300, cy = ch_2 / 2;'+
      'var dibujar_2 = false;'+
      'var factorDeAlisamiento_2 = 5;'+
      'var Trazados_2 = [];'+
      'var puntos_2 = [];'+
      'ctx_2.lineJoin = "round";'+

'limpiar.addEventListener("click", function(evt) {'+
        'dibujar = false;'+
        'ctx.clearRect(0, 0, cw, ch);'+
        'Trazados.length = 0;'+
        'puntos.length = 0;'+
      '}, false);'+
'canvas.addEventListener("mousedown", function(evt) {'+
        'dibujar = true;'+
        'puntos.length = 0;'+
        'ctx.beginPath();'+
      '}, false);'+

'canvas.addEventListener("mouseup", function(evt) {'+
       'redibujarTrazados();'+
      '}, false);'+

'canvas.addEventListener("mouseout", function(evt) {'+
       'redibujarTrazados();'+
      '}, false);'+

'canvas.addEventListener("mousemove", function(evt) {'+
        'if (dibujar) {'+
          'var m = oMousePos(canvas, evt);'+
          'puntos.push(m);'+
          'ctx.lineTo(m.x, m.y);'+
          'ctx.stroke();'+
        '}'+
      '}, false);'+

      'function reducirArray(n,elArray) {'+
        'var nuevoArray = [];'+
        'nuevoArray[0] = elArray[0];'+
        'for (var i = 0; i < elArray.length; i++) {'+
          'if (i % n == 0) {'+
            'nuevoArray[nuevoArray.length] = elArray[i];'+
          '}'+
        '}'+
        'nuevoArray[nuevoArray.length - 1] = elArray[elArray.length - 1];'+
        'Trazados.push(nuevoArray);'+
      '}'+

      'function calcularPuntoDeControl(ry, a, b) {'+
        'var pc = {};'+
        'pc.x = (ry[a].x + ry[b].x) / 2;'+
        'pc.y = (ry[a].y + ry[b].y) / 2;'+
        'return pc;'+
      '}'+

      'function alisarTrazado(ry) {'+
        'if (ry.length > 1) {'+
          'var ultimoPunto = ry.length - 1;'+
          'ctx.beginPath();'+
          'ctx.moveTo(ry[0].x, ry[0].y);'+
          'for (i = 1; i < ry.length - 2; i++) {'+
            'var pc = calcularPuntoDeControl(ry, i, i + 1);'+
            'ctx.quadraticCurveTo(ry[i].x, ry[i].y, pc.x, pc.y);'+
          '}'+
            'ctx.quadraticCurveTo(ry[ultimoPunto - 1].x, ry[ultimoPunto - 1].y, ry[ultimoPunto].x, ry[ultimoPunto].y);'+
            'ctx.stroke();'+
        '}'+
      '}'+

      'function redibujarTrazados(){'+
        'dibujar = false;'+
        'ctx.clearRect(0, 0, cw, ch);'+
        'reducirArray(factorDeAlisamiento,puntos);'+
        'for(var i = 0; i < Trazados.length; i++)'+
        'alisarTrazado(Trazados[i]);'+
      '}'+

      'function oMousePos(canvas, evt) {'+
        'var ClientRect = canvas.getBoundingClientRect();'+
        'return {'+
          'x: Math.round(evt.clientX - ClientRect.left),'+
          'y: Math.round(evt.clientY - ClientRect.top)'+
        '}'+
      '} '+

'limpiar_2.addEventListener("click", function(evt) {'+
        'dibujar_2 = false;'+
        'ctx_2.clearRect(0, 0, cw_2, ch_2);'+
        'Trazados_2.length = 0;'+
        'puntos_2.length = 0;'+
      '}, false);'+

'canvas_2.addEventListener("mousedown", function(evt) {'+
        'dibujar_2 = true;'+
        'puntos_2.length = 0;'+
        'ctx_2.beginPath();'+
      '}, false);'+

'canvas_2.addEventListener("mouseup", function(evt) {'+
       'redibujarTrazados2();'+
      '}, false);'+

'canvas_2.addEventListener("mouseout", function(evt) {'+
       'redibujarTrazados2();'+
      '}, false);'+

'canvas_2.addEventListener("mousemove", function(evt) {'+
        'if (dibujar_2) {'+
          'var m_2 = oMousePos2(canvas_2, evt);'+
          'puntos_2.push(m_2);'+
          'ctx_2.lineTo(m_2.x, m_2.y);'+
          'ctx_2.stroke();'+
        '}'+
      '}, false);'+

      'function reducirArray2(n,elArray) {'+
        'var nuevoArray = [];'+
        'nuevoArray[0] = elArray[0];'+
        'for (var i = 0; i < elArray.length; i++) {'+
          'if (i % n == 0) {'+
            'nuevoArray[nuevoArray.length] = elArray[i];'+
          '}'+
        '}'+
        'nuevoArray[nuevoArray.length - 1] = elArray[elArray.length - 1];'+
        'Trazados_2.push(nuevoArray);'+
      '}'+

      'function calcularPuntoDeControl2(ry, a, b) {'+
        'var pc = {};'+
        'pc.x = (ry[a].x + ry[b].x) / 2;'+
        'pc.y = (ry[a].y + ry[b].y) / 2;'+
        'return pc;'+
      '}'+

      'function alisarTrazado2(ry) {'+
        'if (ry.length > 1) {'+
          'var ultimoPunto = ry.length - 1;'+
          'ctx_2.beginPath();'+
          'ctx_2.moveTo(ry[0].x, ry[0].y);'+
          'for (i = 1; i < ry.length - 2; i++) {'+
            'var pc = calcularPuntoDeControl2(ry, i, i + 1);'+
            'ctx_2.quadraticCurveTo(ry[i].x, ry[i].y, pc.x, pc.y);'+
          '}'+
            'ctx_2.quadraticCurveTo(ry[ultimoPunto - 1].x, ry[ultimoPunto - 1].y, ry[ultimoPunto].x, ry[ultimoPunto].y);'+
            'ctx_2.stroke();'+
        '}'+
      '}'+

      'function redibujarTrazados2(){'+
        'dibujar_2 = false;'+
        'ctx_2.clearRect(0, 0, cw_2, ch_2);'+
        'reducirArray2(factorDeAlisamiento_2,puntos_2);'+
        'for(var i = 0; i < Trazados_2.length; i++)'+
        'alisarTrazado2(Trazados_2[i]);'+
      '}'+

      'function oMousePos2(canvas, evt) {'+
        'var ClientRect = canvas.getBoundingClientRect();'+
        'return {'+
          'x: Math.round(evt.clientX - ClientRect.left),'+
          'y: Math.round(evt.clientY - ClientRect.top)'+
        '}'+
      '} '+
      '</script>';

    var fieldrecordCaseId = formulario.addField({id: 'custpage_case', label: 'recordCase', type: 'inlinehtml'});
    fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';

    formulario.addButton({id: 'custpage_01', label: 'Enviar firmas', functionName: 'testFunc'});
    formulario.clientScriptFileId = '1992837';
    //formulario.addButton({id: 'custpage_02', label: 'Boton2', functionName: 'callService'});

    context.response.writePage(formulario);
    }

    return {
        onRequest: onRequest
    };

});



      //context.response.write('texto');
      /*
       var xml = '<?xml version="1.0" encoding="utf-8"?>';
  xml += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
  xml += '<soap:Body>';
  xml += '<GetDateColombia xmlns="https://devkaloni.com" />';
  xml += '</soap:Body>';
  xml += '</soap:Envelope>';

      //Set up Headers
    var headers = {};
    headers['User-Agent-x'] = 'SuiteScript-Call';
    headers['Content-Type'] = 'text/xml; charset=utf-8';
  	headers['Content-Length']= 'length';
    headers['SOAPAction'] = 'https://devkaloni.com/GetDateColombia';
	var url2 = 'https://devkaloni.com/WS/WSconnect_ftp.asmx';
    var resp = null;
    var cont = https.post({url: url2, headers: headers, body: xml});
      log.debug('msg code', cont.code);
      log.debug('msg body', cont.body);

      function callService(){
		var valURl = url.resolveScript({scriptId: 'customscript916', deploymentId: 'customdeploy1', params: {param1: 'val param1'}, returnExternalUrl: true});
        //console.log('valURl:', valURl);
        var cont = https.get({url: valURl, headers: {Authorization: 'NLAuth nlauth_account=3559763, nlauth_email=acolin@kaloni.com, nlauth_signature=A2018COLIN*, nlauth_role=1092'}});
        //var cont = https.post({url: valURl, body: {val1: 'val1'}, headers: {Authorization: 'NLAuth nlauth_account=3559763, nlauth_email=acolin@kaloni.com, nlauth_signature=A2018COLIN*, nlauth_role=1092'}});
        log.debug('msg code', cont.code);
        if(cont.code == '200')
        	log.debug('msg body', cont.body);
      }
      //callService();*/

       /*<script> jQuery(function(){alert("Ejemplo alert")});</script>

      var myvar = '<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>' +
      '<script>var c = document.getElementById("myCanvas");'+
      'var ctx = c.getContext("2d");'+
      'ctx.beginPath();'+
      'ctx.arc(95,50,40,0,2*Math.PI);'+
      'ctx.stroke();</script>'; */