	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope Public
	*/
	define(['N/url','N/record'], function(url,record) {

      function pageInit(context){
      }

      function callSuiteletConPDF(){
        var recId = document.getElementById('id').value;
        var companyid = document.getElementById('companyid').value;

		var valURl = url.resolveScript({scriptId: 'customscript1042', deploymentId: 'customdeploy1', params: {recordCaseId: recId, compaId: companyid}});
        //console.log('URL suitelet:', valURl);
        window.open("" + valURl + "");
      }

		return {
    	  pageInit: pageInit,
          callSuiteletConPDF : callSuiteletConPDF
		};
});