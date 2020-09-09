    /**
     * @NApiVersion 2.x
     * @NScriptType Suitelet
     * @NModuleScope Public
     */

    define(['N/ui/serverWidget', 'N/url', 'N/https', 'N/file', 'N/record'],

        function (widget, url, https, file, record) {

            function onRequest(context) {
                var recordCase_Id = context.request.parameters.recordCaseId;
                var caso = record.load({ type: 'supportcase', id: recordCase_Id });
                var pintarCabeza = caso.getValue({ fieldId: 'custevent511' }) || null;
                var pintarRostro = caso.getValue({ fieldId: 'custevent801' }) || null;
                var formulario = widget.createForm({ title: 'Pintar Zonas Cabeza y Rostro' });

                var imagenesFondo = formulario.addField({ id: 'custpage_imagenes_fondo', label: 'Imágenes', type: 'inlinehtml' });
                var zonasCabezaCambas = formulario.addField({ id: 'custpage_img_cabeza', label: 'Pintar Zonas Cabeza y Rostro', type: 'inlinehtml' });

                var imagenFondo_Rostro = file.load({ id: 2592214 }); // internal Id archivo 
                var imagenBase64_Rostro = imagenFondo_Rostro.getContents();
                var imagenFondo_Cabeza = file.load({ id: 2339447 }); // internal Id archvio 
                var imagenBase64_Cabeza = imagenFondo_Cabeza.getContents();

                log.debug('Imagen Rostro',imagenBase64_Rostro);
                log.debug('Imagen Cabeza',imagenBase64_Cabeza);

                imagenesFondo.defaultValue = '<body>' +
                    '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
                    '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 30px;margin-top:20px">' +
                    '<h1 id="titulo" align="center">IMÁGENES CABEZA Y ROSTRO</h1>' +
                    '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
                    '<tr><td align="center" width="50%"><img id="imagenCabeza" width="240px" height="360px"';
                if (pintarCabeza == null) {
                    imagenesFondo.defaultValue += 'src="data:image/jpeg;base64,' + imagenBase64_Cabeza + '" />';
                } else {
                    imagenesFondo.defaultValue += 'src="' + pintarCabeza + '" />';
                }
                imagenesFondo.defaultValue += '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>Pintura de Cabeza</b></p></td>' +
                    '<td align="center" width="50%"><img id="imagenRostro" width="360px" height="360px"';
                if (pintarRostro == null) {
                    imagenesFondo.defaultValue += 'src="data:image/jpeg;base64,' + imagenBase64_Rostro + '" />';
                } else {
                    imagenesFondo.defaultValue += 'src="' + pintarRostro + '" />';
                }
                imagenesFondo.defaultValue += '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>Pintura de Rostro</b></p></td></tr>' +
                    '</table>' +
                    '</body>';

                zonasCabezaCambas.defaultValue = '<style type="text/css">' +
                    '@media only screen and (min-width: 576px) {' +
                    '    #texto{' +
                    '    text-align: justify;' +
                    'font-size:12px;' +
                    '    }' +
                    '    #fondo{' +
                    'background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=);' +
                    'background-size: contain;' +
                    'background-repeat: no-repeat;' +
                    'margin-left: 40px!important;' +
                    'margin-right: 40px!important;' +
                    'margin-bottom: 40px;' +
                    'padding-bottom: 500px;' +
                    'margin-top:10px' +
                    '    }' +
                    '    #titulo{' +
                    '    padding-top: 120px;' +
                    '    }' +
                    '}' +
                    '@media only screen and (min-width: 768px) {' +
                    '    #texto{' +
                    '    text-align: justify;' +
                    'font-size:12px;' +
                    '    }' +
                    '    #fondo{' +
                    'background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=);' +
                    'background-size: contain;' +
                    'background-repeat: no-repeat;' +
                    'margin-left: 40px!important;' +
                    'margin-right: 40px!important;' +
                    'margin-bottom: 40px;' +
                    'padding-bottom: 500px;' +
                    'margin-top:10px;' +
                    '    }' +
                    '    #titulo{' +
                    '    padding-top: 120px;' +
                    '    }' +
                    '}' +
                    '@media only screen and (min-width: 992px) {' +
                    '    #texto{' +
                    '    text-align: justify;' +
                    'font-size:16px;' +
                    '    }' +
                    '    #fondo{' +
                    'background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=);' +
                    'background-size: cover;' +
                    'margin-left: 40px!important;' +
                    'margin-right: 40px!important;' +
                    'margin-bottom: 40px;' +
                    'padding-bottom: 500px;' +
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
                    'background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=);' +
                    'background-size: cover;' +
                    'margin-left: 40px!important;' +
                    'margin-right: 40px!important;' +
                    'margin-bottom: 40px;' +
                    'padding-bottom: 500px;' +
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
                    '  justify-content:center;' +
                    '}' +
                    '' +
                    '.modal-content {' +
                    '  background-color: #fefefe;' +
                    '  margin: auto;' +
                    '  padding: 20px;' +
                    '  border: 1px solid #888;' +
                    '  width: 366px;' +
                    '  height: 548px;' +
                    '}' +
                    '.modal-contentRostro {' +
                    '  background-color: #fefefe;' +
                    '  margin: auto;' +
                    '  padding: 15px;' +
                    '  border: 1px solid #888;' +
                    '  width: 556px;' +
                    '  height: 566px;' +
                    '}' +
                    '</style>' +

                    '<div id="myModal" class="modal">' +
                    '<div class="modal-content">' +
                    '<canvas id="sig-canvas" width="320" height="480" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair; background: url(\'https://system.na2.netsuite.com/core/media/media.nl?id=743298&c=3559763&h=8560f5a4e2852363f9b4\');">Get a better browser, bro.</canvas>' +
                    '<br /> <b>Pintar Zonas Cabeza</b>' +
                    '<br /><button id="btn_cerrarPintarCabeza">Terminar</button>' +
                    '</div>' +
                    '</div>' +

                    '<div id="myModalRostro" class="modal">' +
                    '<div class="modal-contentRostro">' +
                    '<canvas id="sig-canvasRostro" width="518" height="505" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair; background: url(\'https://system.na2.netsuite.com/core/media/media.nl?id=2557710&c=3559763&h=9ebd9d599112a672abce\');">Get a better browser, bro.</canvas>' +
                    '<br /> <b>Pintar Zonas Rostro</b>' +
                    '<br /><button id="btn_cerrarPintarRostro">Terminar</button>' +
                    '</div>' +
                    '</div>' +

                    '<canvas id="newCabeza" width="320" height="480" hidden></canvas>' +
                    '<canvas id="dummyCabeza" width="320" height="480" hidden></canvas>' +

                    '<canvas id="newRostro" width="518" height="505" hidden></canvas>' +
                    '<canvas id="dummyRostro" width="518" height="505" hidden></canvas>' +

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
                    '    ctx.strokeStyle = "#0070ff";' +
                    '    ctx.lineWith = 2;' +
                    '' +
                    '    var canvasRostro = document.getElementById("sig-canvasRostro");' +
                    '    var ctxRostro = canvasRostro.getContext("2d");' +
                    '    ctxRostro.strokeStyle = "#0070ff";' +
                    '    ctxRostro.lineWith = 2;' +
                    '' +
                    '    var drawing = false;' +
                    '    var mousePos = { x:0, y:0 };' +
                    '    var lastPos = mousePos;' +
                    '' +
                    '    var drawingRostro = false;' +
                    '    var mousePosRostro = { x:0, y:0 };' +
                    '    var lastPosRostro = mousePosRostro;' +
                    '' +
                    '    canvas.addEventListener("mousedown", function (e) {' +
                    '        drawing = true;' +
                    '        lastPos = getMousePos(canvas, e);' +
                    '    }, false);' +
                    '' +
                    '    canvasRostro.addEventListener("mousedown", function (e) {' +
                    '        drawingRostro = true;' +
                    '        lastPosRostro = getMousePos(canvasRostro, e);' +
                    '    }, false);' +
                    '' +
                    '    canvas.addEventListener("mouseup", function (e) {' +
                    '        drawing = false;' +
                    '    }, false);' +
                    '' +
                    '    canvasRostro.addEventListener("mouseup", function (e) {' +
                    '        drawingRostro = false;' +
                    '    }, false);' +
                    '' +
                    '    canvas.addEventListener("mousemove", function (e) {' +
                    '        mousePos = getMousePos(canvas, e);' +
                    '    }, false);' +
                    '' +
                    '    canvasRostro.addEventListener("mousemove", function (e) {' +
                    '        mousePosRostro = getMousePos(canvasRostro, e);' +
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
                    '    canvasRostro.addEventListener("touchstart", function (e) {' +
                    '        mousePosRostro = getTouchPos(canvasRostro, e);' +
                    '        var touch = e.touches[0];' +
                    '        var mouseEvent = new MouseEvent("mousedown", {' +
                    '            clientX: touch.clientX,' +
                    '            clientY: touch.clientY' +
                    '        });' +
                    '        canvasRostro.dispatchEvent(mouseEvent);' +
                    '    }, false);' +
                    '' +
                    '    canvas.addEventListener("touchend", function (e) {' +
                    '        var mouseEvent = new MouseEvent("mouseup", {});' +
                    '        canvas.dispatchEvent(mouseEvent);' +
                    '    }, false);' +
                    '' +
                    '    canvasRostro.addEventListener("touchend", function (e) {' +
                    '        var mouseEvent = new MouseEvent("mouseup", {});' +
                    '        canvasRostro.dispatchEvent(mouseEvent);' +
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
                    '    canvasRostro.addEventListener("touchmove", function (e) {' +
                    '        var touch = e.touches[0];' +
                    '        var mouseEvent = new MouseEvent("mousemove", {' +
                    '            clientX: touch.clientX,' +
                    '            clientY: touch.clientY' +
                    '        });' +
                    '        canvasRostro.dispatchEvent(mouseEvent);' +
                    '    }, false);' +
                    '' +
                    '    document.body.addEventListener("touchstart", function (e) {' +
                    '        if (e.target == canvas || e.target == canvasRostro) {' +
                    '            e.preventDefault();' +
                    '        }' +
                    '    }, false);' +
                    '' +
                    '    document.body.addEventListener("touchend", function (e) {' +
                    '        if (e.target == canvas || e.target == canvasRostro) {' +
                    '            e.preventDefault();' +
                    '        }' +
                    '    }, false);' +
                    '' +
                    '    document.body.addEventListener("touchmove", function (e) {' +
                    '        if (e.target == canvas || e.target == canvasRostro) {' +
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
                    '        if (drawingRostro) {' +
                    '            ctxRostro.moveTo(lastPosRostro.x, lastPosRostro.y);' +
                    '            ctxRostro.lineTo(mousePosRostro.x, mousePosRostro.y);' +
                    '            ctxRostro.stroke();' +
                    '            lastPosRostro = mousePosRostro;' +
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

                var fieldrecordCaseId = formulario.addField({ id: 'custpage_cabeza', label: 'recordCase', type: 'inlinehtml' });
                fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';
                formulario.addButton({ id: 'custpage_01', label: 'Enviar Pintura', functionName: 'enviarPintura' });
                if (pintarCabeza == null) {
                    formulario.addButton({ id: 'custpage_0111', label: 'Limpiar Pintura Cabeza', functionName: 'limpiarPintura' });
                    formulario.addButton({ id: 'custpage_0112', label: 'Pintar Cabeza', functionName: 'abrirModalCabeza' });
                }
                if (pintarRostro == null) {
                    formulario.addButton({ id: 'custpage_0121', label: 'Limpiar Pintura Rostro', functionName: 'limpiarPinturaRostro' });
                    formulario.addButton({ id: 'custpage_0122', label: 'Pintar Rostro', functionName: 'abrirModalRostro' });
                }
                formulario.clientScriptFileId = '2609856'; // New:2609856, Old:2337608

                context.response.writePage(formulario);
            }

            return {
                onRequest: onRequest
            };

        });
