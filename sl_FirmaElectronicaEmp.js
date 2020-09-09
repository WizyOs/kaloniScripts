/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/url', 'N/https', 'N/file'],

function(widget, url, https, file){

    function onRequest(context) {
    var recordEmp_Id = context.request.parameters.recordEmpId;

    var formulario = widget.createForm({title: 'Firma Empleado'});

	  var firmaEmpCambas = formulario.addField({id: 'custpage_firma_emp', label: 'Firma Empleado', type: 'inlinehtml'});
      firmaEmpCambas.defaultValue = '<style type="text/css">'+
'body {font-family: Arial, Helvetica, sans-serif;}'+
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
'  background-color: rgba(0,0,0,0.4);'+
'}'+
''+
'.modal-content {'+
'  background-color: #fefefe;'+
'  margin: auto;'+
'  padding: 20px;'+
'  border: 1px solid #888;'+
'  width: 550px;'+
'}'+
'</style>'+

'<div id="myModal" class="modal">'+
'<div class="modal-content">'+
'<canvas id="sig-canvas" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>'+
'<br /> <b>FIRMAR</b>'+
'</div>'+
'</div>'+

'<script type="application/javascript">'+
'document.addEventListener("touchmove", function(e) {'+
'  e.preventDefault();'+
'},'+
'{ passive: true });'+

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
'    var canvas = document.getElementById("sig-canvas");'+
'    var ctx = canvas.getContext("2d");'+
'    ctx.strokeStyle = "#222222";'+
'    ctx.lineWith = 2;'+
''+
'    var drawing = false;'+
'    var mousePos = { x:0, y:0 };'+
'    var lastPos = mousePos;'+
''+
'    canvas.addEventListener("mousedown", function (e) {'+
'        drawing = true;'+
'        lastPos = getMousePos(canvas, e);'+
'    }, false);'+
''+
'    canvas.addEventListener("mouseup", function (e) {'+
'        drawing = false;'+
'    }, false);'+
''+
'    canvas.addEventListener("mousemove", function (e) {'+
'        mousePos = getMousePos(canvas, e);'+
'    }, false);'+
''+
'    canvas.addEventListener("touchstart", function (e) {'+
'        mousePos = getTouchPos(canvas, e);'+
'        var touch = e.touches[0];'+
'        var mouseEvent = new MouseEvent("mousedown", {'+
'            clientX: touch.clientX,'+
'            clientY: touch.clientY'+
'        });'+
'        canvas.dispatchEvent(mouseEvent);'+
'    }, false);'+
''+
'    canvas.addEventListener("touchend", function (e) {'+
'        var mouseEvent = new MouseEvent("mouseup", {});'+
'        canvas.dispatchEvent(mouseEvent);'+
'    }, false);'+
''+
''+
'    canvas.addEventListener("touchmove", function (e) {'+
'        var touch = e.touches[0];'+
'        var mouseEvent = new MouseEvent("mousemove", {'+
'            clientX: touch.clientX,'+
'            clientY: touch.clientY'+
'        });'+
'        canvas.dispatchEvent(mouseEvent);'+
'    }, false);'+
''+
'    document.body.addEventListener("touchstart", function (e) {'+
'        if (e.target == canvas) {'+
'            e.preventDefault();'+
'        }'+
'    }, false);'+
''+
'    document.body.addEventListener("touchend", function (e) {'+
'        if (e.target == canvas) {'+
'            e.preventDefault();'+
'        }'+
'    }, false);'+
''+
'    document.body.addEventListener("touchmove", function (e) {'+
'        if (e.target == canvas) {'+
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
'        if (drawing) {'+
'            ctx.moveTo(lastPos.x, lastPos.y);'+
'            ctx.lineTo(mousePos.x, mousePos.y);'+
'            ctx.stroke();'+
'            lastPos = mousePos;'+
'        }'+
'    }'+
''+
'    (function drawLoop () {'+
'        requestAnimFrame(drawLoop);'+
'        renderCanvas();'+
'    })();'+
''+
'})();'+
'</script>';

    var fieldrecordEmpId = formulario.addField({id: 'custpage_emp', label: 'recordEmp', type: 'inlinehtml'});
    fieldrecordEmpId.defaultValue = '<input id="recordEmpId" name="recordEmpId" type="hidden" value="' + recordEmp_Id + '">';

    formulario.addButton({id: 'custpage_01', label: 'Enviar firma', functionName: 'enviarFirma'});
    formulario.addButton({id: 'custpage_0111', label: 'Limpiar firma', functionName: 'limpiarFirmaEmp'});
    formulario.addButton({id: 'custpage_0112', label: 'Firmar', functionName: 'abrirModal'});
    formulario.clientScriptFileId = '2283289';

    context.response.writePage(formulario);
    }

    return {
        onRequest: onRequest
    };

});
