	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope Public
	*/
	define(['N/search','N/record'], function(search,record) {

      function pageInit(context){
        alert('Hi!');
         var savedSearchId = 'customsearch6353';
      var mySearch = savedSearchId.load(savedSearchId);
      var resultset = mySearch.run();
      var results = resultset.getRange(0, 1000);
        for(var i in results){
            var result = results[i];
            for(var k in result.columns){
                log.debug('Result is ' + result.getValue(result.columns[k])); //Access result from here
            }
        }
      }

      function callSuiteletComp(){
        alert('Hi!');
  }

		return {
    	  pageInit: pageInit,
          callSuiteletCon : callSuiteletComp
		};
});