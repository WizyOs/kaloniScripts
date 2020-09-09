function getCamp(){
    var newArray = [];
  	var lead_cam = get_lead_cam();
    newArray.push(lead_cam);
  	//var agendada_cam = get_agendada_cam();
    //newArray.push(agendada_cam);
  	return newArray;
}

function get_lead_cam(){
  /* Load a summary search */
  var primaryArray = [];
  var search = nlapiLoadSearch('Customer', 5631);
  var resultSet = search.runSearch();
  var results = resultSet.getResults(0, 1000);
  for ( var i = 0; results != null && i < results.length; i++ ){
       var searchresult = results[i];
       var jsonString = JSON.stringify(searchresult);
       nlapiLogExecution('DEBUG', 'jsonString:  ', jsonString);
       var obj = JSON.parse(jsonString);
	   var val = obj.columns.leadsource.name;
	   nlapiLogExecution('DEBUG', 'val:  ', val);
       primaryArray.push(val);

 	   /*var columns = searchresult.getAllColumns();
        var columns0 = searchresult.getValue(columns[0]);
        nlapiLogExecution('DEBUG', 'columns0: ', columns0);
    	cont++;*/
	}

  var results1 = resultSet.getResults(1000, 2000);
  for ( var i = 0; results1 != null && i < results1.length; i++ ){
       var searchresult = results1[i];
       var jsonString = JSON.stringify(searchresult);
       nlapiLogExecution('DEBUG', 'jsonString:  ', jsonString);
       var obj = JSON.parse(jsonString);
	   var val = obj.columns.leadsource.name;
	   nlapiLogExecution('DEBUG', 'val:  ', val);
       primaryArray.push(val);
	}

  var results2 = resultSet.getResults(2000, 3000);
  for ( var i = 0; results2 != null && i < results2.length; i++ ){
       var searchresult = results2[i];
       var jsonString = JSON.stringify(searchresult);
       nlapiLogExecution('DEBUG', 'jsonString:  ', jsonString);
       var obj = JSON.parse(jsonString);
	   var val = obj.columns.leadsource.name;
	   nlapiLogExecution('DEBUG', 'val:  ', val);
       primaryArray.push(val);
	}

  var results3 = resultSet.getResults(3000, 4000);
  for ( var i = 0; results3 != null && i < results3.length; i++ ){
       var searchresult = results3[i];
       var jsonString = JSON.stringify(searchresult);
       nlapiLogExecution('DEBUG', 'jsonString:  ', jsonString);
       var obj = JSON.parse(jsonString);
	   var val = obj.columns.leadsource.name;
	   nlapiLogExecution('DEBUG', 'val:  ', val);
       primaryArray.push(val);
	}

  var result = getCountvalues(primaryArray);
  return result; // retorna un array
}

function getCamp1(){ //get_agendada_cam
  /* Load a summary search */
  var primaryArray = [];
  var search = nlapiLoadSearch('Customer', 5637);
  var resultSet = search.runSearch();
  var results = resultSet.getResults(0, 1000);
  for ( var i = 0; results != null && i < results.length; i++ ){
       var searchresult = results[i];
       var jsonString = JSON.stringify(searchresult);
       nlapiLogExecution('DEBUG', 'jsonString:  ', jsonString);
       return jsonString;
       var obj = JSON.parse(jsonString);
	   /*var val = obj.columns.leadsource.name;
	   nlapiLogExecution('DEBUG', 'val:  ', val);
       primaryArray.push(val);*/
	}

  var result = getCountvalues(primaryArray);
  return result; // retorna un array
}

function getCountvalues(valArray){
  	var arrayResult = [];
    var  countResults = {};
  	var sumGlobal = 0;

    valArray.forEach(function(i) { countResults[i] = (countResults[i]||0) + 1;});

	Object.keys(countResults).forEach(function(k){
        var val = k + '=' + countResults[k];
/*
        if(k == "00166 Campaña Facebook Mx" || k == "00167 Campaña Google Mx" || k == "00168 Campaña OFF-LINE"){
             arrayResult.push(val);
             nlapiLogExecution('AUDIT', 'RL| val result: ', JSON.stringify(val));
             sumMX += countResults[k];
        }else{
			sumOtras += countResults[k];
        }*/
      arrayResult.push(val);
      nlapiLogExecution('AUDIT', 'RL| val result: ', JSON.stringify(val));
      sumGlobal += countResults[k];
	});
	//arrayResult.push("Otras Campañas="+sumOtras);
  	arrayResult.push("Total Campañas="+sumGlobal);
    return arrayResult; // countResults
}
