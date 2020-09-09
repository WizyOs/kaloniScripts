	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope Public
	*/
	define(['N/url','N/record'], function(url,record) {

      function pageInit(context){
      }

      function callSuiteletTest(){
        var recId = document.getElementById('id').value;
        var companyid = document.getElementById('companyid').value;

		var valURl = url.resolveScript({scriptId: 'customscript1038', deploymentId: 'customdeploy1', params: {recordCaseId: recId, compaId: companyid}});
        //console.log('URL suitelet:', valURl);
        window.open("" + valURl + "");
      }
      function callSuiteletTestPDF(){
        var recId = document.getElementById('id').value;
        var companyid = document.getElementById('companyid').value;

		var valURl = url.resolveScript({scriptId: 'customscript1039', deploymentId: 'customdeploy1', params: {recordCaseId: recId, compaId: companyid}});
        //console.log('URL suitelet:', valURl);
        window.open("" + valURl + "");
      }

		return {
    	  pageInit: pageInit,
          callSuiteletTest : callSuiteletTest,
          callSuiteletTestPDF : callSuiteletTestPDF
		};
});