	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope SameAccount
	*/
	define(['N/url', 'N/log', 'N/currentRecord', 'N/record'], function(url, log, currentRec, record) {
      var globalsuc = null;
      function pageInit(context)
      {
        /*var url = window.location.href;//get the URL of the page
        log.debug('url: ', url);
		var params = url.split('&');	//separate url and parameters
        for(var x = 1; x < params.length; x++)	//Iterate each parameters in the URL
        {
             var fieldID = ''; //Placeholder for the field ID

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
             }
        }*/
      }

      function btnJorgeDiaz()
      {
		redirectRecord('custbody132');
      }

      function btnVicenteCortina()
      {
		redirectRecord('custbody133');
      }

      function btnEdithGuevara()
      {
		redirectRecord('custbody134');
      }

      function btnAlejandraPorras()
      {
		redirectRecord('custbody135');
      }

      function btnPatriciaSanchez()
      {
		redirectRecord('custbody137');
      }

      function btnSilviaMata()
      {
		redirectRecord('custbody138');
      }

      function btnZulmaAponte()
      {
		redirectRecord('custbody140');
      }

      function btnMichelleAlcantara()
      {
		redirectRecord('custbody139');
      }

      function btnAbrahamFigueroa()
      {
		redirectRecord('custbody141');
      }

      function btnRechazarOrdenC()
      {
        redirectRecord('rechazar');
      }

      function btnOsvaldoTinoco()
      {
        redirectRecord('custbody153');
      }

      function redirectRecord(checkVal)
      {
        var cuRec = currentRec.get();
        if(cuRec.type === "purchaseorder" && checkVal != "" && checkVal != null)
        {
          var recId = cuRec.id;
          if(recId != null && recId != "")
          {
            var valURl = url.resolveScript({scriptId: 'customscript1210', deploymentId: 'customdeploy1', params: {ordenCompraId: recId, checkId: checkVal}});
            window.location.href = valURl;
            //console.log('URL suitelet:', valURl);
            //window.open("" + valURl + "");
          }
        }
      }

		return {
      	  pageInit: pageInit,
          btnJorgeDiaz: btnJorgeDiaz,
          btnVicenteCortina: btnVicenteCortina,
          btnEdithGuevara: btnEdithGuevara,
          btnAlejandraPorras: btnAlejandraPorras,
          btnPatriciaSanchez: btnPatriciaSanchez,
          btnSilviaMata: btnSilviaMata,
          btnZulmaAponte: btnZulmaAponte,
          btnMichelleAlcantara: btnMichelleAlcantara,
          btnAbrahamFigueroa: btnAbrahamFigueroa,
          btnOsvaldoTinoco: btnOsvaldoTinoco,
          btnRechazarOrdenC: btnRechazarOrdenC
          //fieldChanged: fieldChanged,
		};
});