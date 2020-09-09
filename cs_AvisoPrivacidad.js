	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope Public
	*/
	define(['N/record', 'N/url', 'N/https'], function(record, url, https) {

      function pageInit(context){
      }

      function onButtonClick(){
        var recId = document.getElementById('id').value;
        var companyid = document.getElementById('companyid').value;
		var valURl = url.resolveScript({scriptId: 'customscript1031', deploymentId: 'customdeploy1', params: {recordCaseId: recId, compaId: companyid}});
        //console.log('URL suitelet:', valURl);
        window.open("" + valURl + "");
      }

		return {
    	  pageInit: pageInit,
          onButtonClick : onButtonClick
		};
});