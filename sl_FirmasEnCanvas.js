/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/record'],

function(widget, record){

    function onRequest(context) {
    /*var recordCase_Id = context.request.parameters.recordCaseId;
    var compaId = context.request.parameters.compaId;
    var objRecord = record.load({type: 'customer', id: compaId, isDynamic: true});
    var subsidiaryText = objRecord.getText({fieldId: 'subsidiary'});*/

    var formulario = widget.createForm({title: 'Pruebas'});
    var firma = formulario.addField({id: 'custpage_firmacliente', label: 'FirmaCliente', type: 'inlinehtml'});

firma.defaultValue = '<style type="text/css">'+
'.modal {'+
'  display: none;'+
'  position: fixed;'+
'  z-index: 1; '+
'  padding-top: 100px; '+
'  left: 0;'+
'  top: 0;'+
'  width: 100%; '+
'  height: 100%;'+
'  overflow: auto; '+
'  background-color: black; '+
'}'+
''+
'.modal-content {'+
'  background-color: #fefefe;'+
'  margin: auto;'+
'  padding: 20px;'+
'  border: 1px solid #888;'+
'  width: 50%;'+
'}'+
'</style>'+

'<div id="myModal" class="modal">'+
'<div class="modal-content">'+
//'<canvas id="sig-canvas2" width="300" height="200" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>'+
'<canvas id="sig-canvas2" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>'+
'<br /> <b>FIRMA DEL PACIENTE</b>'+
'</div>'+
'</div>'+

'<script type="application/javascript">'+
'document.addEventListener("touchmove", function(e) {'+
'  e.preventDefault();'+
'},'+
'{ passive: false });'+

'(function() {'+
''+
'    window.requestAnimFrame = (function (callback) {'+
'        return window.requestAnimationFrame || '+
'                    window.webkitRequestAnimationFrame ||'+
'                    window.mozRequestAnimationFrame ||'+
'                    window.oRequestAnimationFrame ||'+
'                    window.msRequestAnimaitonFrame ||'+
'                    function (callback) {'+
'                        window.setTimeout(callback, 1000/60);'+
'                    };'+

'    })();'+
''+
'    var canvas2 = document.getElementById("sig-canvas2");'+
'    var ctx2 = canvas2.getContext("2d");'+
'    ctx2.strokeStyle = "#222222";'+
'    ctx2.lineWith = 2;'+
''+
'    var drawing2 = false;'+
'    var mousePos2 = { x:0, y:0 };'+
'    var lastPos2 = mousePos2;'+
''+
'    canvas2.addEventListener("mousedown", function (e) {'+
'        drawing2 = true;'+
'        lastPos2 = getMousePos(canvas2, e);'+
'    }, false);'+
''+
'    canvas2.addEventListener("mouseup", function (e) {'+
'        drawing2 = false;'+
'    }, false);'+
''+
'    canvas2.addEventListener("mousemove", function (e) {'+
'        mousePos2 = getMousePos(canvas2, e);'+
'    }, false);'+
''+
'    canvas2.addEventListener("touchstart", function (e) {'+
'        mousePos2 = getTouchPos(canvas2, e);'+
'        var touch = e.touches[0];'+
'        var mouseEvent = new MouseEvent("mousedown", {'+
'            clientX: touch.clientX,'+
'            clientY: touch.clientY'+
'        });'+
'        canvas2.dispatchEvent(mouseEvent);'+
'    }, false);'+
''+
'    canvas2.addEventListener("touchend", function (e) {'+
'        var mouseEvent = new MouseEvent("mouseup", {});'+
'        canvas2.dispatchEvent(mouseEvent);'+
'    }, false);'+
''+
'    canvas2.addEventListener("touchmove", function (e) {'+
'        var touch = e.touches[0];'+
'        var mouseEvent = new MouseEvent("mousemove", {'+
'            clientX: touch.clientX,'+
'            clientY: touch.clientY'+
'        });'+
'        canvas2.dispatchEvent(mouseEvent);'+
'    }, false);'+
''+
'    document.body.addEventListener("touchstart", function (e) {'+
'        if (e.target == canvas2) {'+
'            e.preventDefault();'+
'        }'+
'    }, false);'+
''+
'    document.body.addEventListener("touchend", function (e) {'+
'        if (e.target == canvas2) {'+
'            e.preventDefault();'+
'        }'+
'    }, false);'+
''+
'    document.body.addEventListener("touchmove", function (e) {'+
'        if (e.target == canvas2) {'+
'            e.preventDefault();'+
'        }'+
'    }, false);'+
''+
'    function getMousePos(canvasDom, mouseEvent) {'+
'        var rect = canvasDom.getBoundingClientRect();'+
'        return {'+
'            x: mouseEvent.clientX - rect.left,'+
'            y: mouseEvent.clientY - rect.top'+
'        };'+
'    }'+
''+
'    function getTouchPos(canvasDom, touchEvent) {'+
'        var rect = canvasDom.getBoundingClientRect();'+
'        return {'+
'            x: touchEvent.touches[0].clientX - rect.left,'+
'            y: touchEvent.touches[0].clientY - rect.top'+
'        };'+
'    }'+
''+
'    function renderCanvas() {'+
'        if (drawing2) {'+
'            ctx2.moveTo(lastPos2.x, lastPos2.y);'+
'            ctx2.lineTo(mousePos2.x, mousePos2.y);'+
'            ctx2.stroke();'+
'            lastPos2 = mousePos2;'+
'        }'+
'    }'+
''+
'    (function drawLoop() {'+
'        requestAnimFrame(drawLoop);'+
'        renderCanvas();'+
'    })();'+
''+
'})();'+
'</script>';

    //var fieldrecordCaseId = formulario.addField({id: 'custpage_case', label: 'recordCase', type: 'inlinehtml'});
    //fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';

    formulario.addButton({id: 'custpage_01', label: 'Enviar firma', functionName: 'enviarFirma'});
    formulario.addButton({id: 'custpage_0111', label: 'Limpiar firma', functionName: 'limpiarFirmaCli'});
    formulario.addButton({id: 'custpage_0113', label: 'Mostrar firma', functionName: 'mostrarFirma'});
    formulario.addButton({id: 'custpage_0112', label: 'Firmar', functionName: 'abrirModal'});
    formulario.clientScriptFileId = '2106498';

    context.response.writePage(formulario);
    }

    return {
        onRequest: onRequest
    };

});