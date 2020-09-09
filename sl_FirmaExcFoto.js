/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/url', 'N/https', 'N/file', 'N/record'],

  function (widget, url, https, file, record) {

    function onRequest(context) {
      var recordCase_Id = context.request.parameters.recordCaseId;
      var inRecord = record.load({ type: 'SUPPORTCASE', id: recordCase_Id, isDynamic: true });
      var companyId = inRecord.getValue({ fieldId: 'company' });
      var cliente = record.load({ type: 'customer', id: companyId });
      var nameC = inRecord.getText({ fieldId: 'company' });
      var name = nameC.substring(8, 100);
      var sucursalText = cliente.getText({ fieldId: 'custentity25' });
      var sucReal = sucursalReal(sucursalText);
      var nombrePaciente = cliente.getText({ fieldId: 'altname' }) || '';

      var formulario = widget.createForm({ title: 'Firma de Exclusión de Fotografía' });
      //var url = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=';
      //var iframeField = formulario.addField({ id: 'custpage_iframe', label: 'Page', type: 'inlinehtml' });
      //var imgs = formulario.addField({ id: 'custpage_imgs', label: 'Imagenes', type: 'inlinehtml' });
      var firmasCambas = formulario.addField({ id: 'custpage_firmas', label: 'Firmas', type: 'inlinehtml' });


      var date = new Date();
      var tdate = date.getDate();
      var month = date.getMonth() + 1; // jan = 0
      var year = date.getFullYear();
      var currentDate = tdate + '/' + month + '/' + year;
      var field_firmaNula = 'data:image/png;base64,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';

      var canvasEmpty = "data:image/png;base64,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";

      var headPDF = '<body>' +
        '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
        '<div id="scroll"><div id="notices">' +
        '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 50px;margin-top:20px">' +
        '<h1 id="titulo">FORMULARIO DE EXCLUSIÓN DE FOTOGRAFÍA PARA EXPEDIENTE CLÍNICO ELECTRÓNICO</h1>';

      var bodyPDF = '<p id="texto">' +
        '<p id="texto">El expediente clínico electrónico es una fuente de información que amplía el dictamen médico experto, conformándose por una descripción médica aunado a documentos, imágenes, procedimientos, pruebas diversas, análisis e información de estudios practicados al paciente.</p><br/>' +

        '<p id="texto">Comprendo que el expediente clínico electrónico de manera integral, representa una base para conocer las condiciones de salud, los actos médicos, los diferentes procedimientos ejecutados por el equipo médico así como los resultados y progreso de mi tratamiento.</p><br/>' +

        '<p id="texto">(Solo firme si rechaza el permiso)</p><br/>' +

        '<p id="texto">No otorgo autorización para la toma de fotografías y/o videos durante mi proceso de tratamiento en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p><br/>' +

        '<p id="texto">Firmo la presente, en <b>' + sucReal + ' a ' + currentDate + ' </b></p><br/>' +

        '<p id="texto">' +
        'Atentamente,</p>' +
        '<p id="texto"></p>' +
        '<p style="text-align: center;"><img id=\"myImgFirmaCli\" src=\"' + field_firmaNula + '\" width=\"200\" height=\"200\"></p>' +
        '<p style="text-align: center;"><b>' + nombrePaciente + '</b></p>' +
        '<p style="text-align: center;">FIRMA DEL PACIENTE</p>' +
        '</div>' +
        '</div></div>' +
        '</body>';

      var footerPDF = '' + // '<center><img id="myImgFirma" src="#" width="300" height="200"></center><br/>'+
        //'<center><b>_________________________________________________________</b></center><br/>'+
        //'<center><b>FIRMA DEL PACIENTE</b></center><br/>'+
        '</div>' +
        '</div>' +
        '</body>';

      var pdfDoc = formulario.addField({ id: 'custpage_pdfdoc', label: 'PdfDoc', type: 'inlinehtml' });
      //var firma = formulario.addField({id: 'custpage_firmacliente', label: 'FirmaCliente', type: 'inlinehtml'});

      pdfDoc.defaultValue = headPDF + bodyPDF + footerPDF;

      firmasCambas.defaultValue = '<style type="text/css">' +
        '@media only screen and (min-width: 576px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:12px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: contain;' +
        'background-repeat: no-repeat;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 50px;' +
        'margin-top:10px' +
        '    }' +
        '}' +
        '@media only screen and (min-width: 768px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:12px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: contain;' +
        'background-repeat: no-repeat;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 50px;' +
        'margin-top:10px' +
        '    }' +
        '    #titulo{' +
        '    padding-top: 180px;' +
        '    }' +
        '}' +
        '@media only screen and (min-width: 768px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:12px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: contain;' +
        'background-repeat: no-repeat;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 50px;' +
        'margin-top:10px;' +
        '    }' +
        '    #titulo{' +
        '    padding-top: 180px;' +
        '    }' +
        '}' +
        '@media only screen and (min-width: 992px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:16px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: cover;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 50px;' +
        'margin-top:10px;' +
        '    }' +
        '    #titulo{' +
        '    padding-top: 120px;' +
        '    }' +
        '}' +
        '@media only screen and (min-width: 1200px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:16px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: cover;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 50px;' +
        'margin-top:10px;' +
        '    }' +
        '    #titulo{' +
        '    padding-top: 120px;' +
        '    }' +
        '}' +

        'h1 {' +
        '  border-bottom: 1px solid  #5D6975;' +
        '  color: #5D6975;' +
        '  font-size: 2.4em;' +
        '  line-height: 1.4em;' +
        '  font-weight: normal;' +
        '  text-align: center;' +
        '  margin: 0 0 20px 0;' +
        '}' +

        '#notices .notice {' +
        '  color: #5D6975;' +
        '  font-size: 1.2em;' +
        '}' +

        'footer {' +
        '  color: #5D6975;' +
        '  width: 100%;' +
        '  height: 30px;' +
        '  position: absolute;' +
        '  bottom: 0;' +
        '  border-top: 1px solid #C1CED9;' +
        '  padding: 8px 0;' +
        '  text-align: center;' +
        '}' +
        'body {font-family: Arial, Helvetica, sans-serif;}' +
        '.modal {' +
        '  display: none;' +
        '  position: fixed;' +
        '  z-index: 1; ' +
        '  padding-top: 100px; ' +
        '  left: 0;' +
        '  top: 0;' +
        '  width: 100%; ' +
        '  height: 100%;' +
        '  overflow: auto; ' +
        '  background-color: rgb(0,0,0,0.4); ' +
        '}' +
        '' +
        '.modal-content {' +
        '  background-color: #fefefe;' +
        '  margin: auto;' +
        '  padding: 10px;' +
        '  border: 1px solid #888;' +
        '  width: 528px;' +
        '  height: 560px;' +
        '}' +
        '' +
        '.close {' +
        '  color: #aaaaaa;' +
        '  float: right;' +
        '  font-size: 28px;' +
        '  font-weight: bold;' +
        '}' +
        '' +
        '.close:hover,' +
        '.close:focus {' +
        '  color: #000;' +
        '  text-decoration: none;' +
        '  cursor: pointer;' +
        '}' +
        '#scroll {' +
        'border: 1px solid black;' +
        /*'  width: 785px;'+
        '  height: 900px;'+*/
        '  overflow-y: auto;' +
        '}' +

        '</style>' +

        '<div id="myModal" class="modal">' +
        '<div class="modal-content">' +
        '<canvas id="sig-canvas2" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
        '<br /> <b><center>FIRMA DEL PACIENTE<br /></center></b>' +
        '<button id="btn_cerrarFirmaPaciente">Terminar</button>' +
        '</div>' +
        '</div>' +


        '<script type="application/javascript">' +
        'document.addEventListener("touchmove", function(e) {' +
        '  e.preventDefault();' +
        '},' +
        '{ passive: true });' +


        '(function() {' +
        '' +
        '    window.requestAnimFrame = (function (callback) {' +
        '        return window.requestAnimationFrame || ' +
        '                    window.webkitRequestAnimationFrame ||' +
        '                    window.mozRequestAnimationFrame ||' +
        '                    window.oRequestAnimationFrame ||' +
        '                    window.msRequestAnimaitonFrame ||' +
        '                    function (callback) {' +
        '                        window.setTimeout(callback, 1000/60);' +
        '                    };' +

        '    })();' +
        '' +
        '    var canvas2 = document.getElementById("sig-canvas2");' +
        '    var ctx2 = canvas2.getContext("2d");' +
        '    ctx2.strokeStyle = "#222222";' +
        '    ctx2.lineWith = 2;' +
        '' +
        '    var drawing = false;' +
        '    var mousePos = { x:0, y:0 };' +
        '    var lastPos = mousePos;' +
        '' +
        '    var drawing2 = false;' +
        '    var mousePos2 = { x:0, y:0 };' +
        '    var lastPos2 = mousePos2;' +
        '' +
        '    canvas2.addEventListener("mousedown", function (e) {' +
        '        drawing2 = true;' +
        '        lastPos2 = getMousePos(canvas2, e);' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("mouseup", function (e) {' +
        '        drawing2 = false;' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("mousemove", function (e) {' +
        '        mousePos2 = getMousePos(canvas2, e);' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("touchstart", function (e) {' +
        '        mousePos2 = getTouchPos(canvas2, e);' +
        '        var touch = e.touches[0];' +
        '        var mouseEvent = new MouseEvent("mousedown", {' +
        '            clientX: touch.clientX,' +
        '            clientY: touch.clientY' +
        '        });' +
        '        canvas2.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("touchend", function (e) {' +
        '        var mouseEvent = new MouseEvent("mouseup", {});' +
        '        canvas2.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("touchmove", function (e) {' +
        '        var touch = e.touches[0];' +
        '        var mouseEvent = new MouseEvent("mousemove", {' +
        '            clientX: touch.clientX,' +
        '            clientY: touch.clientY' +
        '        });' +
        '        canvas2.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    document.body.addEventListener("touchstart", function (e) {' +
        '        if (e.target == canvas2) {' +
        '            e.preventDefault();' +
        '        }' +
        '    }, false);' +
        '' +
        '    document.body.addEventListener("touchend", function (e) {' +
        '        if (e.target == canvas2) {' +
        '            e.preventDefault();' +
        '        }' +
        '    }, false);' +
        '' +
        '    document.body.addEventListener("touchmove", function (e) {' +
        '        if (e.target == canvas2) {' +
        '            e.preventDefault();' +
        '        }' +
        '    }, false);' +
        '' +
        '    function getMousePos(canvasDom, mouseEvent) {' +
        '        var rect = canvasDom.getBoundingClientRect();' +
        '        return {' +
        '            x: mouseEvent.clientX - rect.left,' +
        '            y: mouseEvent.clientY - rect.top' +
        '        };' +
        '    }' +
        '' +
        '    function getTouchPos(canvasDom, touchEvent) {' +
        '        var rect = canvasDom.getBoundingClientRect();' +
        '        return {' +
        '            x: touchEvent.touches[0].clientX - rect.left,' +
        '            y: touchEvent.touches[0].clientY - rect.top' +
        '        };' +
        '    }' +
        '' +
        '    function renderCanvas() {' +
        '        if (drawing) {' +
        '            ctx.moveTo(lastPos.x, lastPos.y);' +
        '            ctx.lineTo(mousePos.x, mousePos.y);' +
        '            ctx.stroke();' +
        '            lastPos = mousePos;' +
        '        }' +
        '        if (drawing2) {' +
        '            ctx2.moveTo(lastPos2.x, lastPos2.y);' +
        '            ctx2.lineTo(mousePos2.x, mousePos2.y);' +
        '            ctx2.stroke();' +
        '            lastPos2 = mousePos2;' +
        '        }' +
        '    }' +
        '' +
        '    (function drawLoop () {' +
        '        requestAnimFrame(drawLoop);' +
        '        renderCanvas();' +
        '    })();' +
        '' +
        '})();' +
        '</script>';

      var fieldrecordCaseId = formulario.addField({
        id: 'custpage_case',
        label: 'recordCase',
        type: 'inlinehtml'
      });

      fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';

      formulario.addButton({
        id: 'custpage_01',
        label: 'Enviar Firma',
        functionName: 'enviarFirmas'
      });

      formulario.addButton({
        id: 'custpage_0113',
        label: 'Limpiar Firma',
        functionName: 'limpiarFirmaCli'
      });

      formulario.addButton({
        id: 'custpage_0112',
        label: 'Firmar',
        functionName: 'abrirModal'
      });

      formulario.clientScriptFileId = '2361985';

      context.response.writePage(formulario);
    }

    function sucursalReal(sucursalText) {
      var largoSucrusal = sucursalText.length;
      largoSucrusal = largoSucrusal - 4;
      var sucursalFinal = sucursalText.slice(0, largoSucrusal);
      return sucursalFinal;
    }

    return {
      onRequest: onRequest
    };

  });
