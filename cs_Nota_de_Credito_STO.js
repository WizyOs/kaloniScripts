	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope Public
	*/
	define(['N/url', 'N/currentRecord'], function(url, currentRec) {
      	var recId = null;
        function pageInit(context){
        }

        function onButtonClick_ncSTO()
        {
          var cuRec = currentRec.get();
          recId = cuRec.id;
          //recId = document.getElementById('id').value;
          console.log('recId: ' + recId);
          console.log('cuRec.type: ' + cuRec.type);
		  if(recId != null && recId != "" && cuRec.type === "creditmemo")
          {
            var valURl = url.resolveScript({scriptId: 'customscript1335', deploymentId: 'customdeploy1', params: {creditMemoId: recId}});
            window.location.href = valURl;
            //console.log('URL suitelet:', valURl);
            //window.open("" + valURl + "");
          }
        }

		return {
    	  pageInit: pageInit,
          onButtonClick_ncSTO : onButtonClick_ncSTO
		};
});