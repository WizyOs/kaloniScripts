//Define the User Event function for a beforeLoad operation.

function beforeLoadInvoicePDFXML(type, form)
{
 var newRecord = nlapiGetNewRecord();
 var ue_procesado = newRecord.getFieldValue('custbody47'); // PROCESADO (NC_CO):
 var ue_FILIAL = newRecord.getFieldText('subsidiary'); // FILIAL tranid

 var ue_respuestaStupendo = newRecord.getFieldValue('custbody61'); // RESPUESTA STUPENDO (NC_CO):
 var ue_localFiletxt = newRecord.getFieldValue('custbody62'); // LOCAL_FILE_TXT (NC_CO):
 var ue_pdf = newRecord.getFieldValue('custbody70'); // PDF (NC_CO):
 var ue_xml = newRecord.getFieldValue('custbody71'); // XML (NC_CO):
 // var valresponse = "";

 if (ue_procesado == "Si" && ue_respuestaStupendo == "Archivo TXT cargado Correctamente" && ue_FILIAL == "Colombia" && type == "view")
 {
   if(ue_pdf == "" || ue_pdf == null) //  || ue_xml == "" || ue_xml == null
   {
      if (nlapiGetContext().getExecutionContext() == "userinterface" && (ue_localFiletxt.indexOf(".txt") != "" || ue_localFiletxt.indexOf(".txt") != null))
      {
          form.setScript('customscript905'); // id of client script
          form.addButton('custpage_feCO_button_view14', 'PDF CO', 'mypageInitfunction1()');
      }
   }
 }
}