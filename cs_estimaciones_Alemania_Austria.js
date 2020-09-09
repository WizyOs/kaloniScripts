	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope Public
	*/
	define(['N/url', 'N/currentRecord'], function(url, currentRec) {
      	var recId = null;
        function pageInit(context){
        }

        function onButtonClick_estimateAlemania()
        {
          var cuRec = currentRec.get();
          recId = cuRec.id;
          //recId = document.getElementById('id').value;
          console.log('recId: ' + recId);
          console.log('cuRec.type: ' + cuRec.type);
		  if(recId != null && recId != "" && cuRec.type === "estimate")
          {
            var valURl = url.resolveScript({scriptId: 'customscript1342', deploymentId: 'customdeploy1', params: {estimateId: recId}});
            window.location.href = valURl;
            //console.log('URL suitelet:', valURl);
            //window.open("" + valURl + "");
          }
        }

		return {
    	  pageInit: pageInit,
          onButtonClick_estimateAlemania : onButtonClick_estimateAlemania
		};
});