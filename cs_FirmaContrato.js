	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope Public
	*/
	define(['N/url','N/record'], function(url,record) {

      function pageInit(context){
      }

      function callSuiteletCon(){
        var recId = document.getElementById('id').value;
        var companyid = document.getElementById('companyid').value;

		var valURl = url.resolveScript({scriptId: 'customscript1049', deploymentId: 'customdeploy1', params: {recordCaseId: recId, compaId: companyid}});
        //console.log('URL suitelet:', valURl);
        window.open("" + valURl + "");
      }
      function callSuiteletConPDF(){
        var recId = document.getElementById('id').value;
        var companyid = document.getElementById('companyid').value;

		var valURl = url.resolveScript({scriptId: 'customscript1050', deploymentId: 'customdeploy1', params: {recordCaseId: recId, compaId: companyid}});
        //console.log('URL suitelet:', valURl);
        window.open("" + valURl + "");
      }

		return {
    	  pageInit: pageInit,
          callSuiteletCon : callSuiteletCon,
          callSuiteletConPDF : callSuiteletConPDF
		};
});