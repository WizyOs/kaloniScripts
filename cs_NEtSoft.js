	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope Public
	*/
	define([],
	function() {
      function pageInit(context){
		
      }
      
      function postSourcing(context){
		if(context.fieldId == "supervisor"){
          var test1 = context.currentRecord.getValue({fieldId: 'custentity388'});
          alert('Valor custentity388 ' + test1);
        }
      }
      
      function fieldChanged(context){
        if(context.fieldId == "phone"){
          var phone = context.currentRecord.getValue({fieldId: 'phone'});
          context.currentRecord.setValue({fieldId: 'homephone', value: phone, ignoreFieldChange: true});
        }
        if(context.fieldId == "homephone"){
          alert('Se lleno campo homephone!!');
        }
        if(context.fieldId == "custentity388"){
          /*var test1 = context.currentRecord.getValue({fieldId: 'custentity388'});
          alert('Valor custentity388' + test1);*/
        }
        /*if(context.fieldId == "supervisor"){
          var test1 = context.currentRecord.getValue({fieldId: 'custentity388'});
          alert('Valor custentity388' + test1);
        }*/
        if(context.sublistId == 'addressbook' && context.fieldId == 'defaultbilling'){
           var sublist = context.currentRecord.getCurrentSublistValue({sublistId: 'addressbook', fieldId:'defaultbilling'});
          context.currentRecord.setCurrentSublistValue({sublistId: 'addressbook', fieldId:'defaultshipping', value:sublist});
           alert('Campo label!...');
           }
      }
      
      function saveRecord(context){
        var supervisor = context.currentRecord.getValue({fieldId: 'supervisor'});
        if(supervisor == '411945'){
           alert('No puedes ser tu propio supervisor!!');
          	return false;
           }
        return true;
      }
      
      function validateField(context){
        if(context.fieldId == "custentity348")
        {
          var cR = context.currentRecord.getValue({fieldId: 'custentity348'});
          var notas = context.currentRecord.getValue({fieldId: 'comments'});
          if(cR != '' && cR != notas){
            alert('Los valores son diferentes!!');
            context.currentRecord.setValue({fieldId: 'custentity348', value: '', ignoreFieldChange: true});
             return false;
          }
        }
		return true;
      }

      function lineInit(context){
        if(context.sublistId == "addressbook"){
           alert('seleccionando linea!!');
         }
      }
      
      function function1(){
        alert('alert client');
      }

		return {
      	  pageInit: pageInit,
          validateField: validateField,
          saveRecord: saveRecord,
          fieldChanged: fieldChanged,
          postSourcing: postSourcing,
          lineInit: lineInit,
          function1: function1
		};
});