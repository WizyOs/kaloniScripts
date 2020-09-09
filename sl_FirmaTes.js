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
            var sucursalText = inRecord.getText({ fieldId: 'custevent2' });
            var sucReal = sucursalReal(sucursalText);

            var formulario = widget.createForm({ title: 'Firma de Testimonial' });
            //var url = 'https://soportekaloni.com/consentimiento/';
            var url = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=';
            var iframeField = formulario.addField({ id: 'custpage_iframe', label: 'Page', type: 'inlinehtml' });
            /*iframeField.defaultValue = '<iframe style="display: block; height: 80vh; width: 100%; border: none;" src="' + url + '"></iframe>';*/
            var imgs = formulario.addField({ id: 'custpage_imgs', label: 'Imagenes', type: 'inlinehtml' });
            var firmasCambas = formulario.addField({ id: 'custpage_firmas', label: 'Firmas', type: 'inlinehtml' });

            var signature_nullImage = file.load({ id: 4580848 });
            var field_firmaNula = 'data:image/png;base64,' + signature_nullImage.getContents();


            var date = new Date();
            var tdate = date.getDate();
            var month = date.getMonth() + 1; // jan = 0
            var year = date.getFullYear();
            var currentDate = tdate + '/' + month + '/' + year;


            imgs.defaultValue = '<body>' +
                '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
                '<div id="scroll"><div id="notices">' +
                '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 60px;margin-top:20px">' +
                '<h1 id="titulo">AUTORIZACIÓN DE USO DE IMAGEN EN FOTOGRAFÍA Y/O VIDEO PARA PUBLICACIÓN Y/O DIFUSIÓN</h1>' +
                '<p id="texto">' +
                '<p id="texto">Yo <b>' + name + '</b> (el “Paciente”), autorizo a Kaloni Holding Group, S.C., y sus afiliados (colectivamente "Kaloni") a usar secuencias de video y/o fotografías de mí y sus derivados, e incorporar tales videos y fotos en medios y materiales con la finalidad de participar en campañas, promocionales, programas didácticos y en lo general todos los necesarios para la difusión y promoción de la marca KALONI, propiedad de “Kaloni” y sus afiliados.</p><br/>' +
                '<p id="texto">Autorizo  la  utilización  de  mi  imagen  en  campañas,  promocionales  y  demás  materiales  de apoyo que “Kaloni” considere pertinentes para la difusión y promoción de la marca KALONI que se distribuya en el país o en el extranjero por cualquier medio, ya sea impreso, electrónico, digital o cualquier otro. En cumplimiento a la normativa vigente, “Kaloni” garantiza que ha adoptado las medidas técnicas y organizativas necesarias para mantener el nivel de seguridad requerido en atención a la naturaleza de los datos tratados.</p><br/>' +
                '<p id="texto">Es mi deseo establecer que esta autorización es voluntaria y gratuita y, por el presente renuncio a cualquier derecho a recibir compensación por tales usos en virtud de la autorización precedente. Por lo anterior me comprometo a no ejercer ninguna acción encaminada a reclamar alguna gratificación, regalía o concepto semejante y expresamente renuncio a aquella acción que pudiera proceder por el uso de la o las fotografías.</p><br/>' +
                '<p id="texto">La presente autorización no estará sujeta a temporalidad alguna; sin embargo, en cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de Particulares, la autorización será revocable por el “Paciente” en cualquier momento en los términos contenidos en el Aviso de Privacidad de “Kaloni”.</p><br/>' +
                '<p id="texto">En prueba de conformidad firmo la presente, en <b>' + sucReal + ' a ' + currentDate + ' </b></p><br/>' +
                '<p id="texto">' +
                'Atentamente,</p>' +
                '<p id="texto"></p>' +
                '<p style="text-align: center;"><img id=\"myImgFirmaCli\" src=\"' + field_firmaNula + '\" width=\"200\" height=\"200\"></p>' +
                '<p style="text-align: center;">' + name + '<br />' +
                'FIRMA DEL TESTIMONIAL</p>' +
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
                //'  overflow: auto; '+
                '  background-color: rgb(0,0,0); ' +
                '  background-color: #00000069;' +
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
                '<div class="modal-content overlay">' +
                '<canvas id="sig-canvas2" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
                '<br /> <b><center>FIRMA PACIENTE<br /></center></b>' +
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

            var fieldrecordCaseId = formulario.addField({ id: 'custpage_case', label: 'recordCase', type: 'inlinehtml' });
            fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';
            formulario.addButton({ id: 'custpage_01', label: 'Enviar Firma', functionName: 'enviarFirmas' });
            formulario.addButton({ id: 'custpage_0112', label: 'Firmar', functionName: 'abrirModal' });
            //formulario.addButton({id: 'custpage_01123', label: 'Mostrar Firma', functionName: 'mostrarFirmas'});
            formulario.addButton({ id: 'custpage_0113', label: 'Limpiar Firma', functionName: 'limpiarFirmaCli' });
            formulario.clientScriptFileId = '2132602';
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
