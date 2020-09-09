/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

define(['N/record','N/search','N/format'],

function(record,search,format) {

    function _get(context) {
      /*
		var val1 = _get_cierre_cam_Facebook_Mx();
      	var val2 = _get_cierre_cam_Google_Mx();
      	var val3 = _get_cierre_cam_OFF_LINE();
      	var val4 = _get_cierre_cam_Otras();
		var result = val1 + "|" + val2 + "|" + val3 + "|" + val4;
      return result;
      */
    }

    function _post(context) {
      var result = null;
      var obj = JSON.parse(context);
      log.audit('obj: ', obj);

      if (obj.hasOwnProperty("param1"))
      {
         var valparam = obj.param1;
         if (valparam === 'cierres'){
            var val1 = _get_cierre_cam_Facebook_Mx();
            var val2 = _get_cierre_cam_Google_Mx();
            var val3 = _get_cierre_cam_OFF_LINE();
            var val4 = _get_cierre_cam_Otras();
            result = '{"cierre-cam-Facebook-Mx":"' + val1 + '","cierre-cam-Google-Mx":"' + val2 + '","cierre-cam-OFF-LINE":"' + val3 + '","cierre-cam-Otras":"' + val4 + '"}';
        	log.audit('Funciones: ', valparam);
         }
         else if(valparam === 'ventas'){
           var val1 = _get_Venta_Kaloni_succamm_Facebook_Mx();
           var val2 = _get_Venta_Kaloni_succamm_Google_Mx();
           var val3 = _get_Venta_Kaloni_succamm_OFF_LINE();
           var val4 = _get_Venta_Kaloni_succamm_Otras();
           result = '{"Venta_Kaloni_succamm_Facebook_Mx":"' + val1 + '","Venta_Kaloni_succamm_Google_Mx":"' + val2 + '","Venta_Kaloni_succamm_OFF_LINE":"' + val3 + '","Venta_Kaloni_succamm_Otras":"' + val4 + '"}';
           log.audit('Funciones: ', valparam);
         }
      }
      if(result == null)
        log.audit('Response null: ', 'El parametro recibido "param1" no es valido!!');

      return JSON.parse(result);
    }

  	// Saved search = cierre-cam-Google-Mx
  	function _get_cierre_cam_Google_Mx(){
      	var count = 0;
        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5666'
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
              	count++;
            });
        });

      return count;
    }

	// Saved search = cierre-cam-OFF-LINE
  	function _get_cierre_cam_OFF_LINE(){
      	var count = 0;
        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5667'
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
              	count++;
            });
        });

      return count;
    }

	// Saved search = cierre-cam-Otras
  	function _get_cierre_cam_Otras(){
      	var count = 0;
        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5668'
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
              	count++;
            });
        });

      return count;
    }

  	// Saved search = cierre-cam-Facebook-Mx
  	function _get_cierre_cam_Facebook_Mx(){
        //var recObj1 = [];
      	var count = 0;

        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5665'
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
              	count++;
				/*
                // Process the individual result
                var entity = result.getValue({name: 'entity'});
                var location = result.getText({name: 'location'});
              	recObj1.push(entity+'|'+location);
              	*/
            });
        });

      /*try
      {
        count = format.format({value: count, type: format.Type.FLOAT}); // type: format.Type.TEXT
      }catch(err){
        log.audit('ERROR: ', err);
      }*/
      return count;
      //return JSON.stringify(recObj1);
    }

  	// Saved search = Venta Kaloni succamm Facebook Mx
  	function _get_Venta_Kaloni_succamm_Facebook_Mx(){
      	var count = 0;
      	var total = 0;
        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5669'
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
              	//log.audit('jsonObj: ', result);
                var netamountnotax = result.getValue({name: 'netamountnotax'});
                //log.audit('netamountnotax: ', netamountnotax);
              	total += parseFloat(netamountnotax);
              	count++;
            });
        });
	  total = total.toFixed(2);
      return total; // + "|" + count + " registros";
    }

  	// Saved search = Venta Kaloni succamm Google Mx
  	function _get_Venta_Kaloni_succamm_Google_Mx(){
      	var count = 0;
      	var total = 0;
        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5670'
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
                var netamountnotax = result.getValue({name: 'netamountnotax'});
              	total += parseFloat(netamountnotax);
              	count++;
            });
        });
	  total = total.toFixed(2);
      return total; // + "|" + count + " registros";
    }

  	// Saved search = Venta Kaloni succamm OFF-LINE
  	function _get_Venta_Kaloni_succamm_OFF_LINE(){
      	var count = 0;
      	var total = 0;
        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5671'
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
                var netamountnotax = result.getValue({name: 'netamountnotax'});
              	total += parseFloat(netamountnotax);
              	count++;
            });
        });
	  total = total.toFixed(2);
      return total; // + "|" + count + " registros";
    }

  	// Saved search = Venta Kaloni succamm Otras
  	function _get_Venta_Kaloni_succamm_Otras(){
      	var count = 0;
      	var total = 0;
        // Load your search into memory
        var mySearch = search.load({
            id: 'customsearch5672'
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
                var netamountnotax = result.getValue({name: 'netamountnotax'});
              	total += parseFloat(netamountnotax);
              	count++;
            });
        });
	  total = total.toFixed(2);
      return total; // + "|" + count + " registros";
    }

    return {
        get: _get,
      	post: _post
    };

});
