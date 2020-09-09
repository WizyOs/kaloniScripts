	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope Public
	*/
	define(['N/url', 'N/record'], function(url, reco) {
		var diseno_Img1 = null;
      	var disenoImg2 = null;
        var afterImg1 = null;
        var afterImg2 = null;
      	var recId = null;
      function pageInit(context){

      }

      function onButtonClick(){
        recId = document.getElementById('id').value;
		console.log('recId: ' + recId);
        var companyid = document.getElementById('companyid').value;
		var valURl = url.resolveScript({scriptId: 'customscript1033', deploymentId: 'customdeploy1', params: {recordCaseId: recId, compaId: companyid}});
        //console.log('URL suitelet:', valURl);
        window.open("" + valURl + "");
      }

      function onButtonClick2(){
        /*var record = currentRecord.get();*/

		recId = document.getElementById('id').value;
		console.log('recId: ' + recId);
        var objRecord = reco.load({type: 'SUPPORTCASE', id: recId, isDynamic: true});
        diseno_Img1 = objRecord.getValue({fieldId: 'custevent82'});
        console.log('diseno_Img1: ' + diseno_Img1);
		disenoImg2 = objRecord.getValue({fieldId: 'custevent83'});
        console.log('disenoImg2: ' + disenoImg2);
        afterImg1 = objRecord.getValue({fieldId: 'custevent78'});
        console.log('afterImg1: ' + afterImg1);
		afterImg2 = objRecord.getValue({fieldId: 'custevent76'});
        console.log('afterImg2: ' + afterImg2);

        if(disenoImg2 == null || disenoImg2 == "")
           disenoImg2 = "1592235";
        if(afterImg1 == null || afterImg1 == "")
           afterImg1 = "1592235";
        if(afterImg2 == null || afterImg2 == "")
           afterImg2 = "1592235";

		var valURl = url.resolveScript({scriptId: 'customscript1008', deploymentId: 'customdeploy1', params: {recordCaseId: recId, disenoImg1: diseno_Img1, disenoImg2: disenoImg2, afterImg1: afterImg1, afterImg2: afterImg2}});
        //console.log('URL suitelet:', valURl);
        window.open("" + valURl + "");
      }

		return {
    	  pageInit: pageInit,
          onButtonClick : onButtonClick,
          onButtonClick2 : onButtonClick2
		};
});