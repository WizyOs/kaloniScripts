	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope Public
	*/
	define(['N/url'], function(url) {
      	var recId = null;
        function pageInit(context){
        }

        function onButtonClick_FirmaEmpleado(){
          /*var record = currentRecord.get();*/
          recId = document.getElementById('id').value;
          console.log('recId: ' + recId);

          var valURl = url.resolveScript({scriptId: 'customscript1117', deploymentId: 'customdeploy1', params: {recordEmpId: recId}});
          //console.log('URL suitelet:', valURl);
          window.open("" + valURl + "");
        }

		return {
    	  pageInit: pageInit,
          onButtonClick_FirmaEmpleado : onButtonClick_FirmaEmpleado
		};
});