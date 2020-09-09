/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/url', 'N/https', 'N/file', 'N/record', 'N/log'],

    function (widget, url, https, file, record, log) {

        function onRequest(context) {
            //NOTE: Modificación -> Se modifica la forma de obtener los id de las imagenes guardadas y se coloca el id de la imagen por defecto en caso de encontrar un campo sin valor
            //var record = currentRecord.get();
            var recordCase_Id = context.request.parameters.recordCaseId;
            var recordCase = record.load({ type: 'supportcase', id: recordCase_Id});
            //var diseno_Img1 = context.request.parameters.disenoImg1;
            var diseno_Img1 = recordCase.getValue({ fieldId: 'custevent82'}) || 1592235;
            //var diseno_Img2 = context.request.parameters.disenoImg2;
            var diseno_Img2 = recordCase.getValue({ fieldId: 'custevent83'}) || 1592235; // custevent85
            //var after_Img1 = context.request.parameters.afterImg1;
            var after_Img1 = recordCase.getValue({ fieldId: 'custevent76'}) || 1592235;
            //var after_Img2 = context.request.parameters.afterImg2;
            var after_Img2 = recordCase.getValue({ fieldId: 'custevent77'}) || 1592235;
            var fileObjImg1 = file.load({ id: diseno_Img1 });
            var fileObjImg2 = file.load({ id: diseno_Img2 });
            var fileObjImg3 = file.load({ id: after_Img1 });
            var fileObjImg4 = file.load({ id: after_Img2 });

            var formulario = widget.createForm({ title: 'Imagenes y Firmas' });

            var imgs = formulario.addField({ id: 'custpage_imgs', label: 'Imagenes', type: 'inlinehtml' });

            imgs.defaultValue = '<table><tr><td><input style="width: 300px; color: blue" type="text" value="Diseño en sala 1" disabled></td>' +
                '<td><input style="width: 300px; color: blue" type="text" value="Diseño en sala 2" disabled></td>' +
                '<td><input style="width: 300px; color: blue" type="text" value="Después de procedimiento 1" disabled></td>' +
                '<td><input style="width: 300px; color: blue" type="text" value="Después de procedimiento 2" disabled></td></tr>' +
                '<tr><td><a href="' + fileObjImg1.url + '"><img src="' + fileObjImg1.url + '" width="300" height="200"></a></td><td><a href="' + fileObjImg2.url + '"><img src="' + fileObjImg2.url + '" width="300" height="200"></a></td><td><a href="' + fileObjImg3.url + '"><img src="' + fileObjImg3.url + '" width="300" height="200"></a></td><td><a href="' + fileObjImg4.url + '"><img src="' + fileObjImg4.url + '" width="300" height="200"></a></td></tr></table>';

                //NOTE: Modificación-> Se agrega campos para mostrar las firmas una vez que se realiza la firma
            imgs.defaultValue += '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
                '<tr><td align="center" width="50%"><img id="firmaCli" width="200px" height="200px" src="#" />' +
                '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>Firma Cliente</b></p></td>' +
                '<td align="center" width="50%"><img id="firmaMed" width="200px" height="200px" src="#" />' +
                '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>Firma Médico</b></p></td></tr>' +
                '</table>';

            var firmasCambas = formulario.addField({ id: 'custpage_firmas', label: 'Firmas', type: 'inlinehtml' });
            firmasCambas.defaultValue = '<style type="text/css">' +
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
                '  padding: 20px;' +
                '  border: 1px solid #888;' +
                '  width: 550px;' +
                '}' +
                '</style>' +

                '<div id="myModal" class="modal">' +
                '<div class="modal-content">' +
                '<canvas id="sig-canvas" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
                '<br /> <b>Firma del Cliente</b>' +
                //NOTE: Modificación -> se agrega boton para terminar firma de cliente
                '<br /><button id="btn_cerrarFirmaCli">Terminar</button>' +
                '</div>' +
                '</div>' +

                '<div id="myModal2" class="modal">' +
                '<div class="modal-content">' +
                '<canvas id="sig-canvas2" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
                '<br /> <b>Firma del Médico</b>' +
                //NOTE: Modificación -> se agrega boton para terminar firma de médico
                '<br /><button id="btn_cerrarFirmaMed">Terminar</button>' +
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
                '    canvas.addEventListener("mousedown", function (e) {' +
                '        drawing = true;' +
                '        lastPos = getMousePos(canvas, e);' +
                '    }, false);' +
                '' +
                '    canvas2.addEventListener("mousedown", function (e) {' +
                '        drawing2 = true;' +
                '        lastPos2 = getMousePos(canvas2, e);' +
                '    }, false);' +
                '' +
                '    canvas.addEventListener("mouseup", function (e) {' +
                '        drawing = false;' +
                '    }, false);' +
                '' +
                '    canvas2.addEventListener("mouseup", function (e) {' +
                '        drawing2 = false;' +
                '    }, false);' +
                '' +
                '    canvas.addEventListener("mousemove", function (e) {' +
                '        mousePos = getMousePos(canvas, e);' +
                '    }, false);' +
                '' +
                '    canvas2.addEventListener("mousemove", function (e) {' +
                '        mousePos2 = getMousePos(canvas2, e);' +
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
                '    canvas.addEventListener("touchend", function (e) {' +
                '        var mouseEvent = new MouseEvent("mouseup", {});' +
                '        canvas.dispatchEvent(mouseEvent);' +
                '    }, false);' +
                '' +
                '    canvas2.addEventListener("touchend", function (e) {' +
                '        var mouseEvent = new MouseEvent("mouseup", {});' +
                '        canvas2.dispatchEvent(mouseEvent);' +
                '    }, false);' +
                '' +
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
                '        if (e.target == canvas || e.target == canvas2) {' +
                '            e.preventDefault();' +
                '        }' +
                '    }, false);' +
                '' +
                '    document.body.addEventListener("touchend", function (e) {' +
                '        if (e.target == canvas || e.target == canvas2) {' +
                '            e.preventDefault();' +
                '        }' +
                '    }, false);' +
                '' +
                '    document.body.addEventListener("touchmove", function (e) {' +
                '        if (e.target == canvas || e.target == canvas2) {' +
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

            formulario.addButton({ id: 'custpage_01', label: 'Enviar firmas', functionName: 'enviarFirmas' });
            formulario.addButton({ id: 'custpage_0111', label: 'Limpiar firma cliente', functionName: 'limpiarFirmaCli' });
            formulario.addButton({ id: 'custpage_0113', label: 'Limpiar firma médico', functionName: 'limpiarFirmaMed' });
            formulario.addButton({ id: 'custpage_0112', label: 'Firma cliente', functionName: 'abrirModal' });
            formulario.addButton({ id: 'custpage_0114', label: 'Firma médico', functionName: 'abrirModal2' });
            formulario.clientScriptFileId = '1992837';

            context.response.writePage(formulario);
        }

        return {
            onRequest: onRequest
        };

    });
