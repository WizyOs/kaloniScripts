	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope SameAccount
	*/
	define(['N/currentRecord', 'N/url'], function(currentRecord, url) {
      function pageInit(context)
      {
      }

      function testFunction()
      {
        var recId = null;
        var currentRec = currentRecord.get();
        //var actValue = currentRec.getValue({fieldId: 'custpage_textfield'});
        if(currentRec.type === "customer")
        {
          recId = document.getElementById('id').value;
          if(recId.length > 0)
          {
            var valURl = url.resolveScript({scriptId: 'customscript1176', deploymentId: 'customdeploy1', params: {recordCustomerId: recId}});
            //window.open("" + valURl + "");
            window.location = valURl;
          }
        }
      }

		return {
      	  pageInit: pageInit,
          testFunction: testFunction
		};
});