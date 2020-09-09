/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope Public
 */
define(['N/record', 'N/url', 'N/https'],
    function(record, url, https) {
  		var comentarios = null;
  		var caseId = null;

        function pageInit(context){

        }

        function enviarComentario(){
          comentarios = document.getElementById('comentarios').value;
          caseId = document.getElementById('recordCaseId').value;
          console.log(comentarios);
          console.log(caseId);

        // var coment = "";
         var ValComent = comentarios;
           /* if(ValComent == coment){
                alert('Debe escribir algun comentario antes de enviar!!');
            }*/
          // if(comentarios != "" ){
                record.submitFields({type: 'supportcase', id: caseId, values: {custevent274: ValComent}});
                alert('Comentarios enviados al caso!!');
                var urlCase = url.resolveRecord({recordType: 'supportcase', recordId: caseId, isEditMode: false});
                window.open("" + urlCase + "");
                // cerrar formulario de firma
                window.open('','_parent','');
                window.close();
           // }

        }
        return {
            pageInit: pageInit,
            enviarComentario: enviarComentario
        };
    });