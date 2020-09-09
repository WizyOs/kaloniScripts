/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/file', 'N/record'],

    function (widget, file, record) {

        function onRequest(context) {
            var recordCase_Id = context.request.parameters.recId;
            var caso = record.load({ type: 'supportcase', id: recordCase_Id });
            var firmaRepositorio = caso.getValue({ fieldId: 'custevent855' }) || null;

            var formulario = widget.createForm({ title: 'Repositorio de firmas' });
            var imagenesFondo = formulario.addField({ id: 'custpage_firma_empleados_repositorio', label: 'Repositorio de Firmas', type: 'inlinehtml' });
            var zonasFirma = formulario.addField({ id: 'custpage_img_cabeza', label: 'Pintar Zonas Cabeza y Rostro', type: 'inlinehtml' });

            imagenesFondo.defaultValue = '<body>' +
                '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
                '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 30px;margin-top:20px">' +
                '<h1 id="titulo" align="center">FIRMA DE EMPLEADOS PARA GUARDAR EN REPOSITORIO</h1>' +
                '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
                '<tr><td align="center" width="50%"><img id="firma" width="400px" height="400px" src="#" />' +
                '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>Firma Médico</b></p></td></tr>' +
                '</table>' +
                '</body>';

            zonasFirma.defaultValue = '<style type="text/css">' +
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
                '.modal-contentFirma {' +
                '  background-color: #fefefe;' +
                '  margin: auto;' +
                '  padding: 15px;' +
                '  border: 1px solid #888;' +
                '  width: 438px;' +
                '  height: 468px;' +
                '}' +
                '</style>' +

                '<div id="myModal" class="modal">' +
                '<div class="modal-contentFirma">' +
                '<canvas id="canvas-Firma" width="400" height="400" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;);">Get a better browser, bro.</canvas>' +
                '<br /><b>Firma Médico</b>' +
                '<br /><button id="btn_cerrarFirma">Terminar</button>' +
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
                '    var canvasFirma = document.getElementById("canvas-Firma");' +
                '    var ctx = canvasFirma.getContext("2d");' +
                '    ctx.strokeStyle = "#ff0000";' +
                '    ctx.lineWith = 2;' +
                '' +
                '    var drawingFirma = false;' +
                '    var mousePosFirma = { x:0, y:0 };' +
                '    var lastPosFirma = mousePosFirma;' +
                '' +
                '    canvasFirma.addEventListener("mousedown", function (e) {' +
                '        drawingFirma = true;' +
                '        lastPosFirma = getMousePos(canvasFirma, e);' +
                '    }, false);' +
                '' +
                '    canvasFirma.addEventListener("mouseup", function (e) {' +
                '        drawingFirma = false;' +
                '    }, false);' +
                '' +
                '    canvasFirma.addEventListener("mousemove", function (e) {' +
                '        mousePosFirma = getMousePos(canvasFirma, e);' +
                '    }, false);' +
                '' +
                '    canvasFirma.addEventListener("touchstart", function (e) {' +
                '        mousePosFirma = getTouchPos(canvasFirma, e);' +
                '        var touch = e.touches[0];' +
                '        var mouseEvent = new MouseEvent("mousedown", {' +
                '            clientX: touch.clientX,' +
                '            clientY: touch.clientY' +
                '        });' +
                '        canvasFirma.dispatchEvent(mouseEvent);' +
                '    }, false);' +
                '' +
                '    canvasFirma.addEventListener("touchend", function (e) {' +
                '        var mouseEvent = new MouseEvent("mouseup", {});' +
                '        canvasFirma.dispatchEvent(mouseEvent);' +
                '    }, false);' +
                '' +
                '    canvasFirma.addEventListener("touchmove", function (e) {' +
                '        var touch = e.touches[0];' +
                '        var mouseEvent = new MouseEvent("mousemove", {' +
                '            clientX: touch.clientX,' +
                '            clientY: touch.clientY' +
                '        });' +
                '        canvasFirma.dispatchEvent(mouseEvent);' +
                '    }, false);' +
                '' +
                '    document.body.addEventListener("touchstart", function (e) {' +
                '        if (e.target == canvasFirma) {' +
                '            e.preventDefault();' +
                '        }' +
                '    }, false);' +
                '' +
                '    document.body.addEventListener("touchend", function (e) {' +
                '        if (e.target == canvasFirma) {' +
                '            e.preventDefault();' +
                '        }' +
                '    }, false);' +
                '' +
                '    document.body.addEventListener("touchmove", function (e) {' +
                '        if (e.target == cancanvasFirmavas) {' +
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
                '        if (drawingFirma) {' +
                '            ctx.moveTo(lastPosFirma.x, lastPosFirma.y);' +
                '            ctx.lineTo(mousePosFirma.x, mousePosFirma.y);' +
                '            ctx.stroke();' +
                '            lastPosFirma = mousePosFirma;' +
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

            formulario.addButton({ id: 'custpage_1111', label: 'Guardar Firma', functionName: 'guardarFirma' });
            formulario.addButton({ id: 'custpage_1112', label: 'Limpiar Firma', functionName: 'limpiarFirma' });
            formulario.addButton({ id: 'custpage_1113', label: 'Firmar', functionName: 'crearFirma' });

            formulario.clientScriptFileId = '3449063';

            context.response.writePage(formulario);
        }

        return ({
            onRequest: onRequest
        });

    }
);