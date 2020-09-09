/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/url', 'N/https', 'N/file', 'N/record', 'N/xml'],

    function (widget, url, https, file, record, xml) {

        function onRequest(context) {
            var recId = context.request.parameters.recId;
            var graphic = context.request.parameters.graphic;
            var caso = record.load({ type: 'supportcase', id: recId });
            var customform = caso.getValue({ fieldId: 'customform' });

            var formulario = '';
            var imagenesFondo = '';
            var pintarZonas = '';
            var fieldrecordCaseId = '';

            var imagenFondo_Rostro = file.load({ id: 2557713 }); // internal Id archivo hair-skin-body-.png
            var imagenBase64_Rostro = imagenFondo_Rostro.getContents();
            var imagenFondo_Cuerpo = file.load({ id: 2557714 }); // internal Id archvio formato-cuerpo.png
            var imagenBase64_Cuerpo = imagenFondo_Cuerpo.getContents();
            var imagenFondo_Cabeza = file.load({ id: 743298 }); // internal Id archvio formato-cuerpo.png
            var imagenBase64_Cabeza = imagenFondo_Cabeza.getContents();

            if (customform == 138) {

                var pintarCuerpo = caso.getValue({ fieldId: 'custevent810' }) || null;
                var pintarRostro = caso.getValue({ fieldId: 'custevent801' }) || null;

                formulario = widget.createForm({ title: 'Pintar Zonas Rostro y Cuerpo' });
                imagenesFondo = formulario.addField({ id: 'custpage_imagenes_fondo', label: 'Imágenes', type: 'inlinehtml' });
                pintarZonas = formulario.addField({ id: 'custpage_titulo_formulario', label: 'Pintar Zonas Rostro y Cuerpo', type: 'inlinehtml' });

                imagenesFondo.defaultValue = '<body>' +
                    '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
                    '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 30px;margin-top:20px">' +
                    '<h1 id="titulo" align="center">IMÁGENES BODY & SKYN</h1>' +
                    '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
                    '<tr><td align="center" width="50%"><img id="imagenRostro" width="360px" height="360px"';
                if (pintarRostro == null) {
                    imagenesFondo.defaultValue += 'src="data:image/jpeg;base64,' + imagenBase64_Rostro + '" />';
                } else {
                    imagenesFondo.defaultValue += 'src="' + pintarRostro + '" />';
                }
                imagenesFondo.defaultValue += '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>Pintura de Rostro</b></p></td>' +
                    '<td align="center" width="50%"><img id="imagenCuerpo" width="360px" height="360px"';
                if (pintarCuerpo == null) {
                    imagenesFondo.defaultValue += 'src="data:image/jpeg;base64,' + imagenBase64_Cuerpo + '" />';
                } else {
                    imagenesFondo.defaultValue += 'src="' + pintarCuerpo + '" />';
                }
                imagenesFondo.defaultValue += '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>Pintura de Cuerpo</b></p></td></tr>' +
                    '</table>' +
                    '</body>';

                pintarZonas.defaultValue = '<style type="text/css">' +
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
                    '.modalRostro {' +
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
                    '.modalCuerpo {' +
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
                    '.modal-contentRostro {' +
                    '  background-color: #fefefe;' +
                    '  margin: auto;' +
                    '  padding: 20px;' +
                    '  border: 1px solid #888;' +
                    '  width: 521px;' +
                    '  height: 552px;' +
                    '}' +
                    '' +
                    '.modal-contentCuerpo {' +
                    '  background-color: #fefefe;' +
                    '  margin: auto;' +
                    '  padding: 20px;' +
                    '  border: 1px solid #888;' +
                    '  width: 525px;' +
                    '  height: 550px' +
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
                    '</style>' +

                    '<div id="myModalRostro" class="modalRostro">' +
                    '<div class="modal-contentRostro">' +
                    '<canvas id="canvas-Rostro" width="476" height="482" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair; background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2557713&c=3559763&h=52b10b8790ba5a3e2ae4);">Get a better browser, bro.</canvas>' +
                    '<br /> <b><center>Pintar Zonas de Rostro</center></b>' +
                    '<button id="btn_cerrarPintarRostro">Terminar</button>' +
                    '</div>' +
                    '</div>' +

                    '<div id="myModalCuerpo" class="modalCuerpo">' +
                    '<div class="modal-contentCuerpo">' +
                    '<canvas id="canvas-Cuerpo" width="480" height="480" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair; background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2557714&c=3559763&h=8b6ba585a10a473f5030);">Get a better browser, bro.</canvas>' +
                    '<br /> <b><center>Pintar Zonas de Cuerpo</center></b>' +
                    '<button id="btn_cerrarPintarCuerpo">Terminar</button>' +
                    '</div>' +
                    '</div>' +

                    '<canvas id="newRostro" width="476" height="482" hidden></canvas>' +

                    '<canvas id="newCuerpo" width="480" height="480" hidden></canvas>' +

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
                    '    var canvasRostro = document.getElementById("canvas-Rostro");' +
                    '    var ctxRostro = canvasRostro.getContext("2d");' +
                    '    ctxRostro.strokeStyle = "#9d4120";' +
                    '    ctxRostro.lineWith = 2;' +
                    '' +
                    '    var canvasCuerpo = document.getElementById("canvas-Cuerpo");' +
                    '    var ctxCuerpo = canvasCuerpo.getContext("2d");' +
                    '    ctxCuerpo.strokeStyle = "#9d4120";' +
                    '    ctxCuerpo.lineWith = 2;' +
                    '' +
                    '    var drawingRostro = false;' +
                    '    var mousePosRostro = { x:0, y:0 };' +
                    '    var lastPosRostro = mousePosRostro;' +
                    '' +
                    '    var drawingCuerpo = false;' +
                    '    var mousePosCuerpo = { x:0, y:0 };' +
                    '    var lastPosCuerpo = mousePosCuerpo;' +
                    '' +
                    '    canvasRostro.addEventListener("mousedown", function (e) {' +
                    '        drawingRostro = true;' +
                    '        lastPosRostro = getMousePos(canvasRostro, e);' +
                    '    }, false);' +
                    '' +
                    '    canvasCuerpo.addEventListener("mousedown", function (e) {' +
                    '        drawingCuerpo = true;' +
                    '        lastPosCuerpo = getMousePos(canvasCuerpo, e);' +
                    '    }, false);' +
                    '' +
                    '    canvasRostro.addEventListener("mouseup", function (e) {' +
                    '        drawingRostro = false;' +
                    '    }, false);' +
                    '' +
                    '    canvasCuerpo.addEventListener("mouseup", function (e) {' +
                    '        drawingCuerpo = false;' +
                    '    }, false);' +
                    '' +
                    '    canvasRostro.addEventListener("mousemove", function (e) {' +
                    '        mousePosRostro = getMousePos(canvasRostro, e);' +
                    '    }, false);' +
                    '' +
                    '    canvasCuerpo.addEventListener("mousemove", function (e) {' +
                    '        mousePosCuerpo = getMousePos(canvasCuerpo, e);' +
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
                    '    canvasCuerpo.addEventListener("touchstart", function (e) {' +
                    '        mousePosCuerpo = getTouchPos(canvasCuerpo, e);' +
                    '        var touch = e.touches[0];' +
                    '        var mouseEvent = new MouseEvent("mousedown", {' +
                    '            clientX: touch.clientX,' +
                    '            clientY: touch.clientY' +
                    '        });' +
                    '        canvasCuerpo.dispatchEvent(mouseEvent);' +
                    '    }, false);' +
                    '' +
                    '    canvasRostro.addEventListener("touchend", function (e) {' +
                    '        var mouseEvent = new MouseEvent("mouseup", {});' +
                    '        canvasRostro.dispatchEvent(mouseEvent);' +
                    '    }, false);' +
                    '' +
                    '    canvasCuerpo.addEventListener("touchend", function (e) {' +
                    '        var mouseEvent = new MouseEvent("mouseup", {});' +
                    '        canvasCuerpo.dispatchEvent(mouseEvent);' +
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
                    '    canvasCuerpo.addEventListener("touchmove", function (e) {' +
                    '        var touch = e.touches[0];' +
                    '        var mouseEvent = new MouseEvent("mousemove", {' +
                    '            clientX: touch.clientX,' +
                    '            clientY: touch.clientY' +
                    '        });' +
                    '        canvasCuerpo.dispatchEvent(mouseEvent);' +
                    '    }, false);' +
                    '' +
                    '    document.body.addEventListener("touchstart", function (e) {' +
                    '        if (e.target == canvasRostro || e.target == canvasCuerpo) {' +
                    '            e.preventDefault();' +
                    '        }' +
                    '    }, false);' +
                    '' +
                    '    document.body.addEventListener("touchend", function (e) {' +
                    '        if (e.target == canvasRostro || e.target == canvasCuerpo) {' +
                    '            e.preventDefault();' +
                    '        }' +
                    '    }, false);' +
                    '' +
                    '    document.body.addEventListener("touchmove", function (e) {' +
                    '        if (e.target == canvasRostro || e.target == canvasCuerpo) {' +
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
                    '        if (drawingRostro) {' +
                    '            ctxRostro.moveTo(lastPosRostro.x, lastPosRostro.y);' +
                    '            ctxRostro.lineTo(mousePosRostro.x, mousePosRostro.y);' +
                    '            ctxRostro.stroke();' +
                    '            lastPosRostro = mousePosRostro;' +
                    '        }' +
                    '        if (drawingCuerpo) {' +
                    '            ctxCuerpo.moveTo(lastPosCuerpo.x, lastPosCuerpo.y);' +
                    '            ctxCuerpo.lineTo(mousePosCuerpo.x, mousePosCuerpo.y);' +
                    '            ctxCuerpo.stroke();' +
                    '            lastPosCuerpo = mousePosCuerpo;' +
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

                formulario.addButton({ id: 'custpage_enviar_pinturas', label: 'Enviar Pintura', functionName: 'enviarPintura' });
                if (pintarRostro == null) {
                    formulario.addButton({ id: 'custpage_limpiar_rostro', label: 'Limpiar Pintura Rostro', functionName: 'limpiarRostro' });
                    formulario.addButton({ id: 'custpage_pintar_rostro', label: 'Pintar Rostro', functionName: 'abrirModalRostro' });
                }
                if (pintarCuerpo == null) {
                    formulario.addButton({ id: 'custpage_limpiar_cuerpo', label: 'Limpiar Pintura Cuerpo', functionName: 'limpiarCuerpo' });
                    formulario.addButton({ id: 'custpage_pintar_cuerpo', label: 'Pintar Cuerpo', functionName: 'abrirModalCuerpo' });
                }
                formulario.clientScriptFileId = '2639079'; // Internal Id al archivo cs_PintarBodySkin.js

                context.response.writePage(formulario);
            }

            if (graphic == 'b') {

                formulario = widget.createForm({ title: 'Pintar Zonas Cuerpo' });
                imagenesFondo = formulario.addField({ id: 'custpage_imagenes_fondo', label: 'Imágenes', type: 'inlinehtml' });
                pintarZonas = formulario.addField({ id: 'custpage_titulo_formulario', label: 'Pintar Zonas Cuerpo', type: 'inlinehtml' });

                imagenesFondo.defaultValue = '<body>' +
                    '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
                    '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 30px;margin-top:20px">' +
                    '<h1 id="titulo" align="center">IMÁGENES BODY</h1>' +
                    '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
                    '<tr><td align="center" width="50%"><img id="imagenCuerpo" width="360px" height="360px" src="data:image/jpeg;base64,' + imagenBase64_Cuerpo + '" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>Pintura de Cuerpo</b></p></td></tr>' +
                    '</table>' +
                    '</body>';

                pintarZonas.defaultValue = '<style type="text/css">' +
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
                    '.modalCuerpo {' +
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
                    '.modal-contentCuerpo {' +
                    '  background-color: #fefefe;' +
                    '  margin: auto;' +
                    '  padding: 20px;' +
                    '  border: 1px solid #888;' +
                    '  width: 525px;' +
                    '  height: 550px' +
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
                    '</style>' +

                    '<div id="myModalCuerpo" class="modalCuerpo">' +
                    '<div class="modal-contentCuerpo">' +
                    '<canvas id="canvas-Cuerpo" width="480" height="480" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair; background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2557714&c=3559763&h=8b6ba585a10a473f5030);">Get a better browser, bro.</canvas>' +
                    '<br /> <b><center>Pintar Zonas de Cuerpo</center></b>' +
                    '<button id="btn_cerrarPintarCuerpo">Terminar</button>' +
                    '</div>' +
                    '</div>' +

                    '<canvas id="newCuerpo" width="480" height="480" hidden></canvas>' +

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
                    '    var canvasCuerpo = document.getElementById("canvas-Cuerpo");' +
                    '    var ctxCuerpo = canvasCuerpo.getContext("2d");' +
                    '    ctxCuerpo.strokeStyle = "#9d4120";' +
                    '    ctxCuerpo.lineWith = 2;' +
                    '' +
                    '    var drawingCuerpo = false;' +
                    '    var mousePosCuerpo = { x:0, y:0 };' +
                    '    var lastPosCuerpo = mousePosCuerpo;' +
                    '' +
                    '    canvasCuerpo.addEventListener("mousedown", function (e) {' +
                    '        drawingCuerpo = true;' +
                    '        lastPosCuerpo = getMousePos(canvasCuerpo, e);' +
                    '    }, false);' +
                    '' +
                    '    canvasCuerpo.addEventListener("mouseup", function (e) {' +
                    '        drawingCuerpo = false;' +
                    '    }, false);' +
                    '' +
                    '    canvasCuerpo.addEventListener("mousemove", function (e) {' +
                    '        mousePosCuerpo = getMousePos(canvasCuerpo, e);' +
                    '    }, false);' +
                    '' +
                    '    canvasCuerpo.addEventListener("touchstart", function (e) {' +
                    '        mousePosCuerpo = getTouchPos(canvasCuerpo, e);' +
                    '        var touch = e.touches[0];' +
                    '        var mouseEvent = new MouseEvent("mousedown", {' +
                    '            clientX: touch.clientX,' +
                    '            clientY: touch.clientY' +
                    '        });' +
                    '        canvasCuerpo.dispatchEvent(mouseEvent);' +
                    '    }, false);' +
                    '' +
                    '    canvasCuerpo.addEventListener("touchend", function (e) {' +
                    '        var mouseEvent = new MouseEvent("mouseup", {});' +
                    '        canvasCuerpo.dispatchEvent(mouseEvent);' +
                    '    }, false);' +
                    '' +
                    '    canvasCuerpo.addEventListener("touchmove", function (e) {' +
                    '        var touch = e.touches[0];' +
                    '        var mouseEvent = new MouseEvent("mousemove", {' +
                    '            clientX: touch.clientX,' +
                    '            clientY: touch.clientY' +
                    '        });' +
                    '        canvasCuerpo.dispatchEvent(mouseEvent);' +
                    '    }, false);' +
                    '' +
                    '    document.body.addEventListener("touchstart", function (e) {' +
                    '        if (e.target == canvasCuerpo) {' +
                    '            e.preventDefault();' +
                    '        }' +
                    '    }, false);' +
                    '' +
                    '    document.body.addEventListener("touchend", function (e) {' +
                    '        if (e.target == canvasCuerpo) {' +
                    '            e.preventDefault();' +
                    '        }' +
                    '    }, false);' +
                    '' +
                    '    document.body.addEventListener("touchmove", function (e) {' +
                    '        if (e.target == canvasCuerpo) {' +
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
                    '        if (drawingCuerpo) {' +
                    '            ctxCuerpo.moveTo(lastPosCuerpo.x, lastPosCuerpo.y);' +
                    '            ctxCuerpo.lineTo(mousePosCuerpo.x, mousePosCuerpo.y);' +
                    '            ctxCuerpo.stroke();' +
                    '            lastPosCuerpo = mousePosCuerpo;' +
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

                formulario.addButton({ id: 'custpage_enviar_pinturas', label: 'Enviar Pintura', functionName: 'enviarPintura' });


                formulario.addButton({ id: 'custpage_limpiar_cuerpo', label: 'Limpiar Pintura Cuerpo', functionName: 'limpiarCuerpo' });
                formulario.addButton({ id: 'custpage_pintar_cuerpo', label: 'Pintar Cuerpo', functionName: 'abrirModalCuerpo' });

                formulario.clientScriptFileId = '2639079'; // Internal Id al archivo cs_PintarBodySkin.js

                context.response.writePage(formulario);
            }

            if (graphic == 's') {
                formulario = widget.createForm({ title: 'Pintar Zonas Rostro' });
                imagenesFondo = formulario.addField({ id: 'custpage_imagenes_fondo', label: 'Imágenes', type: 'inlinehtml' });
                pintarZonas = formulario.addField({ id: 'custpage_titulo_formulario', label: 'Pintar Zonas Rostro', type: 'inlinehtml' });

                imagenesFondo.defaultValue = '<body>' +
                    '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
                    '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 30px;margin-top:20px">' +
                    '<h1 id="titulo" align="center">IMÁGENES SKYN</h1>' +
                    '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
                    '<tr><td align="center" width="50%"><img id="imagenRostro" width="360px" height="360px" src="data:image/jpeg;base64,' + imagenBase64_Rostro + '" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>Pintura de Rostro</b></p></td></tr>' +
                    '</table>' +
                    '</body>';

                pintarZonas.defaultValue = '<style type="text/css">' +
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
                    '.modalRostro {' +
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
                    '.modal-contentRostro {' +
                    '  background-color: #fefefe;' +
                    '  margin: auto;' +
                    '  padding: 20px;' +
                    '  border: 1px solid #888;' +
                    '  width: 521px;' +
                    '  height: 552px;' +
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
                    '</style>' +

                    '<div id="myModalRostro" class="modalRostro">' +
                    '<div class="modal-contentRostro">' +
                    '<canvas id="canvas-Rostro" width="476" height="482" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair; background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=2557713&c=3559763&h=52b10b8790ba5a3e2ae4);">Get a better browser, bro.</canvas>' +
                    '<br /> <b><center>Pintar Zonas de Rostro</center></b>' +
                    '<button id="btn_cerrarPintarRostro">Terminar</button>' +
                    '</div>' +
                    '</div>' +

                    '<canvas id="newRostro" width="476" height="482" hidden></canvas>' +

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
                    '    var canvasRostro = document.getElementById("canvas-Rostro");' +
                    '    var ctxRostro = canvasRostro.getContext("2d");' +
                    '    ctxRostro.strokeStyle = "#9d4120";' +
                    '    ctxRostro.lineWith = 2;' +
                    '' +
                    '    var drawingRostro = false;' +
                    '    var mousePosRostro = { x:0, y:0 };' +
                    '    var lastPosRostro = mousePosRostro;' +
                    '' +
                    '    canvasRostro.addEventListener("mousedown", function (e) {' +
                    '        drawingRostro = true;' +
                    '        lastPosRostro = getMousePos(canvasRostro, e);' +
                    '    }, false);' +
                    '' +
                    '    canvasRostro.addEventListener("mouseup", function (e) {' +
                    '        drawingRostro = false;' +
                    '    }, false);' +
                    '' +
                    '    canvasRostro.addEventListener("mousemove", function (e) {' +
                    '        mousePosRostro = getMousePos(canvasRostro, e);' +
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
                    '    canvasRostro.addEventListener("touchend", function (e) {' +
                    '        var mouseEvent = new MouseEvent("mouseup", {});' +
                    '        canvasRostro.dispatchEvent(mouseEvent);' +
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
                    '        if (e.target == canvasRostro) {' +
                    '            e.preventDefault();' +
                    '        }' +
                    '    }, false);' +
                    '' +
                    '    document.body.addEventListener("touchend", function (e) {' +
                    '        if (e.target == canvasRostro) {' +
                    '            e.preventDefault();' +
                    '        }' +
                    '    }, false);' +
                    '' +
                    '    document.body.addEventListener("touchmove", function (e) {' +
                    '        if (e.target == canvasRostro) {' +
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

                formulario.addButton({ id: 'custpage_enviar_pinturas', label: 'Enviar Pintura', functionName: 'enviarPintura' });
                formulario.addButton({ id: 'custpage_limpiar_rostro', label: 'Limpiar Pintura Rostro', functionName: 'limpiarRostro' });
                formulario.addButton({ id: 'custpage_pintar_rostro', label: 'Pintar Rostro', functionName: 'abrirModalRostro' });

                formulario.clientScriptFileId = '2639079'; // Internal Id al archivo cs_PintarBodySkin.js

                context.response.writePage(formulario);
            }

            if (customform == 151) {
                formulario = widget.createForm({ title: 'Pintar Zonas Tratamiento Complementario' });
                imagenesFondo = formulario.addField({ id: 'custpage_imagenes_fondo', label: 'Imágenes', type: 'inlinehtml' });
                pintarZonas = formulario.addField({ id: 'custpage_titulo_formulario', label: 'Pintar Zonas Cabeza Complementario', type: 'inlinehtml' });

                imagenesFondo.defaultValue = '<body>' +
                    '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
                    '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 30px;margin-top:20px">' +
                    '<h1 id="titulo" align="center">GRÁFICO TRATAMIENTO COMPLEMENTARIO</h1>' +
                    '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
                    '<tr><td align="center" width="50%"><img id="imagenCabeza" width="320px" height="480px" src="data:image/jpeg;base64,' + imagenBase64_Cabeza + '" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>Pintura de Cabeza</b></p></td></tr>' +
                    '</table>' +
                    '</body>';

                pintarZonas.defaultValue = '<style type="text/css">' +
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
                    '.modalCabeza {' +
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
                    '.modal-contentCabeza {' +
                    '  background-color: #fefefe;' +
                    '  margin: auto;' +
                    '  padding: 20px;' +
                    '  border: 1px solid #888;' +
                    '  width: 366px;' +
                    '  height: 552px;' +
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
                    '</style>' +

                    '<div id="myModalCabeza" class="modalCabeza">' +
                    '<div class="modal-contentCabeza">' +
                    '<canvas id="canvas-Cabeza" width="320" height="480" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair; background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=743298&c=3559763&h=8560f5a4e2852363f9b4);">Get a better browser, bro.</canvas>' +
                    '<br /> <b><center>Pintar Zonas de Cabeza</center></b>' +
                    '<button id="btn_cerrarPintarCabeza">Terminar</button>' +
                    '</div>' +
                    '</div>' +

                    '<canvas id="newCabeza" width="320" height="480" hidden></canvas>' +

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
                    '    var canvasCabeza = document.getElementById("canvas-Cabeza");' +
                    '    var ctxCabeza = canvasCabeza.getContext("2d");' +
                    '    ctxCabeza.strokeStyle = "#0070ff";' +
                    '    ctxCabeza.lineWith = 2;' +
                    '' +
                    '    var drawingCabeza = false;' +
                    '    var mousePosCabeza = { x:0, y:0 };' +
                    '    var lastPosCabeza = mousePosCabeza;' +
                    '' +
                    '    canvasCabeza.addEventListener("mousedown", function (e) {' +
                    '        drawingCabeza = true;' +
                    '        lastPosCabeza = getMousePos(canvasCabeza, e);' +
                    '    }, false);' +
                    '' +
                    '    canvasCabeza.addEventListener("mouseup", function (e) {' +
                    '        drawingCabeza = false;' +
                    '    }, false);' +
                    '' +
                    '    canvasCabeza.addEventListener("mousemove", function (e) {' +
                    '        mousePosCabeza = getMousePos(canvasCabeza, e);' +
                    '    }, false);' +
                    '' +
                    '    canvasCabeza.addEventListener("touchstart", function (e) {' +
                    '        mousePosCabeza = getTouchPos(canvasCabeza, e);' +
                    '        var touch = e.touches[0];' +
                    '        var mouseEvent = new MouseEvent("mousedown", {' +
                    '            clientX: touch.clientX,' +
                    '            clientY: touch.clientY' +
                    '        });' +
                    '        canvasCabeza.dispatchEvent(mouseEvent);' +
                    '    }, false);' +
                    '' +
                    '    canvasCabeza.addEventListener("touchend", function (e) {' +
                    '        var mouseEvent = new MouseEvent("mouseup", {});' +
                    '        canvasCabeza.dispatchEvent(mouseEvent);' +
                    '    }, false);' +
                    '' +
                    '    canvasCabeza.addEventListener("touchmove", function (e) {' +
                    '        var touch = e.touches[0];' +
                    '        var mouseEvent = new MouseEvent("mousemove", {' +
                    '            clientX: touch.clientX,' +
                    '            clientY: touch.clientY' +
                    '        });' +
                    '        canvasCabeza.dispatchEvent(mouseEvent);' +
                    '    }, false);' +
                    '' +
                    '    document.body.addEventListener("touchstart", function (e) {' +
                    '        if (e.target == canvasCabeza) {' +
                    '            e.preventDefault();' +
                    '        }' +
                    '    }, false);' +
                    '' +
                    '    document.body.addEventListener("touchend", function (e) {' +
                    '        if (e.target == canvasCabeza) {' +
                    '            e.preventDefault();' +
                    '        }' +
                    '    }, false);' +
                    '' +
                    '    document.body.addEventListener("touchmove", function (e) {' +
                    '        if (e.target == canvasCabeza) {' +
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
                    '        if (drawingCabeza) {' +
                    '            ctxCabeza.moveTo(lastPosCabeza.x, lastPosCabeza.y);' +
                    '            ctxCabeza.lineTo(mousePosCabeza.x, mousePosCabeza.y);' +
                    '            ctxCabeza.stroke();' +
                    '            lastPosCabeza = mousePosCabeza;' +
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

                formulario.addButton({ id: 'custpage_enviar_pinturas', label: 'Enviar Pintura', functionName: 'enviarPintura' });
                formulario.addButton({ id: 'custpage_limpiar_Cabeza', label: 'Limpiar Pintura Cabeza', functionName: 'limpiarCabeza' });
                formulario.addButton({ id: 'custpage_pintar_Cabeza', label: 'Pintar Cabeza', functionName: 'abrirModalCabeza' });

                formulario.clientScriptFileId = '2639079'; // Internal Id al archivo cs_PintarBodySkin.js

                context.response.writePage(formulario);
            }

            fieldrecordCaseId = formulario.addField({ id: 'custpage_cabeza', label: 'recordCase', type: 'inlinehtml' });
            fieldrecordCaseId.defaultValue = '<input id="recId" name="recId" type="hidden" value="' + recId + '"><input id="idForm" name="idForm" type="hidden" value="' + customform + '"';
        }

        return {
            onRequest: onRequest
        };
    });
