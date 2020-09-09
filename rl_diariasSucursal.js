/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

define(['N/record','N/search','N/format'],

function(record,search,format) {

    function _get(context) {
    }

    function _post(context) {
      var obj = JSON.parse(context);
      log.audit('obj: ', obj);
      var val1 = {};

      if (obj.hasOwnProperty("param1"))
      {
         var valparam = obj.param1;
         if (valparam === 'agendadiariosucursal')
         {
            val1 = _get_agendadiarioEjecutivo();
           	//log.audit('val1: ', val1);
         }
         /*else if (valparam === 'agendamensualcampana'){
            val1 = _get_agendamensualcampa();
           	//log.audit('val1: ', val1);
         }*/
      }

      return val1;
    }

  	// Saved search = agendadiariosucursal
  	function _get_agendadiarioEjecutivo(){
      	var count = 0;
        var ejecutivosArray = [];
        var counts = {};

        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5940'
        });

        // Run paged version of search with 1000 results per page
        var myPagedData = mySearch.runPaged({
            "pageSize": 1000
        });

        // Iterate over each page
        myPagedData.pageRanges.forEach(function(pageRange){
            // Fetch the results on the current page
            var myPage = myPagedData.fetch({index: pageRange.index});
            // Iterate over the list of results on the current page
            myPage.data.forEach(function(result){
                if(count < 1)
              	log.audit('jsonObj result: ', result);
                /*
              	var parseJSONval = JSON.parse(JSON.stringify(result));
				var val_event_custevent2 = parseJSONval.values["event.custevent2"][0].value;
                var text_event_custevent2 = parseJSONval.values["event.custevent2"][0].text;
              	ejecutivosArray.push(val_event_custevent2 + "|" + text_event_custevent2);*/
              	count++;
            });
        });

      ejecutivosArray.forEach(function(i) { counts[i] = (counts[i]||0) + 1;});
      counts.total = count;
      return counts;
    }

  	// Saved search = agendamensualsucursal
  	function _get_agendamensualcampa(){
      	var count = 0;
        var ejecutivosArray = [];
        var counts = {};

        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5939'
        });

        // Run paged version of search with 1000 results per page
        var myPagedData = mySearch.runPaged({
            "pageSize": 1000
        });

        // Iterate over each page
        myPagedData.pageRanges.forEach(function(pageRange){
            // Fetch the results on the current page
            var myPage = myPagedData.fetch({index: pageRange.index});
            // Iterate over the list of results on the current page
            myPage.data.forEach(function(result){
              	//log.audit('jsonObj result: ', result);
              	var val_leadsource = result.getValue({name: 'leadsource'});
              	var text_leadsource = result.getText({name: 'leadsource'});
              	ejecutivosArray.push(val_leadsource + "|" + text_leadsource);
              	count++;
            });
        });
      ejecutivosArray.forEach(function(i) { counts[i] = (counts[i]||0) + 1;});
      counts.total = count;
      return counts;
    }

  	// Saved search = efectivamensualsucursal
  	function _get_efectivamensualsucursal(){
      	var count = 0;
        var ejecutivosArray = [];
        var counts = {};

        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5941'
        });

        // Run paged version of search with 1000 results per page
        var myPagedData = mySearch.runPaged({
            "pageSize": 1000
        });

        // Iterate over each page
        myPagedData.pageRanges.forEach(function(pageRange){
            // Fetch the results on the current page
            var myPage = myPagedData.fetch({index: pageRange.index});
            // Iterate over the list of results on the current page
            myPage.data.forEach(function(result){
              	//log.audit('jsonObj result: ', result);
              	var parseJSONval = JSON.parse(JSON.stringify(result));
				var val_event_custevent2 = parseJSONval.values["event.custevent2"][0].value;
                var text_event_custevent2 = parseJSONval.values["event.custevent2"][0].text;
              	ejecutivosArray.push(val_event_custevent2 + "|" + text_event_custevent2);
              	count++;
            });
        });
      ejecutivosArray.forEach(function(i) { counts[i] = (counts[i]||0) + 1;});
      counts.total = count;
      return counts;
    }

  	// Saved search = efectivamensualsucursal
  	function _get_efectivamensualcampa(){
      	var count = 0;
        var ejecutivosArray = [];
        var counts = {};

        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5941'
        });

        // Run paged version of search with 1000 results per page
        var myPagedData = mySearch.runPaged({
            "pageSize": 1000
        });

        // Iterate over each page
        myPagedData.pageRanges.forEach(function(pageRange){
            // Fetch the results on the current page
            var myPage = myPagedData.fetch({index: pageRange.index});
            // Iterate over the list of results on the current page
            myPage.data.forEach(function(result){
              	//log.audit('jsonObj result: ', result);
              	var val_leadsource = result.getValue({name: 'leadsource'});
              	var text_leadsource = result.getText({name: 'leadsource'});
              	ejecutivosArray.push(val_leadsource + "|" + text_leadsource);
              	count++;
            });
        });
      ejecutivosArray.forEach(function(i) { counts[i] = (counts[i]||0) + 1;});
      counts.total = count;
      return counts;
    }

  	// Saved search = leadmensualsucursal
  	function _get_leadmensualsucursal(){
      	var count = 0;
        var ejecutivosArray = [];
        var counts = {};

        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5937'
        });

        // Run paged version of search with 1000 results per page
        var myPagedData = mySearch.runPaged({
            "pageSize": 1000
        });

        // Iterate over each page
        myPagedData.pageRanges.forEach(function(pageRange){
            // Fetch the results on the current page
            var myPage = myPagedData.fetch({index: pageRange.index});
            // Iterate over the list of results on the current page
            myPage.data.forEach(function(result){
              	//log.audit('jsonObj result: ', result);
              	var val_custentity25 = result.getValue({name: 'custentity25'});
              	var text_custentity25 = result.getText({name: 'custentity25'});
              	ejecutivosArray.push(val_custentity25 + "|" + text_custentity25);
              	count++;
            });
        });
      ejecutivosArray.forEach(function(i) { counts[i] = (counts[i]||0) + 1;});
      counts.total = count;
      return counts;
    }

  	// Saved search = leadmensualsucursal
  	function _get_leadmensualcampa(){
      	var count = 0;
        var ejecutivosArray = [];
        var counts = {};

        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5937'
        });

        // Run paged version of search with 1000 results per page
        var myPagedData = mySearch.runPaged({
            "pageSize": 1000
        });

        // Iterate over each page
        myPagedData.pageRanges.forEach(function(pageRange){
            // Fetch the results on the current page
            var myPage = myPagedData.fetch({index: pageRange.index});
            // Iterate over the list of results on the current page
            myPage.data.forEach(function(result){
              	//log.audit('jsonObj result: ', result);
              	var val_leadsource = result.getValue({name: 'leadsource'});
              	var text_leadsource = result.getText({name: 'leadsource'});
              	ejecutivosArray.push(val_leadsource + "|" + text_leadsource);
              	count++;
            });
        });
      ejecutivosArray.forEach(function(i) { counts[i] = (counts[i]||0) + 1;});
      counts.total = count;
      return counts;
    }

    return {
        get: _get,
      	post: _post
    };

});
