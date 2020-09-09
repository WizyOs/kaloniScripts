/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/url', 'N/log', 'N/https', 'N/format'],function(record, url, log, https, format){
	var customform = null;
    var first_startdate = null;
    var context_mode = null;

  	function pageInit(context)
	{
      context_mode = context.mode;
      console.log('pageInit context_mode: '+ context_mode);
      /*
      var subject = context.currentRecord.getValue({fieldId: 'title'});
      console.log('subject: '+ subject);
      if(subject != "" && subject != "")
      {
        var newSubject = subject;
        try
        {
          newSubject = newSubject.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function(m){ return m.toUpperCase();});
          console.log('newSubject: '+ newSubject);
          context.currentRecord.setValue({fieldId: 'title', value: newSubject, ignoreFieldChange: true});
        }catch(e){
          log.debug("Exception: ", e);
        }
      }
      customform = context.currentRecord.getValue({fieldId: 'customform'});
      console.log('pageInit customform: '+ customform);
      first_startdate = context.currentRecord.getValue({fieldId: 'startdate'});
      console.log('pageInit first_startdate: '+ first_startdate);
      */
    }

    function fieldChanged(context)
  	{/*
        if(context.fieldId == "company")
        {
           var company = context.currentRecord.getValue({fieldId: 'company'});
           if(company != "" && company != null)
           {
              var response = null;
              try
              {
                var valURl = url.resolveScript({scriptId: 'customscript1083', deploymentId: 'customdeploy1'});
                var headerObj = {name: 'Accept-Language', value: 'en-us', 'Content-type': 'application/json'};
                response = https.request({method: https.Method.POST, url: valURl, body: {companyVal: company}, headers: headerObj});
                log.debug('response: ', response);
              }catch(e){
                log.debug('Exception response: ', response);
                log.debug('Exception: ', e);
              }
			  //context.currentRecord.setValue({fieldId: 'custevent2', value: procedimientos, ignoreFieldChange: true});
           }
        }
		/*
        if(context.fieldId == "custevent197"){
          if(customform == "14"){ // || customform == "148"
             var fechaDeExpedicion = context.currentRecord.getValue({fieldId: 'custevent197'});
             if(fechaDeExpedicion != "" && fechaDeExpedicion != null){
               context.currentRecord.setValue({fieldId: 'startdate', value: fechaDeExpedicion, ignoreFieldChange: true});
             }else if(first_startdate != "" && first_startdate != null){
               context.currentRecord.setValue({fieldId: 'startdate', value: first_startdate, ignoreFieldChange: true});
             }
          }
        }
        */
    }

    function saveRecord(context)
    {
      console.log('saveRecord context_mode: '+ context_mode);
      if(context_mode == "create")
      {
        var title = context.currentRecord.getValue({fieldId: 'title'}); // *BLOQUEO DE AGENDA*
        console.log('title: '+ title);
        if(title != "*BLOQUEO DE AGENDA*")
        {
          var dateNow = new Date(); // 2019-08-19T20:54:22.270Z
          var fecha = format.format({value: dateNow, type: format.Type.DATE}); // 19/8/2019
          var dateNowSplit = fecha.split("/");
          var anio = dateNowSplit[2];
          var mes = dateNowSplit[1];
          var dia = dateNowSplit[0];
          dateNow = dia + "/" + mes + "/" + anio; // '15/08/2019';
          log.debug('dateNow: ', dateNow);

          if(dateNow != "24/12/2019" && dateNow != "25/12/2019" && dateNow != "30/12/2019" && dateNow != "31/12/2019" && dateNow != "23/12/2019") // && dateNow != "23/12/2019"
          {
            var company_New_Event = context.currentRecord.getValue({fieldId: 'company'});
            log.debug('company_New_Event: ', company_New_Event);
            var sucursal_New_Event = context.currentRecord.getValue({fieldId: 'custevent2'});
            log.debug('sucursal_New_Event: ', sucursal_New_Event);

            if(company_New_Event != "" && company_New_Event != null && sucursal_New_Event != "" && sucursal_New_Event != null)
            {
               // Buscar subsidiary de company seleccionada en new event
               var objRecord = record.load({type: 'customer', id: company_New_Event, isDynamic: true});
               var subsidiary_Company = objRecord.getValue({fieldId: 'subsidiary'});
               log.debug('subsidiary_Company: ', subsidiary_Company);

               if(subsidiary_Company != "" && subsidiary_Company != null)
               {
                 var valURl = url.resolveScript({scriptId: 'customscript1083', deploymentId: 'customdeploy1'});
                 var headerObj = {name: 'Accept-Language', value: 'en-us', 'Content-type': 'application/json'};
                 var response = null;
                 try
                 {
                   response = https.request({method: https.Method.POST, url: valURl, body: {subsidiary_Company_par: subsidiary_Company, sucursal_New_Event_par: sucursal_New_Event}, headers: headerObj});
                 }catch(e){
                   log.debug('response: ', response);
                   log.debug('Exception: ', e);
                   return true;
                 }

                 log.debug('response: ', response);

                 if(response.body === 'true')
                 {
                    log.debug('SUCURSAL: ', 'Selección valida!!');
                    return true;
                 }
                 else
                 {
                    alert('La SUCURSAL que seleccionaste no pertenece a la SUBSIDIARY de COMPANY');
                    return false;
                 }
               }
               else
               {
                 alert('Llena el campo SUBSIDIARY en el registro de COMPANY');
                 log.debug('Subsidiary Validation Field: ', 'cs_validateSucursalNewEvents.js - SUBSIDIARY de COMPANY es nulo o vacio!!');
                 return false;
               }

            }
            else
            {
               alert('Llena los campos SUCURSAL y COMPANY');
               log.debug('COMPANY and SUCURSAL Validation Fields: ', 'cs_validateSucursalNewEvents.js - COMPANY o SUCURSAL es nulo o vacio en este nuevo evento!!');
               return false;
            }
          }
        }
      }

      //alert('último return true');
	  return true;
    }

    return{
      pageInit:pageInit,
      fieldChanged:fieldChanged,
      saveRecord:saveRecord
    };
});


      /*
        var timeVal = document.getElementById("time").value; // ui-active-item
        if(timeVal != null && timeVal != "")
        {
          //context.currentRecord.setValue({fieldId: 'custevent100', value: '23:15', ignoreFieldChange: true});
          document.getElementById("custevent100").value = timeVal;
          //console.log('fechaNacimiento: ' + fechaNacimiento);
          //log.debug('fechaNacimiento: ', fechaNacimiento);
          alert('timeVal: ' + timeVal);
          //return false;
        }
        else
        {
          alert('timeVal es nulo: ' + timeVal);
          return false;
        }
      return true;
      */