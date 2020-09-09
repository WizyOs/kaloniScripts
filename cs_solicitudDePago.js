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
		var valURl = url.resolveScript({scriptId: 'customscript1260', deploymentId: 'customdeploy1', params: {recId: recId}});
        //console.log('URL suitelet:', valURl);
        window.open("" + valURl + "");
      }

		return {
    	  pageInit: pageInit,
          onButtonClick : onButtonClick
		};
});