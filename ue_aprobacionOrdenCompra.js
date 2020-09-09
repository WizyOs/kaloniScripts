	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
	define(['N/record', 'N/runtime', 'N/redirect', 'N/log'], function(record, runtime, redirect, log) {
/*
 
 
*/
   function beforeLoad(context)
   {
     if(context.type == "view")
     {
        /*var recordCaseId = context.newRecord.id;
        var objRecord = record.load({type: 'SUPPORTCASE', id: recordCaseId, isDynamic: false});
        var customform_id = objRecord.getValue({fieldId: 'customform'});
		var userObj = runtime.getCurrentUser();
        var bandera = false;*/

        var currentOrdenCompraId = context.newRecord.id;

        var rec = record.load({type: 'purchaseorder', id: currentOrdenCompraId});
      	var approvalstatus = rec.getValue({fieldId: 'approvalstatus'});
        log.debug('approvalstatus: ', approvalstatus);
        var employee = rec.getValue({fieldId: 'employee'});
        log.debug('employee: ', employee);
        var subsidiary = rec.getValue({fieldId: 'subsidiary'});
        log.debug('subsidiary: ', subsidiary);
        var total = rec.getValue({fieldId: 'total'});
        log.debug('total: ', total);

         var jORGE_DIAZ_check = context.form.getField({id: 'custbody132'}).defaultValue;
         log.debug('jORGE_DIAZ_check: ', jORGE_DIAZ_check);
         var pATRICIA_SANCHEZ_check = context.form.getField({id: 'custbody137'}).defaultValue;
         log.debug('pATRICIA_SANCHEZ_check: ', pATRICIA_SANCHEZ_check);
         var sILVIA_MATA_check = context.form.getField({id: 'custbody138'}).defaultValue;
         log.debug('sILVIA_MATA_check: ', sILVIA_MATA_check);
         var mICHELLE_ALCANTARA_check = context.form.getField({id: 'custbody139'}).defaultValue;
         log.debug('mICHELLE_ALCANTARA_check: ', mICHELLE_ALCANTARA_check);
         var osvaldo_Tinoco_check = context.form.getField({id: 'custbody153'}).defaultValue;
         log.debug('osvaldo_Tinoco_check: ', osvaldo_Tinoco_check);
         var vICENTE_CORTINA_check = context.form.getField({id: 'custbody133'}).defaultValue;
         log.debug('vICENTE_CORTINA_check: ', vICENTE_CORTINA_check);
         var aBRAHAM_FIGUEROA_check = context.form.getField({id: 'custbody141'}).defaultValue;
         log.debug('aBRAHAM_FIGUEROA_check: ', aBRAHAM_FIGUEROA_check);
         var zULMA_APONTE_check = context.form.getField({id: 'custbody140'}).defaultValue;
         log.debug('zULMA_APONTE_check: ', zULMA_APONTE_check);
         var eDITH_GUEVARA_check = context.form.getField({id: 'custbody134'}).defaultValue;
         log.debug('eDITH_GUEVARA_check: ', eDITH_GUEVARA_check);
         var aLEJANDRA_PORRAS_check = context.form.getField({id: 'custbody135'}).defaultValue;
         log.debug('aLEJANDRA_PORRAS_check: ', aLEJANDRA_PORRAS_check);

        context.form.getField('custbody132').updateDisplayType({displayType:'hidden'}); // JORGE DÍAZ (LIMITE 5,000):
        context.form.getField('custbody137').updateDisplayType({displayType:'hidden'}); // PATRICIA SÁNCHEZ (LIMITE 5,000):
        context.form.getField('custbody138').updateDisplayType({displayType:'hidden'}); // SILVIA MATA (LIMITE 5,000):
        context.form.getField('custbody139').updateDisplayType({displayType:'hidden'}); // MICHELLE ALCANTARA (LIMITE 5,000):
        context.form.getField('custbody153').updateDisplayType({displayType:'hidden'}); // Osvaldo Tinoco (LIMITE 5,000):
        context.form.getField('custbody133').updateDisplayType({displayType:'hidden'}); // VICENTE CORTINA. (LIMITE 10,000):
        context.form.getField('custbody141').updateDisplayType({displayType:'hidden'}); // ABRAHAM FIGUEROA (LIMITE 10,000):
        context.form.getField('custbody140').updateDisplayType({displayType:'hidden'}); // ZULMA APONTE (LIMITE 19,000):
        context.form.getField('custbody134').updateDisplayType({displayType:'hidden'}); // EDITH GUEVARA (LIMITE 20,000):
        context.form.getField('custbody135').updateDisplayType({displayType:'hidden'}); // ALEJANDRA PORRAS (MAYOR A 50,000):

		if(employee == "62837") // Stefany Maria Elena Aviles
        {
           context.form.getField('custbody132').updateDisplayType({displayType:'normal'}); // JORGE DÍAZ (LIMITE 5,000):
           context.form.getField('custbody133').updateDisplayType({displayType:'normal'}); // VICENTE CORTINA. (LIMITE 10,000):
           context.form.getField('custbody134').updateDisplayType({displayType:'normal'}); // EDITH GUEVARA (LIMITE 20,000):
           context.form.getField('custbody135').updateDisplayType({displayType:'normal'}); // ALEJANDRA PORRAS (MAYOR A 50,000):
        }

		if(employee == "1032563") // Sinai Aguilar
        {
           context.form.getField('custbody134').updateDisplayType({displayType:'normal'}); // EDITH GUEVARA (LIMITE 20,000):
     	   context.form.getField('custbody135').updateDisplayType({displayType:'normal'}); // ALEJANDRA PORRAS (MAYOR A 50,000):
        }

		if(employee == "593635") // Jesus Cruz Mata
        {
           context.form.getField('custbody137').updateDisplayType({displayType:'normal'}); // PATRICIA SÁNCHEZ (LIMITE 5,000):
           context.form.getField('custbody134').updateDisplayType({displayType:'normal'}); // EDITH GUEVARA (LIMITE 20,000):
   	   	   context.form.getField('custbody135').updateDisplayType({displayType:'normal'}); // ALEJANDRA PORRAS (MAYOR A 50,000):
        }

		if(employee == "96537") // Manuel Alvarado
        {
           context.form.getField('custbody138').updateDisplayType({displayType:'normal'}); // SILVIA MATA (LIMITE 5,000):
           context.form.getField('custbody140').updateDisplayType({displayType:'normal'}); // ZULMA APONTE (LIMITE 19,000):
           context.form.getField('custbody134').updateDisplayType({displayType:'normal'}); // EDITH GUEVARA (LIMITE 20,000):
           context.form.getField('custbody135').updateDisplayType({displayType:'normal'}); // ALEJANDRA PORRAS (MAYOR A 50,000):
        }

		if(employee == "901088" || employee == "1011198") // Jose Vicente Esquivel Antonio y Fernanda
        {
           context.form.getField('custbody139').updateDisplayType({displayType:'normal'}); // MICHELLE ALCANTARA (LIMITE 5,000):
           context.form.getField('custbody141').updateDisplayType({displayType:'normal'}); // ABRAHAM FIGUEROA (LIMITE 10,000):
           context.form.getField('custbody134').updateDisplayType({displayType:'normal'}); // EDITH GUEVARA (LIMITE 20,000):
           context.form.getField('custbody135').updateDisplayType({displayType:'normal'}); // ALEJANDRA PORRAS (MAYOR A 50,000):
        }

		if(employee == "851871") // Patricia Cabrera
        {
           context.form.getField('custbody153').updateDisplayType({displayType:'normal'}); // Osvaldo Tinoco (LIMITE 5,000):
           context.form.getField('custbody141').updateDisplayType({displayType:'normal'}); // ABRAHAM FIGUEROA (LIMITE 10,000):
           context.form.getField('custbody134').updateDisplayType({displayType:'normal'}); // EDITH GUEVARA (LIMITE 20,000):
           context.form.getField('custbody135').updateDisplayType({displayType:'normal'}); // ALEJANDRA PORRAS (MAYOR A 50,000):
        }

	   /*if(subsidiary == "6" && approvalstatus == "1")
       {
         var band = false;
         if(jORGE_DIAZ_check == "T"){
           rec.setValue({fieldId: "custbody142", value: 'JORGE DÍAZ'});
           band = true;
         }
         if(pATRICIA_SANCHEZ_check == "T"){
           rec.setValue({fieldId: "custbody142", value: 'PATRICIA SÁNCHEZ'});
           band = true;
         }
         if(sILVIA_MATA_check == "T"){
           rec.setValue({fieldId: "custbody142", value: 'SILVIA MATA'});
           band = true;
         }
         if(mICHELLE_ALCANTARA_check == "T"){
           rec.setValue({fieldId: "custbody142", value: 'MICHELLE ALCANTARA'});
           band = true;
         }
         if(vICENTE_CORTINA_check == "T"){
           rec.setValue({fieldId: "custbody143", value: 'VICENTE CORTINA'});
           band = true;
         }
         if(aBRAHAM_FIGUEROA_check == "T"){
           rec.setValue({fieldId: "custbody143", value: 'ABRAHAM FIGUEROA'});
           band = true;
         }
         if(zULMA_APONTE_check == "T"){
           rec.setValue({fieldId: "custbody143", value: 'ZULMA APONTE'});
           band = true;
         }
         if(eDITH_GUEVARA_check == "T"){
           rec.setValue({fieldId: "custbody144", value: 'EDITH GUEVARA'});
           band = true;
         }
         if(aLEJANDRA_PORRAS_check == "T"){
           rec.setValue({fieldId: "custbody145", value: 'ALEJANDRA PORRAS'});
           band = true;
         }
         if(band){
			rec.save({enableSourcing: false, ignoreMandatoryFields: true});
    		redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
         }
       }*/

       //var aprobado = false;
       if(subsidiary == "6" && approvalstatus == "1")
       {
          if(total > 0 && total <= 5000 && (jORGE_DIAZ_check == "T" || pATRICIA_SANCHEZ_check == "T" || sILVIA_MATA_check == "T" || mICHELLE_ALCANTARA_check == "T" || osvaldo_Tinoco_check == "T")){
                   log.debug('approvalstatus changed: ', 'Aprobado 5,000');
                   rec.setValue({fieldId: "approvalstatus", value: '2'});
                   rec.save({enableSourcing: false, ignoreMandatoryFields: true});
    			   redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
                   //aprobado = true;
                 }else if(total > 5000 && total <= 10000 && (jORGE_DIAZ_check == "T" || pATRICIA_SANCHEZ_check == "T" || sILVIA_MATA_check == "T" || mICHELLE_ALCANTARA_check == "T" || osvaldo_Tinoco_check == "T") && (vICENTE_CORTINA_check == "T" || aBRAHAM_FIGUEROA_check == "T")){
                   log.debug('approvalstatus changed: ', 'Aprobado 10,000');
                   rec.setValue({fieldId: "approvalstatus", value: '2'});
                   rec.save({enableSourcing: false, ignoreMandatoryFields: true});
    			   redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
                   //aprobado = true;
                 }else if(total > 5000 && total <= 19000 && (jORGE_DIAZ_check == "T" || pATRICIA_SANCHEZ_check == "T" || sILVIA_MATA_check == "T" || mICHELLE_ALCANTARA_check == "T" || osvaldo_Tinoco_check == "T") && zULMA_APONTE_check == "T"){
                   log.debug('approvalstatus changed: ', 'Aprobado 19,000');
                   rec.setValue({fieldId: "approvalstatus", value: '2'});
                   rec.save({enableSourcing: false, ignoreMandatoryFields: true});
    			   redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
                   //aprobado = true;
                 }else if(total > 10000 && total <= 20000 && (jORGE_DIAZ_check == "T" || pATRICIA_SANCHEZ_check == "T" || sILVIA_MATA_check == "T" || mICHELLE_ALCANTARA_check == "T" || osvaldo_Tinoco_check == "T") && (vICENTE_CORTINA_check == "T" || aBRAHAM_FIGUEROA_check == "T") && (zULMA_APONTE_check == "T" || eDITH_GUEVARA_check == "T")){
                   log.debug('approvalstatus changed: ', 'Aprobado 20,000');
                   rec.setValue({fieldId: "approvalstatus", value: '2'});
                   rec.save({enableSourcing: false, ignoreMandatoryFields: true});
    			   redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
                   //aprobado = true;
                 }else if(total > 20000 && (jORGE_DIAZ_check == "T" || pATRICIA_SANCHEZ_check == "T" || sILVIA_MATA_check == "T" || mICHELLE_ALCANTARA_check == "T" || osvaldo_Tinoco_check == "T") && (vICENTE_CORTINA_check == "T" || aBRAHAM_FIGUEROA_check == "T") && (zULMA_APONTE_check == "T" || eDITH_GUEVARA_check == "T") && aLEJANDRA_PORRAS_check == "T"){
                   log.debug('approvalstatus changed: ', 'Aprobado mayor a 20,000');
                   rec.setValue({fieldId: "approvalstatus", value: '2'});
                   rec.save({enableSourcing: false, ignoreMandatoryFields: true});
    			   redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
                   //aprobado = true;
                 }
       }

        if(subsidiary == "6" && approvalstatus == "1") // approvalstatus == "1" && aprobado == false
        {
          var userObj = runtime.getCurrentUser();
          log.debug('userObj: ', userObj);

          context.form.clientScriptFileId = 3568431;

          if(employee == "62837") // Stefany Maria Elena Aviles
          {
              if(userObj.id == "62860" && total > 0 && total <= 5000)
              {
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});

                if(jORGE_DIAZ_check == "F")
                   context.form.addButton({id:'custpage_button_btnJorgeDiaz', label:'Aprobación', functionName:'btnJorgeDiaz'}); // Jorge Diaz Zamora

              }else if(total > 5000 && total <= 10000){

                if(userObj.id == "62860")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "62860" && jORGE_DIAZ_check == "F")
                  context.form.addButton({id:'custpage_button_btnJorgeDiaz', label:'Aprobación', functionName:'btnJorgeDiaz'}); // Jorge Diaz Zamora

                if(userObj.id == "1031937")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "1031937" && vICENTE_CORTINA_check == "F")
                  context.form.addButton({id:'custpage_button_btnVicenteCortina', label:'Aprobación', functionName:'btnVicenteCortina'});

              }else if(total > 10000 && total <= 20000){

                if(userObj.id == "62860")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "62860" && jORGE_DIAZ_check == "F")
                  context.form.addButton({id:'custpage_button_btnJorgeDiaz', label:'Aprobación', functionName:'btnJorgeDiaz'}); // Jorge Diaz Zamora

                if(userObj.id == "1031937")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "1031937" && vICENTE_CORTINA_check == "F")
                  context.form.addButton({id:'custpage_button_btnVicenteCortina', label:'Aprobación', functionName:'btnVicenteCortina'});

                if(userObj.id == "1023329")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "1023329" && eDITH_GUEVARA_check == "F")
                  context.form.addButton({id:'custpage_button_btnEdithGuevara', label:'Aprobación', functionName:'btnEdithGuevara'});

              }else if(total > 20000){

                if(userObj.id == "62860")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "62860" && jORGE_DIAZ_check == "F")
                  context.form.addButton({id:'custpage_button_btnJorgeDiaz', label:'Aprobación', functionName:'btnJorgeDiaz'}); // Jorge Diaz Zamora

                if(userObj.id == "1031937")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "1031937" && vICENTE_CORTINA_check == "F")
                  context.form.addButton({id:'custpage_button_btnVicenteCortina', label:'Aprobación', functionName:'btnVicenteCortina'});

                if(userObj.id == "1023329")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "1023329" && eDITH_GUEVARA_check == "F")
                  context.form.addButton({id:'custpage_button_btnEdithGuevara', label:'Aprobación', functionName:'btnEdithGuevara'});

                if(userObj.id == "975540")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "975540" && aLEJANDRA_PORRAS_check == "F")
                  context.form.addButton({id:'custpage_button_btnAlejandraPorras', label:'Aprobación', functionName:'btnAlejandraPorras'});
              }
           }

          if(employee == "1032563") // Sinai Aguilar
          {
            if(userObj.id == "1023329" && total > 10000 && total <= 20000)
            {
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(eDITH_GUEVARA_check == "F")
              	context.form.addButton({id:'custpage_button_btnEdithGuevara', label:'Aprobación', functionName:'btnEdithGuevara'});

            }else if(total > 20000){

                if(userObj.id == "1023329")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "1023329" && eDITH_GUEVARA_check == "F")
                  context.form.addButton({id:'custpage_button_btnEdithGuevara', label:'Aprobación', functionName:'btnEdithGuevara'});

                if(userObj.id == "975540")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "975540" && aLEJANDRA_PORRAS_check == "F")
                  context.form.addButton({id:'custpage_button_btnAlejandraPorras', label:'Aprobación', functionName:'btnAlejandraPorras'});
            }
          }

          if(employee == "593635") // Jesus Cruz Mata
          {
            if(userObj.id == "142184" && total > 0 && total <= 5000)
            {
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(pATRICIA_SANCHEZ_check == "F")
                context.form.addButton({id:'custpage_button_btnPatriciaSanchez', label:'Aprobación', functionName:'btnPatriciaSanchez'});

            }else if(total > 10000 && total <= 20000){

              if(userObj.id == "142184")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(userObj.id == "142184" && pATRICIA_SANCHEZ_check == "F")
              	context.form.addButton({id:'custpage_button_btnPatriciaSanchez', label:'Aprobación', functionName:'btnPatriciaSanchez'});

              if(userObj.id == "1023329")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(userObj.id == "1023329" && eDITH_GUEVARA_check == "F")
                context.form.addButton({id:'custpage_button_btnEdithGuevara', label:'Aprobación', functionName:'btnEdithGuevara'});

            }else if(total > 20000){

              if(userObj.id == "142184")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(userObj.id == "142184" && pATRICIA_SANCHEZ_check == "F")
              	context.form.addButton({id:'custpage_button_btnPatriciaSanchez', label:'Aprobación', functionName:'btnPatriciaSanchez'});

              if(userObj.id == "1023329")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(userObj.id == "1023329" && eDITH_GUEVARA_check == "F")
                context.form.addButton({id:'custpage_button_btnEdithGuevara', label:'Aprobación', functionName:'btnEdithGuevara'});

              if(userObj.id == "975540")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(userObj.id == "975540" && aLEJANDRA_PORRAS_check == "F")
                context.form.addButton({id:'custpage_button_btnAlejandraPorras', label:'Aprobación', functionName:'btnAlejandraPorras'});
            }
          }

          if(employee == "96537") // Manuel Alvarado
          {
            if(userObj.id == "739490" && total > 0 && total <= 5000)
            {
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(sILVIA_MATA_check == "F")
                context.form.addButton({id:'custpage_button_btnSilviaMata', label:'Aprobación', functionName:'btnSilviaMata'});

            }else if(total > 5000 && total <= 19000){

               if(userObj.id == "739490")
                 context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
               if(userObj.id == "739490" && sILVIA_MATA_check == "F")
               	 context.form.addButton({id:'custpage_button_btnSilviaMata', label:'Aprobación', functionName:'btnSilviaMata'});

               if(userObj.id == "224852")
                 context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
               if(userObj.id == "224852" && zULMA_APONTE_check == "F")
               	 context.form.addButton({id:'custpage_button_btnZulmaAponte', label:'Aprobación', functionName:'btnZulmaAponte'});

            }else if(total > 19000 && total <= 20000){

               if(userObj.id == "739490")
                 context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
               if(userObj.id == "739490" && sILVIA_MATA_check == "F")
               	 context.form.addButton({id:'custpage_button_btnSilviaMata', label:'Aprobación', functionName:'btnSilviaMata'});

               if(userObj.id == "224852")
                 context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
               if(userObj.id == "224852" && zULMA_APONTE_check == "F")
               	 context.form.addButton({id:'custpage_button_btnZulmaAponte', label:'Aprobación', functionName:'btnZulmaAponte'});

               if(userObj.id == "1023329")
                 context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
               if(userObj.id == "1023329" && eDITH_GUEVARA_check == "F")
                 context.form.addButton({id:'custpage_button_btnEdithGuevara', label:'Aprobación', functionName:'btnEdithGuevara'});

            }else if(total > 20000){

               if(userObj.id == "739490")
                 context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
               if(userObj.id == "739490" && sILVIA_MATA_check == "F")
               	 context.form.addButton({id:'custpage_button_btnSilviaMata', label:'Aprobación', functionName:'btnSilviaMata'});

               if(userObj.id == "224852")
                 context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
               if(userObj.id == "224852" && zULMA_APONTE_check == "F")
               	 context.form.addButton({id:'custpage_button_btnZulmaAponte', label:'Aprobación', functionName:'btnZulmaAponte'});

               if(userObj.id == "1023329")
                 context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
               if(userObj.id == "1023329" && eDITH_GUEVARA_check == "F")
                 context.form.addButton({id:'custpage_button_btnEdithGuevara', label:'Aprobación', functionName:'btnEdithGuevara'});

               if(userObj.id == "975540")
                 context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
               if(userObj.id == "975540" && aLEJANDRA_PORRAS_check == "F")
                 context.form.addButton({id:'custpage_button_btnAlejandraPorras', label:'Aprobación', functionName:'btnAlejandraPorras'});

            }
          }

          if(employee == "901088" || employee == "1011198") // Jose Vicente Esquivel Antonio y Fernanda
          {
            if(userObj.id == "411945" && total > 0 && total <= 5000) // || userObj.id == "637079" Yo
            {
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(mICHELLE_ALCANTARA_check == "F")
              	context.form.addButton({id:'custpage_button_btnMichelleAlcantara', label:'Aprobación', functionName:'btnMichelleAlcantara'});

            }else if(total > 5000 && total <= 10000){

              if(userObj.id == "411945")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(userObj.id == "411945" && mICHELLE_ALCANTARA_check == "F")
              	context.form.addButton({id:'custpage_button_btnMichelleAlcantara', label:'Aprobación', functionName:'btnMichelleAlcantara'});

              if(userObj.id == "1034514")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(userObj.id == "1034514" && aBRAHAM_FIGUEROA_check == "F")
              	context.form.addButton({id:'custpage_button_btnAbrahamFigueroa', label:'Aprobación', functionName:'btnAbrahamFigueroa'});

            }else if(total > 10000 && total <= 20000){

              if(userObj.id == "411945")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(userObj.id == "411945" && mICHELLE_ALCANTARA_check == "F")
              	context.form.addButton({id:'custpage_button_btnMichelleAlcantara', label:'Aprobación', functionName:'btnMichelleAlcantara'});

              if(userObj.id == "1034514")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(userObj.id == "1034514" && aBRAHAM_FIGUEROA_check == "F")
              	context.form.addButton({id:'custpage_button_btnAbrahamFigueroa', label:'Aprobación', functionName:'btnAbrahamFigueroa'});

              if(userObj.id == "1023329")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(userObj.id == "1023329" && eDITH_GUEVARA_check == "F")
                context.form.addButton({id:'custpage_button_btnEdithGuevara', label:'Aprobación', functionName:'btnEdithGuevara'});

            }else if(total > 20000){

              if(userObj.id == "411945")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(userObj.id == "411945" && mICHELLE_ALCANTARA_check == "F")
              	context.form.addButton({id:'custpage_button_btnMichelleAlcantara', label:'Aprobación', functionName:'btnMichelleAlcantara'});

              if(userObj.id == "1034514")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(userObj.id == "1034514" && aBRAHAM_FIGUEROA_check == "F")
              	context.form.addButton({id:'custpage_button_btnAbrahamFigueroa', label:'Aprobación', functionName:'btnAbrahamFigueroa'});

              if(userObj.id == "1023329")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(userObj.id == "1023329" && eDITH_GUEVARA_check == "F")
                context.form.addButton({id:'custpage_button_btnEdithGuevara', label:'Aprobación', functionName:'btnEdithGuevara'});

              if(userObj.id == "975540")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
              if(userObj.id == "975540" && aLEJANDRA_PORRAS_check == "F")
                context.form.addButton({id:'custpage_button_btnAlejandraPorras', label:'Aprobación', functionName:'btnAlejandraPorras'});

            }
          }
          
          if(employee == "851871") // Patricia Cabrera
          {
              if(userObj.id == "97772" && total > 0 && total <= 5000)
              {
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});

                if(osvaldo_Tinoco_check == "F")
                   context.form.addButton({id:'custpage_button_btnOsvaldoTinoco', label:'Aprobación', functionName:'btnOsvaldoTinoco'});

              }else if(total > 5000 && total <= 10000){

                if(userObj.id == "97772")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "97772" && osvaldo_Tinoco_check == "F")
                  context.form.addButton({id:'custpage_button_btnOsvaldoTinoco', label:'Aprobación', functionName:'btnOsvaldoTinoco'});

                if(userObj.id == "1034514")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "1034514" && aBRAHAM_FIGUEROA_check == "F")
                  context.form.addButton({id:'custpage_button_btnAbrahamFigueroa', label:'Aprobación', functionName:'btnAbrahamFigueroa'});

              }else if(total > 10000 && total <= 20000){

                if(userObj.id == "97772")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "97772" && osvaldo_Tinoco_check == "F")
                  context.form.addButton({id:'custpage_button_btnOsvaldoTinoco', label:'Aprobación', functionName:'btnOsvaldoTinoco'});

                if(userObj.id == "1034514")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "1034514" && aBRAHAM_FIGUEROA_check == "F")
                  context.form.addButton({id:'custpage_button_btnAbrahamFigueroa', label:'Aprobación', functionName:'btnAbrahamFigueroa'});

                if(userObj.id == "1023329")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "1023329" && eDITH_GUEVARA_check == "F")
                  context.form.addButton({id:'custpage_button_btnEdithGuevara', label:'Aprobación', functionName:'btnEdithGuevara'});

              }else if(total > 20000){

                if(userObj.id == "97772")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "97772" && osvaldo_Tinoco_check == "F")
                  context.form.addButton({id:'custpage_button_btnOsvaldoTinoco', label:'Aprobación', functionName:'btnOsvaldoTinoco'});

                if(userObj.id == "1034514")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "1034514" && aBRAHAM_FIGUEROA_check == "F")
                  context.form.addButton({id:'custpage_button_btnAbrahamFigueroa', label:'Aprobación', functionName:'btnAbrahamFigueroa'});

                if(userObj.id == "1023329")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "1023329" && eDITH_GUEVARA_check == "F")
                  context.form.addButton({id:'custpage_button_btnEdithGuevara', label:'Aprobación', functionName:'btnEdithGuevara'});

                if(userObj.id == "975540")
                  context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
                if(userObj.id == "975540" && aLEJANDRA_PORRAS_check == "F")
                  context.form.addButton({id:'custpage_button_btnAlejandraPorras', label:'Aprobación', functionName:'btnAlejandraPorras'});
              }
           }
          
        }
     }

        /*if(userObj.role == "1139" || userObj.role == "1094") // 1097 = OSS Contabilidad KHG
        {
          if(customform_id == "14") // 14 = atención a cliente injerto
          {
            var val_casenumber1 = context.form.getField({id: 'casenumber'}).defaultValue;
          }
        }*/

     if(context.type == "edit")
     {
        context.form.getField('custbody132').updateDisplayType({displayType:'hidden'}); // JORGE DÍAZ (LIMITE 5,000):
        context.form.getField('custbody137').updateDisplayType({displayType:'hidden'}); // PATRICIA SÁNCHEZ (LIMITE 5,000):
        context.form.getField('custbody138').updateDisplayType({displayType:'hidden'}); // SILVIA MATA (LIMITE 5,000):
        context.form.getField('custbody139').updateDisplayType({displayType:'hidden'}); // MICHELLE ALCANTARA (LIMITE 5,000):
        context.form.getField('custbody153').updateDisplayType({displayType:'hidden'}); // Osvaldo Tinoco (LIMITE 5,000):
        context.form.getField('custbody133').updateDisplayType({displayType:'hidden'}); // VICENTE CORTINA. (LIMITE 10,000):
        context.form.getField('custbody141').updateDisplayType({displayType:'hidden'}); // ABRAHAM FIGUEROA (LIMITE 10,000):
        context.form.getField('custbody140').updateDisplayType({displayType:'hidden'}); // ZULMA APONTE (LIMITE 19,000):
        context.form.getField('custbody134').updateDisplayType({displayType:'hidden'}); // EDITH GUEVARA (LIMITE 20,000):
        context.form.getField('custbody135').updateDisplayType({displayType:'hidden'}); // ALEJANDRA PORRAS (MAYOR A 50,000):

        /*var recordCaseId = context.newRecord.id;
        var objRecord = record.load({type: 'purchaseorder', id: recordCaseId, isDynamic: false});
        log.debug('objRecord: ', objRecord);
        //var customform_id = objRecord.getValue({fieldId: 'customform'});
        var userObj = runtime.getCurrentUser();
        log.debug('userObj: ', userObj);
        if(userObj.role == "1139" || userObj.role == "1094") // 1097 = OSS Contabilidad KHG
        {
           if(customform_id == "14") // 14 = atención a cliente injerto
           {

              var jorgeDias  = objRecord.getText({fieldId: 'custbody132'});
       		  log.debug('jorgeDias: ', jorgeDias);

       		  if(userObj != "62860")
              {
                context.form.getField('custbody132').updateDisplayType({displayType:'hidden'});
              }
       		  else
              {
                // if(jorgeDias == "F")
                  context.form.getField('custbody132').updateDisplayType({displayType:'normal'});

                  context.form.getField('custbody133').updateDisplayType({displayType:'normal'});
                  context.form.getField('custbody133').updateDisplayType({displayType:'disabled'});
                  context.form.getField('custbody134').updateDisplayType({displayType:'normal'});
                  context.form.getField('custbody134').updateDisplayType({displayType:'disabled'});
                  context.form.getField('custbody135').updateDisplayType({displayType:'normal'});
                  context.form.getField('custbody135').updateDisplayType({displayType:'disabled'});
              }

              var vicneteCortina  = objRecord.getText({fieldId: 'custbody133'});
       		  log.debug('vicneteCortina: ', vicneteCortina);

       		  if(userObj != "1031937")
              {
                context.form.getField('custbody133').updateDisplayType({displayType:'hidden'});
              }
       		  else
              {
                // if(vicneteCortina == "F")
                  context.form.getField('custbody133').updateDisplayType({displayType:'normal'});

                  context.form.getField('custbody132').updateDisplayType({displayType:'normal'});
                  context.form.getField('custbody132').updateDisplayType({displayType:'disabled'});
                  context.form.getField('custbody134').updateDisplayType({displayType:'normal'});
                  context.form.getField('custbody134').updateDisplayType({displayType:'disabled'});
                  context.form.getField('custbody135').updateDisplayType({displayType:'normal'});
                  context.form.getField('custbody135').updateDisplayType({displayType:'disabled'});
              }

              var edith  = objRecord.getText({fieldId: 'custbody134'});
       		  log.debug('edith: ', edith);

       		  if(userObj != "123405")
              {
                context.form.getField('custbody134').updateDisplayType({displayType:'hidden'});
              }
       		  else
              {
                // if(edith == "F")
                  context.form.getField('custbody134').updateDisplayType({displayType:'normal'});

                  context.form.getField('custbody132').updateDisplayType({displayType:'normal'});
                  context.form.getField('custbody132').updateDisplayType({displayType:'disabled'});
                  context.form.getField('custbody133').updateDisplayType({displayType:'normal'});
                  context.form.getField('custbody133').updateDisplayType({displayType:'disabled'});
                  context.form.getField('custbody135').updateDisplayType({displayType:'normal'});
                  context.form.getField('custbody135').updateDisplayType({displayType:'disabled'});
              }

              var gabriela  = objRecord.getText({fieldId: 'custbody135'});
       		  log.debug('gabriela: ', gabriela);

       		  if(userObj != "975540")
              {
                context.form.getField('custbody135').updateDisplayType({displayType:'hidden'});
              }
       		  else
              {
                // if(gabriela == "F")
                  context.form.getField('custbody135').updateDisplayType({displayType:'normal'});

                  context.form.getField('custbody132').updateDisplayType({displayType:'normal'});
                  context.form.getField('custbody132').updateDisplayType({displayType:'disabled'});
                  context.form.getField('custbody133').updateDisplayType({displayType:'normal'});
                  context.form.getField('custbody133').updateDisplayType({displayType:'disabled'});
                  context.form.getField('custbody134').updateDisplayType({displayType:'normal'});
                  context.form.getField('custbody134').updateDisplayType({displayType:'disabled'});
              }

              var segundoNivel  = objRecord.getText({fieldId: 'custbody133'});
       		  log.debug('segundoNivel: ', segundoNivel);
              if(segundoNivel == "F")
              {
                context.form.getField('custbody133').updateDisplayType({displayType:'normal'});
              }
       		  else
              {
                context.form.getField('custbody133').updateDisplayType({displayType:'normal'});
                context.form.getField('custbody133').updateDisplayType({displayType:'disabled'});
              }

           }
        }*/
     }

   }

	function afterSubmit(context)
    {
       if(context.type == "create")
       {
         	//var userObj = runtime.getCurrentUser();
    		// logging for test
            log.debug("title", "ue_ChecksParaAprobarOrdenCompra.js - function afterSubmit(context)");
            var recordId = context.newRecord.id;
            log.debug("recordId: ", recordId);

         	if(recordId != null && recordId != "") // && userObj.id != null && userObj.id != ""
            	redirect.toSuitelet({scriptId: 'customscript1210', deploymentId: 'customdeploy1', parameters:{'recordId':recordId}}); // , userId: userObj.id
       }
	}

    return {
       beforeLoad: beforeLoad,
       afterSubmit: afterSubmit
	};
});