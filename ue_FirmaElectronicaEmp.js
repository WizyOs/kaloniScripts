	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
define(['N/record', 'N/file', 'N/ui/serverWidget'], function(record, file, serverWidget) {

   function beforeLoad(context)
   {
     if(context.type == "view")
     {
        var recordEmpId = context.newRecord.id;
    	var objRecord = record.load({type: 'employee', id: recordEmpId, isDynamic: true});
        var text_entityid = objRecord.getText({fieldId: 'entityid'});
        var firmaEmpBase64 = objRecord.getValue({fieldId: 'custentity396'});

        if(firmaEmpBase64 != "" && firmaEmpBase64 != null)
        {
           var okVal = firmaEmpBase64.substring(0, 7);
           if(okVal != "ok_data")
           {
              // crear imagen paciente
              var pngFirmaEmp_base64 = firmaEmpBase64.replace("data:image/png;base64,", "");
              var fol = 1535412;
              var fileObj = file.create({name: recordEmpId + "_" + text_entityid + "_Firma Electrónica Empleado.png", fileType: "PNGIMAGE", folder: fol, contents: pngFirmaEmp_base64, isOnline: false});
              var pngFirmaEmp_fileId = fileObj.save();
              //var pngFirmaCli1_fileObjImage = file.load({id:pngFirmaCli1_fileId});
              //var pngFirmaCli1URL = pngFirmaCli1_fileObjImage.url;
			  //objRecord.setValue({fieldId: "custevent86", value: pngFirmaCli1URL});

              var firmaEmp_base64_newValBase64 = "ok_" + firmaEmpBase64;
              objRecord.setValue({fieldId: "custentity396", value: firmaEmp_base64_newValBase64});
              objRecord.save({enableSourcing: true, ignoreMandatoryFields: false});
           }
           else
           {
              log.error("Log: ", "Ya se generó la imagen de Firma Electrónica Empleado.png");
              log.error("firmaEmpBase64: ", firmaEmpBase64);
           }
        }
        else
        {
           context.form.addButton({id: "custpage_firma_empleado", label: "Firma Empleado", functionName: "onButtonClick_FirmaEmpleado"});
           context.form.clientScriptModulePath = "SuiteScripts/cs_FirmaElectronicaEmp.js";
        }
     }
   }
   return {
      beforeLoad: beforeLoad
   };
});
