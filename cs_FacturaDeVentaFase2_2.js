	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope SameAccount
	*/
	define([],function() {
      /*function pageInit(context){

      }

      function postSourcing(context){
		if(context.fieldId == "supervisor"){
          var test1 = context.currentRecord.getValue({fieldId: 'custentity388'});
          alert('Valor custentity388 ' + test1);
        }
      }*/

      function fieldChanged(context)
      {
        if(context.fieldId == "custbody91")
        {
          var obligacionesDelContribuyente = context.currentRecord.getText({fieldId: 'custbody90'});
          var obligacionesDelContribuyenteLista = context.currentRecord.getText({fieldId: 'custbody91'});
          var eliminarObligacionesDelContribuyente = context.currentRecord.getValue({fieldId: 'custbody92'});
          console.log('obligacionesDelContribuyenteLista: ' + obligacionesDelContribuyenteLista);
          if(obligacionesDelContribuyenteLista != null && obligacionesDelContribuyenteLista != "")
          {
            if(eliminarObligacionesDelContribuyente)
            {
			  var obligacionesDelContribuyenteListaSplit = obligacionesDelContribuyenteLista.split(' ');
              obligacionesDelContribuyenteLista = obligacionesDelContribuyenteListaSplit[0];
              if(obligacionesDelContribuyente.indexOf(obligacionesDelContribuyenteLista) != -1)
              {
                var replaceResult = obligacionesDelContribuyente.replace(obligacionesDelContribuyenteLista +';', '');
                context.currentRecord.setValue({fieldId: 'custbody90', value: replaceResult, ignoreFieldChange: false});
                context.currentRecord.setValue({fieldId: 'custbody92', value: false, ignoreFieldChange: false});
              }
              else
              {
                alert('El campo OBLIGACIONES DEL CONTRIBUYENTE (RECEPTOR F2) no contiene el valor: ' + obligacionesDelContribuyenteLista + ' que deseas eliminar!!');
              }
            }
            else
            {
              var obligacionesDelContribuyenteListaSplit = obligacionesDelContribuyenteLista.split(' ');
              obligacionesDelContribuyenteLista = obligacionesDelContribuyenteListaSplit[0];
              if(obligacionesDelContribuyente.indexOf(obligacionesDelContribuyenteLista) != -1)
              {
                alert('El campo OBLIGACIONES DEL CONTRIBUYENTE (RECEPTOR F2) ya contiene este valor: ' + obligacionesDelContribuyenteLista);
              }
              else
              {
                obligacionesDelContribuyente += obligacionesDelContribuyenteLista + ";";
                context.currentRecord.setValue({fieldId: 'custbody90', value: obligacionesDelContribuyente, ignoreFieldChange: false});
              }
            }
          }
        }

        if(context.fieldId == "custbody94")
        {
          var detallesTributariosReceptor = context.currentRecord.getText({fieldId: 'custbody93'});
          var detallesTributariosReceptorLista = context.currentRecord.getText({fieldId: 'custbody94'});
          var eliminardetallesTributariosReceptor = context.currentRecord.getValue({fieldId: 'custbody95'});
          console.log('detallesTributariosReceptorLista: ' + detallesTributariosReceptorLista);
          if(detallesTributariosReceptorLista != null && detallesTributariosReceptorLista != "")
          {
            if(eliminardetallesTributariosReceptor)
            {
              if(detallesTributariosReceptor.indexOf(detallesTributariosReceptorLista) != -1)
              {
                var replaceResult = detallesTributariosReceptor.replace(detallesTributariosReceptorLista +'+', '');
                context.currentRecord.setValue({fieldId: 'custbody93', value: replaceResult, ignoreFieldChange: false});
                context.currentRecord.setValue({fieldId: 'custbody95', value: false, ignoreFieldChange: false});
              }
              else
              {
                alert('El campo DETALLES TRIBUTARIOS (RECEPTOR F2) no contiene el valor: ' + detallesTributariosReceptorLista + ' que deseas eliminar!!');
              }
            }
            else
            {
              if(detallesTributariosReceptor.indexOf(detallesTributariosReceptorLista) != -1)
              {
                alert('El campo DETALLES TRIBUTARIOS (RECEPTOR F2) ya contiene este valor: ' + detallesTributariosReceptorLista);
              }
              else
              {
                detallesTributariosReceptor += detallesTributariosReceptorLista + "+";
                context.currentRecord.setValue({fieldId: 'custbody93', value: detallesTributariosReceptor, ignoreFieldChange: false});
              }
            }
          }
        }

        /*if(context.fieldId == "homephone"){
          alert('Se lleno campo homephone!!');
        }
        if(context.fieldId == "custentity388"){
          var test1 = context.currentRecord.getValue({fieldId: 'custentity388'});
          alert('Valor custentity388' + test1);
        }
        if(context.fieldId == "supervisor"){
          var test1 = context.currentRecord.getValue({fieldId: 'custentity388'});
          alert('Valor custentity388' + test1);
        }
        if(context.sublistId == 'addressbook' && context.fieldId == 'defaultbilling')
        {
           var sublist = context.currentRecord.getCurrentSublistValue({sublistId: 'addressbook', fieldId:'defaultbilling'});
           context.currentRecord.setCurrentSublistValue({sublistId: 'addressbook', fieldId:'defaultshipping', value:sublist});
           alert('Campo label!...');
        }*/
      }

      /*
      function saveRecord(context){
        var supervisor = context.currentRecord.getValue({fieldId: 'supervisor'});
        if(supervisor == '411945'){
           alert('No puedes ser tu propio supervisor!!');
          	return false;
           }
        return true;
      }

      function validateField(context)
      {
        if(context.fieldId == "custbody90")
        {
          var obligacionesDelContribuyente = context.currentRecord.getText({fieldId: 'custbody90'});
          if(obligacionesDelContribuyente.substring(obligacionesDelContribuyente.length -1, obligacionesDelContribuyente.length) === ";")
          {
            //obligacionesDelContribuyente = obligacionesDelContribuyente.substring(0, obligacionesDelContribuyente.length -1);
            alert('validateField!!' + obligacionesDelContribuyente);
            //context.currentRecord.setValue({fieldId: 'custbody90', value: '', ignoreFieldChange: true});
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
      */

		return {
      	  //pageInit: pageInit,
          //validateField: validateField,
          //saveRecord: saveRecord,
          fieldChanged: fieldChanged
          /*postSourcing: postSourcing,
          lineInit: lineInit,
          function1: function1*/
		};
});