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
      var subsidiaryId = inRecord.getValue({ fieldId: 'subsidiary' });
      var nameC = inRecord.getText({ fieldId: 'company' });
      var name = nameC.substring(8, 100);
      var signature_nullImage = file.load({ id: 4580848 });
      var field_firmaNula = 'data:image/png;base64,' + signature_nullImage.getContents();
      var field_firmaClienteBase64 = inRecord.getValue({ fieldId: 'custevent340' }) || null;
      var background = '';

      var formulario = widget.createForm({ title: 'Firma de Contrato' });
      //var url = 'https://soportekaloni.com/consentimiento/';
      if (subsidiaryId == '19') {
        background = 'https://3559763.app.netsuite.com/core/media/media.nl?id=5124653&c=3559763&h=778f10e080998dd8a8af';
      } else {
        background = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=';
      }
      var url = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=';
      var iframeField = formulario.addField({ id: 'custpage_iframe', label: 'Page', type: 'inlinehtml' });
      /*iframeField.defaultValue = '<iframe style="display: block; height: 80vh; width: 100%; border: none;" src="' + url + '"></iframe>';*/
      var imgs = formulario.addField({ id: 'custpage_imgs', label: 'Imagenes', type: 'inlinehtml' });
      var firmasCambas = formulario.addField({ id: 'custpage_firmas', label: 'Firmas', type: 'inlinehtml' });

      if (field_firmaClienteBase64 != null) {
        field_firmaCliente = field_firmaClienteBase64;
      } else {
        field_firmaCliente = field_firmaNula;
      }

      var date = new Date();
      var tdate = date.getDate();
      var month = date.getMonth() + 1; // jan = 0
      var year = date.getFullYear();
      var currentDate = tdate + '/' + month + '/' + year;

      imgs.defaultValue = '<body>' +
        '<div align="" style="background: url(' + background + ') no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
        '<div id="scroll"><div id="notices">' +
        '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 200px;margin-top:20px">' +
        '<h1 id="titulo">CONTRATO DE PRESTACIÓN DE SERVICIOS DE KALONI HOLDING GROUP S.C.</h1>' +
        '<p id="texto">' +
        'El presente documento especifica los términos y condiciones, en adelante “Términos y Condiciones” que serán aplicados a la disposición de servicios “Servicios” prestados por Kaloni Holding Group S.C., en lo sucesivo “Kaloni”, a favor de la persona que firma este documento, en lo siguiente conocido como “El Cliente”. </p><br/>' +
        '<p id="texto">' +
        '<u>Servicio o Servicios:</u> Servicios médicos y estéticos ofrecidos por Kaloni, entre éstos se incluye el microinjerto capilar, la cirugía plástica y reconstructiva, tratamientos estéticos corporales, faciales y la venta de distintos productos para el cuidado estético. </p>' +
        '<p id="texto">' +
        '<u>Aviso y Política de Privacidad:</u> Documento físico y/o electrónico que establece las normas bajo las que se trata su Información por Kaloni. </p>' +
        '<p id="texto">' +
        '<u>Formato de Valoración:</u> Formato de entrevista realizada por el personal de Kaloni al Cliente en el cual se detalla información relevante para el correcto diagnóstico del Cliente.</p>' +
        '<p id="texto">' +
        '<u>Hoja de Presupuesto:</u> Documento que Kaloni emite formalmente en el cual se describe detalladamente el Servicio que se prestará al Cliente y los costos derivados de dicha prestación de Servicios</p>' +
        '<p id="texto">' +
        '<u>Anticipo:</u> A la cantidad monetaria que el Cliente entrega al proveedor como adelanto para reservar la Fecha de Procedimiento en la que se llevará a cabo la prestación de los Servicios.</p>' +
        '<p id="texto">' +
        '<u>Fecha de Procedimiento:</u> Fecha seleccionada por el Cliente en la cual Kaloni prestará los Servicios conforme a los Términos y Condiciones suscritas entre las partes. </p>' +
        '<p id="texto">' +
        '<u>Consentimiento Informado:</u> Documento que comunica al Cliente de forma explícita y clara toda la información relativa al procedimiento al que va a someterse, los beneficios, riesgos, y otros aspectos relevantes relacionados con los Servicios contratados.</p>' +
        '<p id="texto">' +
        '<u>Receta Médica:</u> Documento que expide el médico en el cual se le indicará al Cliente las prescripciones médicas que deberá cumplir.</p><br />' +
        '<p id="texto">' +
        'A la Hoja de Presupuesto, a los Términos y Condiciones y al Consentimiento Informado se les denominará conjuntamente el “Contrato”.</p><br />' +
        '<p id="texto">' +
        '<b>Valoración Previa Requerida.</b> El Cliente podrá programar su cita de valoración en cualquiera de nuestras clínicas, directorio disponible en <a href="https://kaloni.mx">https://kaloni.mx</a>, en la cita de valoración se le explicarán detalladamente las opciones de tratamiento y los costos derivados. Kaloni prestará los servicios al Cliente de acuerdo con lo establecido en el Contrato. </p>' +
        '<p id="texto">' +
        '<b>Cooperación.</b> El Cliente deberá proporcionar a Kaloni información verdadera en todo momento. El Cliente reconoce que deberá seguir cabalmente todos los cuidados indicados y asistir a todas las citas de seguimiento.</p><br />' +
        '<p id="texto">' +
        '<b>De la Prestación del Servicio.</b> El Cliente reconoce tener conocimiento que los Servicios objeto de este Contrato serán prestados por personal médico y/o estético altamente capacitado, habiendo aceptado y autorizado expresamente en el Consentimiento Informado con la realización de los procedimientos por dicho profesional. Una vez que los Servicios sean prestados no se realizarán devoluciones. En el caso de compra de producto, una vez acreditado el pago correspondiente, Kaloni procederá a la entrega de la mercancía.</p><br />' +
        '<p id="texto">' +
        '<b>Pago.</b> Con la finalidad de reservar la Fecha de Procedimiento, el Cliente podrá realizar el pago total del Servicio contratado o podrá realizar un pago parcial en concepto de Anticipo, el cual no podrá ser menor a la cantidad equivalente al 10% del monto total de su procedimiento, en este último caso, el Cliente se obliga a  pagar el monto restante a más tardar en la Fecha de Procedimiento. El pago podrá ser realizado en efectivo en las cajas de Kaloni, a través de tarjeta de crédito o débito en nuestras terminales bancarias o mediante transferencia bancaria conforme a los siguientes datos:</p>' +
        '<p id="texto">' +
        'Banco: BBVA Bancomer</p>' +
        '<p id="texto">' +
        'Beneficiario: KALONI HOLDING GROUP, S.C.</p>' +
        '<p id="texto">' +
        'Cuenta: 0100361658</p>' +
        '<p id="texto">' +
        'CLABE Interbancaria: 0121 8000 1003 6165 86</p><br />' +
        '<p id="texto">' +
        '<b>Facturación.</b> Al momento de hacer su pago, la Ejecutiva de Atención a Clientes proporcionará al Cliente un Formato de Facturación mismo que deberá llenar con su información correcta y firmar. En caso de requerir factura con datos fiscales, deberá indicar sus datos fiscales correctos y completos, en caso de no requerirla deberá señalarlo en el mismo formato ya que Kaloni facturará a público en general como parte de las ventas del día, por lo tanto no se expedirán facturas posteriores al día de pago.   </p><br />' +
        '<p id="texto">' +
        '<b>Resultado.</b> El Cliente comprende que la práctica de la medicina no es una ciencia exacta, y que por tal motivo no es posible garantizar un resultado, dado que dicho resultado puede variar en razón a factores tales como cuidados y precauciones que son responsabilidad del Cliente y algunos otros aleatorios relacionados con la naturaleza de cada Cliente. El Cliente manifiesta, además, haber recibido información detallada sobre el diagnóstico, los posibles pronósticos, habiendo sido todo perfectamente entendido y aceptado por él, obligándose a cumplir todas las prescripciones médicas anteriores y posteriores al procedimiento médico, a fin de minimizar la ocurrencia de cualquiera de los riesgos señalados en el Consentimiento Informado.</p><br />' +
        '<p id="texto">' +
        '<b>Devolución.</b> El Cliente podrá cancelar o modificar la programación del Servicio contratado siempre y cuando notifique a Kaloni con una antelación de siete días hábiles previos a la Fecha de Procedimiento. El Cliente acepta y reconoce que si decide cancelar el Servicio fuera de este término, Kaloni retendrá el monto equivalente al 10% del costo total del procedimiento por concepto de Gastos Administrativos. La solicitud de devolución será procedente únicamente dentro de los siguientes treinta días naturales contados a partir de la fecha de su pago parcial o total; una vez concluido este término, Kaloni no realizará devolución monetaria, únicamente podrá ofrecer al Cliente cambio por otros servicios y/o producto. El Cliente deberá contactar <u>servicioalcliente@kaloni.com</u> para iniciar el trámite, no se atenderán solicitudes de devolución por otro medio. Kaloni dará respuesta a su solicitud mediante el envío de un Formato de Devolución, mismo que el Cliente deberá llenar con la información relativa a su pago y enviar adjuntando la factura, recibo o comprobante bancario al correo electrónico anteriormente mencionado. Una vez recibido el formato con la información completa, Kaloni notificará a El Cliente la correcta recepción de su trámite y a partir de esta fecha Kaloni tendrá 30 días hábiles para concluir el trámite de su devolución. El Cliente comprende y acepta que en el supuesto de cancelación del Servicio y solicitud de devolución, Kaloni retendrá las comisiones bancarias conforme a la cláusula siguiente.</p><br />' +
        '<p id="texto">' +
        '<b>Comisiones Bancarias.</b> La comisión bancaria aplicable por uso de terminal será del 3.7% en tarjetas American Express y del 2% en el resto de tarjetas bancarias. Si el pago se realizó a meses sin intereses, adicional a la comisión por uso de la terminal se retendrá la cantidad correspondiente al 12% en compras a 12 meses sin intereses y 6% en compras a 6 meses sin intereses.</p><br />' +
        '<p id="texto">' +
        '<b>Producto.</b> El Cliente contará con 30 días naturales a partir de la fecha de compra para solicitar el cambio o la devolución de un producto. Una vez abierto el producto no se aceptarán devoluciones.</p><br />' +
        '<p id="texto">' +
        '<b>Tratamiento De Datos Personales.</b> El Aviso de Privacidad y las políticas de uso y recopilación de información de Kaloni se encuentran disponibles para su consulta en nuestro sitio web <a href="http://kaloni.mx">http://kaloni.mx.</a></p><br />' +
        '<p id="texto">' +
        '<b>Leyes Aplicables y Jurisdicción.</b> Para la interpretación, cumplimiento y ejecución del presente Contrato, las partes se someten a la jurisdicción y competencia de las autoridades competentes de la Ciudad de México, renunciando expresamente y desde este momento a cualquier otro fuero que por razón de su domicilio presente o futuro pudiera corresponderles.</p><br />' +
        '<p id="texto">' +
        '<p id="texto"></p>' +
        '<p style="text-align: center;"><img id="myImgFirmaCli" src="' + field_firmaCliente + '" width="200" height="200"></p>' +
        '<p style="text-align: center;"><b>' + name + '</b></p>' +
        '<p style="text-align: center;">FIRMA DEL PACIENTE</p>' +
        '</div>' +
        '</div></div>' +
        '</body>';


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
        'padding-bottom: 500px;' +
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
        'padding-bottom: 500px;' +
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
        'padding-bottom: 500px;' +
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
        'padding-bottom: 700px;' +
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
        'padding-bottom: 700px;' +
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
        '  background-color: rgba(0,0,0,0.4);' +
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
        '</style>' +

        '<div id="myModal" class="modal">' +
        '<div class="modal-content">' +
        '<canvas id="sig-canvas" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
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
        '    var canvas = document.getElementById("sig-canvas");' +
        '    var ctx = canvas.getContext("2d");' +
        '    ctx.strokeStyle = "#222222";' +
        '    ctx.lineWith = 2;' +
        '' +
        '    var drawing = false;' +
        '    var mousePos = { x:0, y:0 };' +
        '    var lastPos = mousePos;' +
        '' +
        '    canvas.addEventListener("mousedown", function (e) {' +
        '        drawing = true;' +
        '        lastPos = getMousePos(canvas, e);' +
        '    }, false);' +
        '' +
        '    canvas.addEventListener("mouseup", function (e) {' +
        '        drawing = false;' +
        '    }, false);' +
        '' +
        '    canvas.addEventListener("mousemove", function (e) {' +
        '        mousePos = getMousePos(canvas, e);' +
        '    }, false);' +
        '' +
        '    canvas.addEventListener("touchstart", function (e) {' +
        '        mousePos = getTouchPos(canvas, e);' +
        '        var touch = e.touches[0];' +
        '        var mouseEvent = new MouseEvent("mousedown", {' +
        '            clientX: touch.clientX,' +
        '            clientY: touch.clientY' +
        '        });' +
        '        canvas.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvas.addEventListener("touchend", function (e) {' +
        '        var mouseEvent = new MouseEvent("mouseup", {});' +
        '        canvas.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvas.addEventListener("touchmove", function (e) {' +
        '        var touch = e.touches[0];' +
        '        var mouseEvent = new MouseEvent("mousemove", {' +
        '            clientX: touch.clientX,' +
        '            clientY: touch.clientY' +
        '        });' +
        '        canvas.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    document.body.addEventListener("touchstart", function (e) {' +
        '        if (e.target == canvas) {' +
        '            e.preventDefault();' +
        '        }' +
        '    }, false);' +
        '' +
        '    document.body.addEventListener("touchend", function (e) {' +
        '        if (e.target == canvas) {' +
        '            e.preventDefault();' +
        '        }' +
        '    }, false);' +
        '' +
        '    document.body.addEventListener("touchmove", function (e) {' +
        '        if (e.target == canvas) {' +
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
        '    }' +
        '' +
        '    (function drawLoop () {' +
        '        requestAnimFrame(drawLoop);' +
        '        renderCanvas();' +
        '    })();' +
        '' +
        '})();' +
        '</script>';

      var fieldrecordCaseId = formulario.addField({ id: 'custpage_case', label: 'recordCase', type: 'inlinehtml' });
      fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';
      formulario.addButton({ id: 'custpage_01', label: 'Enviar Firma', functionName: 'enviarFirmas' });
      formulario.addButton({ id: 'custpage_0113', label: 'Limpiar Firma', functionName: 'limpiarFirmaCli' });
      formulario.addButton({ id: 'custpage_0112', label: 'Firmar', functionName: 'abrirModal' });
      formulario.clientScriptFileId = '2149518';
      context.response.writePage(formulario);

    }
    return {
      onRequest: onRequest
    };

  });
