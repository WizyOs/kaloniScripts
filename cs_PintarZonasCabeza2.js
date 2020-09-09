/**
* @NApiVersion 2.x
* @NScriptType ClientScript
* @NModuleScope Public
*/
define(['N/record', 'N/url', 'N/https', 'N/log'],
   function (record, url, https, log) {
      var canvas = null;
      var canvasRostro = null;
      var caseId = null;
      var valCanvasCabeza = null;
      var valCanvasRostro = null;
      var camvasEmpty = "data:image/png;base64,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";
      var camvasEmptyRostro = "data:image/png;base64,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";

      function pageInit(context) {
         log.debug('Evento', 'Se dió click en evento Enviar Pintura');
         canvas = document.getElementById('sig-canvas');
         canvasRostro = document.getElementById('sig-canvasRostro');
         valCanvasCabeza = canvas.toDataURL('image/png');
         valCanvasRostro = canvasRostro.toDataURL('image/png');
         caseId = document.getElementById('recordCaseId').value;
      }

      function enviarPintura() {         

         if (valCanvasCabeza == camvasEmpty && valCanvasRostro == camvasEmptyRostro) {
            alert('Se debe pintar al menos una imagen antes de enviar');
            log.debug('Entra a debug');
         } else {

            if (valCanvasCabeza == camvasEmpty) {
               log.debug('Entra a cabeza', valCanvasCabeza);
               //var canvas = document.getElementById("sig-canvas");
               var ctxCabeza = canvas.getContext("2d");
               var imageCabeza1 = new Image();
               var imageCabeza2 = new Image();
               imageCabeza1.src = "https://3559763.app.netsuite.com/core/media/media.nl?id=2339447&c=3559763&h=ca9d3ce929846103685e";
               imageCabeza1.onload = function () {
                  ctxCabeza.drawImage(imageCabeza1, 0, 0, 320, 480);
                  imageCabeza2.src = valCanvasCabeza;
                  imageCabeza2.onload = function () {
                     ctxCabeza.drawImage(imageCabeza2, -1, -1, 320, 480);
                     var imgDatCabeza = canvas.toDataURL("image/png");
                     log.debug('imgDat: ' + imgDatCabeza);
                     record.submitFields({ type: 'supportcase', id: caseId, values: { custevent511: imgDatCabeza } });
                     alert('Imagen de cabeza enviada al caso!!');
                  };
               };
            }

            if (valCanvasRostro == camvasEmptyRostro) {
               log.debug('Entra a Rostro', valCanvasRostro);
               //var canvasRostro = document.getElementById("sig-canvasRostro");
               var ctxRostro = canvasRostro.getContext("2d");
               var imageRostro1 = new Image();
               var imageRostro2 = new Image();
               imageRostro1.src = "https://3559763.app.netsuite.com/core/media/media.nl?id=2592214&c=3559763&h=209ff4c22993fdaad9f6";
               imageRostro1.onload = function () {
                  ctxRostro.drawImage(imageRostro1, 0, 0, 518, 505);
                  imageRostro2.src = valCanvasRostro;
                  imageRostro2.onload = function () {
                     ctxRostro.drawImage(imageRostro2, -8, -10, 518, 505);
                     var imgDatRostro = canvasRostro.toDataURL("image/png");
                     log.debug('imgDat: ' + imgDatRostro);
                     record.submitFields({ type: 'supportcase', id: caseId, values: { custevent801: imgDatRostro } });
                     alert('Imagen de rostro enviada al caso!!');
                  };
               };
            }
            var urlEmp = url.resolveRecord({ recordType: 'supportcase', recordId: caseId, isEditMode: false });
            window.open("" + urlEmp + "");
            window.open('', '_parent', '');
            window.close();
         }
      }
      
      function limpiarPintura() {
         canvas = document.getElementById('sig-canvas');
         canvas.width = canvas.width;
      }

      function abrirModal() {
         var touchMove = function (e) {
            e.preventDefault();
         };
         document.addEventListener('touchmove', touchMove, { passive: false });

         modal = document.getElementById('myModal');
         modal.style.display = "block";

         setTimeout(function () {
            modal.style.display = "none";
            document.removeEventListener('touchmove', touchMove);
         }, 5000);
      }

      function limpiarPinturaRostro() {
         canvasRostro = document.getElementById('sig-canvasRostro');
         canvasRostro.width = canvasRostro.width;
      }

      function abrirModalRostro() {
         var touchMove = function (e) {
            e.preventDefault();
         };
         document.addEventListener('touchmove', touchMove, { passive: false });

         modalRostro = document.getElementById('myModalRostro');
         modalRostro.style.display = "block";

         setTimeout(function () {
            modalRostro.style.display = "none";
            document.removeEventListener('touchmove', touchMove);
         }, 5000);
      }

      return {
         pageInit: pageInit,
         enviarPintura: enviarPintura,
         limpiarPintura: limpiarPintura,
         abrirModal: abrirModal,
         limpiarPinturaRostro: limpiarPinturaRostro,
         abrirModalRostro: abrirModalRostro
      };
   });