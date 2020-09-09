function alertTest(){
  	var count='';
    var campo1='';
    campo1 = nlapiLoadRecord('employee', '603152');//numero_empleado
    if (campo1) {
    	//var usersTime = nlapiLoadRecord('customrecord_currenttime', 1).getDateTimeValue('custrecord_currenttime_now', nlapiLoadConfiguration("userpreferences").getFieldValue("TIMEZONE"));
		var currentDate = new Date();   //gets the current date and time
		var date = nlapiDateToString(currentDate); //gets the current date excluding the time
		comparetime = "16:30:00" //specified time of the day
		comparetime2 = "16:35:00" //specified time of the day
		var compareDateTime1 = new Date(date+' '+comparetime); //concatenating current date and the comparison time
		var compareDateTime2 = new Date(date+' '+comparetime); //concatenating current date and the comparison time
		if(currentDate > compareDateTime1 && currentDate < compareDateTime2) { // comparing current date/time with the defined date and time=12:00pm
			alert ('No olvides marcar en 30 min.');
		}
    }
}