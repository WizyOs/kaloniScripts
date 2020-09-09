//Define the User Event function for a beforeLoad operation.
function beforeLoadEvent(type, form, request)
{
 var newRecord = nlapiGetNewRecord();
 var custevent70Field = newRecord.getFieldText('custevent70');
 var custevent1Field = newRecord.getFieldText('custevent1');
 var titleField = newRecord.getFieldValue('title');
 var fields = titleField.split('/');
      var hgName = fields[3];
  	  var hgNameLen = hgName.length;
  	  var hg = hgName.substring(0,9);
  	  var Name = hgName.substring(10,hgNameLen);

  var recordType = 'customer'; // The type of record to load. The string internal id.
  var recordID = 641365; // The specific record instances numeric internal id.
  var initializeValues = null;

  var filters = new Array();
  filters[0] = new nlobjSearchFilter('entityid', null, 'is', hg);

  var columns = new Array();
  columns[0] = new nlobjSearchColumn('internalId');

  var searchresults = nlapiSearchRecord('customer', null, filters, columns );

		if (searchresults != null && searchresults != ''){
          var loadedRecord = nlapiLoadRecord(recordType, searchresults[0].getValue("internalId"));
          // var loadedRecord = nlapiLoadRecord(recordType, recordID, initializeValues);
          var phone = loadedRecord.getFieldValue("phone");
          var phoneN = deleteCaracteres(phone);
            nlapiLogExecution('DEBUG', 'UE| Value phone : ', phoneN);
        }

 if (type == 'view') // && folderStatus !== 'ok'
 {
    if (nlapiGetContext().getExecutionContext() == 'userinterface') {
      	nlapiLogExecution('DEBUG', 'UE| Value custevent70Field y custevent1Field : ', custevent70Field + ' - ' +custevent1Field + ' - ' + hg + ' - ' +Name);
        form.setScript('customscript863'); // id of client script
		form.addButton('custpage_sendMessage_button_view', 'Send WhatsApp', 'sendWhatsApp()');
		//var callResp = sendWhatsApp();
      	//nlapiLogExecution('DEBUG', 'UE| Value callResp : ', callResp);

            var alert_value = '<html><body><script language="JavaScript" type="text/javascript">window.alert("Values: '+ custevent70Field + ' - ' + custevent1Field + ' - ' + hg + ' - ' +Name+'");</script></body></html>';
            var field = form.addField('custpage_alertfieldd' ,  'inlinehtml');
            field.setDefaultValue(alert_value);
// function myFunction123(){ var x = document.getElementsByClassName("uir-record-name"); return x;} window.myFunction123();
// window.onload=function(){ document.getElementById("edit").click();};

     	 //var pass_value = '<html><body><script language="JavaScript" type="text/javascript">window.alert("Values: '+ custevent70Field + ' - ' + custevent1Field +'"); //window.open("https://www.google.com/", "_blank");</script></body></html>';
        // nlapiSetFieldValue("custevent25", pass_value);
    }
 }

}

function deleteCaracteres(textParam){
  var res = '';
  var i      = 0;
  try{
      while(i<textParam.length){
     var text = textParam[i];

       if(text == 0 || text == 1 || text == 2 || text == 3 || text == 4 || text == 5 || text == 6 || text == 7 || text == 8 || text == 9)
       {
        // si es diferente simplemente concatena el carácter original de la cadena original.
         res += text;
       }else{
        // si no es diferente concatena el carácter que introdujiste a remplazar
         //nlapiLogExecution('AUDIT', 'SL| No es número - ó .: ', text);
       }
       i++;
 	 } // Fin del while
  }
  catch(e){
    var vale = e;
    nlapiLogExecution('ERROR', 'SL| catch(e): ', vale);
  }
  return res;
}