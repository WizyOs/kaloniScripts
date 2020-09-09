	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope Public
	*/
	define(['N/url','N/record'], function(url,record) {

      function pageInit(context){
      }

      function callSuiteletComp(){
        var recId = document.getElementById('id').value;
        //alert(recId);
		var valURl = url.resolveScript({scriptId: 'customscript1055', deploymentId: 'customdeploy1', params: {recordCaseId: recId}});
        //console.log('URL suitelet:', valURl);
        window.open("" + valURl + "");
      }

		return {
    	  pageInit: pageInit,
          callSuiteletComp : callSuiteletComp
		};
});