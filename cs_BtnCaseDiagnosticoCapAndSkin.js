	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope SameAccount
	*/
	define(['N/url', 'N/log', 'N/currentRecord', 'N/record'], function(url, log, currentRec, record) {
      var globalsuc = null;
      function pageInit(context)
      {
        var url = window.location.href;//get the URL of the page
        log.debug('url: ', url);
		var params = url.split('&');	//separate url and parameters
        for(var x = 1; x < params.length; x++)	//Iterate each parameters in the URL
        {
             var key_Value_Pair= params[x].split("=");//Split the key value pair

             if(key_Value_Pair[1])	//Check if the key has a corresponding value
             {
               	if(key_Value_Pair[0] == "suc")
                  context.currentRecord.setValue({fieldId: 'custevent2', value: key_Value_Pair[1], ignoreFieldChange: true});
                if(key_Value_Pair[0] == "medio")
                  context.currentRecord.setValue({fieldId: 'custevent208', value: key_Value_Pair[1], ignoreFieldChange: true});
               if(key_Value_Pair[0] == "fechaNa"){
                 log.debug('date D/M/YYYY: ', key_Value_Pair[1]);
                 context.currentRecord.setValue({fieldId: 'custevent331', value: key_Value_Pair[1], ignoreFieldChange: true});
               }
               if(key_Value_Pair[0] == "edad")
                  context.currentRecord.setValue({fieldId: 'custevent332', value: key_Value_Pair[1], ignoreFieldChange: true});
               if(key_Value_Pair[0] == "sexo")
                  context.currentRecord.setValue({fieldId: 'custevent634', value: key_Value_Pair[1], ignoreFieldChange: true});
               if(key_Value_Pair[0] == "edoCivil")
                  context.currentRecord.setValue({fieldId: 'custevent206', value: key_Value_Pair[1], ignoreFieldChange: true});
               if(key_Value_Pair[0] == "ocup")
                  context.currentRecord.setValue({fieldId: 'custevent207', value: key_Value_Pair[1], ignoreFieldChange: true});
               if(key_Value_Pair[0] == "tx"){
                 console.log('newTX: ' + key_Value_Pair[1]);
                 var aux = key_Value_Pair[1];
                 try{ aux = aux.replace(/,/g, ' '); }catch(e){log.debug("Exception: ", e);}
                 context.currentRecord.setValue({fieldId: 'title', value: aux, ignoreFieldChange: true});
               }
             }
        }
      }

	 /*function fieldChanged(context)
      {
        log.debug('fieldChanged globalsuc: ', globalsuc);
        if(context.fieldId != "custevent2")
        {
          //var phone = context.currentRecord.getValue({fieldId: 'custevent2'});
          context.currentRecord.setValue({fieldId: 'custevent2', value: globalsuc, ignoreFieldChange: true});
        }
      }*/

      function diagCap()
      {
        getUrlCase("135");
      }

      function diagSkin()
      {
        getUrlCase("138");
      }

      function btnSkin()
      {
        getUrlCase("147");
      }

      function btnBody()
      {
        getUrlCase("33"); // 138
      }

      function btnQx()
      {
        getUrlCase("148");
      }

      function diagCap2()
      {
        getUrlCase("14");
      }

      function getUrlCase(idForm){
        var companyid = null;
        var cuRec = currentRec.get();
        if(cuRec.type === "supportcase")
        {
          var recId = document.getElementById('id').value;
          if(recId.length > 0)
          {
            var rec = record.load({type: 'supportcase', id: recId});
            log.debug('rec: ', rec);

            var custevent2Val = rec.getValue({fieldId: 'custevent2'}); // sucursal
            console.log('suc: ' + custevent2Val);
            var custevent208Val = rec.getValue({fieldId: 'custevent208'}); // medio
            console.log('medio: ' + custevent208Val);
            var custevent332Val = rec.getValue({fieldId: 'custevent332'}); // edad
            console.log('edad: ' + custevent332Val);
            var custevent634Val = rec.getValue({fieldId: 'custevent634'}); // sexo
            console.log('sexo: ' + custevent634Val);
            var custevent206Val = rec.getValue({fieldId: 'custevent206'}); // edoCivil
            console.log('edoCivil: ' + custevent206Val);
            var custevent207Val = rec.getValue({fieldId: 'custevent207'}); // ocupación
            console.log('ocup: ' + custevent207Val);
            var custevent1066Val = rec.getText({fieldId: 'custevent1066'}); // TX = custevent280, SERVICIOS SKIN&BODY = custevent1066
            console.log('SERVICIOS SKIN&BODY: ' + custevent1066Val);
            
            var custevent284Val = rec.getValue({fieldId: 'custevent284'}); // MOTIVO DE CONSULTA
            if(custevent284Val == "5")
              idForm = "151";

            companyid = document.getElementById('companyid').value;
            console.log('companyid test: ' + companyid);
            var params = "";

            if(companyid.length > 0 && companyid > 0 && companyid != null && companyid != "")
            {
              params += "default=" + companyid + "&l=T&cf=" + idForm;

              if(custevent332Val != null && custevent332Val != "") // custevent332Val.length > 0 && custevent332Val > 0 &&
                params += "&edad="+custevent332Val;

              if(custevent634Val.length > 0 && custevent634Val > 0 && custevent634Val != null && custevent634Val != "")
                params += "&sexo="+custevent634Val;

              if(custevent206Val.length > 0 && custevent206Val > 0 && custevent206Val != null && custevent206Val != "")
                params += "&edoCivil="+custevent206Val;

              if(custevent207Val.length > 0 && custevent207Val > 0 && custevent207Val != null && custevent207Val != "")
                params += "&ocup="+custevent207Val;

              if(custevent2Val.length > 0 && custevent2Val > 0 && custevent2Val != null && custevent2Val != "")
                params += "&suc="+custevent2Val;

              if(custevent208Val.length > 0 && custevent208Val > 0 && custevent208Val != null && custevent208Val != "")
                params += "&medio="+custevent208Val;

              if(custevent1066Val != null && custevent1066Val != "" && idForm == "148")
                params += "&tx="+custevent1066Val;

              window.open("/app/crm/support/supportcase.nl?"+ params +"&recId="+ recId +"&whence=");
/*window.open("/app/crm/support/supportcase.nl?default="+ companyid +"&l=T&cf=147&edad="+custevent332Val+"&sexo="+custevent634Val+"&edoCivil="+custevent206Val+"&ocup="+custevent207Val+"&suc="+custevent2Val+"&medio="+custevent208Val+"&whence=");*/
            }
          }
        }
      }

		return {
      	  pageInit: pageInit,
          diagCap: diagCap,
          diagCap2: diagCap2,
          diagSkin: diagSkin,
          btnSkin: btnSkin,
          btnBody: btnBody,
          btnQx: btnQx
          //fieldChanged: fieldChanged,
		};
});