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
         if (valparam === 'Ejecutivo_lead_m')
         {
            val1 = _get_Ejecutivo_lead_m();
           	log.audit('val1: ', val1);
         }
         else if (valparam === 'Ejecutivo_agenda_m'){
            val1 = _get_Ejecutivo_agenda_m();
           	log.audit('val1: ', val1);
         }
         else if (valparam === 'Ejecutivo_efectiva_m'){
            val1 = _get_Ejecutivo_efectiva_m();
           	log.audit('val1: ', val1);
         }
		 else if (valparam === 'Ejecutivo_no_show_m'){
            val1 = _get_Ejecutivo_no_show_m();
           	log.audit('val1: ', val1);
         }
      }

      return val1;
    }

  	// Saved search = Ejecutivo_lead_m
  	function _get_Ejecutivo_lead_m(){
      	var count = 0;
        var ejecutivosArray = [];
        var counts = {};

        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5704'
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
              	var val_ejecutivoKC = result.getValue({name: 'custentity143'});
                var text_ejecutivoKC = result.getText({name: 'custentity143'});
              	ejecutivosArray.push(val_ejecutivoKC+"|"+text_ejecutivoKC);
              	count++;
            });
        });

      ejecutivosArray.forEach(function(i) { counts[i] = (counts[i]||0) + 1;});
      counts.total = count;
      return counts;
    }

  	// Saved search = Ejecutivo_agenda_m
  	function _get_Ejecutivo_agenda_m(){
      	var count = 0;
        var ejecutivosArray = [];
        var counts = {};

        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5705'
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
				var val_event_organizer = parseJSONval.values["event.organizer"][0].value;
                var text_event_organizer = parseJSONval.values["event.organizer"][0].text;
              	ejecutivosArray.push(val_event_organizer + "|" + text_event_organizer);
              	count++;
            });
        });
      ejecutivosArray.forEach(function(i) { counts[i] = (counts[i]||0) + 1;});
      counts.total = count;
      return counts;
    }

  	// Saved search = Ejecutivo_efectiva_m
  	function _get_Ejecutivo_efectiva_m(){
      	var count = 0;
        var ejecutivosArray = [];
        var counts = {};

        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5707'
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
				var val_event_organizer = parseJSONval.values["event.organizer"][0].value;
                var text_event_organizer = parseJSONval.values["event.organizer"][0].text;
              	ejecutivosArray.push(val_event_organizer + "|" + text_event_organizer);
              	count++;
            });
        });
      ejecutivosArray.forEach(function(i) { counts[i] = (counts[i]||0) + 1;});
      counts.total = count;
      return counts;
    }

  	// Saved search = Ejecutivo_no_show_m
  	function _get_Ejecutivo_no_show_m(){
      	var count = 0;
        var ejecutivosArray = [];
        var counts = {};

        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5923'
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
				var val_event_organizer = parseJSONval.values["event.organizer"][0].value;
                var text_event_organizer = parseJSONval.values["event.organizer"][0].text;
              	ejecutivosArray.push(val_event_organizer + "|" + text_event_organizer);
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
