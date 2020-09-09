	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope Public
	*/
	define(['N/url', 'N/currentRecord'], function(url, currentRec) {
      	var recId = null;
        function pageInit(context){
        }

        function onButtonClick_inventory_transfer()
        {
          var cuRec = currentRec.get();
          recId = cuRec.id;
          //recId = document.getElementById('id').value;
          console.log('recId: ' + recId);
          console.log('cuRec.type: ' + cuRec.type);
		  if(recId != null && recId != "" && cuRec.type === "inventorytransfer")
          {
            var valURl = url.resolveScript({scriptId: 'customscript1402', deploymentId: 'customdeploy1', params: {inventorytransferId: recId}});
            window.location.href = valURl;
            //console.log('URL suitelet:', valURl);
            //window.open("" + valURl + "");
          }
        }

		return {
    	  pageInit: pageInit,
          onButtonClick_inventory_transfer : onButtonClick_inventory_transfer
		};
});