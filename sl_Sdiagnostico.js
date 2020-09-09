/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

define(['N/ui/serverWidget', 'N/url', 'N/https', 'N/file','N/record'],

    function(widget, url, https, file,record){

        function onRequest(context) {
            var recordCase_Id = context.request.parameters.recordCaseId;
            var inRecord = record.load({type: 'SUPPORTCASE', id: recordCase_Id, isDynamic: true});
            var diseno_Img1 = inRecord.getValue({fieldId: 'custevent333'});
            var diseno_Img2 = inRecord.getValue({fieldId: 'custevent334'});
            var diseno_Img3 = inRecord.getValue({fieldId: 'custevent335'});
            var diseno_Img4 = inRecord.getValue({fieldId: 'custevent336'});
            var comentrio = inRecord.getValue({fieldId: 'custevent274'});
            var IDdefaultt = '1592235';



         /* if(diseno_Img1 !='' && diseno_Img2 !='' && diseno_Img3 !='' && diseno_Img4 !=''){
            var fileObjImg1 = file.load({id: diseno_Img1});
            var fileObjImg2 = file.load({id: diseno_Img2});
            var fileObjImg3 = file.load({id: diseno_Img3});
            var fileObjImg4 = file.load({id: diseno_Img4});
            }
         /* else if(diseno_Img1=='' || diseno_Img2=='' || diseno_Img3=='' || diseno_Img4==''){
            var fileObjImg1 = file.load({id: 1592235});
            var fileObjImg2 = file.load({id: 1592235});
            var fileObjImg3 = file.load({id: 1592235});
            var fileObjImg4 = file.load({id: 1592235});
            }*/

         if(diseno_Img1 != '' && diseno_Img1 != null){
           log.debug('IMG1 if',diseno_Img1);
              var fileObjImg1 = file.load({id: diseno_Img1});
            }else if(diseno_Img1 == '' || diseno_Img1 == null){
              log.debug('IMG1 Else',diseno_Img1);
              var fileObjImg1 = file.load({id: IDdefaultt});
                     }

         if(diseno_Img2 != '' && diseno_Img2 != null){
            log.debug('IMG2 if',diseno_Img3);
            var fileObjImg2 = file.load({id: diseno_Img2});
           }else if(diseno_Img2 == '' || diseno_Img2 == null){
              log.debug('IMG2 else',diseno_Img3);
             var fileObjImg2 = file.load({id: IDdefaultt});
            }

         if(diseno_Img3 != '' && diseno_Img3 != null){
            log.debug('IMG3 if',diseno_Img3);
            var fileObjImg3 = file.load({id: diseno_Img3});
           }else if(diseno_Img3 == '' || diseno_Img3 == null){
              log.debug('IMG3 else',diseno_Img3);
             var fileObjImg3 = file.load({id: IDdefaultt});
            }

         if(diseno_Img4 != '' && diseno_Img4 != null){
            log.debug('IMG4 if',diseno_Img4);
            var fileObjImg4 = file.load({id: diseno_Img4});
           }else if(diseno_Img4 == '' || diseno_Img4 == null){
              log.debug('IMG4 else',diseno_Img4);
             var fileObjImg4 = file.load({id: IDdefaultt});
            }



            var formulario = widget.createForm({title: 'Imagenes y Comentarios'});
            var imgs = formulario.addField({id: 'custpage_imgs', label: 'Imagenes', type: 'inlinehtml'});

              imgs.defaultValue = '<br /><br /><br /><br /><teble><tr><td><input style="width: 300px; color: blue" type="text" value="IMAGEN 1 MICROCAMARA:" disabled></td>'+
                '<td><input style="width: 300px; color: blue" type="text" value="IMAGEN 2 MICROCAMARA:" disabled></td>'+
                '<td><input style="width: 300px; color: blue" type="text" value="IMAGEN 3 MICROCAMARA:" disabled></td>'+
                '<td><input style="width: 300px; color: blue" type="text" value="IMAGEN 4 MICROCAMARA:" disabled></td></tr>'+
                '<tr><td><a href="'+ fileObjImg1.url +'"><img src="'+ fileObjImg1.url +'" width="300" height="200"></a></td><td><a href="'+ fileObjImg2.url +'"><img src="'+ fileObjImg2.url +'" width="300" height="200"></a></td><td><a href="'+ fileObjImg3.url +'"><img src="'+ fileObjImg3.url +'" width="300" height="200"></a></td><td><a href="'+ fileObjImg4.url +'"><img src="'+ fileObjImg4.url +'" width="300" height="200"></a></td></tr></teble><br /><br /><div class="container"><div class="backdrop"><div class="highlights"></div></div><textarea placeholder="Escribe tus Comentarios!..." id="comentarios">'+ comentrio +'</textarea></div><br /><br /><br /><br />';



            var firmasCambas = formulario.addField({id: 'custpage_firmas', label: 'Firmas', type: 'inlinehtml'});
            var fieldrecordCaseId = formulario.addField({id: 'custpage_case', label: 'recordCase', type: 'inlinehtml'});
            fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';
            formulario.addButton({id: 'custpage_01', label: 'Enviar Comentarios', functionName: 'enviarComentario'});
            formulario.clientScriptFileId = '2258918';

            context.response.writePage(formulario);
        }

        return {
            onRequest: onRequest
        };

    });
