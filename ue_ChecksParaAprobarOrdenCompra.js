	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
	define(['N/record', 'N/runtime', 'N/redirect', 'N/log', 'N/ui/serverWidget', 'N/url', 'N/email'], function(record, runtime, redirect, log, serverWidget, url, email) {

    function beforeLoad(context)
    {
      if(context.type == "view")
      {
         log.debug("ue_ChecksParaAprobarOrdenCompra.js", "Inicio beforeLoad(context=view)");
         var userObj = runtime.getCurrentUser();
         log.debug('current user: ', userObj);
         log.debug("current user role: ", userObj.role);
         if(userObj.role != "3")
         {
           var currentForm = context.form;
           var html = '<script type="text/javascript">';
           html += 'var myVar = setInterval(myTimer, 1);'; // 10,000 = 1 segundo
           html += 'function myTimer() {';
           html += '  document.getElementById("edit").style.display = "none";';
           html += '  document.getElementById("tdbody_edit").style.display = "none";';
           html += '  document.getElementById("secondaryedit").style.display = "none";';
           html += '  document.getElementById("tdbody_secondaryedit").style.display = "none";';
           html += '}';
           html += '</script>';
           var field = currentForm.addField({
               id: "custpage_alertonview_prepurchase", // Sets an internal ID for the new field
               label: "PRE-Purchase", // Sets a label to the new field
               type: serverWidget.FieldType.INLINEHTML, // Sets a type to the new field using enum
           });
           field.defaultValue = html;
         }
 
         var currentOrdenCompraId = context.newRecord.id;
         log.debug('currentOrdenCompraId ', currentOrdenCompraId);
         var rec = record.load({type: 'purchaseorder', id: currentOrdenCompraId, isDynamic: true});
         var approvalstatus = rec.getValue({fieldId: 'approvalstatus'});
         var employee = rec.getValue({fieldId: 'employee'});
         var subsidiary = rec.getValue({fieldId: 'subsidiary'});
         var total = rec.getValue({fieldId: 'total'});
         var currency = rec.getValue({fieldId: 'currency'});
         log.debug('approvalstatus, employee, subsidiary, total y currency:', approvalstatus +', '+ employee +', '+ subsidiary +', '+ total +' y '+ currency);
 
         if(currency == "2"){
           total = total * 20;
           log.debug('total Dolares Americanos: ', total);
         }else if(currency == "4"){
           total = total * 21;
           log.debug('total Euro: ', total);
         }else if(currency == "8"){
           total = total * 30;
           log.debug('total Libra: ', total);
         }
          log.debug('New total: ', total);
 
         var jORGE_DIAZ_check = context.form.getField({id: 'custbody132'}).defaultValue;
         var mICHELLE_ALCANTARA_check = context.form.getField({id: 'custbody139'}).defaultValue;
         var osvaldo_Tinoco_check = context.form.getField({id: 'custbody153'}).defaultValue;
         var brenda_Montero_check = context.form.getField({id: 'custbody133'}).defaultValue; // vICENTE_CORTINA_check to brenda_Montero_check
         var aBRAHAM_FIGUEROA_check = context.form.getField({id: 'custbody141'}).defaultValue;
         var zULMA_APONTE_check = context.form.getField({id: 'custbody140'}).defaultValue;
         var eDITH_GUEVARA_check = context.form.getField({id: 'custbody134'}).defaultValue;
         var aLEJANDRA_PORRAS_check = context.form.getField({id: 'custbody135'}).defaultValue;
 
           log.debug('Status aprobadores: ', 'jORGE_DIAZ_check: '+ jORGE_DIAZ_check +', mICHELLE_ALCANTARA_check: '+ mICHELLE_ALCANTARA_check +', brenda_Montero_check: '+ brenda_Montero_check +', aBRAHAM_FIGUEROA_check: '+ aBRAHAM_FIGUEROA_check +', osvaldo_Tinoco_check: '+ osvaldo_Tinoco_check +', zULMA_APONTE_check: '+ zULMA_APONTE_check +', eDITH_GUEVARA_check: '+ eDITH_GUEVARA_check +', aLEJANDRA_PORRAS_check: '+ aLEJANDRA_PORRAS_check);
 
        if((subsidiary == "6" || subsidiary == "19") && approvalstatus == "1")
        {
          // Adriana Mejia Sanchez id = 525530 (inactive)
          // stefy id = 62837 (inactive)
          // Andre Schwarz Gutierrez id = 893691
      if(employee == "893691")
          {
            if(total > 0 && total <= 10000 && brenda_Montero_check == "T"){
               log.debug('approvalstatus changed: ', 'Aprobado con limmite de 10,000: ' + total);
               rec.setValue({fieldId: "approvalstatus", value: '2'});
               rec.save({enableSourcing: false, ignoreMandatoryFields: true});
           redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
 
            }else if(total > 10000 && brenda_Montero_check == "T" && aLEJANDRA_PORRAS_check == "T"){
               log.debug('approvalstatus changed: ', 'Aprobación mayor a 10,000: ' + total);
               rec.setValue({fieldId: "approvalstatus", value: '2'});
               rec.save({enableSourcing: false, ignoreMandatoryFields: true});
           redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
 
            }else{
               log.debug('approvalstatus no aprobado 1: ', employee +' - '+ total + ' (employee - total)');
               //redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
            }
          }
 
      // Mercedes Aparicio Martinez id = 736499 (inactive)
          // Maria del Rosario Gonzalez Moreno khg id = 62873
      if(employee == "62873")
          {
            if(total > 0 && aLEJANDRA_PORRAS_check == "T")
            {
               log.debug('approvalstatus changed: ', 'Aprobación mayor a 0: ' + total);
               rec.setValue({fieldId: "approvalstatus", value: '2'});
               rec.save({enableSourcing: false, ignoreMandatoryFields: true});
           redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
 
            }else{
               log.debug('approvalstatus no aprobado 2: ', employee +' - '+ total + ' (employee - total)');
               //redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
            }
          }
 
      // Manuel Alvarado id = 96537
          // Luis Ramirez Hernandez id = 913492
          // Enfermeria Santa Fe KHG id = 62922
          // Enfermeria Satelite id = 525993
          // Enfermeria Monterrey id = 98711
          // Enfermeria CanCun id = 433453
          // Enfermeria Veracruz id = 569497
          // Enfermeria Tijuana id = 866
          // Enfermeria Puebla id = 130416
          // Enfermeria Guadalajara id = 98712
          // Enfermeria Chihuahua id = 265206
      if(employee == "96537" || employee == "913492" || employee == "62922" || employee == "525993" || employee == "98711" || employee == "433453" || employee == "569497" || employee == "866" || employee == "130416" || employee == "98712" || employee == "265206" || employee == "489557")
          {
            if(total > 0 && total <= 19000 && zULMA_APONTE_check == "T")
            {
               log.debug('approvalstatus changed: ', 'Aprobado con limmite de 19,000: ' + total);
               rec.setValue({fieldId: "approvalstatus", value: '2'});
               rec.save({enableSourcing: false, ignoreMandatoryFields: true});
           redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
 
            }else if(total > 19000 && zULMA_APONTE_check == "T" && aLEJANDRA_PORRAS_check == "T"){
               log.debug('approvalstatus changed: ', 'Aprobación mayor a 19,000: ' + total);
               rec.setValue({fieldId: "approvalstatus", value: '2'});
               rec.save({enableSourcing: false, ignoreMandatoryFields: true});
           redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
 
            }else{
               log.debug('approvalstatus no aprobado 3: ', employee +' - '+ total + ' (employee - total)');
               //redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
            }
         }
 
         // Alejandro Avila Juarez id = 1072305 (inactive)
         // Jose Vicente Esquivel Antonio id = 901088
     if(employee == "901088")
         {
            if(total > 0 && total <= 5000 && mICHELLE_ALCANTARA_check == "T")
            {
               log.debug('approvalstatus changed: ', 'Aprobado con limmite de 5,000: ' + total);
               rec.setValue({fieldId: "approvalstatus", value: '2'});
               rec.save({enableSourcing: false, ignoreMandatoryFields: true});
           redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
 
            }else if(total > 5000 && total <= 10000 && mICHELLE_ALCANTARA_check == "T" && aBRAHAM_FIGUEROA_check == "T"){
               log.debug('approvalstatus changed: ', 'Aprobado con limmite de 10,000: ' + total);
               rec.setValue({fieldId: "approvalstatus", value: '2'});
               rec.save({enableSourcing: false, ignoreMandatoryFields: true});
           redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
 
            }else if(total > 10000 && mICHELLE_ALCANTARA_check == "T" && aBRAHAM_FIGUEROA_check == "T" && aLEJANDRA_PORRAS_check == "T"){
               log.debug('approvalstatus changed: ', 'Aprobación mayor a 10,000: ' + total);
               rec.setValue({fieldId: "approvalstatus", value: '2'});
               rec.save({enableSourcing: false, ignoreMandatoryFields: true});
           redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
 
            }else{
               log.debug('approvalstatus no aprobado 4: ', employee +' - '+ total + ' (employee - total)');
               //redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
            }
         }
 
         // Patricia Cabrera Campos id = 851871
     if(employee == "851871")
         {
            if(total > 0 && total <= 5000 && osvaldo_Tinoco_check == "T")
            {
               log.debug('approvalstatus changed: ', 'Aprobado con limmite de 5,000: ' + total);
               rec.setValue({fieldId: "approvalstatus", value: '2'});
               rec.save({enableSourcing: false, ignoreMandatoryFields: true});
           redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
 
            }else if(total > 5000 && total <= 10000 && osvaldo_Tinoco_check == "T" && aBRAHAM_FIGUEROA_check == "T"){
               log.debug('approvalstatus changed: ', 'Aprobado con limmite de 10,000: ' + total);
               rec.setValue({fieldId: "approvalstatus", value: '2'});
               rec.save({enableSourcing: false, ignoreMandatoryFields: true});
           redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
 
            }else if(total > 10000 && osvaldo_Tinoco_check == "T" && aBRAHAM_FIGUEROA_check == "T" && aLEJANDRA_PORRAS_check == "T"){
               log.debug('approvalstatus changed: ', 'Aprobación mayor a 10,000: ' + total);
               rec.setValue({fieldId: "approvalstatus", value: '2'});
               rec.save({enableSourcing: false, ignoreMandatoryFields: true});
           redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
 
            }else{
               log.debug('approvalstatus no aprobado 5: ', employee +' - '+ total + ' (employee - total)');
               //redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
            }
         }
 
          // Jesus Cruz Mata id = 593635
      if(employee == "593635")
          {
            if(total > 0 && aLEJANDRA_PORRAS_check == "T")
            {
               log.debug('approvalstatus changed: ', 'Aprobación mayor a 0: ' + total);
               rec.setValue({fieldId: "approvalstatus", value: '2'});
               rec.save({enableSourcing: false, ignoreMandatoryFields: true});
           redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
 
            }else{
               log.debug('approvalstatus no aprobado 6: ', employee +' - '+ total + ' (employee - total)');
               //redirect.toRecord({type : 'purchaseorder', id : currentOrdenCompraId});
            }
          }
 
        }
 
         context.form.getField('custbody132').updateDisplayType({displayType:'hidden'}); // JORGE DÍAZ (LIMITE 5,000):
         context.form.getField('custbody137').updateDisplayType({displayType:'hidden'}); // PATRICIA SÁNCHEZ (LIMITE 5,000):
         context.form.getField('custbody138').updateDisplayType({displayType:'hidden'}); // SILVIA MATA (LIMITE 5,000):
         context.form.getField('custbody139').updateDisplayType({displayType:'hidden'}); // MICHELLE ALCANTARA (LIMITE 5,000):
         context.form.getField('custbody153').updateDisplayType({displayType:'hidden'}); // Osvaldo Tinoco (LIMITE 5,000):
         context.form.getField('custbody133').updateDisplayType({displayType:'hidden'}); // Brenda Montero (LIMITE 10,000):
         context.form.getField('custbody141').updateDisplayType({displayType:'hidden'}); // ABRAHAM FIGUEROA (LIMITE 10,000):
         context.form.getField('custbody140').updateDisplayType({displayType:'hidden'}); // ZULMA APONTE (LIMITE 19,000):
         context.form.getField('custbody134').updateDisplayType({displayType:'hidden'}); // EDITH GUEVARA (LIMITE 20,000): Miguel Angel Iñiguez Hurtado
         context.form.getField('custbody135').updateDisplayType({displayType:'hidden'}); // ALEJANDRA PORRAS (MAYOR A 50,000):
 
         // Adriana Mejia Sanchez id = 525530 (inactive)
         // Andre Schwarz Gutierrez id = 893691
     if(employee == "893691")
         {
            context.form.getField('custbody133').updateDisplayType({displayType:'normal'}); // Brenda Montero (LIMITE 10,000):
            context.form.getField('custbody135').updateDisplayType({displayType:'normal'}); // ALEJANDRA PORRAS (MAYOR A 50,000):
         }
 
         // Mercedes Aparicio Martinez id = 736499 (inactive)
         // Maria del Rosario Gonzalez Moreno khg id = 62873
     if(employee == "62873")
         {
           context.form.getField('custbody135').updateDisplayType({displayType:'normal'}); // ALEJANDRA PORRAS (MAYOR A 50,000):
         }
 
         // Manuel Alvarado id = 96537
         // Luis Ramirez Hernandez id = 913492
         // Enfermeria Santa Fe KHG id = 62922
         // Enfermeria Satelite id = 525993
         // Enfermeria Monterrey id = 98711
         // Enfermeria CanCun id = 433453
         // Enfermeria Veracruz id = 569497
         // Enfermeria Tijuana id = 866
         // Enfermeria Puebla id = 130416
         // Enfermeria Guadalajara id = 98712
         // Enfermeria Chihuahua id = 265206
     if(employee == "96537" || employee == "913492" || employee == "62922" || employee == "525993" || employee == "98711" || employee == "433453" || employee == "569497" || employee == "866" || employee == "130416" || employee == "98712" || employee == "265206" || employee =="489557")
         {
            context.form.getField('custbody140').updateDisplayType({displayType:'normal'}); // ZULMA APONTE (LIMITE 19,000):
            context.form.getField('custbody135').updateDisplayType({displayType:'normal'}); // ALEJANDRA PORRAS (MAYOR A 50,000):
         }
 
         // Alejandro Avila Juarez id = 1072305 (inactive)
         // Jose Vicente Esquivel Antonio id = 901088
     if(employee == "901088")
         {
            context.form.getField('custbody139').updateDisplayType({displayType:'normal'}); // MICHELLE ALCANTARA (LIMITE 5,000):
            context.form.getField('custbody141').updateDisplayType({displayType:'normal'}); // ABRAHAM FIGUEROA (LIMITE 10,000): Enrique Francia
            context.form.getField('custbody135').updateDisplayType({displayType:'normal'}); // ALEJANDRA PORRAS (MAYOR A 50,000):
         }
 
         // Patricia Cabrera Campos id = 851871
     if(employee == "851871")
         {
            context.form.getField('custbody153').updateDisplayType({displayType:'normal'}); // Osvaldo Tinoco (LIMITE 5,000):
            context.form.getField('custbody141').updateDisplayType({displayType:'normal'}); // ABRAHAM FIGUEROA (LIMITE 10,000): Enrique Francia
            context.form.getField('custbody135').updateDisplayType({displayType:'normal'}); // ALEJANDRA PORRAS (MAYOR A 50,000):
         }
 
         // Jesus Cruz Mata id = 593635
         if(employee == "593635")
         {
           context.form.getField('custbody135').updateDisplayType({displayType:'normal'}); // ALEJANDRA PORRAS (MAYOR A 50,000):
         }
 
         if((subsidiary == "6" || subsidiary == "19") && approvalstatus == "1")
         {
           context.form.clientScriptFileId = 3568431;
 
           // Adriana Mejia Sanchez id = 525530 (inactive)
           // Andre Schwarz Gutierrez id = 893691
           if(employee == "893691")
           {
             // Brenda Montero id = 1106663
             // Gabriela Alejandra Porras Odriozola id = 975540
             if(userObj.id == "1106663" || userObj.id == "975540")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
 
            if(total > 0 && total <= 10000){
          if(userObj.id == "1106663" && brenda_Montero_check == "F")
                  context.form.addButton({id:'custpage_button_btnBrendaMont', label:'Aprobación', functionName:"btnBrendaMontero('1106663|bmontero@kaloni.com|ultAprov')"});
 
             }else if(total > 10000){
          if(userObj.id == "1106663" && brenda_Montero_check == "F")
                  context.form.addButton({id:'custpage_button_btnBrendaMont', label:'Aprobación', functionName:"btnBrendaMontero('975540|aporras@kaloni.com')"});
 
               if(brenda_Montero_check == "T" && userObj.id == "975540" && aLEJANDRA_PORRAS_check == "F")
                 context.form.addButton({id:'custpage_button_btnAlejandraPorras', label:'Aprobación', functionName:"btnAlejandraPorras('975540|aporras@kaloni.com|ultAprov')"});
 
             }
            }
 
           // Mercedes Aparicio Martinez id = 736499 (inactive)
           // Maria del Rosario Gonzalez Moreno khg id = 62873
           if(employee == "62873")
           {
             // Gabriela Alejandra Porras Odriozola id = 975540
             if(userObj.id == "975540")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
 
             if(total > 0)
             {
               if(userObj.id == "975540" && aLEJANDRA_PORRAS_check == "F")
                 context.form.addButton({id:'custpage_button_btnAlejandraPorras', label:'Aprobación', functionName:"btnAlejandraPorras('975540|aporras@kaloni.com|ultAprov')"});
 
             }
           }
 
           // Manuel Alvarado id = 96537
           // Luis Ramirez Hernandez id = 913492
           // Enfermeria Santa Fe KHG id = 62922
           // Enfermeria Satelite id = 525993
           // Enfermeria Monterrey id = 98711
           // Enfermeria CanCun id = 433453
           // Enfermeria Veracruz id = 569497
           // Enfermeria Tijuana id = 866
           // Enfermeria Puebla id = 130416
           // Enfermeria Guadalajara id = 98712
           // Enfermeria Chihuahua id = 265206
           // Fabiola Pineda id = 489557
           if(employee == "96537" || employee == "913492" || employee == "62922" || employee == "525993" || employee == "98711" || employee == "433453" || employee == "569497" || employee == "866" || employee == "130416" || employee == "98712" || employee == "265206" || employee == "489557")
           {
             // Zulma Aponte Casas id = 224852
             // Gabriela Alejandra Porras Odriozola id = 975540
             if(userObj.id == "224852" || userObj.id == "975540")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
 
             if(total > 0 && total <= 19000){
                if(userObj.id == "224852" && zULMA_APONTE_check == "F")
                   context.form.addButton({id:'custpage_button_btnZulmaAponte', label:'Aprobación', functionName:"btnZulmaAponte('224852|zgaponte@kaloni.com|ultAprov')"});
 
             }else if(total > 19000){
                if(userObj.id == "224852" && zULMA_APONTE_check == "F")
                   context.form.addButton({id:'custpage_button_btnZulmaAponte', label:'Aprobación', functionName:"btnZulmaAponte('975540|aporras@kaloni.com')"});
 
                if(zULMA_APONTE_check == "T" && userObj.id == "975540" && aLEJANDRA_PORRAS_check == "F")
                  context.form.addButton({id:'custpage_button_btnAlejandraPorras', label:'Aprobación', functionName:"btnAlejandraPorras('975540|aporras@kaloni.com|ultAprov')"});
 
             }
           }
 
           // Alejandro Avila Juarez id = 1072305 (inactive)
           // Jose Vicente Esquivel Antonio id = 901088
           if(employee == "901088")
           {
             // Michelle Alcantara Avila id = 411945
             // Enrique Francia Campos id = 1034514
             // Gabriela Alejandra Porras Odriozola id = 975540
             if(userObj.id == "411945" || userObj.id == "1034514" || userObj.id == "975540")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
 
             if(total > 0 && total <= 5000) // || userObj.id == "637079" Yo
             {
               if(userObj.id == "411945" && mICHELLE_ALCANTARA_check == "F")
                 context.form.addButton({id:'custpage_button_btnMichelleAlcantara', label:'Aprobación', functionName:"btnMichelleAlcantara('411945|malcantara@kaloni.com|ultAprov')"});
 
             }else if(total > 5000 && total <= 10000){
               if(userObj.id == "411945" && mICHELLE_ALCANTARA_check == "F")
                 context.form.addButton({id:'custpage_button_btnMichelleAlcantara', label:'Aprobación', functionName:"btnMichelleAlcantara('1034514|efrancia@kaloni.com')"});
 
               if(mICHELLE_ALCANTARA_check == "T" && userObj.id == "1034514" && aBRAHAM_FIGUEROA_check == "F")
                 context.form.addButton({id:'custpage_button_btnAbrahamFigueroa', label:'Aprobación', functionName:"btnAbrahamFigueroa('1034514|efrancia@kaloni.com|ultAprov')"});
 
             }else if(total > 10000){
               if(userObj.id == "411945" && mICHELLE_ALCANTARA_check == "F")
                 context.form.addButton({id:'custpage_button_btnMichelleAlcantara', label:'Aprobación', functionName:"btnMichelleAlcantara('1034514|efrancia@kaloni.com')"});
 
               if(mICHELLE_ALCANTARA_check == "T" && userObj.id == "1034514" && aBRAHAM_FIGUEROA_check == "F")
                 context.form.addButton({id:'custpage_button_btnAbrahamFigueroa', label:'Aprobación', functionName:"btnAbrahamFigueroa('975540|aporras@kaloni.com')"});
 
               if(mICHELLE_ALCANTARA_check == "T" && aBRAHAM_FIGUEROA_check == "T" && userObj.id == "975540" && aLEJANDRA_PORRAS_check == "F")
                 context.form.addButton({id:'custpage_button_btnAlejandraPorras', label:'Aprobación', functionName:"btnAlejandraPorras('975540|aporras@kaloni.com|ultAprov')"});
 
             }
           }
 
           // Patricia Cabrera Campos id = 851871
           if(employee == "851871")
           {
             // Osvaldo Tinoco Ramirez id = 97772
             // Enrique Francia Campos id = 1034514
             // Gabriela Alejandra Porras Odriozola id = 975540
             if(userObj.id == "97772" || userObj.id == "1034514" || userObj.id == "975540")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
 
               if(total > 0 && total <= 5000)
               {
                 if(userObj.id == "97772" && osvaldo_Tinoco_check == "F")
                    context.form.addButton({id:'custpage_button_btnOsvaldoTinoco', label:'Aprobación', functionName:"btnOsvaldoTinoco('97772|otinoco@kaloni.com|ultAprov')"});
 
               }else if(total > 5000 && total <= 10000){
                 if(userObj.id == "97772" && osvaldo_Tinoco_check == "F")
                   context.form.addButton({id:'custpage_button_btnOsvaldoTinoco', label:'Aprobación', functionName:"btnOsvaldoTinoco('1034514|efrancia@kaloni.com')"});
 
                 if(osvaldo_Tinoco_check == "T" && userObj.id == "1034514" && aBRAHAM_FIGUEROA_check == "F")
                   context.form.addButton({id:'custpage_button_btnAbrahamFigueroa', label:'Aprobación', functionName:"btnAbrahamFigueroa('1034514|efrancia@kaloni.com|ultAprov')"});
 
               }else if(total > 10000){
                 if(userObj.id == "97772" && osvaldo_Tinoco_check == "F")
                   context.form.addButton({id:'custpage_button_btnOsvaldoTinoco', label:'Aprobación', functionName:"btnOsvaldoTinoco('1034514|efrancia@kaloni.com')"});
 
                 if(osvaldo_Tinoco_check == "T" && userObj.id == "1034514" && aBRAHAM_FIGUEROA_check == "F")
                   context.form.addButton({id:'custpage_button_btnAbrahamFigueroa', label:'Aprobación', functionName:"btnAbrahamFigueroa('975540|aporras@kaloni.com')"});
 
                 if(osvaldo_Tinoco_check == "T" && aBRAHAM_FIGUEROA_check == "T" && userObj.id == "975540" && aLEJANDRA_PORRAS_check == "F")
                   context.form.addButton({id:'custpage_button_btnAlejandraPorras', label:'Aprobación', functionName:"btnAlejandraPorras('975540|aporras@kaloni.com|ultAprov')"});
 
               }
            }
 
           // Jesus Cruz Mata id = 593635
           if(employee == "593635")
           {
             // Gabriela Alejandra Porras Odriozola id = 975540
             if(userObj.id == "975540")
                context.form.addButton({id:'custpage_button_btnRechazarOrdenC', label:'Rechazar', functionName:'btnRechazarOrdenC'});
 
             if(total > 0)
             {
               if(userObj.id == "975540" && aLEJANDRA_PORRAS_check == "F")
                 context.form.addButton({id:'custpage_button_btnAlejandraPorras', label:'Aprobación', functionName:"btnAlejandraPorras('975540|aporras@kaloni.com|ultAprov')"});
 
             }
           }
 
         }
         log.debug("ue_ChecksParaAprobarOrdenCompra.js", "Fin beforeLoad(context=view)");
      }
 
      if(context.type == "edit" || context.type == "create")
      {
         context.form.getField('custbody132').updateDisplayType({displayType:'hidden'}); // JORGE DÍAZ (LIMITE 5,000):
         context.form.getField('custbody137').updateDisplayType({displayType:'hidden'}); // PATRICIA SÁNCHEZ (LIMITE 5,000):
         context.form.getField('custbody138').updateDisplayType({displayType:'hidden'}); // SILVIA MATA (LIMITE 5,000):
         context.form.getField('custbody139').updateDisplayType({displayType:'hidden'}); // MICHELLE ALCANTARA (LIMITE 5,000):
         context.form.getField('custbody153').updateDisplayType({displayType:'hidden'}); // Osvaldo Tinoco (LIMITE 5,000):
         context.form.getField('custbody133').updateDisplayType({displayType:'hidden'}); // Brenda Montero (LIMITE 10,000):
         context.form.getField('custbody141').updateDisplayType({displayType:'hidden'}); // ABRAHAM FIGUEROA (LIMITE 10,000):
         context.form.getField('custbody140').updateDisplayType({displayType:'hidden'}); // ZULMA APONTE (LIMITE 19,000):
         context.form.getField('custbody134').updateDisplayType({displayType:'hidden'}); // EDITH GUEVARA (LIMITE 20,000): Miguel Angel Iñiguez Hurtado
         context.form.getField('custbody135').updateDisplayType({displayType:'hidden'}); // ALEJANDRA PORRAS (MAYOR A 50,000):
      }
 
    }
 
 
   function afterSubmit(context)
     {
        if(context.type == "create" || context.type == "edit")
        {
             log.debug("ue_ChecksParaAprobarOrdenCompra.js", "Inicio afterSubmit(context=create)");
             var recordId = context.newRecord.id;
             log.debug("recordId: ", recordId);
 
            /*var paramF = recordId + "_" + contype_Val;
            log.debug("paramF: ", paramF);
            if(recordId != null && recordId != "")
                redirect.toSuitelet({scriptId: 'customscript1210', deploymentId: 'customdeploy1', parameters:{'recordId':paramF}});*/
 
             if(recordId != "" && recordId != null)
             {
                 var rec = record.load({type: 'purchaseorder', id: recordId, isDynamic: true});
                 var oC = rec.getValue({fieldId: 'tranid'});
                 var approvalstatus = rec.getValue({fieldId: 'approvalstatus'});
                 var employee = rec.getValue({fieldId: 'employee'});
                 var subsidiary = rec.getValue({fieldId: 'subsidiary'});
                 var total = rec.getValue({fieldId: 'total'});
                 log.debug('oC, approvalstatus, employee, subsidiary y total: ', oC +", "+ approvalstatus +", "+ employee +", "+ subsidiary +", "+ total);
                 var userObj = runtime.getCurrentUser();
                 log.debug("current user: ", userObj);
 
                 if((subsidiary == "6" || subsidiary == "19") && approvalstatus == "1" && total == 0){
                   rec.setValue({fieldId: 'approvalstatus', value: '2'});
                   log.debug('approvalstatus: ', 'Aprobado por default');
                   rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                 }else if((subsidiary == "6" || subsidiary == "19") && approvalstatus == "1" && context.type == "create"){
                   var urlCase = url.resolveRecord({recordType: 'purchaseorder', recordId: recordId, isEditMode: false});
                   //log.debug('urlCase test: ', urlCase); // /app/accounting/transactions/purchord.nl?id=645449&compid=3559763
                   urlCase = "https://3559763.app.netsuite.com" + urlCase;
                   /*email.send({author: 103204,recipients:'acolin@kaloni.com',subject:'Nueva Orden de Compra!!',body:'Nueva orden de compra para aprobación: <p><a href="'+urlCase+'">'+oC+'</a></p> \n'});*/
 
                   var band = false;
                   // id 637079 Alberto Colin && userObj.id != "637079"
                   // Adriana Mejia Sanchez id = 525530 (inactive)
                   // Andre Schwarz Gutierrez id = 893691
                   if(employee == "893691")
                   {
                       if(total > 0) // && total <= 5000
                       {
                         band = true;
                         rec.setValue({fieldId: 'nextapprover', value: '1106663'}); // Brenda Montero id = 1106663
                         email.send({
                             author: 103204,
                             recipients:'bmontero@kaloni.com,',
                             subject:'Nueva Orden de Compra!!',
                             body:'Nueva orden de compra para aprobación: <p><a href="'+urlCase+'">'+oC+'</a></p> \n'
                         });
                       }
                    }
 
                   // Mercedes Aparicio Martinez id = 736499 (inactive)
                   // Maria del Rosario Gonzalez Moreno khg id = 62873
                   if(employee == "62873")
                   {
                     if(total > 0)
                     {
                         band = true;
                         rec.setValue({fieldId: 'nextapprover', value: '975540'}); // Gabriela Alejandra Porras Odriozola id = 975540
                         email.send({
                             author: 103204,
                             recipients:'aporras@kaloni.com',
                             subject:'Nueva Orden de Compra!!',
                             body:'Nueva orden de compra para aprobación: <p><a href="'+urlCase+'">'+oC+'</a></p> \n'
                         });
                     }
                   }
 
                   // Jesus Cruz Mata id = 593635
                   if(employee == "593635")
                   {
                     if(total > 0)
                     {
                         band = true;
                         rec.setValue({fieldId: 'nextapprover', value: '975540'}); // Gabriela Alejandra Porras Odriozola id = 975540
                         email.send({
                             author: 103204,
                             recipients:'aporras@kaloni.com',
                             subject:'Nueva Orden de Compra!!',
                             body:'Nueva orden de compra para aprobación: <p><a href="'+urlCase+'">'+oC+'</a></p> \n'
                         });
                     }
                   }
 
                 // Manuel Alvarado id = 96537
                 // Luis Ramirez Hernandez id = 913492
                 // Enfermeria Santa Fe KHG id = 62922
                 // Enfermeria Satelite id = 525993
                 // Enfermeria Monterrey id = 98711
                 // Enfermeria CanCun id = 433453
                 // Enfermeria Veracruz id = 569497
                 // Enfermeria Tijuana id = 866
                 // Enfermeria Puebla id = 130416
                 // Enfermeria Guadalajara id = 98712
                 // Enfermeria Chihuahua id = 265206
                 if(employee == "96537" || employee == "913492" || employee == "62922" || employee == "525993" || employee == "98711" || employee == "433453" || employee == "569497" || employee == "866" || employee == "130416" || employee == "98712" || employee == "265206" || employee =="489557")
                   {
                     if(total > 0)
                     {
                         band = true;
                         rec.setValue({fieldId: 'nextapprover', value: '224852'}); // Zulma Aponte Casas id = 224852
                         email.send({
                             author: 103204,
                             recipients:'zgaponte@kaloni.com',
                             subject:'Nueva Orden de Compra!!',
                             body:'Nueva orden de compra para aprobación: <p><a href="'+urlCase+'">'+oC+'</a></p> \n'
                         });
                     }
                   }
 
                   // Alejandro Avila Juarez id = 1072305 (inactive)
                   // Jose Vicente Esquivel Antonio id = 901088
                   if(employee == "901088")
                   {
                     if(total > 0)
                     {
                         band = true;
                         rec.setValue({fieldId: 'nextapprover', value: '411945'}); // Michelle Alcantara Avila id = 411945
                         email.send({
                             author: 103204,
                             recipients:'malcantara@kaloni.com',
                             subject:'Nueva Orden de Compra!!',
                             body:'Nueva orden de compra para aprobación: <p><a href="'+urlCase+'">'+oC+'</a></p> \n'
                         });
                     }
                   }
 
                   // Patricia Cabrera Campos id = 851871
                   if(employee == "851871")
                   {
                       if(total > 0)
                       {
                           band = true;
                           rec.setValue({fieldId: 'nextapprover', value: '97772'}); // Osvaldo Tinoco Ramirez id = 97772
                           email.send({
                               author: 103204,
                               recipients:'otinoco@kaloni.com',
                               subject:'Nueva Orden de Compra!!',
                               body:'Nueva orden de compra para aprobación: <p><a href="'+urlCase+'">'+oC+'</a></p> \n'
                           });
                       }
                    }
 
                   if(band){
                     rec.save({enableSourcing: false, ignoreMandatoryFields: true});
                   }
                 }
         redirect.toRecord({type : 'purchaseorder', id : recordId});
             }
            log.debug("ue_ChecksParaAprobarOrdenCompra.js", "Fin afterSubmit(context=create)");
        }
   }
 
     return {
        beforeLoad: beforeLoad,
        afterSubmit: afterSubmit
   };
 });
 