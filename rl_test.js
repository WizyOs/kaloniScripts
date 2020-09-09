function mainFunction() // KL-Global
{
  var resultsArray = [];
  var result = {};
	result = leadsAsignadosPorEjecutivoThisMonth();
  	resultsArray.push(result);

  	result = leadsAsignadosPorEjecutivoToday();
  	resultsArray.push(result);
  return resultsArray;
}

function leadsAsignadosPorEjecutivoThisMonth(){
    try
    {
      var search = nlapiLoadSearch('customer', 'customsearch5363');
      var resultSet = search.runSearch();
      var sum = 0;
      var ejecutivosArray = [];
      var counts = {};

      resultSet.forEachResult(function(eachResult)
       {
         sum += 1;
         var val = eachResult.getText('custentity143');   // process the search result
         //nlapiLogExecution('AUDIT', 'RL| num-val: ', sum + "-" + val);
         ejecutivosArray.push(val);
         return true; // return true to keep iterating
       });

       ejecutivosArray.forEach(function(i) { counts[i] = (counts[i]||0) + 1;});
       counts.total = sum;
       nlapiLogExecution('AUDIT', 'RL| counts: ',  JSON.stringify(counts));

       /*var ejecutivos = ejecutivosArray.filter(onlyUnique);
       nlapiLogExecution('AUDIT', 'RL| ejecutivos: ', ejecutivos);*/

       return counts;
    }
  	catch(e){
      var vale = e;
      nlapiLogExecution('ERROR', 'RL| catch(e): ', vale);
    }
}

function leadsAsignadosPorEjecutivoToday(){
    try
    {
      var search = nlapiLoadSearch('customer', 'customsearch5363');
      var resultSet = search.runSearch();
      var sum = 0;
      var ejecutivosArray = [];
      var uniqueEjecutivos = {};

      resultSet.forEachResult(function(eachResult)
       {
         var dateCreated = eachResult.getValue('datecreated');
         var ejecutivoKC = eachResult.getText('custentity143');
         var dateTimeArray = dateCreated.split(' ');
      	 var valtoday = dateTimeArray[0];
         if(getToday() == valtoday){
            ejecutivosArray.push(ejecutivoKC);
        	nlapiLogExecution('AUDIT', 'RL| dateCreated y ejecutivoKC (leadsAsignadosPorEjecutivoToday): ', valtoday + " y " + ejecutivoKC);
            sum += 1;
         }
         return true; // return true to keep iterating
       });

       ejecutivosArray.forEach(function(i) { uniqueEjecutivos[i] = (uniqueEjecutivos[i]||0) + 1;});
       uniqueEjecutivos.total = sum;
       nlapiLogExecution('AUDIT', 'RL| uniqueEjecutivos: (leadsAsignadosPorEjecutivoToday)', JSON.stringify(uniqueEjecutivos));

       return uniqueEjecutivos;
    }
  	catch(e){
      var vale = e;
      nlapiLogExecution('ERROR', 'RL| catch(e) (leadsAsignadosPorEjecutivoToday): ', vale);
    }
}

function valoracionesAgendadasPorEjecutivoThisMonth(){
    try
    {
      var search = nlapiLoadSearch('customer', 'customsearch5366');
      var resultSet = search.runSearch();
      var sum = 0;
      var ejecutivosArray = [];
      var counts = {};

      resultSet.forEachResult(function(eachResult)
       {
         sum += 1;
         var val = eachResult.getValue('organizer');
         ejecutivosArray.push(val);
         return true; // return true to keep iterating
       });

       ejecutivosArray.forEach(function(i) { counts[i] = (counts[i]||0) + 1;});
       counts.total = sum;
       nlapiLogExecution('AUDIT', 'RL| counts (valoracionesAgendadas): ',  JSON.stringify(counts));

       return counts;
    }
  	catch(e){
      var vale = e;
      nlapiLogExecution('ERROR', 'RL| catch(e) (valoracionesAgendadas): ', vale);
    }
}

// Otros
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function getToday(){
  	var date = new Date(); // hora del servidor Los Angeles California (Hotario cambia en Marzo)
  	//var colombia_offset = 3*60; // + 3 hrs = Colombia
    //date.setMinutes(date.getMinutes() + colombia_offset);
    var day = date.getDate();
    var month = date.getMonth();
    month++;
    var year = date.getFullYear();
    var dateToday = day + '/' + month + '/' + year;
  	return dateToday;
}

function abc(eachResult)
{
   var val = eachResult.getText('custentity143');
   nlapiLogExecution('AUDIT', 'RL| val: ', val);
         return true;
}