	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope SameAccount
	*/
	define(['N/url', 'N/log', 'N/currentRecord'], function(url, log, currentRec) {

      function pageInit(context)
      {
        /*alert(context.mode);
        var btnEdit = document.getElementById("secondaryedit").value;
        //var tranidVal = document.getElementById("id").value;
        console.log(btnEdit);
        alert(btnEdit);
        
		var cuRec = currentRec.get();
        console.log('id1: ' + cuRec.id);
        log.debug('cuRec: ', cuRec);
        if(cuRec.type === "purchaseorder")
        {
          var tranid = currentRec.getValue({fieldId: 'tranid'});
          log.debug('tranid1: ', tranid);
        }*/
      }

      function btnJorgeDiaz(nextAprov)
      {
		redirectRecord('custbody132', nextAprov);
      }

      function btnBrendaMontero(nextAprov)
      {
		redirectRecord('custbody133', nextAprov);
      }

      function btnEdithGuevara(nextAprov)
      {
		redirectRecord('custbody134', nextAprov);
      }

      function btnAlejandraPorras(nextAprov)
      {
		redirectRecord('custbody135', nextAprov);
      }

      /*function btnPatriciaSanchez(nextAprov)
      {
		redirectRecord('custbody137', nextAprov);
      }

      function btnSilviaMata(nextAprov)
      {
		redirectRecord('custbody138', nextAprov);
      }*/

      function btnZulmaAponte(nextAprov)
      {
		redirectRecord('custbody140', nextAprov);
      }

      function btnMichelleAlcantara(nextAprov)
      {
		redirectRecord('custbody139', nextAprov);
      }

      function btnAbrahamFigueroa(nextAprov)
      {
		redirectRecord('custbody141', nextAprov);
      }

      function btnOsvaldoTinoco(nextAprov)
      {
        redirectRecord('custbody153', nextAprov);
      }

      function btnRechazarOrdenC()
      {
        redirectRecord('rechazar');
      }

      function btnJorgeDiaz2(nexApro)
      {
        console.log('nexApro: ' + nexApro);
		//redirectRecord('custbody132');
      }

      function redirectRecord(checkVal, nextAproVal)
      {
        var cuRec = currentRec.get();
        if(cuRec.type === "purchaseorder" && checkVal != "" && checkVal != null)
        {
          var recId = cuRec.id;
          if(recId != null && recId != "")
          {
            var valURl = url.resolveScript({scriptId: 'customscript1210', deploymentId: 'customdeploy1', params: {ordenCompraId: recId, checkId: checkVal, nextAprovador: nextAproVal}});
            window.location.href = valURl;
            //console.log('URL suitelet:', valURl);
            //window.open("" + valURl + "");
          }
        }
      }

		return {
      	  pageInit: pageInit,
          btnJorgeDiaz: btnJorgeDiaz,
          btnBrendaMontero: btnBrendaMontero,
          btnEdithGuevara: btnEdithGuevara,
          btnAlejandraPorras: btnAlejandraPorras,
          //btnPatriciaSanchez: btnPatriciaSanchez,
          //btnSilviaMata: btnSilviaMata,
          btnZulmaAponte: btnZulmaAponte,
          btnMichelleAlcantara: btnMichelleAlcantara,
          btnAbrahamFigueroa: btnAbrahamFigueroa,
          btnOsvaldoTinoco: btnOsvaldoTinoco,
          btnRechazarOrdenC: btnRechazarOrdenC,
          btnJorgeDiaz2:btnJorgeDiaz2
          //fieldChanged: fieldChanged,
		};
});