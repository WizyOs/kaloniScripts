//Define the User Event function for a beforeLoad operation.

function beforeLoadInvoicePDFXML(type, form)
{
 var newRecord = nlapiGetNewRecord();
 var ue_procesado = newRecord.getFieldValue('custbody33'); // PROCESADO (FE_CO):
 var ue_FILIAL = newRecord.getFieldText('subsidiary'); // FILIAL tranid
  //nlapiLogExecution('DEBUG', 'UE| Value newRecord.getId: ', newRecord.getId());
  //nlapiSetRedirectURL('RECORD', 'invoice', newRecord.getId(), false);
  //return false;
 var ue_respuestaStupendo = newRecord.getFieldValue('custbody45'); // RESPUESTA STUPENDO (FE_CO):
 var ue_localFiletxt = newRecord.getFieldValue('custbody46'); // LOCAL_FILE_TXT (FE_CO):
 var ue_pdf = newRecord.getFieldValue('custbody68'); // PDF (FE_CO):
 var ue_xml = newRecord.getFieldValue('custbody69'); // XML (FE_CO):
 var valresponse = "";

 if (ue_procesado == "Si" && ue_respuestaStupendo == "Archivo TXT cargado Correctamente" && ue_FILIAL == "Colombia" && type == "view")
 {
   if(ue_pdf == "" || ue_pdf == null) // || ue_xml == "" || ue_xml == null
   {
      if (nlapiGetContext().getExecutionContext() == "userinterface" && (ue_localFiletxt.indexOf(".txt") != "" || ue_localFiletxt.indexOf(".txt") != null))
      {
          form.setScript('customscript902'); // id of client script
          form.addButton('custpage_feCO_button_view13', 'PDF CO', 'mypageInitfunction1()');
      }
   }
 }
}
/*
function createAlert(textalert, form)
{
  //var res = '';
  var alert_value = '<html><body><script language="JavaScript" type="text/javascript">window.alert("' + textalert + '");</script></body></html>';
  var field = form.addField('custpage_alertfieldinvoice' ,  'inlinehtml');
  field.setDefaultValue(alert_value);
  //return res;
}*/