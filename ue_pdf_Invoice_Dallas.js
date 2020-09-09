//Define the User Event function for a beforeLoad operation.
function beforeLoadInvoiceDallas(type, form)
{
  if(type == 'view'){
     var newRecord = nlapiGetNewRecord();
     var subsidiaryVal = newRecord.getFieldText('subsidiary');
     var pdf_Dallas = "";
     var tranidField = newRecord.getFieldValue('tranid');
     var trandateVal = newRecord.getFieldValue('trandate');
     var pdf_DallasField = newRecord.getFieldValue('custbody72');
     var date = trandateVal.split('/');
     var year = date[2];
     var path = "EXP_DALLAS/Factura/" + year + "/" + tranidField + ".pdf";

	 try
     {
        nlapiLogExecution('AUDIT', 'UE | Value path: ', 'Value path: ' + path);
     	pdf_Dallas = nlapiLoadFile(path);
     }
     catch(err) {
    	 nlapiLogExecution('AUDIT', 'UE | message err: ', 'An error occurred when trying to load the file: ' + err);
     }

  	// PDF Invoice Dallas
  	if(pdf_Dallas == "" && (pdf_DallasField == "" || pdf_DallasField == null))
    {
       if(subsidiaryVal == "Dallas") // if(subsidiaryVal == "Republica Dominicana")  Cambiar a Dallas cuando exista subsidiary
       {
          if(nlapiGetContext().getExecutionContext() == 'userinterface'){
              form.setScript('customscript910');
              form.addButton('custpage_pdfDallas_button_view', 'PDF DALLAS', 'callSuitelet()');
          }
       }
    }
  }
}