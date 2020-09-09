	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope Public
	*/
	define(['N/url', 'N/currentRecord'], function(url, currentRec) {
      	var recId = null;
        function pageInit(context){
        }

        function onButtonClick_invoice_STO_DO(rnc_Cliente)
        {
          var cuRec = currentRec.get();
          recId = cuRec.id;
          console.log('recId: ' + recId);
          console.log('cuRec.type: ' + cuRec.type);
		  if(recId != null && recId != "" && cuRec.type === "invoice")
          {
            if(rnc_Cliente != null && rnc_Cliente != "")
            {
               console.log('rnc_Cliente: ' + rnc_Cliente);
			   var valURl = url.resolveScript({scriptId: 'customscript1352', deploymentId: 'customdeploy1', params: {invoiceId: recId}});
               window.location.href = valURl;
            }
            else
            {
               alert('Los campos "TIPO DE FACTURA" y "RNC CLIENTE" deben de ir llenos!!');
            }
          }
        }

		return {
    	  pageInit: pageInit,
          onButtonClick_invoice_STO_DO : onButtonClick_invoice_STO_DO
		};
});